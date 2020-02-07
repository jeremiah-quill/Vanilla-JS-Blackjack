const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
const deckCounter = document.querySelector('.deckCounter');

// Game Buttons
const dealBtn = document.querySelector('.dealBtn');
const hitBtn = document.querySelector('.hitBtn');
const standBtn = document.querySelector('.standBtn');
const splitBtn = document.querySelector('.splitBtn')
const splitGameBtns = document.querySelector('.splitGameBtns')
const hitBtn2 = document.querySelector('.hitBtn2');
const standBtn2 = document.querySelector('.standBtn2');
const gameBtns = document.querySelector('.gameBtns')
const doubleBtn = document.querySelector('.doubleBtn')


// Wager Buttons
const bet10Btn = document.querySelector('.bet10Btn')
const bet25Btn = document.querySelector('.bet25Btn')
const bet50Btn = document.querySelector('.bet50Btn')
const bet100Btn = document.querySelector('.bet100Btn')
const clearBtn = document.querySelector('.clearBtn')
const betBtns = document.querySelectorAll('.betBtn')
const wagerDiv = document.querySelector('.wagerDiv')
const wagerBtns = document.querySelector('.wagerBtns')


const hand1Container = document.querySelector('.hand1Container');
const hand2Container = document.querySelector('.hand2Container')
const dealerContainer = document.querySelector('.dealerContainer');
const dealerScoreDiv = document.querySelector('.dealerScoreDiv');
const userScoreDiv = document.querySelector('.userScoreDiv')
const userScoreDiv2 = document.querySelector('.userScoreDiv2')
const userScoreContainer2 = document.querySelector('.userScoreContainer2')


const status = document.querySelector('.status')
const status2 = document.querySelector('.status2')
const h1Wait = document.querySelector('.h1-wait')
const h2Wait = document.querySelector('.h2-wait')


const bankrollDiv = document.querySelector('.bankrollDiv')

let bankroll = 1000;
let wager = 0;
let splitWager = 0;
let deck = [];
let userCards = [];
let dealerCards = [];


function hideSplitBtns() {
    splitGameBtns.style.display = 'none'; // HERE
    hitBtn2.style.display = 'none';
    standBtn2.style.display = 'none';
}


// Board functions
// GOOD
function clearBoard() {
    showBet();
    hideSplitBtns()
    hand2Container.style.display = 'none'
    userScoreContainer2.style.display = 'none'
    dealerScoreDiv.innerHTML = '';
    status.innerHTML = '';
    status.style.color = 'black';
    status2.style.display = 'none'
    status2.style.color = 'black';
    userScoreContainer2.style.display = 'none';
    userScoreDiv.innerHTML = '';
    userScoreDiv2.innerHTML = '';
    userCards = [];
    dealerCards = [];
    splitCards = [];
    hand1Container.innerHTML = '';
    dealerContainer.innerHTML = '';
    hand2Container.innerHTML = '';
}
// GOOD
function inPlayBtns() {
    dealBtn.style.display = 'none'
    hitBtn.style.display = 'flex'
    standBtn.style.display = 'flex';
    doubleBtn.style.display = 'flex'
    betBtns.forEach(btn => {
        btn.style.display = 'none'
    });
}

// Game functions
// GOOD
function startGame() {
    pickRandomCards(2, userCards);
    pickRandomCards(2, dealerCards)
    showCards(userCards, hand1Container);
    showCards(dealerCards, dealerContainer, 'dealer')
    let userScore = countScore(userCards);
    let dealerScore = countScore(dealerCards, 'dealer');
    userScoreDiv.innerHTML = userScore;
    dealerScoreDiv.innerHTML = dealerScore;
    if(userScore === 21) {
        gameOver(`BLACKJACK! Win ${wager*2.5}`, (wager*2.5))
        status.style.color = 'black';
    }
    if(userCards[0].card === userCards[1].card) {
        splitBtn.style.display = 'flex'
    }
}

// GOOD
function hit() {
    splitBtn.style.display = 'none'
    pickRandomCards(1, userCards);
    hand1Container.innerHTML = '';
    showCards(userCards, hand1Container);
    let userScore = countScore(userCards)
    userScoreDiv.innerHTML = userScore;
    if(userScore > 21) {
          gameOver('Bust', 0);
          status.style.color = 'red'
  }
}
// GOOD
function hitSplit1() {
    pickRandomCards(1, userCards);
    hand1Container.innerHTML = '';
    showCards(userCards, hand1Container);
    let userScore = countScore(userCards)
    userScoreDiv.innerHTML = userScore;
    if(userScore > 21) {
        status2.innerHTML = 'Play hand 2'
        status2.style.display = 'flex'
        gameOverSplit1('Bust');
        status.style.color = 'red'
        hitBtn2.style.display = 'flex'
        standBtn2.style.display = 'flex'
  }
}

// GOOD
function hitSplit2() {
    userScore = countScore(userCards)
    pickRandomCards(1, splitCards);
    hand2Container.innerHTML = '';
    showCards(splitCards, hand2Container);
    let splitScore = countScore(splitCards)
    userScoreDiv2.innerHTML = splitScore;
    if(splitScore > 21) {
          gameOver2('Bust', 0);
          status2.style.color = 'red'
          if(userScore <= 21) {
            let dealerScore = countScore(dealerCards);
            dealerContainer.innerHTML = ''; // Remove dealer's single card from DOM
            showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
            dealerScore = countScore(dealerCards);
            dealerScoreDiv.innerHTML = dealerScore;
            while(dealerScore < 17) {
                pickRandomCards(1, dealerCards);
                dealerContainer.innerHTML = '';
                showCards(dealerCards, dealerContainer);
                dealerScore = countScore(dealerCards);
                dealerScoreDiv.innerHTML = dealerScore;
            }
            checkScore(userCards, gameOver, status, wager)
        } else {
            resetGame()
            wager = 0;
        }
  }
}



// CHECK THIS
function gameOver(statement, settleWager) {
    status.innerHTML = statement;
    bankroll += settleWager;
    showBankroll();
    resetGame();
    wager = 0;
    if(bankroll === 0) {
        status.innerHTML = 'No more money, reload page to try again'
        dealBtn.style.display = 'none';
        betBtns.forEach(btn => btn.style.display = 'none')
    }
}
function gameOverSplit1(statement) {
    status.innerHTML = statement;
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
}

// CHECK THIS
function gameOver2(statement, settleWager) {
    status2.innerHTML = statement;
    bankroll += settleWager;
}
// CHECK THIS
function resetGame() {
    wagerDiv.innerHTML = 0;
    showBankroll()
    hideSplitBtns()
    dealBtn.style.display = 'flex'
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    betBtns.forEach(btn => btn.style.display = 'block');
}

// Make wagers
function makeWager(amount) {
    wager += amount;
    bankroll -= amount;
}
function showBet(n=1) {
    wagerDiv.innerHTML = wager*n;
}
function showBankroll() {
    bankrollDiv.innerHTML = bankroll;
}

// Create deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for(let card of cards) {
          deck.push({
            card: card,
            suit: suit,
            value: assignValue(card)
          })
      }
    }
}
function assignValue(card) {
	if(typeof card === 'number'){
  	return card
  } else if (card === 'A') {
    	return 11
    } else {
    	return 10
    }
}

// Count things
function countDeck() {
	let deckCount = deck.length;
  deckCounter.innerHTML = deckCount;
}
function countScore(cards, id) {
    let score = 0;
    if(id === 'dealer') {
        score = cards[0].value;
    } else {
    let cardValues = cards.map(card => card.value)
    cardValues.forEach(value => {
        score += value
    })
    if(score > 21 && cardValues.indexOf(11) !== -1) {
        cardValues[cardValues.indexOf(11)] = 1
        score = 0;
        cardValues.forEach(value => {
            score += value
        })
    }
}
  return score
}

// Pick random cards
function pickRandomCards(num, player) {
  for(let i=0; i<num; i++) {
 	  let randomIndex = Math.floor(Math.random() * deck.length);
    let randomCard = deck[randomIndex];
  	player.push(randomCard)
    deck.splice(randomIndex, 1)
    countDeck();
  }
  return player;
}

// Add picked cards to DOM
function showCards(player, container, id) {
	if(id === 'dealer') {
        let pickedCard = document.createElement('div')
        pickedCard.className = 'card';
        let textNode = document.createTextNode(`${player[0].card} of ${player[0].suit}`)
        pickedCard.appendChild(textNode)
        // let fakeText = document.createTextNode('hi')
        let fakeCard = document.createElement('div')
        fakeCard.className = 'fakeCard';
        // fakeCard.appendChild(fakeText)
        container.appendChild(pickedCard, fakeCard);
        container.appendChild(fakeCard)
    } else {
        player.forEach(card => {
        let pickedCard = document.createElement('div')
        pickedCard.className = 'card';
        let textNode = document.createTextNode(`${card.card} of ${card.suit}`)
        pickedCard.appendChild(textNode)
        container.appendChild(pickedCard);
  })
}
}


// Event listeners
window.addEventListener('onload', showBet(), showBankroll())

// GOOD
dealBtn.addEventListener('click', () => {
    clearBoard();
    inPlayBtns();
    createDeck();
    startGame();
})

// CHECK THIS
splitBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    splitWager = wager;
    bankroll -= splitWager;
    showBankroll()
    console.log('Bankroll:', bankroll, 'SW:', splitWager)
    wagerDiv.innerHTML = splitWager + wager;
    splitCards = [];
    splitCards.push(userCards.pop())
    hand1Container.innerHTML = '';
    hand2Container.style.display = 'flex'
    userScoreContainer2.style.display = 'flex'
    splitGameBtns.style.display = 'flex'
    let userScore = countScore(userCards);
    let splitScore = countScore(splitCards);
    userScoreDiv.innerHTML = userScore;
    userScoreDiv2.innerHTML = splitScore;
    showCards(userCards, hand1Container);
    showCards(splitCards, hand2Container)
    splitBtn.style.display = 'none'
})

// MAKE A SPLIT HIT BUTTON
// CHECK THIS
hitBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    if(splitCards.length === 0) {
        hit();
    } else {
        hitSplit1()

    //     pickRandomCards(1, userCards);
    //     hand1Container.innerHTML = '';
    //     showCards(userCards, hand1Container);
    //     let userScore = countScore(userCards)
    //     userScoreDiv.innerHTML = userScore;
    //     if(userScore > 21) {
    //         console.log('hi')
    //           gameOver('Bust', 0);
    //           status.style.color = 'red'
    //   }
    }
})


function stand() {
    splitBtn.style.display = 'none'
    let userScore = countScore(userCards)
    dealerContainer.innerHTML = ''; // Remove dealer's single card from DOM
    showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
    let dealerScore = countScore(dealerCards);
    dealerScoreDiv.innerHTML = dealerScore;
    while (dealerScore < 17) {
        pickRandomCards(1, dealerCards);
        dealerContainer.innerHTML = '';
        showCards(dealerCards, dealerContainer);
        dealerScore = countScore(dealerCards);
        dealerScoreDiv.innerHTML = dealerScore;
    }
    if(dealerScore >= 17) {
        if(dealerScore > userScore && dealerScore < 22) {
            gameOver('Dealer wins', 0)
            status.style.color = 'red'
        } else if (dealerScore === userScore) {
            gameOver('Push', wager)
            status.style.color = 'black'
        } else {
            gameOver(`You win ${wager*2}`, wager*2)
            status.style.color = 'black';
        }
    }
    // if(bankroll === 0) {
    //     playAgain();
    // }
}

function standSplit1() {
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    status2.innerHTML = 'Play hand 2'
    status2.style.display = 'flex'
    hitBtn2.style.display = 'flex'
    standBtn2.style.display = 'flex'
}



// CHECK THIS
standBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    if(splitCards.length === 0) {
        stand()
    } else {
        standSplit1()
    }
})


hitBtn2.addEventListener('click', () => {
    hitSplit2();
})


function checkScore(hand, finalState, messageStatus, wagerType) {
    let score = countScore(hand);
    let dealerScore = countScore(dealerCards);
    if(dealerScore > score && dealerScore < 22) {
        finalState('Dealer wins', 0)
        messageStatus.style.color = 'red'
    } else if (dealerScore === score) {
        finalState('Push', wagerType)
        messageStatus.style.color = 'black'
    } else {
        finalState(`You win ${wagerType*2}`, wagerType*2)
        messageStatus.style.color = 'black';
    }
}

doubleBtn.addEventListener('click', () => {
    bankroll -= wager;
    wager *= 2;
    showBet();
    showBankroll();
    doubleBtn.style.display = 'none'
    splitBtn.style.display = 'none';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    pickRandomCards(1, userCards);
    hand1Container.innerHTML = '';
    showCards(userCards, hand1Container);
    let userScore = countScore(userCards)
    userScoreDiv.innerHTML = userScore;
    if(userScore > 21) {
          gameOver('Bust', 0);
          status.style.color = 'red'
  } else {
    let dealerScore = countScore(dealerCards);
    dealerContainer.innerHTML = ''; // Remove dealer's single card from DOM
    showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
    dealerScore = countScore(dealerCards);
    dealerScoreDiv.innerHTML = dealerScore;
    while(dealerScore < 17) {
        pickRandomCards(1, dealerCards);
        dealerContainer.innerHTML = '';
        showCards(dealerCards, dealerContainer);
        dealerScore = countScore(dealerCards);
        dealerScoreDiv.innerHTML = dealerScore;
    }
    checkScore(userCards, gameOver, status, wager)
  }

})


// CHECK THIS
standBtn2.addEventListener('click', () => {
    dealBtn.style.display = 'flex'
    hideSplitBtns()
    let userScore = countScore(userCards);
    let dealerScore = countScore(dealerCards);
    dealerContainer.innerHTML = ''; // Remove dealer's single card from DOM
    showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
    dealerScore = countScore(dealerCards);
    dealerScoreDiv.innerHTML = dealerScore;
    while(dealerScore < 17) {
        pickRandomCards(1, dealerCards);
        dealerContainer.innerHTML = '';
        showCards(dealerCards, dealerContainer);
        dealerScore = countScore(dealerCards);
        dealerScoreDiv.innerHTML = dealerScore;
    }
    if(userScore <= 21) {
        checkScore(splitCards, gameOver2, status2, splitWager)
        checkScore(userCards, gameOver, status, wager)
    } else {
        checkScore(splitCards, gameOver2, status2, splitWager)
        resetGame();
    }
})



bet10Btn.addEventListener('click', () => {
    makeWager(10)
    showBet()
    showBankroll()
})
bet25Btn.addEventListener('click', () => {
    makeWager(25)
    showBet()
    showBankroll()
})
bet50Btn.addEventListener('click', () => {
    makeWager(50)
    showBet()
    showBankroll()
})
bet100Btn.addEventListener('click', () => {
    makeWager(100)
    showBet()
    showBankroll()
})

clearBtn.addEventListener('click', () => {
    bankroll += wager;
    wager = 0;
    showBet();
    showBankroll()
})


// FIGURE OUT WAGERS FOR SPLITS
