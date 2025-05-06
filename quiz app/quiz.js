document.addEventListener(`DOMContentLoaded`,()=>{
    const questionContainer = document.getElementById(`question-container`);
    const questionText = document.getElementById(`question-text`);
    const choicesList = document.getElementById(`choices-list`);
    const nextBtn = document.getElementById(`next-btn`);
    const resultContainer = document.getElementById(`result-container`);
    const startBtn = document.getElementById(`start-btn`);

    const obj = [
        {
            question:"What is the capital of France?",
            choices:["Paris","London","Berlin","Madrid"],
            answer:"Paris",
        },
        {
            question:"What planet is known as the red planet?",
            choices:["Mars","Venus","Jupiter","Saturn"],
            answer:"Mars", 
        },
        {
            question:"Who wrote `Hamlet`?",
            choices:["Carles Dickens","Jain Austen","William Shakespare","Mark Twain"],
            answer:"William Shakespare",  
        }
    ]
    let currentQuestionIndex = 0;
    let result = 0;

    startBtn.addEventListener(`click`,()=>{
        startBtn.classList.add('hidden');
        questionContainer.classList.remove(`hidden`);
        resultContainer.classList.add(`hidden`);
        showQuestion();
    });

    function showQuestion() {
        choicesList.innerHTML = ``;
        resultContainer.innerHTML = ``;

        nextBtn.classList.add(`hidden`);
        questionText.textContent = obj[currentQuestionIndex].question;
        obj[currentQuestionIndex].choices.forEach(data => {

            let choiceElement = document.createElement('li');
            choiceElement.innerHTML = `${data}`;
            choicesList.appendChild(choiceElement);
        })
    }

        choicesList.addEventListener(`click`, (e) => {
            if (e.target.tagName === `LI`){
                nextBtn.classList.remove('hidden');
                const choiceContent = e.target.textContent;
                if (obj[currentQuestionIndex].answer === choiceContent) result++;
            }
        })

        nextBtn.addEventListener(`click`,(e) => {
            currentQuestionIndex++;
            if (currentQuestionIndex === 3) {
                resultContainer.classList.remove(`hidden`);
                questionContainer.classList.add(`hidden`);
                nextBtn.classList.add(`hidden`);

                const yourScore = document.createElement(`h2`);
                yourScore.innerHTML = `Your Score:`
                const score = document.createElement(`p`);
                score.innerHTML = `${result} out of 3`
                const restartBtn = document.createElement(`button`);

                restartBtn.innerHTML = `Restart Quiz`;

                resultContainer.appendChild(yourScore);
                resultContainer.appendChild(score);
                resultContainer.appendChild(restartBtn);

                restartBtn.addEventListener(`click`,(e)=>{
                    resultContainer.classList.add(`hidden`);
                    questionContainer.classList.remove(`hidden`);
                    currentQuestionIndex = 0, result = 0; 
                    showQuestion();
                     
                });
            }
            else{
                showQuestion();
            }
        });

});