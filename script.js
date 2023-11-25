let timer;
let currentQuestion = 0;
let userAnswers = [];

const questions = [
    { question: "Question 1: Who invented Java Programming?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie"], correctAnswer: "James Gosling" },
    { question: "Question 2: Which component is used to compile, debug and execute the java programs?", options: ["JRE", "JDK", "JVM"], correctAnswer: "JDK" },
    { question: "Question 3: Which one of the following is not a Java feature?", options: ["Object-oriented", "Use of pointers", "Portable"], correctAnswer: "Use of pointers" },
    { question: "Question 4: What is the extension of java code files?", options: [".txt", ".java", ".js"], correctAnswer: ".java" },
    { question: "Question 5: Which of the following is not an OOPS concept in Java?", options: ["Polymorphism", "Inheritance", "Compilation"], correctAnswer: "Compilation" },
    { question: "Question 6: Which of these are selection statements in Java?", options: ["break", "continue", "if()"], correctAnswer: "if()" },
    // Add more questions as needed
    // { question: "Question 3: ...", options: ["Option 1", "Option 2", "Option 3"], correctAnswer: "Correct Option" },
    // Add more questions as needed
];
const validUsername = "user123";
const validPassword = "pass123";

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timer);
            alert("Time's up!");
            submitExam();
        }
    }, 1000);
}

function startExam(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validateLogin(username, password)) {
        // Hide login form
        document.getElementById("loginForm").style.display = "none";
        // Show exam form
        document.getElementById("examForm").style.display = "block";

        // Start the timer for 45 minutes
        const timerDisplay = document.getElementById("timer");
        startTimer(45 * 60, timerDisplay);

        // Show all questions
        showAllQuestions();
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

function validateLogin(username, password) {
    return username === validUsername && password === validPassword;
}

function showAllQuestions() {
    const questionContainer = document.getElementById("questionContainer");

    // Display all questions
    questions.forEach((questionObj, index) => {
        const questionHTML = `
            <p>${index + 1}. ${questionObj.question}</p>
            ${questionObj.options.map(option => `
                <input type="radio" name="question${index}" value="${option}" required> ${option}<br>
            `).join('')}
        `;

        questionContainer.innerHTML += questionHTML;
    });
}
function submitExam() {
    const questionContainer = document.getElementById("questionContainer");
    const timerDisplay = document.getElementById("timer");

    // Hide the question container and buttons
    questionContainer.innerHTML = "";
    document.getElementById("submitButton").style.display = "none";

    // Stop the timer
    clearInterval(timer);
    timerDisplay.style.display = "none";  // Hide the timer display

    // Show the thank you form
    document.getElementById("thankYouForm").style.display = "block";
}