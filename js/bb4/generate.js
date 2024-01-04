const fs = require('fs');
const path = require('path');
// Answer key
const answerKey = `
B	D	B	C	B	A
B	D	B	B	B	B
A	A	C	B	2520	B
B	A	C	A	40	C
A	B	D	C	7	D
D	C	A	5	30	C
A	C	A	D	180	C
A	A	C	A	C	C
D	C	B	28	A	A
B	A	C	C	D	C
C	C	C	11	D	-.9333, -14/15
B	A	D	9	A	4.06
B	D	C	A	A	289
D	A	B	D	C	44
D	D	D	D	A	D
B	C	A	B	D	14.5, 29/2
C	B	D	C	D	C
A	A	D	C	C	C
D	A	B	D	D	A
D	D	A	B	C	10
D	C	A	B	D	B
C	D	C	6.555, 6.556, 59/9	A	D
D	B	B			
A	D	C			
C	D	D			
D	A	A			
C	B	D											
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split('\n');
  const questions = [];
  
  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split('\t');
    const questionNumber = i+1;
    const images = [`../images/bb4/${section}/${label}${questionNumber}.png`];
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
    const images = [`../images/bb4/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}4 = ${JSON.stringify(jsonData, null, 2)};`;
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