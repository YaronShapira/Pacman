'use strict'

let PACMAN = '<img src="img/pacman.png" alt="" class="pacman">'
var gPacman

var superfoodTimeoutId
var gDeadGhosts = []

console.log(elPacmanImage)

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    var isAteFood = false
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return


    if (nextCell == CHERRY) updateScore(10)
    // DONE: hitting a ghost? call gameOver


    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return // Do not eat if is in super
        // Not super
        gPacman.isSuper = true
        renderGhosts()
        superfoodTimeoutId = setTimeout(() => {
            gPacman.isSuper = false
            gGhosts = [...gGhosts, ...gDeadGhosts]
            gDeadGhosts = []
            renderGhosts()
        }, 5000)
    }

    if (nextCell === GHOST) {

        if (gPacman.isSuper) { // KILLS THE GHOSTS
            // MODEL
            console.log('Ate a ghost')
            const ghost = getGhostByIndex(nextLocation.i, nextLocation.j)
            gGhosts.splice(gGhosts.indexOf(ghost), 1)
            gDeadGhosts.push(ghost)


            // DOM
        } else { // Defeat
            gameOver()
            return
        }

    }
    // console.log(gGhosts)

    if (nextCell === FOOD) {
        updateScore(1)
        isAteFood = true
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

    // Check if win.
    if (isAteFood && isNoMoreFood()) {
        gameOver(1) // 1 is win
    }

    // console.log(gBoard)




}

function getNextLocation(eventKeyboard) {
    const elPacmanImage = document.querySelector('.pacman')
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            PACMAN = '<img src="img/pacman.png" alt="" class="pacman" style="transform: rotate(-90deg)">'
            nextLocation.i--
            break;
        case 'ArrowRight':
            PACMAN = '<img src="img/pacman.png" alt="" class="pacman" style="transform: rotate(0deg)">'
            nextLocation.j++
            break;
        case 'ArrowDown':
            PACMAN = '<img src="img/pacman.png" alt="" class="pacman" style="transform: rotate(90deg)">'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            PACMAN = '<img src="img/pacman.png" alt="" class="pacman" style="transform: scaleX(-1);">'
            nextLocation.j--
            break;
    }
    return nextLocation
}