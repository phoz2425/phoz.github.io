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
                document.querySelector('.container').textContent = currentItem[charIndex];
                charIndex++;
            } else {
                clearInterval(timer);
                document.querySelector('.container').textContent = '';
                setTimeout(showTextbox, 1000);
            }
        }, 1000);
   } else {
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers;
        storeResults();
        // Display "THANK YOU!" message
        var thankYouMessage = document.createElement('h1');
        thankYouMessage.textContent = 'THANK YOU!';
        document.body.appendChild(thankYouMessage);
    }
}

function storeResults() {
    fetch('http://localhost:3000/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameResults)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    }).then(data => {
        console.log('Results stored successfully');
    }).catch(error => {
        console.error('Error:', error);
    });
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

window.onload = function() {

    gameResults.name = prompt("Please enter your name:");
    gameResults.email = prompt("Please enter your email:");
    gameResults.course = prompt("Please enter your course:");
    gameResults.year = prompt("Please enter your year:");
    gameResults.section = prompt("Please enter your section:");

    document.getElementById('startButton').addEventListener('click', startGame);
}


fetch('http://localhost:3000/results', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameResults)
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
}).then(data => {
    console.log('Results stored successfully');
}).catch(error => {
    console.error('Error:', error);
});
