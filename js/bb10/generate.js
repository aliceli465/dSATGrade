const fs = require("fs");
const path = require("path");
// Answer key
const answerKey = `
A	A	D	C	40	B
C	D	C	D	C	B
C	B	C	C	A	C
A	A	A	A	C	B
B	D	A	D	39000	67
B	C	D	D	2	B
A	D	B	77	B	D
C	A	D	B	D	A
A	A	A	D	B	B
D	D	C	24	A	36504
A	A	C	D	A	3
B	B	A	C	D	D
B	A	C	D	D	C
A	A	C	7	D	182
D	C	A	27556	41	A
C	A	C	25	D	C
D	B	C	A	A	B
C	C	C	D	B	C
C	C	C	A	B	C
B	A	A	D	D	50
A	A	A	B	11875	B
D	A	D	D	C	A
D	B	C			
A	A	D			
C	B	B			
A	B	B			
C	C	D																			
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split("\n");
  const questions = [];

  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split("\t");
    const questionNumber = i + 1;
    const images = [`images/bb10/${section}/${label}${questionNumber}.png`];
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
    const images = [`images/bb10/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}10 = ${JSON.stringify(
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
