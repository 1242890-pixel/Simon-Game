var arrRandom = [];
var count = 0;
var front = 0;
var started = true;
var acceptedInput = false;

function randomButton() {
    count++;
    acceptedInput = false;

    $("h1").text("Level " + count);

    var randomIdNumber = Math.floor(Math.random() * 4);
    var randomIdButton;

    switch (randomIdNumber) {
        case 0:
            randomIdButton = "green";
            break;
        case 1:
            randomIdButton = "red";
            break;
        case 2:
            randomIdButton = "yellow";
            break;
        case 3:
            randomIdButton = "blue";
            break;
    }

    arrRandom.push(randomIdButton);

    playSequence();
}

function playSequence() {

    for (var i = 0; i < arrRandom.length; i++) {
        playButtons(i);
    }

    // Allow the player to click after the sequence finishes
    setTimeout(function () {
        started = false;
        acceptedInput = true;
    }, arrRandom.length * 500);

}

function playButtons(i) {
    setTimeout(function () {
        var button = arrRandom[i];

        $("#" + button).addClass("pressed");

        var audio = new Audio("./sounds/" + button + ".mp3");
        audio.play();

        setTimeout(function () {
            $("#" + button).removeClass("pressed");
        }, 150);

    }, i * 500);
}

// Start or restart the game
function startGame() {
    if (started) {
        arrRandom = [];
        count = 0;
        front = 0;

        randomButton();
    }
}

// Desktop: any key
$(document).keydown(startGame);

// Mobile: tap on the title
$("#level-title").on("click touchstart", function (event) {
    event.preventDefault();
    startGame();
});

// Handle player button clicks
$(".btn").click(function () {

    if (started || !acceptedInput)
        return;

    var thisButton = $(this);
    var idButton = this.id;

    // Show pressed animation
    thisButton.addClass("pressed");

    setTimeout(function () {
        thisButton.removeClass("pressed");
    }, 150);

    // Check the player's answer
    if (idButton === arrRandom[front]) {
        var audio = new Audio("./sounds/" + idButton + ".mp3");
        audio.play();

        front++;

        // Player completed the whole sequence
        if (front === arrRandom.length) {

            acceptedInput = false;
            setTimeout(function () {
                front = 0;
                randomButton();
            }, 1000);
        }

    } else {
        $("h1").text("Game Over! Level " + count + " - Tap Here or Press A Key to Restart");

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        started = true;
        acceptedInput = false;
    }

});