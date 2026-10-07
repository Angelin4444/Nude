// =====================================
// NUDE — SKIN CONSULTATION
// =====================================


const questions = [

    {
        title: "How would you describe your skin?",
        description: "Choose the option that feels closest to your skin most days.",
        key: "skinType",

        answers: [
            {
                value: "dry",
                title: "Dry",
                description: "Often feels tight or lacks comfort."
            },
            {
                value: "oily",
                title: "Oily",
                description: "Often looks shiny or feels slick."
            },
            {
                value: "combination",
                title: "Combination",
                description: "Some areas feel oily while others feel dry."
            },
            {
                value: "normal",
                title: "Balanced",
                description: "Generally comfortable and balanced."
            }
        ]
    },


    {
        title: "What would you like to focus on?",
        description: "Choose the result you care about most right now.",
        key: "goal",

        answers: [
            {
                value: "hydration",
                title: "Hydration",
                description: "More comfort and a fresh feel."
            },
            {
                value: "glow",
                title: "Glow",
                description: "A brighter, more radiant appearance."
            },
            {
                value: "balance",
                title: "Balance",
                description: "A calmer, more balanced routine."
            },
            {
                value: "texture",
                title: "Texture",
                description: "A smoother-looking skin surface."
            }
        ]
    },


    {
        title: "How does your skin react to the sun?",
        description: "Think about what usually happens when you're outside.",
        key: "sun",

        answers: [
            {
                value: "burn",
                title: "Burns easily",
                description: "I tend to redden quickly."
            },
            {
                value: "sometimes",
                title: "Sometimes",
                description: "It depends on the day or exposure."
            },
            {
                value: "rarely",
                title: "Rarely",
                description: "I don't usually burn easily."
            },
            {
                value: "unsure",
                title: "Not sure",
                description: "I've never really noticed."
            }
        ]
    },


    {
        title: "What texture do you prefer?",
        description: "Choose the feel you'd most enjoy using every day.",
        key: "texture",

        answers: [
            {
                value: "light",
                title: "Light",
                description: "Thin, fresh and barely there."
            },
            {
                value: "gel",
                title: "Gel",
                description: "Cool, smooth and weightless."
            },
            {
                value: "cream",
                title: "Cream",
                description: "Comfortable and nourishing."
            },
            {
                value: "rich",
                title: "Rich",
                description: "Deeply comforting and cocooning."
            }
        ]
    }

];


let currentQuestion = 0;

let answers = {};


// DOM
const questionTitle =
    document.getElementById("questionTitle");

const questionDescription =
    document.getElementById("questionDescription");

const answerGrid =
    document.getElementById("answerGrid");

const questionNumber =
    document.getElementById("questionNumber");

const progressFill =
    document.getElementById("progressFill");

const backButton =
    document.getElementById("backButton");

const questionScreen =
    document.getElementById("questionScreen");

const analysisScreen =
    document.getElementById("analysisScreen");


// Render question
function renderQuestion() {

    const question = questions[currentQuestion];

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    questionTitle.textContent =
        question.title;


    questionDescription.textContent =
        question.description;


    answerGrid.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className = "answer-card";


        if (answers[question.key] === answer.value) {
            card.classList.add("selected");
        }


        card.innerHTML = `
            <span class="answer-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="answer-title">
                ${answer.title}
            </span>

            <span class="answer-description">
                ${answer.description}
            </span>
        `;


        card.addEventListener("click", () => {

            selectAnswer(question.key, answer.value);

        });


        answerGrid.appendChild(card);

    });


    if (currentQuestion > 0) {
        backButton.classList.add("visible");
    } else {
        backButton.classList.remove("visible");
    }

}


// Select answer
function selectAnswer(key, value) {

    answers[key] = value;


    document
        .querySelectorAll(".answer-card")
        .forEach(card => {
            card.classList.remove("selected");
        });


    event.currentTarget.classList.add("selected");


    setTimeout(() => {

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            renderQuestion();

        } else {

            finishQuiz();

        }

    }, 420);

}


// Back
backButton.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

});


// Finish
function finishQuiz() {

    questionScreen.classList.add("hidden");

    analysisScreen.classList.remove("hidden");


    setTimeout(() => {

        document.getElementById("analysisOne").textContent =
            "✓ Skin profile";


        setTimeout(() => {

            document.getElementById("analysisTwo").textContent =
                "✓ Your goals";


            setTimeout(() => {

                document.getElementById("analysisThree").textContent =
                    "✓ Environment";

            }, 500);

        }, 500);

    }, 500);


    localStorage.setItem(
        "nudeSkinProfile",
        JSON.stringify(answers)
    );


    setTimeout(() => {

        window.location.href =
            "results.html";

    }, 2300);

}


// Start
renderQuestion();