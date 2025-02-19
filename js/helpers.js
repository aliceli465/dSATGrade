function setJSON() {
  const testNum = document.getElementById("testNumber").value;
  const rwEH = document.getElementById("rwEH").value;
  const mathEH = document.getElementById("mathEH").value;
  console.log(
    "setting items for test " +
      testNum +
      " with sections: " +
      rwEH +
      " " +
      mathEH
  );
  localStorage.setItem("rw1", JSON.stringify(window["rwQuestions" + testNum]));
  console.log("successfully set rw1");
  localStorage.setItem(
    "rw2",
    JSON.stringify(window["rw" + rwEH + "Questions" + testNum])
  );
  console.log("successfully set rw2");
  localStorage.setItem(
    "math1",
    JSON.stringify(window["mathQuestions" + testNum])
  );
  console.log("successfully set math1");
  localStorage.setItem(
    "math2",
    JSON.stringify(window["math" + mathEH + "Questions" + testNum])
  );
  console.log("successfully set math2");

  console.log(JSON.parse(localStorage.getItem("rw1")));
  console.log(JSON.parse(localStorage.getItem("rw2")));
  console.log(JSON.parse(localStorage.getItem("math1")));
  console.log(JSON.parse(localStorage.getItem("math2")));
}

function gradeTest() {
  const textareaValue = document.getElementById("answers").value;
  const testNum = document.getElementById("testNumber").value;
  const rwEH = document.getElementById("rwEH").value;
  const mathEH = document.getElementById("mathEH").value;
  const rows = textareaValue.trim().split("\n");
  const studentRW = [];
  const studentRW2 = [];
  const studentMath = [];
  const studentMath2 = [];

  //set localstorage stuff
  console.log(
    "setting items for test " +
      testNum +
      " with sections: " +
      rwEH +
      " " +
      mathEH
  );
  localStorage.setItem("rw1", JSON.stringify(window["rwQuestions" + testNum]));
  console.log(localStorage.getItem("rw1"));
  console.log("guh");
  console.log("successfully set rw1 for test " + testNum);
  localStorage.setItem(
    "rw2",
    JSON.stringify(window["rw" + rwEH + "Questions" + testNum])
  );
  console.log("successfully set rw2 for test " + testNum);
  localStorage.setItem(
    "math1",
    JSON.stringify(window["mathQuestions" + testNum])
  );
  console.log("successfully set math1 for test " + testNum);
  localStorage.setItem(
    "math2",
    JSON.stringify(window["math" + mathEH + "Questions" + testNum])
  );
  console.log("successfully set math2 for test " + testNum);

  //extract vals into cols
  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split("\t");
    studentRW.push(columns[0].toUpperCase());
    studentRW2.push(columns[1].toUpperCase());
    //for math, if mcq, set selected-answer to uppercase
    if (i < 22) {
      if (!/\d/.test(columns[2])) {
        studentMath.push(columns[2].toUpperCase());
      } else {
        studentMath.push(columns[2]);
      }
      if (!/\d/.test(columns[3])) {
        studentMath2.push(columns[3].toUpperCase());
      } else {
        studentMath2.push(columns[3]);
      }
    }
  }
  //set selected-answer in localstorage
  const rw1_ = JSON.parse(localStorage.getItem("rw1")) || { questions: [] };
  const rw2_ = JSON.parse(localStorage.getItem("rw2")) || { questions: [] };
  const math1_ = JSON.parse(localStorage.getItem("math1")) || { questions: [] };
  const math2_ = JSON.parse(localStorage.getItem("math2")) || { questions: [] };
  for (let i = 0; i < 27; i++) {
    rw1_.questions.find((q) => q.question === i + 1)["selected-answer"] =
      studentRW[i];
    rw2_.questions.find((q) => q.question === i + 1)["selected-answer"] =
      studentRW2[i];
    if (i < 22) {
      math1_.questions.find((q) => q.question === i + 1)["selected-answer"] =
        studentMath[i];
      math2_.questions.find((q) => q.question === i + 1)["selected-answer"] =
        studentMath2[i];
    }
  }

  // //set updated localstorage
  localStorage.setItem("rw1", JSON.stringify(rw1_));
  localStorage.setItem("rw2", JSON.stringify(rw2_));
  localStorage.setItem("math1", JSON.stringify(math1_));
  localStorage.setItem("math2", JSON.stringify(math2_));

  console.log(JSON.parse(localStorage.getItem("rw1")));
  console.log(JSON.parse(localStorage.getItem("rw2")));
  console.log(JSON.parse(localStorage.getItem("math1")));
  console.log(JSON.parse(localStorage.getItem("math2")));

  document.getElementById("gradeForm").style.display = "none";
  document.getElementById("selectPDF").style.display = "block";
}

function loadResults(rwTemplate, mathTemplate) {
  var rw1_ = JSON.parse(localStorage.getItem("rw1"));
  var rw2_ = JSON.parse(localStorage.getItem("rw2"));
  var math1_ = JSON.parse(localStorage.getItem("math1"));
  var math2_ = JSON.parse(localStorage.getItem("math2"));

  //Entire test with answers:  #rwE, #mathE
  //Incorrect only w/o answer key: #rwINA, #mathINA
  //Incorrect only with answer key:  #rwIA, #mathIA
  if (rwTemplate === "rwE") {
    document.getElementById("resultType").textContent =
      "Entire test with answers";
  } else if (rwTemplate === "rwINA") {
    document.getElementById("resultType").textContent = "Incorrect w/o answers";
  } else {
    document.getElementById("resultType").textContent =
      "Incorrect with answers";
  }
  var rw_output = Mustache.render($("#" + rwTemplate).html(), {
    questions: rw1_.questions.map(function (question) {
      question.isCorrect =
        question["actual-answer"] === question["selected-answer"] &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });
  var rw_output2 = Mustache.render($("#" + rwTemplate).html(), {
    questions: rw2_.questions.map(function (question) {
      question.isCorrect =
        question["actual-answer"] === question["selected-answer"] &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });
  var math_output = Mustache.render($("#" + mathTemplate).html(), {
    questions: math1_.questions.map(function (question) {
      question.isMcq = question.type === "mcq";
      question.isCorrect =
        question["actual-answer"].includes(question["selected-answer"]) &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });
  var math_output2 = Mustache.render($("#" + mathTemplate).html(), {
    questions: math2_.questions.map(function (question) {
      question.isMcq = question.type === "mcq";
      question.isCorrect =
        question["actual-answer"].includes(question["selected-answer"]) &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });

  $("#rw_results").html("<h3>R/W Module 1</h3>" + rw_output);
  $("#rw2_results").html("<h3>R/W Module 2</h3>" + rw_output2);
  $("#math_results").html("<h3>Math Module 1</h3>" + math_output);
  $("#math2_results").html("<h3>Math Module 2</h3>" + math_output2);

  //change visuals
  document.getElementById("results").style.display = "block";
}

function loadMathOnly(mathTemplate) {
  var math1_ = JSON.parse(localStorage.getItem("math1"));
  var math2_ = JSON.parse(localStorage.getItem("math2"));
  document.getElementById("resultType").textContent =
    "Math only without answers";

  var math_output = Mustache.render($("#" + mathTemplate).html(), {
    questions: math1_.questions.map(function (question) {
      question.isMcq = question.type === "mcq";
      question.isCorrect =
        question["actual-answer"].includes(question["selected-answer"]) &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });
  var math_output2 = Mustache.render($("#" + mathTemplate).html(), {
    questions: math2_.questions.map(function (question) {
      question.isMcq = question.type === "mcq";
      question.isCorrect =
        question["actual-answer"].includes(question["selected-answer"]) &&
        question["selected-answer"].trim() !== "";
      return question;
    }),
  });
  $("#math_results").html("<h3>Math Module 1</h3>" + math_output);
  $("#math2_results").html("<h3>Math Module 2</h3>" + math_output2);

  //change visuals
  document.getElementById("results").style.display = "block";
}
