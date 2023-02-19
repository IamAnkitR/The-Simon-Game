const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    makeSound(userChosenColour);
    animatePress(userChosenColour);
  });
  


function makeSound(colour){
    let track = "";

    switch(colour){
        case "red":
            track = "sounds/red.mp3"
            break;
    
        case "green":
            track = "sounds/green.mp3"
            break;
            
        case "blue":
            track = "sounds/blue.mp3"
            break;
            
        case "yellow":
            track = "sounds/yellow.mp3"
            break;
            
        default:
            track = "sounds/wrong.mp3"
    
    }

    var audio = new Audio(track);
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

