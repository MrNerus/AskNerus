
var grades = {};
var subjects = {};
var questions = {};
var answers = {};


// const marked = require('marked');

window.addEventListener('load', function() {

    // fetch json into these variable
    setTimeout(() => {
        fetch('/AskNerus/FrontEnd/Json/subjects.json') ////Github
        // fetch('/FrontEnd/Json/subjects.json') ////Local
        .then((response) => response.json())
        .then((json) => {
            subjects = json;
        });   
    }, 500);

    setTimeout(() => {
        fetch('/AskNerus/FrontEnd/Json/questions.json') ////Github
        // fetch('/FrontEnd/Json/questions.json') ////Local
        .then((response) => response.json())
        .then((json) => {
            questions = json;
        });
    }, 1000);

    setTimeout(() => {
        fetch('/AskNerus/FrontEnd/Json/answers.json') ////Github
        // fetch('/FrontEnd/Json/answers.json') ////Local
        .then((response) => response.json())
        .then((json) => {
            answers = json;
        });
    }, 1500);

    setTimeout(() => {
        fetch('/AskNerus/FrontEnd/Json/grade.json') ////Github
        // fetch('/FrontEnd/Json/grade.json') ////Local
        .then((response) => response.json())
        .then((json) => {
            grades = json;
            fillGrades();
        });
    }, 2000);
});




function fillGrades() {
    let select = document.getElementById('grade');
    select.innerHTML = "";
    for (let i = 0; i < grades.length; i++) {
        let option = document.createElement('option');
        option.value = grades[i].identifier;
        option.text = grades[i].name;
        select.appendChild(option);
    }
    fillSubjects();
}

function fillSubjects() {
    let select = document.getElementById('subject');
    let grade = document.getElementById('grade').value;
    select.innerHTML = "";
    for (let i = 0; i < subjects[grade].length; i++) {
        let option = document.createElement('option');
        option.value = subjects[grade][i].identifier;
        option.text = subjects[grade][i].name;
        select.appendChild(option);
    }
}



function start() {
    let grade = document.getElementById('grade').value;
    let subject = document.getElementById('subject').value;
    let mode = document.getElementById('mode').value;

    if (mode == 'all_questions') {
        displayQuestions(grade, subject);
    }
    else if (mode == 'generate_qs_paper') {
        generateQsPaper(grade, subject);
    } else if (mode == 'all_questions_with_answers') {
        displayQuestionsAnswers(subject);
    }
}



function displayQuestionsAnswers(subject) {
    let all_questions = questions[subject];
    let dom_questionAnswers_container = document.getElementById('questionAnswers_container');
    dom_questionAnswers_container.innerHTML = "";

    for (let i = 0; i < all_questions.length; i++) {
        let qs_identifier = all_questions[i].identifier;


        let dom_question_container = document.createElement('div');
        dom_question_container.className = "question_container";
        dom_question_container.innerHTML = `
            <div class = "question" id="${qs_identifier}" onclick=showAnswers('${qs_identifier}') data-toggle="collapsed">${all_questions[i].question}</div>
        `;
        let dom_answers = document.createElement('div');
        dom_answers.className = "answers";
        
        for (let j = 0; j < answers[qs_identifier].answers.length; j++) {
            fetch(`/AskNerus/FrontEnd/MDs/${answers[qs_identifier].answers[j]}`) ////Github
            // fetch(`/FrontEnd/MDs/${answers[qs_identifier].answers[j]}`) ////Local
            .then((response) => response.text())
            .then((text) => {
                
                let dom_aproach = document.createElement('div');
                dom_aproach.className = "aproach";
    
                dom_aproach.innerHTML = `
                        <div class="approachHeader">Approach ${j+1}</div>
                        <div class="approachContent"><div class="wrapper">${marked(text, { gfm: true })}</div></div>
                `
                // dom_aproach.innerHTML = `
                //         <div class="approachHeader">Approach ${j+1}</div>
                //         <div class="approachContent">${marked.parse(text)}</div>
                // `
                dom_answers.appendChild(dom_aproach);
            })
        }
        dom_question_container.appendChild(dom_answers);
        dom_questionAnswers_container.appendChild(dom_question_container);
    }
        console.log(all_questions);
}




function showAnswers(qs_identifier) {
    let question = document.getElementById(qs_identifier);
    if (question.getAttribute('data-toggle') == 'collapsed') {
        question.setAttribute('data-toggle', 'expanded');
        // question.nextElementSibling.style.height = `${question.nextElementSibling.scrollHeight}px`;
        // question.nextElementSibling.style.height = getComputedStyle(question.nextElementSibling).getPropertyValue('height');
        // question.nextElementSibling.style.maxHeight = `${question.nextElementSibling.getElementsByClassName('wrapper')[0].clientHeight + question.nextElementSibling.getElementsByClassName('approachHeader')[0].clientHeight}px`;
        // question.nextElementSibling.style.height = `${question.nextElementSibling.getElementsByClassName('wrapper')[0].clientHeight + question.nextElementSibling.getElementsByClassName('approachHeader')[0].clientHeight}px`;
        // question.nextElementSibling.style.height = `${question.nextElementSibling.scrollHeight}px`;
        // question.nextElementSibling.style.height = `${question.nextElementSibling.scrollHeight}px`;
        question.nextElementSibling.style.height = `fit-content`;
        // question.nextSibling.style.height 
    } else {
        question.setAttribute('data-toggle', 'collapsed');
        // question.nextElementSibling.style.maxHeight = `0px`;
        question.nextElementSibling.style.height = `0px`;

    }
}