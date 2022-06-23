var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level: " + level);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(){
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(curreltLevel){
  if(gamePattern[curreltLevel] === userClickedPattern[curreltLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function  startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
