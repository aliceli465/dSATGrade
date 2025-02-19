const fs = require("fs");
const path = require("path");
// Answer key
const answerKey = `
A	B	D	D	B	79
C	D	D	C	C	B
D	B	C	A	B	B
B	B	A	C	3	C
D	D	B	C	A	D
D	A	A	224	B	A
B	C	D	B	240	B
A	C	C	1	B	D
D	B	B	14	A	46
C	D	A	D	9	B
C	D	B	D	C	113
D	A	C	B	D	D
D	A	B	D	986	D
A	B	A	A	45	33
D	A	C	B	B	C
B	C	D	76	D	B
D	A	A	35	D	C
A	A	D	D	B	D
D	C	A	D	C	C
A	B	B	-3	C	168
D	C	D	C	D	A
A	A	C	B	C	B
A	B	D			
C	B	D			
C	B	B			
A	A	C			
C	C	A																	
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split("\n");
  const questions = [];

  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split("\t");
    const questionNumber = i + 1;
    const images = [`images/bb9/${section}/${label}${questionNumber}.png`];
    const actualAnswer = columns[col];

    questions.push({
      question: questionNumber,
      images: images,
      "selected-answer": "",
      "actual-answer": actualAnswer,
    });
  }

  return { questions };
}
function convertMath(answerKey, section, label, col) {
  const rows = answerKey.trim().split("\n");
  const questions = [];

  for (let i = 0; i < 22; i++) {
    const columns = rows[i].trim().split("\t");
    const questionNumber = i + 1;
    const images = [`images/bb9/${section}/${label}${questionNumber}.png`];
    let actualAnswer;
    let type;
    if (
      columns[col] === "A" ||
      columns[col] === "B" ||
      columns[col] === "C" ||
      columns[col] === "D"
    ) {
      type = "mcq";
      actualAnswer = columns[col];
    } else {
      type = "frq";
      actualAnswer = columns[col].split(",").map((part) => part.trim());
    }
    questions.push({
      question: questionNumber,
      type: type,
      images: images,
      "selected-answer": "",
      "actual-answer": actualAnswer,
    });
  }

  return { questions };
}
function writeJSONToFile(fileName, jsonData, windowVariable) {
  const fileContent = `window.${windowVariable}9 = ${JSON.stringify(
    jsonData,
    null,
    2
  )};`;
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`JSON file created at: ${filePath}`);
}

const rw = convertRW(answerKey, "rw", "r", 0);
writeJSONToFile("rw.js", rw, "rwQuestions");

const wEasy = convertRW(answerKey, "rwEasy", "w", 1);
writeJSONToFile("rwEasy.js", wEasy, "rwEasyQuestions");

const wHard = convertRW(answerKey, "rwHard", "w", 2);
writeJSONToFile("rwHard.js", wHard, "rwHardQuestions");

const math = convertMath(answerKey, "math", "nc", 3);
writeJSONToFile("math.js", math, "mathQuestions");

const mathEasy = convertMath(answerKey, "mathEasy", "c", 4);
writeJSONToFile("mathEasy.js", mathEasy, "mathEasyQuestions");

const mathHard = convertMath(answerKey, "mathHard", "c", 5);
writeJSONToFile("mathHard.js", mathHard, "mathHardQuestions");
