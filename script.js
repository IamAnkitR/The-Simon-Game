const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []; // to store the randomly generated pattern
let userClickedPattern = []; // to store the user clicked pattern

let level = 0;
let started = false;

// This function gets called every time the game ends
function startOver(){  
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    nextSequence();
}

// On a keypress this function gets called. This is the entry point of the game
$(document).keypress(function(){
    if(!started){
        // displays the current level 0
        $("#level-title").text("Level "+level);

        nextSequence();
        started = true;
    }
})

// Once the colour button is pressed by the user this function gets called.
$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id"); // selects the color of user chosen btn
    userClickedPattern.push(userChosenColour); // pushes it to the userClickedPattern array 
    makeSound(userChosenColour); // to generate sound on click
    animatePress(userChosenColour); // to add animation on click

    checkAnswer(userClickedPattern.length-1); // to compare the userClickedPattern with gamePattern
  });


  function checkAnswer(currentLevel) {
    //checks for every click if the colour is same in both array at each index
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //when the user completes a level(a sequence) then both array length will be equal  
      if (userClickedPattern.length === gamePattern.length){
        // again calls the nextSequence function to genrate a random colour for gamePattern
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    // If the userClicked pattern doesn't match with GamePattern then game ends 
    else {
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press any key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        let startAgain = false;
        $(document).keypress(function(){
            if(!startAgain){
                //Calling the startOver function on keypress
                startOver();
                startAgain = true;
            }
        })   
    }

}  

function nextSequence(){
    userClickedPattern = []; // initialize the user pattern as empty
    level++; // increment the level to 1 and so on
    $("#level-title").text("Level "+level); // displays the current level
    let randomNumber = Math.floor(Math.random()*4); // generates a random num b/w 0 to 3
    let randomChosenColour = buttonColours[randomNumber]; // selects the colour based on randomNumber from buttonColours array
    gamePattern.push(randomChosenColour);  // Adding the colour to gamePattern
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);  // selects the sound file based on colour passed
}

// This function is being used to select the track based on colour and play it
function makeSound(colour){
    var audio = new Audio("sounds/"+colour+".mp3");
    audio.play();
}

// This function is being used to add animation on Button on click
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

