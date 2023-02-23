# Memory Game

**This is a JavaScript implementation of a memory game. The game generates 6 pairs of unique images and 
randomizes their position on the board. The objective of the game is to find all 6 pairs of cards 
by clicking on them. Once all pairs are found or the timer runs out, 
the game ends and displays the final score.**

## How to play

1. Enter a username with at least 8 characters
2. Click the "Start" button
3. Click on the cards to reveal their hidden image
4. Click on another card to find its matching pair
5. Continue until all pairs have been found or the timer runs out

### JavaScript

- The necessary elements from the HTML are selected and stored in variables
- An event listener is added to the "Start" button to begin the game and validate the username input
- A function is defined to render the game board by selecting unique images, creating pairs, and shuffling them randomly
- A function is defined to set the timer and end the game when all pairs are found or the timer runs out
- A function is defined to handle the click event on the cards and compare their images to find matching pairs
- The game state is stored in variables, including the click count, score, and first and second cards clicked
- The setTimeout() function is used to delay the flipping of unmatched cards back over to their hidden state