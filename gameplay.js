const { askQuestion } = require('./gameplayUtils')
const { getPlayers } = require('./player')
const {
    throwDice,
    getDiceScore,
    getDiceScoreArr,
    isDiceScoreComplete,
    resetDiceScore,
    isPlayerMoveComplete,
    reassignDiceScore,
} = require('./dice')
const {
    changeCurrentPlayer,
    currentPlayer,
    validatePlayerMove,
    checkPlayerWin,
    checkOpponentsElimination,
    resetPlayer,
    movePlayerPawn,
    removePlayerFromPlayers,
    getPlayersValue,
} = require('./player')

async function readInput() {
    const diceScore = getDiceScore()
    const isplayerTurnComplete = isDiceScoreComplete()

    if (!diceScore) {
        await askQuestion(`press enter to throw the dice\n`)

        throwDice()
        return 'display_score'
    }

    if (!isplayerTurnComplete) {
        await askQuestion(`press enter to throw the dice\n`)

        throwDice()
        return 'display_score'
    }

    let isPlayerMoveValid = validatePlayerMove(currentPlayer(), getDiceScore())

    if (!isPlayerMoveValid) {
        changeCurrentPlayer()
        await renderGame('invalid_move')
        resetDiceScore()
        return
    } else {
        while (true) {
            let question = await askQuestion(
                'type the pawn you want to move from [1-4]\n'
            )

            if (
                !Number.isNaN(Number(question.toString())) &&
                Number(question.toString()) >= 1 &&
                Number(question.toString()) <= 4
            ) {
                const playerMoveIncomplete = isPlayerMoveComplete()

                while (!playerMoveIncomplete) {
                    question = await askQuestion(
                        `Out of '${getDiceScoreArr()}' - type the score for the pawn to move.\n`
                    )

                    let answer = Number(question.toString())
                    let diceArr = getDiceScoreArr()

                    let scoreFound = diceArr.find(
                        (element) => element === answer
                    )

                    if (scoreFound) {
                        isPlayerMoveValid = validatePlayerMove(
                            currentPlayer(),
                            answer
                        )
                        if (isPlayerMoveValid) {
                            const playerElimination = checkOpponentsElimination(
                                currentPlayer(),
                                diceScore
                            )

                            if (playerElimination) {
                                if (playerElimination.length > 1) {
                                    while (true) {
                                        const question = await askQuestion(
                                            `out of the '${playerElimination}', type the player to eliminate\n`
                                        )

                                        const eliminationAnswer =
                                            question.toString()
                                        const validateAnswer =
                                            playerElimination.find(
                                                (playerName) =>
                                                    playerName ===
                                                    eliminationAnswer
                                            )

                                        if (validateAnswer) {
                                            resetPlayer(eliminationAnswer)
                                            break
                                        }
                                    }
                                } else {
                                    resetPlayer(playerElimination)
                                }
                            }

                            if (diceArr.length <= 1) {
                                return answer
                            } else {
                                const updateMove = updateGame(answer)

                                if (!updateMove) {
                                    return
                                }
                            }
                        } else {
                            return 'invalid move'
                        }
                    }
                }
            }
        }
    }
}

async function updateGame(data) {
    const isValidMove = validatePlayerMove(currentPlayer(), data)

    if (!isValidMove) {
        await renderGame('invalid_move')
        resetDiceScore()
        changeCurrentPlayer()
        return
    }

    movePlayerPawn(currentPlayer(), data)

    const playerWin = checkPlayerWin(currentPlayer())

    if (playerWin) {
        await renderGame(currentPlayer())
        removePlayerFromPlayers(currentPlayer())
    }

    reassignDiceScore(data)

    if (!getDiceScoreArr().length) {
        resetDiceScore()
        changeCurrentPlayer()
    }
}

async function renderGame(data) {
    const playersPosition = getPlayers()
    const playersValue = getPlayersValue()
    if (data === 'display_score') {
        console.log(`'${currentPlayer()}' score - '${getDiceScoreArr()}'`)
        return
    }

    if (data === 'invalid_move') {
        console.log(`'${getDiceScore()}' score is invalid at the current time'`)
        console.log('players position -', playersPosition, playersValue)
        console.log('current player -', currentPlayer())
        return
    }

    if (typeof data === 'number') {
        console.log('players position -', playersPosition, playersValue)
        console.log('current player -', currentPlayer())
        return
    }

    if (data === 'player_move_complete') {
        console.log('players position -', playersPosition), playersValue
        return
    }

    if (typeof data === 'string') {
        console.log(`'${data}' won the game.`)
        return
    }
}

async function gameloop() {
    const playersPosition = getPlayers()
    console.log('current player -', currentPlayer())
    console.log('players position -', playersPosition)
    let i = 0
    while (i < 100) {
        const data = await readInput()

        if (typeof data === 'number') {
            updateGame(data)
            await renderGame(data)
        }

        if (data === 'display_score') {
            await renderGame(data)
        }

        if (data === 'invalid_move') {
            await renderGame(data)
        }
        i++
    }
}

;(async function main() {
    await gameloop()
})()
