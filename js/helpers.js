function gradeTest() {
    const textareaValue = document.getElementById('answers').value;
    const testNum = document.getElementById('testNumber').value;
    const rwEH = document.getElementById('rwEH').value;
    const mathEH = document.getElementById('mathEH').value;
    const rows = textareaValue.trim().split('\n');
    const studentRW = [];
    const studentRW2 = [];
    const studentMath = [];
    const studentMath2 = [];

    //set localstorage stuff
    console.log("setting items for test " + testNum + "with sections: " + rwEH + " " + mathEH);
    localStorage.setItem('rw1', JSON.stringify(window['rwQuestions'+testNum]));
    localStorage.setItem('rw2', JSON.stringify(window['rw'+rwEH+'Questions'+testNum]));
    localStorage.setItem('math1', JSON.stringify(window['mathQuestions'+testNum]));
    localStorage.setItem('math2', JSON.stringify(window['math'+mathEH+'Questions'+testNum]));

    //extract vals into cols
    rows.forEach(row => {
        const columns = row.split(' ');
        studentRW.push(columns[0]);
        studentRW2.push(columns[1]);
        studentMath.push(columns[2]);
        studentMath2.push(columns[3]);
    });

    //set selected-answer in localstorage
    const rw1 = JSON.parse(localStorage.getItem('rw1')) || { questions: [] };
    const rw2 = JSON.parse(localStorage.getItem('rw2')) || { questions: [] };
    const math1 = JSON.parse(localStorage.getItem('math1')) || { questions: [] };
    const math2 = JSON.parse(localStorage.getItem('math2')) || { questions: [] };
    for(let i = 1; i < 28; i++) {
        rw1.questions.find(q => q.question === i)['selected-answer'] = studentRW[i];
        rw2.questions.find(q => q.question === i)['selected-answer'] = studentRW2[i];
    }
    for(let i = 1; i < 23; i++) {
        math1.questions.find(q => q.question === i)['selected-answer'] = studentMath[i];
        math2.questions.find(q => q.question === i)['selected-answer'] = studentMath2[i];    
    }

    //set updated localstorage
    localStorage.setItem('rw1', JSON.stringify(rw1));
    localStorage.setItem('rw2', JSON.stringify(rw2));
    localStorage.setItem('math1', JSON.stringify(math1));
    localStorage.setItem('math2', JSON.stringify(math2));
}

