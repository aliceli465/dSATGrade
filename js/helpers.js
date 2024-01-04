function gradeTest() {
    const textareaValue = document.getElementById('answers').value;
    const testNum = document.getElementById('testNumber').value;
    const rwEH = document.getElementById('rwEH').value;
    const mathEH = document.getElementById('mathEH').value;
    const rows = textareaValue.trim().split('\n');
    const rw = [];
    const rw2 = [];
    const math = [];
    const math2 = [];

    //set localstorage stuff
    console.log("setting items for test " + testNum + "with sections: " + rwEH + " " + mathEH);
    localStorage.setItem('rw1', JSON.stringify(window['rwQuestions'+testNum]));
    localStorage.setItem('rw2', JSON.stringify(window['rw'+rwEH+'Questions'+testNum]));
    localStorage.setItem('math1', JSON.stringify(window['mathQuestions'+testNum]));
    localStorage.setItem('math2', JSON.stringify(window['math'+mathEH+'Questions'+testNum]));
    console.log("reading:");
    console.log(JSON.parse(localStorage.getItem('rw1')));
    console.log("rw2:");
    console.log(JSON.parse(localStorage.getItem('rw2')));
    console.log("math:");
    console.log(JSON.parse(localStorage.getItem('math1')));
    console.log("math2:");
    console.log(JSON.parse(localStorage.getItem('math2')));
    //extract vals into cols
    // rows.forEach(row => {
    //     const columns = row.split(' ');
    //     rw.push(columns[0]);
    //     rw2.push(columns[1]);
    //     math.push(columns[2]);
    //     math2.push(columns[3]);
    // });

    // gradeRW(answers, testNum);
    // if(rwEH === 'Easy') {
    //     gradeRWEasy(answers, testNum);
    // }
    // else {
    //     gradeRWHard(answers, testNum);
    // }
    // gradeMath(answers, testNum);
    // if(mathEH === 'Easy') {
    //     gradeMathEasy(answers, testNum);
    // }
    // else {
    //     gradeMathHard(answers, testNum);
    // }

}

//answers is an array
//have localstorage set beforehand
//populate the localstorage items
//only compile correct/incorrect with student answers for now
function gradeRW(answers, testNum) {
    
}

function gradeRWEasy(answers, testNum) {
    
}

function gradeRWHard(answers, testNum) {
    
}

function gradeMath(answers, testNum) {
    
}

function gradeMathEasy(answers, testNum) {
    
}

function gradeMathHard(answers, testNum) {
    
}

