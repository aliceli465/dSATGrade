const fs = require("fs");
const path = require("path");
// Answer key
const answerKey = `
D	A	B	A	A	D
D	C	D	C	B	D
D	D	A	A	B	110
B	C	D	B	B	D
A	A	C	B	D	C
B	C	B	B	C	A
D	A	D	90	A	A
D	B	D	D	C	42
A	D	B	C	B	C
B	C	A	D	162	C
B	C	B	14, -5, -4	C	B
A	D	D	11/4, 2.75	D	153
C	C	C	A	2850	A
A	B	B	4.41, 441/100	27	.2857, 2/7
C	A	C	5	C	B
B	D	B	D	A	17.5, 35/2
C	D	C	B	9	D
C	A	D	11	D	A
D	B	A	A	D	D
C	D	B	120	D	D
B	C	D	A	C	A
A	B	A	C	87	B
B	A	D			
D	D	D			
B	D	C			
D	C	D			
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
    const images = [`images/bb7/${section}/${label}${questionNumber}.png`];
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
    const images = [`images/bb7/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}7 = ${JSON.stringify(
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
