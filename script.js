function startGame() {
    // Hide the start button
    document.getElementById('startButton').style.display = 'none';

    // Update the level display
    document.getElementById('levelDisplay').textContent = 'Level: ' + (level + 1);

    if (level < levels.length) {
        // Get the current character
        currentChar = levels[level][item][charIndex];

        // Show the character in the .container div
        document.querySelector('.container').textContent = currentChar;

        // Wait for 1 second (1000 milliseconds) before clearing the .container div and showing the instructions and the textbox
        setTimeout(function() {
            document.querySelector('.container').textContent = '';
            document.getElementById('instructions').innerHTML = 'LETTER-NUMBER SEQUENCING<br>Enter the digits from smallest to largest, and then the letters in alphabetical order.';
            showTextbox();
        }, 1000);
    } else {
        // Show the number of correct answers
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers;
    }
}

function showTextbox() {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.maxLength = 1; // Limit input to 1 character
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Check the answer
            var answer = textbox.value;

            if (answer === currentChar) {
                correctAnswers++;
            }

            // Remove the textbox
            document.querySelector('.container').removeChild(textbox);

            // Move to the next character, item or level
            if (charIndex < levels[level][item].length - 1) {
                charIndex++;
            } else if (item < levels[level].length - 1) {
                item++;
                charIndex = 0;
            } else {
                level++;
                item = 0;
                charIndex = 0;
            }

            // Start the next round
            startGame();
        }
    });

    // Add the textbox to the .container div
    document.querySelector('.container').appendChild(textbox);
}

document.getElementById('startButton').addEventListener('click', startGame);
