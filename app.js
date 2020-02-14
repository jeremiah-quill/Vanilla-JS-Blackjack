const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
const deckCounter = document.querySelector('.deckCounter');
const dealDelay = 500;
const diamond = document.querySelector

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

// Containers
const hand1Container = document.querySelector('.hand1Container');
const hand2Container = document.querySelector('.hand2Container')
const dealerContainer = document.querySelector('.dealerContainer');
const dealerScoreDiv = document.querySelector('.dealerScoreDiv');
const userScoreDiv = document.querySelector('.userScoreDiv')
const userScoreDiv2 = document.querySelector('.userScoreDiv2')
const userScoreContainer2 = document.querySelector('.userScoreContainer2')
const status = document.querySelector('.status')
const status2 = document.querySelector('.status2')
const bankrollDiv = document.querySelector('.bankrollDiv')

let bankroll = 1000;
let wager = 0;
let splitWager = 0;
let deck = [];
let userCards = [];
let dealerCards = [];


const highscoreBtn = document.querySelector('.highscoreBtn')
const lifetimeBtn = document.querySelector('.lifetimeBtn')
const handsBtn = document.querySelector('.handsBtn')
const blackjacksBtn = document.querySelector('.blackjacksBtn')
const highscoreList = document.querySelector('.highscoreList')
const lifetimeList = document.querySelector('.lifetimeList')
const handsList = document.querySelector('.handsList')
const blackjacksList = document.querySelector('.blackjacksList')
const lBoardBtns = document.querySelector('.lBoardBtns')
const lBoardLists = document.querySelectorAll('.lBoardLists > ul')





// highscoreBtn.addEventListener('click', () => {
//     hideAllLists()
//     showLeaderboard(highscoreList)
// })
// lifetimeBtn.addEventListener('click', () => {
//     hideAllLists()
//     showLeaderboard(lifetimeList)
// })
// handsBtn.addEventListener('click', () => {
//     hideAllLists()
//     showLeaderboard(handsList)
// })
// blackjacksBtn.addEventListener('click', () => {
//     hideAllLists()
//     showLeaderboard(blackjacksList)
// })

// function showLeaderboard(category) {
//     category.style.display = 'block'
// }

// function hideAllLists() {
//     lBoardLists.forEach(list => list.style.display = 'none')

// }


// const db = []

// const jq = {
//     name: 'jq',
//     stats: {
//         highscore: 15000,
//         lifetimeScore: 1000000,
//         hands: 2000,
//         blackjacks: 300,
//     } 
// }
// const megmo = {
//     name: 'megmo',
//     stats: {
//         highscore: 12000,
//         lifetimeScore: 800000,
//         hands: 1200,
//         blackjacks: 100,
//     } 
// }
// const ollie = {
//     name: 'ollie',
//     stats: {
//         highscore: 8000,
//         lifetimeScore: 70000,
//         hands: 500,
//         blackjacks: 40,
//     } 
// }
// const lizzy = {
//     name: 'lizzy',
//     stats: {
//         highscore: 11000,
//         lifetimeScore: 600000,
//         hands: 1700,
//         blackjacks: 200,
//     } 
// }

// db.push(jq, megmo, ollie, lizzy);

// let sortedHighscores = db.slice().sort((a, b) => {
//     return b.stats.highscore - a.stats.highscore
// }).slice(0, 3)
// sortedHighscores.forEach(player => {
//     let li = document.createElement('li');
//     li.innerText = `${player.name}: ${player.stats.highscore}`
//     highscoreList.appendChild(li)
// })
// let sortedLifetime = db.slice().sort((a, b) => {
//     return b.stats.lifetimeScore - a.stats.lifetimeScore
// }).slice(0, 3)
// sortedLifetime.forEach(player => {
//     let li = document.createElement('li');
//     li.innerText = `${player.name}: ${player.stats.lifetimeScore}`
//     lifetimeList.appendChild(li)
// })
// let sortedHands = db.slice().sort((a, b) => {
//     return b.stats.hands - a.stats.hands
// }).slice(0, 3)
// sortedHands.forEach(player => {
//     let li = document.createElement('li');
//     li.innerText = `${player.name}: ${player.stats.hands}`
//     handsList.appendChild(li)
// })
// let sortedBlackjacks = db.slice().sort((a, b) => {
//     return b.stats.blackjacks - a.stats.blackjacks
// }).slice(0, 3)
// sortedBlackjacks.forEach(player => {
//     let li = document.createElement('li');
//     li.innerText = `${player.name}: ${player.stats.blackjacks}`
//     blackjacksList.appendChild(li)
// })





// Functions *************************************
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

// Board functions
function hideSplitBtns() {
    splitGameBtns.style.display = 'none';
    hitBtn2.style.display = 'none';
    standBtn2.style.display = 'none';
}
function clearBoard() {
    deckCounter.innerHTML = 52
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
    dealerContainer.innerHTML = '';
    let fakeCard = document.createElement('div')
    fakeCard.className = 'fakeCard';
    let backCard = document.createElement('div')
    backCard.className = 'fakeCard';
    dealerContainer.appendChild(fakeCard);
    dealerContainer.appendChild(backCard)
    hand1Container.innerHTML = '';
    let fakeCard3 = document.createElement('div')
    fakeCard3.className = 'fakeCard';
    let fakeCard4 = document.createElement('div')
    fakeCard4.className = 'fakeCard';
    hand1Container.appendChild(fakeCard3)
    hand1Container.appendChild(fakeCard4)

}
function hideWhileDealing() {
    dealBtn.style.display = 'none'
    betBtns.forEach(btn => {
        btn.style.display = 'none'
    });
}

function inPlayBtns() {
    hitBtn.style.display = 'flex'
    standBtn.style.display = 'flex';
    if(bankroll > wager*2){
        doubleBtn.style.display = 'flex'
    }

}
function resetGame() {
    wagerDiv.innerHTML = 0;
    showBankroll()
    hideSplitBtns()
    dealBtn.style.display = 'flex'
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    betBtns.forEach(btn => btn.style.display = 'block');
}

// Game button functions
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
function startGame() {

        hand1Container.innerHTML = ''
        pickRandomCards(1, userCards);
        showCards(userCards, hand1Container);
        let fakeCard = document.createElement('div')
        fakeCard.className = 'fakeCard'
        hand1Container.appendChild(fakeCard)
        let userScore = countScore(userCards);
        userScoreDiv.innerHTML = userScore;



    setTimeout(function () {
        dealerContainer.innerHTML = ''
        pickRandomCards(1, dealerCards)
        showCards(dealerCards, dealerContainer)
        let fakeCard = document.createElement('div')
        fakeCard.className = 'fakeCard'
        dealerContainer.appendChild(fakeCard)
        let dealerScore = countScore(dealerCards, 'dealer');
        dealerScoreDiv.innerHTML = dealerScore;
    }, dealDelay)    

    setTimeout(function() {
        hand1Container.lastElementChild.remove()
        pickRandomCards(1, userCards);
        showCards(userCards, hand1Container);
        let userScore = countScore(userCards);
        userScoreDiv.innerHTML = userScore;
        if(userScore === 21) {
            gameOver(`BLACKJACK! Win ${wager*2.5}`, (wager*2.5))
            doubleBtn.style.display = 'none';
            status.style.color = 'black';
        }

    }, dealDelay*2)


    setTimeout(function () {
        userScore = countScore(userCards)
        if(userScore !== 21) {
            pickRandomCards(1, dealerCards)
            dealerContainer.lastElementChild.remove()
            let backCard = document.createElement('div')
            backCard.className = 'backCard'
            dealerContainer.appendChild(backCard)
            if(userCards[0].card === userCards[1].card && bankroll > wager*2) {
                splitBtn.style.display = 'flex'
            }
            inPlayBtns()
        }

    }, dealDelay*3)



    
}
function stand() {
    splitBtn.style.display = 'none';
    doubleBtn.style.display = 'none';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none'
    let userScore = countScore(userCards)

        dealerContainer.lastElementChild.remove()
        showCards(dealerCards, dealerContainer)
        // dealerContainer.innerHTML = ''; // Remove dealer's single card from DOM
        // showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
        let dealerScore = countScore(dealerCards);
        dealerScoreDiv.innerHTML = dealerScore;

        if(dealerScore < 17) {
        let theInterval = setInterval(function() {
            pickRandomCards(1, dealerCards);
            // dealerContainer.innerHTML = '';
            showCards(dealerCards, dealerContainer);
            dealerScore = countScore(dealerCards);
            dealerScoreDiv.innerHTML = dealerScore;
            if (dealerScore >= 17) {
                clearInterval(theInterval); // this stops the loop
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
        }, 1000)
        }
         else {
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
    }




function standSplit1() {
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    status2.innerHTML = 'Play hand 2'
    status2.style.display = 'flex'
    hitBtn2.style.display = 'flex'
    standBtn2.style.display = 'flex'
}
function hit() {
    splitBtn.style.display = 'none'
    pickRandomCards(1, userCards);
    // hand1Container.innerHTML = '';

        showCards(userCards, hand1Container);
        let userScore = countScore(userCards)
        userScoreDiv.innerHTML = userScore;
        if(userScore > 21) {
              gameOver('Bust', 0);
              status.style.color = 'red'
      }

}
function hitSplit1() {
    pickRandomCards(1, userCards);
    // hand1Container.innerHTML = '';

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
function hitSplit2() {
    userScore = countScore(userCards)
    pickRandomCards(1, splitCards);
    // hand2Container.innerHTML = '';

        showCards(splitCards, hand2Container);
        let splitScore = countScore(splitCards)
        userScoreDiv2.innerHTML = splitScore;
        if(splitScore > 21) {
              gameOver2('Bust', 0);
              status2.style.color = 'red'
              if(userScore <= 21) {

                    let dealerScore = countScore(dealerCards);
                    dealerContainer.lastElementChild.remove()
                    showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
                    dealerScore = countScore(dealerCards);
                    dealerScoreDiv.innerHTML = dealerScore;
                    if(dealerScore < 17) {
                        let theInterval = setInterval(function() {
                            pickRandomCards(1, dealerCards);
                            // dealerContainer.innerHTML = '';
                            showCards(dealerCards, dealerContainer);
                            dealerScore = countScore(dealerCards);
                            dealerScoreDiv.innerHTML = dealerScore;
                            if (dealerScore >= 17) {
                                clearInterval(theInterval); // this stops the loop
                                checkScore(userCards, gameOver, status, wager)

                              }
                        }, 1000)
                    } else {
                        checkScore(userCards, gameOver, status, wager)

                    }
            } else {
                resetGame()
                wager = 0;
            }
      }



}

// Game Over Functions
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

function gameOver2(statement, settleWager) {
    status2.innerHTML = statement;
    bankroll += settleWager;
}
function checkScore(hand, finalState, messageStatus, wagerType) {
    let score = countScore(hand);
    let dealerScore = countScore(dealerCards);
    if(dealerScore > score && dealerScore < 22) {
        finalState('Dealer wins', 0)
        messageStatus.style.color = 'red'
    } else if (dealerScore === score) {
        finalState('Push', wagerType)
        messageStatus.style.color = 'black'
    } else if (dealerScore > score && dealerScore > 21) {
        finalState(`You win ${wagerType*2}`, wagerType*2)
    } else {
        finalState(`You win ${wagerType*2}`, wagerType*2)
        messageStatus.style.color = 'black';
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
        if(score > 21 && cardValues.indexOf(11) !== -1) {
            cardValues[cardValues.indexOf(11)] = 1
            score = 0;
            cardValues.forEach(value => {
                score += value
            })
        }
        if(score > 21 && cardValues.indexOf(11) !== -1) {
            cardValues[cardValues.indexOf(11)] = 1
            score = 0;
            cardValues.forEach(value => {
                score += value
            })
        }
        
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
function showCards(player, container, id) {
	if(id === 'dealer') {
        let pickedCard = document.createElement('div')
        pickedCard.className = 'card';
        let textNode = document.createTextNode(`${player[0].card}`)
        pickedCard.appendChild(textNode)
        if(player[player.length - 1].suit === 'Clubs') {
            // pickedCard.appendChild(SVG)
           console.log( 'Im a club')
           let img = document.createElement('img')
           img.src = 'club.png'
           pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Spades') {
            console.log( 'Im a spade')
            let img = document.createElement('img')
            img.src = 'spade.png'
            pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Hearts') {
            console.log( 'Im a heart')
            let img = document.createElement('img')
            img.src = 'heart.png'
            pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Diamonds') {
            console.log( 'Im a diamond')
            let img = document.createElement('img')
            img.src = 'diamond.png'
            pickedCard.appendChild(img)
        }

        // let fakeText = document.createTextNode('hi')
        // let fakeCard = document.createElement('div')
        // fakeCard.className = 'fakeCard';
        // fakeCard.appendChild(fakeText)
        container.prepend(pickedCard);
        // container.appendChild(fakeCard)
    } else {

        // container.innerHTML = ''

        let cardName = player[player.length-1].card
        // let cardSuit = player[player.length-1].suit


   
        let pickedCard = document.createElement('div')
        pickedCard.className = 'card';
        let textNode = document.createTextNode(`${cardName}`)
        pickedCard.appendChild(textNode)
        if(player[player.length - 1].suit === 'Clubs') {
            // pickedCard.appendChild(SVG)
           console.log( 'Im a club')
           let img = document.createElement('img')
           img.src = 'club.png'
           pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Spades') {
            console.log( 'Im a spade')
            let img = document.createElement('img')
            img.src = 'spade.png'
            pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Hearts') {
            console.log( 'Im a heart')
            let img = document.createElement('img')
            img.src = 'heart.png'
            pickedCard.appendChild(img)
        } else if (player[player.length - 1].suit === 'Diamonds') {
            console.log( 'Im a diamond')
            let img = document.createElement('img')
            img.src = 'diamond.png'
            pickedCard.appendChild(img)
        }

        container.appendChild(pickedCard);

}
}

// Event Listeners **********************************************
window.addEventListener('onload', showBet(), showBankroll())

// Wagers
bet10Btn.addEventListener('click', () => {
if(bankroll - 10 >= 0){
    makeWager(10)
    showBet()
    showBankroll()
}
})
bet25Btn.addEventListener('click', () => {
    if(bankroll - 25 >= 0) {
        makeWager(25)
        showBet()
        showBankroll()
    }
})
bet50Btn.addEventListener('click', () => {
    if(bankroll - 50 >= 0) {
        makeWager(50)
        showBet()
        showBankroll()
    }
})
bet100Btn.addEventListener('click', () => {
    if(bankroll - 100 >= 0) {
        makeWager(100)
        showBet()
        showBankroll()
    }
})
clearBtn.addEventListener('click', () => {
    bankroll += wager;
    wager = 0;
    showBet();
    showBankroll()
})

// Game Listeners
dealBtn.addEventListener('click', () => {
    clearBoard();
    createDeck();
    startGame();
    hideWhileDealing();
})
hitBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    if(splitCards.length === 0) {
        hit();
    } else {
        hitSplit1()
    }
})
standBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    if(splitCards.length === 0) {
        stand()
    } else {
        standSplit1()
    }
})
splitBtn.addEventListener('click', () => {
    doubleBtn.style.display = 'none'
    splitWager = wager;
    bankroll -= splitWager;
    showBankroll()
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
standBtn2.addEventListener('click', () => {
    dealBtn.style.display = 'flex'
    hideSplitBtns()
    let userScore = countScore(userCards);
    let dealerScore = countScore(dealerCards);


        
    
        setTimeout(function () {
            dealerContainer.lastElementChild.remove();
            showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
            dealerScore = countScore(dealerCards);
            dealerScoreDiv.innerHTML = dealerScore;
        }, dealDelay)
        
        if(dealerScore < 17) {
            let theInterval = setInterval(function() {
                pickRandomCards(1, dealerCards);
                // dealerContainer.innerHTML = '';
                showCards(dealerCards, dealerContainer);
                dealerScore = countScore(dealerCards);
                dealerScoreDiv.innerHTML = dealerScore;
                if (dealerScore >= 17) {
                    clearInterval(theInterval); // this stops the loop
                    if(userScore <= 21) {
                        checkScore(splitCards, gameOver2, status2, splitWager)
                        checkScore(userCards, gameOver, status, wager)
                    } else {
                        checkScore(splitCards, gameOver2, status2, splitWager)
                        resetGame();
                    }
                  }
            }, 1000)
        } else {
            setTimeout(function () {
                if(userScore <= 21) {
                    checkScore(splitCards, gameOver2, status2, splitWager)
                    checkScore(userCards, gameOver, status, wager)
                } else {
                    checkScore(splitCards, gameOver2, status2, splitWager)
                    resetGame();
                }
            }, dealDelay)

        }



})
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
        // hand1Container.innerHTML = '';
        showCards(userCards, hand1Container);
        let userScore = countScore(userCards)
        userScoreDiv.innerHTML = userScore;
        if(userScore > 21) {
              gameOver('Bust', 0);
              status.style.color = 'red'
      } else {
        setTimeout(function() {
            dealerContainer.lastElementChild.remove()
            showCards(dealerCards, dealerContainer); // Reveal both dealer's cards
            dealerScore = countScore(dealerCards);
            dealerScoreDiv.innerHTML = dealerScore;
            if(dealerScore < 17) {
                let theInterval = setInterval(function() {
                    pickRandomCards(1, dealerCards);
                    // dealerContainer.innerHTML = '';
                    showCards(dealerCards, dealerContainer);
                    dealerScore = countScore(dealerCards);
                    dealerScoreDiv.innerHTML = dealerScore;
                    if (dealerScore >= 17) {
                        clearInterval(theInterval); // this stops the loop
                        checkScore(userCards, gameOver, status, wager)
                      }
                }, 1000)
            } else {
                checkScore(userCards, gameOver, status, wager)
            }

        }, dealDelay)

      }

   
})
hitBtn2.addEventListener('click', () => {
    hitSplit2();
})
