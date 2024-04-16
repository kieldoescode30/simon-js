const buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

let isPlaying = false;

let level = 0;

$(document).on('keypress', function() {
  if (!isPlaying) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    isPlaying = true;
  }
});

$('.btn').click(function() {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length);
});

function nextSequence() {
  level++;

  $('#level-title').text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');

  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $('body').addClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');
    
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  isPlaying = false;
}