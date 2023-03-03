let cellElements = document.querySelectorAll("[data-cell]")
let board = document.querySelector("[data-board]")
let winningMessageText = document.querySelector("[data-winning-message-text]")
let winningMessage = document.querySelector("[data-winning-message]")
let restartButton = document.querySelector("[data-restart-button]")

let isCircleTurn;

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let startGame = () => {
    isCircleTurn = false

    for (let cell of cellElements) {
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click',handleClick, {once: true})
    }
    

    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message")
}

let endGame = (isDraw) => {
    if(isDraw) {
        winningMessageText.innerText = "Empate!"
    }else {
        winningMessageText.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!"
    }

    winningMessage.classList.add("show-winning-message")
}


let checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

let checkForDraw = () => {
    return [ ...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

let placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

let setBoardHoverClass = () => {
    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle")
    }else {
        board.classList.add("x")
    }
}

let swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
}

let handleClick = (e) => {
     //Colocar a marca X ou Círculo
    let cell = e.target
    let classToAdd = isCircleTurn ? 'circle' : 'x'
    placeMark(cell, classToAdd)
   
    
    //Checar por vitória
    let isWin = checkForWin(classToAdd)

    //Verificar por empate
    let isDraw = checkForDraw()
    if(isWin) {
        endGame(false)
    }else if (isDraw) {
        endGame(true)
    }else {
        //Mudar símbolo
        swapTurns()
    }

}

startGame()

restartButton.addEventListener("click", startGame)


