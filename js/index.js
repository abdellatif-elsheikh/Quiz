// define variables
const quizContainer = document.querySelector('.quize-container')
const quistionElement = document.querySelector('.quistion');
const allOptions = document.getElementById('allOptions');
const submitBtn = document.getElementById('submit');

let counter = 0;
let degrees = 0;

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
};

let correctAnswer;
let arrayOfQuestions =[]
async function showTheData() {
    allQuestions = await fetch(`https://quizapi.io/api/v1/questions?apiKey=tS71R9pwYPmLclULzYk469ngFvelIDa6Y90XvByD&limit=10`);
    allQuestions = await allQuestions.json();
    arrayOfQuestions = allQuestions;
    let question = allQuestions[counter];
    let answers = question.answers;
    let container = ``
    Object.keys(answers).forEach(key => {
        if (typeof answers[key] === 'string' && counter < arrayOfQuestions.length) {
            let value = escapeHtml(answers[key])
            container += `
                <div class="option">
                <input type="radio" name="option" id="${key}" value="${key}">
                <label for="${key}" id='label-d'>${value}</label>
                </div>
            `;
            
        }
    });
    let checkCorrect = question.correct_answers;
    Object.keys(checkCorrect).forEach(key => {
        if(checkCorrect[key] === 'true'){
            correctAnswer=key.slice(0,8)
            console.log(correctAnswer);
            // return correctAnswer;
        }
    })
    quistionElement.innerText = question.question;
            allOptions.innerHTML = container

}

showTheData();


function getTheNextQyestion(){
    const allInputs = document.querySelectorAll('input[name="option"]');
    let length = arrayOfQuestions.length
    for(let rb of allInputs){
        if(rb.checked && counter < (length)){
            counter++;
            var checked = rb.value;
            if(checked == correctAnswer){
                degrees+=10;
                console.log(degrees);
            }
            showTheData()
        }
    };
    if(counter >= length){
        if(degrees > (length *10) / 2){
            quizContainer.innerHTML = `
            <div class="finished">
                <h2>Congratulations</h2>
                <h4>you have finished the quiz</h4>
                <p>your score is <strong>${degrees}</strong> out of <mark>${length * 10}</mark></p>
            </div>
            `
        }else {
            quizContainer.innerHTML = `
            <div class="finished">
                <h2>OPS! seems you have been failed</h2>
                <h4>better luck next time</h4>
                <p>your score is <strong>${degrees}</strong> out of <mark>${length * 10}</mark></p>
            </div>
            `
        }
    }
}
submitBtn.addEventListener('click', getTheNextQyestion)