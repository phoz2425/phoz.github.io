var correctAnswers = 0;
var trials = 0;
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

  let currentLevel = 0;
  let currentSequence = 0;
  
function startGame() {
  // Check if all levels have been completed
  if (currentLevel >= levels.length) {
    // Game over, show results
    document.querySelector('.container').textContent = 'Game over. Correct answers: ' + correctAnswers + ', Wrong answers: ' + (levels.flat().length - correctAnswers);
    return;
  }

  // Get the current sequence
  const sequence = levels[currentLevel][currentSequence];

  // Separate the sequence into numbers and letters
  const numbers = sequence.filter(char => !isNaN(char));
  const letters = sequence.filter(char => isNaN(char));

  // Set the current number and letter
  currentNumber = numbers[0];
  currentLetter = letters[0];

  // Add the item to the items array
  items.push({ number: currentNumber, letter: currentLetter });

  // Sort the items array
  items.sort(function(a, b) {
    if (a.number === b.number) {
      return a.letter.localeCompare(b.letter);
    } else {
      return a.number - b.number;
    }
  });

  // Show the letter in the .container div
  document.querySelector('.container').textContent = currentLetter;

  // Wait for 1 second (1000 milliseconds) before showing the number
  setTimeout(function() {
    document.querySelector('.container').textContent = currentNumber;

    // Wait for another 1 second (1000 milliseconds) before clearing the .container div and showing the instructions and the textbox
    setTimeout(function() {
      document.querySelector('.container').textContent = '';
      document.getElementById('instructions').innerHTML = 'LETTER-NUMBER SEQUENCING<br>Enter the digits from smallest to largest, and then the letters in alphabetical order.';
      showTextbox();
    }, 1000);
  }, 1000);
} else {
        // Show the number of correct answers
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers;
    }

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
function checkAnswer() {
    // Check the user's answer
  
    // If the answer is correct, increment currentSequence
    // If currentSequence is equal to the number of sequences in the current level, increment currentLevel and set currentSequence back to 0
  }
