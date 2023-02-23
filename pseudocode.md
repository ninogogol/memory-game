# Pseudocode for memory game

- Start program

- Show input for USERNAME and the button to START GAME

- If click on START GAME button:
  - While USERNAME is empty, ask for USERNAME

  - If USERNAME not empty:
    - Randomly place images on game board
    - Start timer and show hidden cards

  - When a card is clicked:
    - If it is the first card, turn it over and wait for the second card
    - If it is the second card:
      - If it matches the first card, keep the cards face up and award a point
      - If it does not match, hide the cards again and wait for the next selection

  - When all pairs have been found or the timer runs out:
    - Stop the timer and display the final score
    - Personalize the message with USERNAME
    - Show the "Play Again" button

- If click on "Play Again" button:
  - Reset the game board, score, and timer
  - Repeat from line 5