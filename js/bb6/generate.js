const fs = require('fs');
const path = require('path');
// Answer key
const answerKey = `
D	A	A	A	B	B
D	C	B	D	B	A
D	C	B	B	B	A
B	A	D	B	A	3
C	C	A	B	A	D
C	C	C	A	3	B
B	A	D	A	B	D
B	D	C	C	D	A
A	D	C	B	6	D
B	A	D	18	D	189/5, 37.8
C	D	D	B	C	D
B	A	D	C	D	1677
B	D	B	D	C	1728
A	A	A	4	20	B
B	A	A	D	D	25
B	A	B	A	774	C
D	A	B	.3928, .3929, 11/28	D	66
B	D	B	C	C	D
B	B	C	54	14.66, 14.67, 44/3	3.5, 7/2
D	C	B	336	66	A
A	C	D	79	D	D
D	C	B	A	C	A
D	C	B			
D	D	B			
C	B	A			
A	D	D			
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
    const images = [`images/bb6/${section}/${label}${questionNumber}.png`];
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
    const images = [`../images/bb6/${section}/${label}${questionNumber}.png`];
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
  const fileContent = `window.${windowVariable}6 = ${JSON.stringify(jsonData, null, 2)};`;
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