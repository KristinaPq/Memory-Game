const cardsArray = [
    { name: 'card1', img: 'images/animal_card_1.png' },
    { name: 'card2', img: 'images/animal_card_2.png' },
    { name: 'card3', img: 'images/animal_card_3.png' },
    { name: 'card4', img: 'images/animal_card_4.png' },
    { name: 'card5', img: 'images/animal_card_5.png' },
    { name: 'card6', img: 'images/animal_card_6.png' },
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    const shuffledCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardImage = document.createElement('img');
        cardImage.src = card.img;
        cardElement.appendChild(cardImage);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener('DOMContentLoaded', createBoard);