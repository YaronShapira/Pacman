'use strict'

const GHOST = 'ᗣ'
var gGhosts = []
const TOTAL_GHOSTS_AMOUNT = 3

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < TOTAL_GHOSTS_AMOUNT; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot moves
    if (nextCell === WALL) return
    if (nextCell === GHOST) return


    if (nextCell === PACMAN) {

        if (gPacman.isSuper) { // KILLS THE GHOSTS
            console.log('ghost to pacman')
            return
        } else { // Defeat
            gameOver()
            return
        }

    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const ghostColor = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="color: ${ghostColor}">${GHOST}</span>`
}

function getGhostByIndex(idxI, idxJ) {
    for (let i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        if (currGhost.location.i === idxI && currGhost.location.j === idxJ) return currGhost
    }
    return null
}