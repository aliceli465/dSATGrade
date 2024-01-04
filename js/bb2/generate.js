const fs = require('fs');
const path = require('path');
// Answer key
const answerKey = `
A	B	A	C	B	B
C	B	B	D	B	B
B	D	D	9	B	C
C	D	C	A	C	A
A	A	B	D	192	C
B	B	A	52	50	192
A	C	D	D	D	D
D	D	C	B	10	113
D	C	B	B	15, -5	A
A	A	C	C	D	C
A	D	C	11875	A	C
B	B	C	C	D	9.666, 9.667, 29/3
B	B	B	B	A	A
A	A	C	410	A	A
C	B	C	A	D	33
B	B	C	.5, 1/2	986	8
D	C	B	100	C	D
A	C	B	B	A	B
C	D	B	D	D	A
D	C	D	A	A	-34
A	A	D	B	D	D
B	B	A	C	C	D
C	A	B			
C	A	D			
C	B	A			
D	A	C			
C	D	A					
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split('\n');
  const questions = [];
  
  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split('\t');
    const questionNumber = i+1;
    const images = [`../images/bb2/${section}/${label}${questionNumber}.png`];
    const actualAnswer = columns[col];
    
    questions.push({
      "question": questionNumber,
      "images": images,
      "selected-answer": "",
      "actual-answer": actualAnswer,
    });
  }
  
  return { questions };
}
function convertMath(answerKey, section, label, col) {
  const rows = answerKey.trim().split('\n');
  const questions = [];
  
  for (let i = 0; i < 22; i++) {
    const columns = rows[i].trim().split('\t');
    const questionNumber = i+1;
    const images = [`../images/bb2/${section}/${label}${questionNumber}.png`];
    let actualAnswer;
    let type;
    if (columns[col] === 'A' || columns[col] === 'B' || columns[col] === 'C' || columns[col] === 'D') {
      type = "mcq";
      actualAnswer = columns[col];
    }
    else{
      type = "frq";
      actualAnswer = columns[col].split(',').map(part => part.trim());
    }
    questions.push({
      "question": questionNumber,
      "type": type,
      "images": images,
      "selected-answer": "",
      "actual-answer": actualAnswer,
    });
  }
  
  return { questions };
}
function writeJSONToFile(fileName, jsonData, windowVariable) {
  const fileContent = `window.${windowVariable}2 = ${JSON.stringify(jsonData, null, 2)};`;
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`JSON file created at: ${filePath}`);
}

const rw = convertRW(answerKey, 'rw', 'r', 0);
writeJSONToFile('rw.js', rw, 'rwQuestions');

const wEasy = convertRW(answerKey, 'rwEasy', 'w', 1);
writeJSONToFile('rwEasy.js', wEasy, 'rwEasyQuestions');

const wHard = convertRW(answerKey, 'rwHard', 'w', 2);
writeJSONToFile('rwHard.js', wHard, 'rwHardQuestions');

const math = convertMath(answerKey, 'math', 'nc', 3);
writeJSONToFile('math.js', math, 'mathQuestions');

const mathEasy = convertRW(answerKey, 'math', 'c', 4);
writeJSONToFile('mathEasy.js', mathEasy, 'mathEasyQuestions');

const mathHard = convertRW(answerKey, 'math', 'c', 5);
writeJSONToFile('mathHard.js', mathHard, 'mathHardQuestions');