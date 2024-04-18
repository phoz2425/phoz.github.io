import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

var gameResults = {
    name: '',
    email: '',
    college: '',
    correct: [],
    wrong: []
};

var correctAnswers = 0;
var level = 0;
var item = 0;
var levels = [
    [['H', '2'], ['P', '6']],
    [['O', '7', '4'], ['K', '8', '5']],
    [['Z', '7', '3', 'A'], ['7', 'W', 'Q', '2'], ['S', '4', '1', 'D']],
    [['K', '4', '8', 'R', 'B', '2'], ['L', 'B', '3', '2', '6', 'J'], ['J', '2', '9', '5', 'L', 'G']]
];

var currentItem;

var firebaseConfig = {
    apiKey: "AIzaSyA4Ob5S6BZlYJ2d_0kRJd-7E5JLC2XUk-w",
    authDomain: "lnsapp-e6d13.firebaseapp.com",
    databaseURL: "https://lnsapp-e6d13-default-rtdb.firebaseio.com/",
    projectId: "lnsapp-e6d13",
    storageBucket: "lnsapp-e6d13.appspot.com",
    messagingSenderId: "692983724897",
    appId: "1:692983724897:web:cea4a895d7df8b414ca320"
};

var database;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function saveGameResults() {
    var gameResultsRef = ref(database, 'gameResults/');
    push(gameResultsRef, gameResults)
        .then(() => console.log('Game results saved successfully.'))
        .catch((error) => console.error('Error saving game results: ', error));
}

function showTextbox() {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.maxLength = currentItem.length;
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            var answer = textbox.value.toUpperCase(); // Convert input to uppercase

            if (answer === currentItem.join('')) {
                correctAnswers++;
                gameResults.correct.push({level: level, item: item, answer: answer});
            } else {
                gameResults.wrong.push({level: level, item: item, answer: answer});
            }

            document.querySelector('.container').removeChild(textbox);

            if (item < levels[level].length - 1) {
                item++;
            } else {
                level++;
                item = 0;
            }

            startGame();
        }
    });

    document.querySelector('.container').appendChild(textbox);
}


function startGame() {
    var startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.style.display = 'none';
    }

    // Hide the level display if the level is greater than 4
    if (level > 4) {
        document.getElementById('levelDisplay').style.display = 'none';
    } else {
        document.getElementById('levelDisplay').textContent = 'Level: ' + (level + 1);
    }

    if (level < levels.length) {
        currentItem = levels[level][item].slice();
        var charIndex = 0;

        document.querySelector('.container').textContent = '';

        var timer = setInterval(function() {
            if (charIndex < currentItem.length) {
                var container = document.querySelector('.container');
                container.textContent = currentItem[charIndex];
                container.style.color = getRandomColor(); // Set the text color to a random color
                charIndex++;
            } else {
                clearInterval(timer);
                document.querySelector('.container').textContent = '';
                setTimeout(showTextbox, 1000);
            }
        }, 1000);
    } else {
        saveGameResults();
        // Display "THANK YOU!" message
        var thankYouMessage = document.createElement('h1');
        thankYouMessage.textContent = 'THANK YOU!';
        document.body.appendChild(thankYouMessage);
    }
}

window.onload = function() {
    // Initialize Firebase
    initializeApp(firebaseConfig);
    // Get a reference to the database service
    database = getDatabase();

    // Ask the user for their information
    gameResults.name = prompt('Please enter your full name: ');
    gameResults.email = prompt('Please enter your email: ');
    gameResults.college = prompt('Please enter your course, year, and section(EX. BSP 2B): ');

    // Add this code to handle start button click
    var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
        // Call your function to start the game here
        startGame(); // Replace this with the actual function name
    });
}
