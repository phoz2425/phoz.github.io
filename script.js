

function startGame() {
    // Hide the start button
    document.getElementById('startButton').style.display = 'none';

    // Update the level display
    document.getElementById('levelDisplay').textContent = 'Level: ' + (level + 1);

    if (level < levels.length) {
        // Get the current item
        currentItem = levels[level][item].join('');

        // Show the item in the .container div
        document.querySelector('.container').textContent = currentItem;

        // Wait for 1 second (1000 milliseconds) per character before clearing the .container div and showing the textbox
        setTimeout(function() {
            document.querySelector('.container').textContent = '';
            showTextbox();
        }, currentItem.length * 1000);
    } else {
        // Show the number of correct answers
        document.querySelector('.container').textContent = 'Correct answers: ' + correctAnswers;
    }
}

function showTextbox() {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.maxLength = currentItem.length; // Limit input to the length of the current item
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Check the answer
            var answer = textbox.value;

            if (answer === currentItem) {
                correctAnswers++;
            }

            // Remove the textbox
            document.querySelector('.container').removeChild(textbox);

            // Move to the next item or level
            if (item < levels[level].length - 1) {
                item++;
            } else {
                level++;
                item = 0;
            }

            // Start the next round
            startGame();
        }
    });

    // Add the textbox to the .container div
    document.querySelector('.container').appendChild(textbox);
}

document.getElementById('startButton').addEventListener('click', startGame);
