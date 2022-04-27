let startBtn = document.querySelector('button');
let div = document.querySelector('div');
const restartBtn = document.createElement('button');
const score = document.createElement('p');
const body = document.querySelector('body');
const bestScoreDisplay = document.createElement('p');
div.style.display = 'none';
const bestScore = JSON.parse(localStorage.getItem('Best Score'));

startBtn.addEventListener('click', function () {
  div.style.display = '';
  startBtn.remove();
  restartBtn.textContent = 'Restart';
  restartBtn.classList.add('btn');
  body.append(restartBtn);
  bestScoreDisplay.textContent = `Best Score: ${bestScore}`;
  body.firstElementChild.append(bestScoreDisplay);
  if (localStorage.getItem('Best Score') === null){
    bestScoreDisplay.style.display = 'none';
  }
  score.textContent = `Score: ${numTries}`;
  body.firstElementChild.append(score);
});

restartBtn.addEventListener('click', function () {
  window.location.reload();
  div.style.display = '';
  startBtn.remove();
  restartBtn.textContent = 'Restart';
  restartBtn.classList.add('btn');
  body.append(restartBtn);
  if (localStorage.getItem('Best Score') === null){
    bestScoreDisplay.style.display = 'none';
  }
  score.textContent = `Score: ${numTries}`;
  body.firstElementChild.append(score);
});

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let preventClick = false;
let isFirstCard = true;
let numTries = 0;
let matched = [];
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //preventing the click on the same card
  if (preventClick) return;
  event.target.style.backgroundColor = event.target.getAttribute('class');
  //first card
  if (isFirstCard) {
    let firstCard = event.target;
    firstCard.setAttribute('id', 'firstCard');
    isFirstCard = false;
    firstCard.removeEventListener('click', handleCardClick);
    numTries++;
    score.textContent = `Score: ${numTries}`;
    return;
  }
  //second card 
  let secondCard = event.target;
  secondCard.setAttribute('id', 'secondCard');
  numTries++;
  score.textContent = `Score: ${numTries}`;
  checkForMatch();
};

function checkForMatch() {
  let isMatch = firstCard.getAttribute('class') === secondCard.getAttribute('class');
  isMatch ? disableCards() : unflipCards();
  setTimeout(function () {
    preventClick = false;
  }, 1000);
};

function disableCards() {
  matched.push(firstCard.className);
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  firstCard.removeAttribute('id');
  secondCard.removeAttribute('id');
  isFirstCard = true;
  if (matched.length === 5) {
    setTimeout(function () {
      alert(`Complete! Your score was ${numTries}.`)
    }, 500);
    if (bestScore === null ||
      numTries < bestScore) {
      localStorage.setItem('Best Score', `${numTries}`);
    }
  }
};

function unflipCards() {
  setTimeout(function () {
    firstCard.removeAttribute('style')
    secondCard.removeAttribute('style')
    firstCard.addEventListener('click', handleCardClick);
    firstCard.removeAttribute('id');
    secondCard.removeAttribute('id');
    isFirstCard = true;
  }, 1000);
};


// when the DOM loads
createDivsForColors(shuffledColors);
restartBtn.addEventListener('click', function () {
  window.location.reload();
  restart();
});