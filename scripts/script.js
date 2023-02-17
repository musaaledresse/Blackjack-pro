// state varaiables
let gameStart ;
let gameOver ;
let playerWin ;
let playerHand ;
let dealerHand ; 
let playerScore ;
let dealerScore ;

//state constants
const MAX_Score = 21
const numericVal = {
    'A': 1,
    '02': 2,
    '03': 3,
    '04': 4,
    '05': 5,
    '06': 6,
    '07': 7,
    '08': 8,
    '09': 9,
    '10': 10,
    'J': 10,
    'Q':10,
    'K': 10,
}
 

//DOM Elements
let player = document.getElementById('player-cards')
let dealer = document.getElementById('dealer-cards')
let textPlace = document.getElementById('text-place')
let handBtn = document.getElementById("Hand-btn");
let standButton = document.getElementById("stand-btn");
let startBtn = document.getElementById("start-btn");
let pScoreCount = document.getElementById('player-score')
let game = document.querySelector('#game')
let startGameButton = document.querySelector('#startbtn')
let hitButton = document.getElementById('hit-btn')
let dScoreCount = document.getElementById('dealer-score')


//Event Listener
startGameButton.addEventListener('click', () =>{
    startGameButton.style.display = 'none'
    hitButton.style.display = 'block';
    standButton.style.display = 'block';
    handBtn.style.display = 'block';
    pScoreCount.style.display = 'block'
    dScoreCount.style.display = 'block'
})
hitButton.addEventListener('click', pHitOneCard)
standButton.addEventListener('click', standPlayer)
handBtn.addEventListener('click', newHand)





class Card{
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }
    toString(){
        return `${this.value} of ${this.suit}`
    }
}

class Deck{
    static suits = ['clubs', 'hearts', 'diamonds', 'spades']
    static values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q','K']
    constructor(){
        this.deck = []
        
        for(let suit of Deck.suits){
            for(let value of Deck.values){
                let card = new Card(suit, value)
                this.deck.push(card)
            }
        }
        this.shuffle()

    }
    shuffle(){
          for( let i = 0; i < this.deck.length;i++){
            let randomIdx = Math.floor(Math.random() * 52)
            let tempCard = this.deck[i];
            this.deck[i] = this.deck[randomIdx];
            this.deck[randomIdx] = tempCard;
        }
    }

    deal(number){
        let drawnHand = [];
        for(let i = 0; i < number; i ++){
            drawnHand.push(this.deck.shift())
        }
        return drawnHand
    }
}


function init(){
    const deck = new Deck();
    playerHand = deck.deal(2)
    dealerHand = deck.deal(2)
    gameStart = false
    gameOver = false
    playerWin = false
    playerScore = 0
    dealerScore = 0
    winningText = ''
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
}


function dealTwoCardsDealer(){
    dealerHand.forEach(function(card){
        let cardClass = 'card large'
        if(['A', 'K', 'Q', 'J'].includes(card.value)){
            cardClass += ` ${card.suit} ${card.value}`
        }
        else{
            cardClass += ` ${card.suit} r${card.value}`
        }
 
        const divEl = document.createElement('div')
        divEl.className = cardClass
        dealer.appendChild(divEl)
        
 
    })

}

function dealerAppend(appendingArr){
    let cardClass = 'card large'
        if(['A', 'K', 'Q', 'J'].includes(dealerHand[dealerHand.length - 1]. value)){
            cardClass += ` ${dealerHand[dealerHand.length - 1].suit} ${dealerHand[dealerHand.length - 1].value}`
        }
        else{
            cardClass += ` ${dealerHand[dealerHand.length - 1].suit} r${dealerHand[dealerHand.length - 1].value}`
        }
 
        const divEl = document.createElement('div')
        divEl.className = cardClass
        dealer.appendChild(divEl)
        
 
    

}


function dealTwoCardsPlayer(){
    playerHand.forEach(function(card){
        let cardClass = 'card large'
        if(['A', 'K', 'Q', 'J'].includes(card.value)){
            cardClass += ` ${card.suit} ${card.value}`
        }
        else{
            cardClass += ` ${card.suit} r${card.value}`
        }
 
        const divEl = document.createElement('div')
        divEl.className = cardClass
        player.appendChild(divEl)
        
 
    })

}

function playerAppend(appendingArr){
    let cardClass = 'card large'
        if(['A', 'K', 'Q', 'J'].includes(playerHand[playerHand.length - 1]. value)){
            cardClass += ` ${playerHand[playerHand.length - 1].suit} ${playerHand[playerHand.length - 1].value}`
        }
        else{
            cardClass += ` ${playerHand[playerHand.length - 1].suit} r${playerHand[playerHand.length - 1].value}`
        }
 
        const divEl = document.createElement('div')
        divEl.className = cardClass
 
        player.appendChild(divEl)
        
 
    

}


function pHitOneCard(){
    const deck = new Deck();
   const hand = deck.deal(1)
   playerHand.push(hand[0])
   checkEndOfGame()
   playerAppend(playerHand)
   pScoreCount.innerText = playerScore
}

function dHitOneCard(){
    const deck = new Deck();
   const hand = deck.deal(1)
   dealerHand.push(hand[0])
   checkEndOfGame()
   dealerAppend(dealerHand)
   dScoreCount.innerText = dealerScore
}

function standPlayer(){
    dHitOneCard()
    checkEndOfGame()
}


function getScore(arr) {
    let score = 0;
    arr.forEach(card =>{
        score += numericVal[card.value]   
    })
    return score
    
}

function checkEndOfGame(){
    dealerScore = getScore(dealerHand)
    playerScore = getScore(playerHand)


    if((playerScore === MAX_Score && dealerScore === MAX_Score) || (playerScore === dealerScore && playerScore < MAX_Score)){
        gameOver = true
        winningText = 'No Winners'
        hitButton.style.display = 'none'
        standButton.style.display = 'none'
    }else if(playerScore > MAX_Score || dealerScore === MAX_Score){
        playerWin = false
        gameOver = true
        winningText = 'Dealer Won / Player Lost !!'
        hitButton.style.display = 'none'
        standButton.style.display = 'none'

    }else if( dealerScore > MAX_Score || playerScore === MAX_Score){
        playerWin = true
        gameOver = true
        winningText = 'Player Won / Dealer Lost !!'
        hitButton.style.display = 'none'
        standButton.style.display = 'none'
    }
    textPlace.innerText = winningText
}

function remove(){
    while(dealer.firstChild){
        dealer.removeChild(dealer.firstChild)
    }
    while(player.firstChild){
        player.removeChild(player.firstChild)
    }
}

function newHand(){
    remove()
    const deck = new Deck;
    dealerHand = [];
    playerHand = [];
    playerHand.push(...deck.deal(2));
    dealerHand.push(...deck.deal(2));
    gameStart = false;
    gameOver = false;
    playerWin = false;
    playerScore = 0;
    dealerScore = 0;
    hitButton.style.display = 'block';
    standButton.style.display = 'block';
    render()
}



function render(){
    dealTwoCardsPlayer()
    dealTwoCardsDealer()
    checkEndOfGame()
    pScoreCount.innerText = playerScore
    dScoreCount.innerText = dealerScore
}

init()
render()
