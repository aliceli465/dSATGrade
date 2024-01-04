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

    //extract vals into cols
    rows.forEach(row => {
        const columns = row.split(' ');
        rw.push(columns[0]);
        rw2.push(columns[1]);
        math.push(columns[2]);
        math2.push(columns[3]);
    });

    gradeRW(answers, testNum);
    if(rwEH === 'Easy') {
        gradeRWEasy(answers, testNum);
    }
    else {
        gradeRWHard(answers, testNum);
    }
    gradeMath(answers, testNum);
    if(mathEH === 'Easy') {
        gradeMathEasy(answers, testNum);
    }
    else {
        gradeMathHard(answers, testNum);
    }

}

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