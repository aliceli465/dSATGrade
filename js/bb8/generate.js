const fs = require("fs");
const path = require("path");
// Answer key
const answerKey = `
B	C	D	D	C	C
B	D	B	D	D	C
C	B	B	D	B	A
C	A	A	D	C	B
A	A	D	B	D	B
C	C	C	A	D	D
A	A	D	C	B	B
D	B	A	B	A	C
A	D	C	46	D	35
C	A	C	D	70	A
C	B	D	A	9	29/3, 9.666, 9.667
D	C	C	52	A	C
D	A	B	410	B	B
B	C	D	C	B	C
D	D	C	5	C	338
B	D	A	B	25	1.8, 9/5
B	A	C	A	2, -12	C
C	C	A	D	A	-34
C	B	C	.25, 1/4	104	D
A	A	B	B	B	104
B	D	B	C	6	B
C	D	B	A	C	B
B	D	A			
A	C	C			
D	B	D			
D	C	B			
C	B	A																	
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split("\n");
  const questions = [];

  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split("\t");
    const questionNumber = i + 1;
    const images = [`images/bb8/${section}/${label}${questionNumber}.png`];
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
    const images = [`images/bb8/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}8 = ${JSON.stringify(
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
