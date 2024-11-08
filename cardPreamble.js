const phrases = [
    { part1: "We, the people of", part2: "India" },
    { part1: "Sovereign, Socialist,", part2: "Secular, Democratic, Republic" },
    { part1: "Justice, Liberty,", part2: "Equality, and Fraternity" },
    { part1: "In our", part2: "Constituent Assembly" },
    { part1: "This twenty-sixth day of", part2: "November, 1949" },
    { part1: "Do hereby adopt,", part2: "enact, and give to ourselves this Constitution" },
 

];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
    // Prepare the cards
   const startbtn = document.querySelector(".startbtn");
   startbtn.style.display = "none";
   const cardGame = document.querySelector(".cardGame");
   cardGame.style.display = "none";
   const resetbtn = document.querySelector(".resetbtn");
   resetbtn.style.display = "block";

   cards = [];
    phrases.forEach(phrase => {
        cards.push({ text: phrase.part1, id: phrase.part1 });
        cards.push({ text: phrase.part2, id: phrase.part1 });
    });
    
    cards = shuffle(cards);

    const board = document.getElementById('game-board');
    board.innerHTML = '';

    // Create card elements
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.textContent = card.text;
        cardElement.addEventListener('click', handleCardClick);
        board.appendChild(cardElement);
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function handleCardClick(event) {
    const card = event.target;
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

let score = document.querySelector(".score");
let count =0;

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        count++;
        card1.classList.add('matched');
        card2.classList.add('matched');
        score.textContent = count;
        matchedPairs++;
        if (matchedPairs === phrases.length) {
            alert("Congratulations! You've matched all pairs.");
            
        }
    } else {
        setTimeout(() => {
            resetMatchedCards();
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

function resetMatchedCards() {
    const matchedCards = document.querySelectorAll('.card.matched');
    matchedCards.forEach(card => {
        card.classList.remove('flipped', 'matched');
        score.textContent = 0;
        count=0;
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        initializeGame();

    });
    matchedPairs = 0;
    
}

// Initialize the game when the page loads
// initializeGame();


function resetGame()
{
    const matchedCards = document.querySelectorAll('.card.matched');
    matchedCards.forEach(card => {
        card.classList.remove('flipped', 'matched');
        score.textContent = 0;
        count=0;
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        initializeGame();

    });
    matchedPairs = 0;

}