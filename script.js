var correctAnswers = 0;
var wrongAnswers = 0;
var currentLetter, currentNumber;

function startGame() {
    if (correctAnswers + wrongAnswers < 4) {
        // Generate a random letter
        currentLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

        // Replace the content of the .container div with the random letter
        document.querySelector('.container').textContent = currentLetter;

        // Wait for 1 second (1000 milliseconds) before showing the random number
        setTimeout(function() {
            // Generate a random number between 0 and 9
            currentNumber = Math.floor(Math.random() * 10);

            // Replace the content of the .container div with the random number
            document.querySelector('.container').textContent = currentNumber;

            // Wait for 1 second (1000 milliseconds) before showing the textbox
            setTimeout(showTextbox, 1000);
        }, 1000);
    } else {
        // Show the number of correct and wrong answers
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers + ', Wrong answers: ' + wrongAnswers;
    }
}

function showTextbox() {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Check the answer
            var answer = textbox.value;
            if (answer === currentNumber + currentLetter) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }

            // Remove the textbox
            document.querySelector('.container').removeChild(textbox);

            // Start the next round
            startGame();
        }
    });

    // Add the textbox to the .container div
    document.querySelector('.container').appendChild(textbox);
}

document.getElementById('startButton').addEventListener('click', startGame);
