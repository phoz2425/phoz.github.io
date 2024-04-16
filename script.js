document.getElementById('startButton').addEventListener('click', function() {
    // Generate a random letter
    var randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Replace the content of the .container div with the random letter
    document.querySelector('.container').textContent = randomLetter;

    // Wait for 1 second (1000 milliseconds) before showing the random number
    setTimeout(function() {
        // Generate a random number between 0 and 9
        var randomNumber = Math.floor(Math.random() * 10);

        // Replace the content of the .container div with the random number
        document.querySelector('.container').textContent = randomNumber;
    }, 1000);
});
