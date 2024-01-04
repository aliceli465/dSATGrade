const fs = require('fs');
const path = require('path');
// Answer key
const answerKey = `
B	B	D	C	B	A
D	B	D	D	B	D
C	C	C	.2, 1/5	40	A
B	B	A	B	9	9
A	D	A	B	2	D
D	A	A	C	A	B
A	D	D	B	D	A
A	A	D	A	C	D
A	A	A	A	D	76
D	C	A	C	D	36504
A	C	A	24	70	C
B	C	C	D	D	C
A	B	B	C	D	B
C	D	C	80	A	D
A	A	A	7	B	9
D	D	A	A	A	182
D	A	C	27556	9	C
D	B	C	C	6	B
C	B	C	C	D	B
C	A	A	B	D	50
B	D	A	-3	B	A
D	D	B	C	A	B
C	D	B			
A	A	A			
D	C	D			
D	B	B			
C	D	B								
`;

// Function to convert answer key to JSON
//image labels are r and w, nc and c
function convertRW(answerKey, section, label, col) {
  const rows = answerKey.trim().split('\n');
  const questions = [];
  
  for (let i = 0; i < 27; i++) {
    const columns = rows[i].trim().split('\t');
    const questionNumber = i+1;
    const images = [`../images/bb3/${section}/${label}${questionNumber}.png`];
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
    const images = [`../images/bb3/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}3 = ${JSON.stringify(jsonData, null, 2)};`;
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