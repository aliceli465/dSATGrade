const fs = require('fs');
const path = require('path');
// Answer key
const answerKey = `
A	C	B	D	B	B
B	B	D	A	C	B
B	D	B	C	B	B
B	A	D	11	B	A
D	D	D	C	A	C
D	A	B	10	6	29
A	B	B	A	B	D
A	D	A	D	B	D
D	C	C	B	A	A
D	C	D	D	29	-10
C	C	C	30, -30	4	A
A	D	B	4.51, 451/100	.5, 1/2	D
D	C	D	A	D	D
A	D	D	D	D	A
C	A	A	D	D	10
D	A	A	4205	7.5, 15/2	-24
C	C	D	18	A	A
B	C	C	A	6	480
A	D	C	D	B	A
C	A	A	B	A	A
D	D	D	D	A	4176
B	D	C	D	B	A
D	D	B			
B	B	D			
C	D	D			
B	D	B			
C	B	C													
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split('\n');
  const questions = [];
  
  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split('\t');
    const questionNumber = i+1;
    const images = [`../images/bb5/${section}/${label}${questionNumber}.png`];
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
    const images = [`../images/bb5/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}5 = ${JSON.stringify(jsonData, null, 2)};`;
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

const mathEasy = convertMath(answerKey, 'mathEasy', 'c', 4);
writeJSONToFile('mathEasy.js', mathEasy, 'mathEasyQuestions');

const mathHard = convertMath(answerKey, 'mathHard', 'c', 5);
writeJSONToFile('mathHard.js', mathHard, 'mathHardQuestions');