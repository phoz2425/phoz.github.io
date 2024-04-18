var correctAnswers = 0;
var level = 0;
var item = 0;
var levels = [
    [['2', 'H'], ['6', 'P']],
    [['4', '7', 'O'], ['8', '5', 'K']],
    [['3', '7', 'A', 'Z'], ['7', '3', 'Q', 'W'], ['1', '4', 'S', 'D']],
    [['2', '4', '8', 'K', 'B', 'R'], ['6', '2', '3', 'L', 'B', 'J'], ['5', '2', '9', 'J', 'L', 'G']]
];

var gameResults = {
    name: '',
    email: '',
    course: '',
    year: '',
    section: '',
    correct: [],
    wrong: []
};

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

function startGame() {
    var startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.style.display = 'none';
    }
    document.getElementById('levelDisplay').textContent = 'Level: ' + (level + 1);

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
        storeResults();
        // Display "THANK YOU!" message
        var thankYouMessage = document.createElement('h1');
        thankYouMessage.textContent = 'THANK YOU!';
        document.body.appendChild(thankYouMessage);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function saveGameResults() {
    // Save the game results to the database
    database.ref('gameResults/').push(gameResults);
}


function storeResults() {
    fetch('path/to/your/php/script.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameResults),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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

document.addEventListener('DOMContentLoaded', (event) => {
    gameResults.name = prompt("Please enter your name:");
    gameResults.email = prompt("Please enter your email:");
    gameResults.course = prompt("Please enter your course (ex. BSP):");
    gameResults.year = prompt("Please enter your year (1st, 2nd ,3rd, or 4th):");
    gameResults.section = prompt("Please enter your section(ex. 2B):");

    document.getElementById('startButton').addEventListener('click', startGame);
});
