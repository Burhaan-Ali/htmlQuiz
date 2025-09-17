let loginDiv = document.querySelector(".login");
loginDiv.style.display = "flex";
let quizDiv = document.querySelector(".Questions");
quizDiv.style.display = "none";
let resultDiv = document.querySelector(".result");
resultDiv.style.display = "none";

let loginMessage = document.querySelector(".loginMessage");
let usernameInput = document.querySelector(".username");
let startBtn = document.querySelector(".startBtn");

// read users from local storage
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyperlinking Text Marking Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which HTML tag is used to define the main content of a document?",
        options: [
            "&lt;main&gt;",
            "&lt;body&gt;",
            "&lt;section&gt;",
            "&lt;article&gt;"
        ],
        answer: "&lt;main&gt;"
    },
    {
        question: "Which tag is used for creating hyperlinks in HTML?",
        options: [
            "&lt;link&gt;",
            "&lt;a&gt;",
            "&lt;href&gt;",
            "&lt;hyper&gt;"
        ],
        answer: "&lt;a&gt;"
    },
    {
        question: "What is the correct HTML element for inserting an image?",
        options: [
            "&lt;img&gt;",
            "&lt;image&gt;",
            "&lt;src&gt;",
            "&lt;pic&gt;"
        ],
        answer: "&lt;img&gt;"
    },
    {
        question: "Which tag is used to make text bold in HTML?",
        options: [
            "&lt;b&gt;",
            "&lt;strong&gt;",
            "&lt;bold&gt;",
            "&lt;em&gt;"
        ],
        answer: "&lt;b&gt;"
    },
    {
        question: "Which HTML tag is used to create a paragraph?",
        options: [
            "&lt;p&gt;",
            "&lt;para&gt;",
            "&lt;paragraph&gt;",
            "&lt;text&gt;"
        ],
        answer: "&lt;p&gt;"
    },
    {
        question: "Which attribute is used to specify the destination of a hyperlink?",
        options: [
            "href",
            "src",
            "link",
            "url"
        ],
        answer: "href"
    },
    {
        question: "Which tag is used to display the largest heading?",
        options: [
            "&lt;h1&gt;",
            "&lt;heading&gt;",
            "&lt;h6&gt;",
            "&lt;head&gt;"
        ],
        answer: "&lt;h1&gt;"
    },
    {
        question: "Which tag is used to italicize text in HTML?",
        options: [
            "&lt;i&gt;",
            "&lt;em&gt;",
            "&lt;italic&gt;",
            "&lt;it&gt;"
        ],
        answer: "&lt;i&gt;"
    },
    {
        question: "Which tag is used to add alternative text for an image?",
        options: [
            "alt",
            "title",
            "description",
            "caption"
        ],
        answer: "alt"
    },
    {
        question: "Which tag is used to create a line break in HTML?",
        options: [
            "&lt;br&gt;",
            "&lt;lb&gt;",
            "&lt;break&gt;",
            "&lt;newline&gt;"
        ],
        answer: "&lt;br&gt;"
    }
];
let currentQuestionIndex = 0;
let score = 0;

function userStore(name, score) {
    let user = { name, score };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUser = user;
}

startBtn.addEventListener("click", () => {
    let name = usernameInput.value.trim();
    if (name.length < 3) {
        loginMessage.innerText = "Name must be at least 3 characters long.";
        loginMessage.style.color = "red";
        return;
    }
    userStore(name, 0);
    loginDiv.style.display = "none";
    quizDiv.style.display = "flex";
    loadQuestion();
});
function loadQuestion() {
    let questionObj = questions[currentQuestionIndex];
    let questionHTML = `
        <div class="text-xl text-[#78f] font-bold">Question ${currentQuestionIndex + 1}</div>
        <div class="space-y-2">
            <p class="text-gray-600 text-xl font-bold">${questionObj.question}</p>
            ${questionObj.options.map(option => `
                <div class="option p-2 border rounded-[5px] cursor-pointer hover:bg-gray-100">${option}</div>
            `).join('')}
        </div>
    `;
    quizDiv.children[0].innerHTML = questionHTML;
    let optionDivs = document.querySelectorAll(".option");
    optionDivs.forEach(optionDiv => {
        optionDiv.addEventListener("click", () => {
            if (optionDiv.innerText === questionObj.answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        });
    });
}
function finishQuiz() {
    quizDiv.style.display = "none";
    resultDiv.style.display = "flex";
    resultDiv.innerHTML = `
        <div class=" p-4 py-5 w-[500px] shadow-md space-y-5 border flex items-center flex-col">
            <div class="text-2xl text-[#78f] font-bold">Quiz has finished.</div>
            <p class="text-gray-600 text-sm font-bold">Take a look the result.</p>
            <div class="text-4xl font-bold text-[#78f]">${score} / ${questions.length}</div>
            <div class="flex space-x-2">
                <button class="bg-[#78f] p-2 px-4 text-sm font-bold text-[#fff] outline-none rounded-[5px] tryagain">Try again</button>
                <button class="bg-[#000] p-2 px-8 text-sm font-bold text-[#fff] outline-none rounded-[5px] logout">Logout</button>
            </div>
        </div>
    `;
    if (currentUser) {
        currentUser.score = score;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        let userIndex = users.findIndex(u => u.name === currentUser.name);
        if (userIndex !== -1) {
            users[userIndex].score = score;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
    score = 0;
    currentQuestionIndex = 0;
}

// To reset the quiz for testing purposes
let tryAgainBtn = document.querySelector(".tryagain");
tryAgainBtn.addEventListener("click", () => {
    resultDiv.style.display = "none";
    quizDiv.style.display = "flex";
    loadQuestion();
});

let logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", () => {
    window.location.reload();
})

