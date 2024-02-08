let player = {
    name: "Balance",
    chips: 200
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let counter = 0;

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if (player.chips > 0) {
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        if (isAlive === false) {
            player.chips -= 50;
            playerEl.textContent = player.name + ": $" + player.chips;
        }
        isAlive = true;
        renderGame();
    } else {
        showAlert();
    }
}

function renderGame() {
    cardsEl.innerHTML = ""; // Clear the cards element before rendering
    
    for (let i = 0; i < cards.length; i++) {
        let cardValue = cards[i];
        let cardImage = document.createElement("img");
        cardImage.src = "images/" + getCardName(cardValue) + ".png"; // Corrected path here
        cardImage.alt = getCardName(cardValue);
        cardsEl.appendChild(cardImage);
    }
    
    sumEl.textContent = "Sum: " + sum;
    
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        isAlive = false;
        player.chips += 100;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        message = "You're out of the game!";
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = false;
    }
    messageEl.textContent = message;
    counter = 1;
}

function newCard() {
    if (isAlive === true) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
    counter = 0;
}

function showAlert() {
    alert("YOU LOST, PISS OFF!");
}

function getCardName(cardValue) {
    if (cardValue === 1) {
        return "ace";
    } else if (cardValue === 2) {
        return "two";
    } else if (cardValue === 3) {
        return "tree";
    } else if (cardValue === 4) {
        return "four";
    } else if (cardValue === 5) {
        return "five";
    } else if (cardValue === 6) {
        return "six";
    } else if (cardValue === 7) {
        return "seven";
    } else if (cardValue === 8) {
        return "eight";
    } else if (cardValue === 9) {
        return "nine";
    } else if (cardValue === 10) {
        return "ten";
    } else if (cardValue === 11) {
        return "jack";
    } else if (cardValue === 12) {
        return "queen";
    } else if (cardValue === 13) {
        return "king";
    } else {
        return cardValue.toString();
    }
}