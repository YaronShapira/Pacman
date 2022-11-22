'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍔'
const CHERRY = '🍒'

const CHERRY_SPAWN_RATE = 15000

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

const elGameContainer = document.querySelector('.game-container')
const elEndingContainer = document.querySelector('.ending-container')

function onInit() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    gGhosts = []
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    renderGhosts()
    gGame.isOn = true
    createCherries()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }


        }
    }
    // Super Foods
    board[1][1] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][8] = SUPERFOOD

    return board
}

function createCherries() {
    setInterval(createCherry, CHERRY_SPAWN_RATE)
}

function createCherry() {
    const emptyCells = findEmptyCells()
    if (emptyCells.length === 0) return
    const randomIndex = getRandomIntInclusive(0, emptyCells.length - 1)
    const cherryI = emptyCells[randomIndex].i
    const cherryJ = emptyCells[randomIndex].j
    gBoard[cherryI][cherryJ] = CHERRY
    console.log(gBoard)
    renderCell(emptyCells[randomIndex], CHERRY)
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function isNoMoreFood() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell === FOOD) {
                return false
            }
        }
    }
    return true
}

function restart() {
    onInit()
    showElement(elGameContainer)
    hideElement(elEndingContainer)
}
// 1 is WIN. 0 is Lose
function gameOver(condition = 0) {
    const elGameOverText = document.querySelector('.ending-container h1')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    if (condition === 0) { // LOSE
        renderCell(gPacman.location, '💀')
        elGameOverText.innerText = 'Defeat'
    } else { // WIN
        renderCell(gPacman.location, '🏆')
        elGameOverText.innerText = 'Victory'
    }

    document.querySelector('h3 span').innerText = gGame.score
    setTimeout(() => {
        hideElement(elGameContainer)
        showElement(elEndingContainer)
    }, 1000)
}