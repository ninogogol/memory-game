// Select all the necessary elements from the HTML
const usernameInput = document.querySelector('#username-input');
const startBtn = document.querySelector('#start-button');
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const gameBoard = document.querySelector('#game-board');
const timeDisplay = document.querySelector('#time-display');
const endScreen = document.querySelector('#end-screen');
const endResult = document.querySelector('#end-result');
const endGreeting = document.querySelector('#end-greeting');
const playAgainBtn = document.querySelector('#play-again-button');
const displayUsername = document.querySelector('#display-username');

// Define some variables to keep track of the game state
let clickCount = 0;
let score = 0;
let firstCard = null;
let secondCard = null;
let canClickCards = true;


// Define an array of all possible image sources
const imageSources = ['./images/img (1).jpg', './images/img (2).jpg', './images/img (3).jpg', './images/img (4).jpg', './images/img (5).jpg', './images/img (6).jpg', './images/img (7).jpg','./images/img (6).jpg', './images/img (9).jpg', './images/img (10).jpg', './images/img (11).jpg', './images/img (12).jpg', './images/img (13).jpg', './images/img (14).jpg', './images/img (15).jpg', './images/img (16).jpg', './images/img (17).jpg', './images/img (16).jpg', './images/img (19).jpg', './images/img (20).jpg', './images/img (21).jpg', './images/img (22).jpg', './images/img (23).jpg', './images/img (24).jpg', './images/img (25).jpg', './images/img (26).jpg', './images/img (27).jpg', './images/img (26).jpg', './images/img (29).jpg', './images/img (30).jpg', './images/img (31).jpg', './images/img (32).jpg'];

// Add an event listener to the Start button
startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username.length < 8) {
      alert('Username must be at least 8 characters long.')
      return;
  }
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  displayUsername.innerText = username;

  renderGameBoard();
  setTimer();
});

// Render the game board
function renderGameBoard() {
  const selectedImages = [];
  const pairs = [];
  let counter = 0;

  // Select 6 unique images
  while (selectedImages.length < 6) {
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    const image = imageSources[randomIndex];

    if (!selectedImages.includes(image)) {
      selectedImages.push(image);
    }
  }

  // Duplicate each selected image to create 6 pairs
  for (let i = 0; i < 6; i++) {
    pairs.push(selectedImages[i]);
    pairs.push(selectedImages[i]);
  }

  // Shuffle the pairs array to randomize the order of the cards
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  gameBoard.innerHTML = '';

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('background-wrapper');
  gameScreen.append(backgroundWrapper);

  // Create img elements for each image in the pairs array
  pairs.forEach((image) => {
    const card = document.createElement('img');
    const background = document.createElement('img');

    card.src = image;
    card.classList.add('card');
    card.id = `card-${counter}`

    background.src = './images/back.jpg';
    background.classList.add('background');
    background.dataset.cardIndex = counter;

    background.addEventListener('click', () => {
      const cardIndex = background.dataset.cardIndex;
      const cardImage = document.getElementById(`card-${cardIndex}`);
      handleClick(cardImage);
    });

    backgroundWrapper.append(background);
    gameBoard.append(card);

    counter++;

  });

  counter = 0;
}
  

// Set timer
// Start a timer to count down from 30 seconds, and update the UI accordingly
function setTimer() {
  const countDownSeconds = 30;
  let remainingSeconds = countDownSeconds;
  const intervalId = setInterval(() => {
    timeDisplay.textContent = remainingSeconds;
    remainingSeconds--;

    // End the game
    // Stop the timer, and display the end screen with the player's final score. 
    // Provide a button to allow the player to play again.
    if (remainingSeconds <= 0 || score === 6) {
        clearInterval(intervalId);
        
        gameScreen.classList.add('hidden');
        endScreen.classList.remove('hidden');

        endGreeting.innerText = `Thanks for playing, ${usernameInput.value}!`;
        endResult.innerText = `Your final score is ${score}/6 in ${countDownSeconds - remainingSeconds} seconds.`;

    }

    // Handle play again button click
    // Listen for a click on the play again button, 
    // and reset the game state to allow the player to start a new game.
    playAgainBtn.addEventListener('click', () => {
        endScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        score = 0;
    })

  }, 1000);
}

// Handle click events on cards
// Check which card was clicked, and store its image source in a variable
function handleClick(cardImage) {
  if(!canClickCards) {
    return;
  }

  if (clickCount === 0) {
    firstCard = cardImage;
    firstCard.style.zIndex = '3';
    clickCount++;

  } else if (clickCount === 1){
    secondCard = cardImage;
    secondCard.style.zIndex = '3';
    
    canClickCards = false;

    // Check for a match
    // Compare the image sources of the two clicked cards, 
    // and handle the game logic accordingly. If they match, 
    // increment the score, otherwise flip the cards back over.
    if (firstCard.src === secondCard.src) {
      score++;
      canClickCards = true;
    } else {
      setTimeout(() => {
        firstCard.style.zIndex = null;
        secondCard.style.zIndex = null;
        canClickCards = true;
      }, 1500);
    }

    clickCount = 0;
  }
}