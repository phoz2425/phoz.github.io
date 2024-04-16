var correctAnswers = 0;
var level = 0;
var item = 0;
var items = [];
var currentLetter, currentNumber;
const levels = [
  // Level 1
  [
    ['2', 'H'],
    ['6', 'P']
  ],
  // Level 2
  [
    ['4', '7', 'O'],
    ['3', '0', 'R']
  ],
  // Level 3
  [
    ['A', 'Z', '4', '7'],
    ['P', 'J', '4', '8'],
    ['L', 'J', '2', '3']
  ],
  // Level 4
  [
    ['L', 'B', 'J', '2', '3', '6'],
    ['V', 'W', 'B', '9', '1', '8'],
    ['K', 'B', 'R', '2', '4', '8']
  ]
];

function startGame() {
    // Hide the start button
    document.getElementById('startButton').style.display = 'none';

    if (level < levels.length) {
        // Get the current item
        var currentItem = levels[level][item];

        // Separate the numbers and letters
        currentNumber = currentItem.filter(char => !isNaN(char));
        currentLetter = currentItem.filter(char => isNaN(char));

        // Add the item to the items array
        items.push({ number: currentNumber, letter: currentLetter });

        // Show the letter in the .container div
        document.querySelector('.container').textContent = currentLetter.join('');

        // Wait for 1 second (1000 milliseconds) before showing the number
        setTimeout(function() {
            document.querySelector('.container').textContent = currentNumber.join('');

            // Wait for another 1 second (1000 milliseconds) before clearing the .container div and showing the instructions and the textbox
            setTimeout(function() {
                document.querySelector('.container').textContent = '';
                document.getElementById('instructions').innerHTML = 'LETTER-NUMBER SEQUENCING<br>Enter the digits from smallest to largest, and then the letters in alphabetical order.';
                showTextbox();
            }, 1000);
        }, 1000);

        // Move to the next item or level
        if (item < levels[level].length - 1) {
            item++;
        } else {
            level++;
            item = 0;
        }
    } else {
        // Show the number of correct answers
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers;
    }
}

// ... rest of the code remains the same ...
function showTextbox() {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Check the answer
            var answer = textbox.value.split(', ').map(function(item) {
                var number = parseInt(item.match(/\d+/)[0]); // Extract the number
                var letter = item.match(/[a-zA-Z]+/)[0]; // Extract the letter
                return { number: number, letter: letter };
            });

            if (JSON.stringify(answer) === JSON.stringify(items)) {
                correctAnswers++;
            }

            // Remove the textbox
            document.querySelector('.container').removeChild(textbox);

            // Reset the items array and the trials counter
            items = [];
            trials = 0;

            // Start the next round
            startGame();
        }
    });

    // Add the textbox to the .container div
    document.querySelector('.container').appendChild(textbox);
}

document.getElementById('startButton').addEventListener('click', startGame);
