// -------GLOBAL --------Create a list that holds all of your cards
const deck = document.querySelector('.deck');
//const x = document.querySelector('.restartbtn');
let toggledCards = []; // store all cards in an array
let moves = 0;

// clock
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
 }
 shuffleDeck();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (checkCards(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            doCardsMatch(); 
            addMove();
            playersScore();           
        }
    }
 });

// check that target doesnt contain class "card" & match",checked no more than 2 cards
function checkCards(clickTarget) {
    return (
            clickTarget.classList.contains('card') && 
            !clickTarget.classList.contains('match') &&
            toggledCards.length < 2 &&
            !toggledCards.includes(clickTarget)
        );
}

// Clock Function  
function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

// time in the scoreboard
function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// Function to toggle cards
function toggleCard(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
 }

// to push clickTarget into toggleCards array
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
}

// check if the cards match
function doCardsMatch() {
    const TOTAL_PAIRS = 8;
    if (
        toggledCards[0].firstElementChild.className === 
        toggledCards[1].firstElementChild.className
        ) { // Toggle match class
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match'); 
            toggledCards = [];
            matched++; 
            if (matched === TOTAL_PAIRS) {
                gameOver();
             modal.reload(true); 
            }

    } else {
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
    }, 1000);
    }
}

// gets stars
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

//  count moves for scoreboard
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
// counts stars for scoreboard
function playersScore() {
    if (moves === 16 || moves === 24) {
        hideStar();
    }
}
// Hides the stars
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}