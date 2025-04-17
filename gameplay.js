import { askQuestion } from './gameplayUtils.js'
import { getPlayers } from './player.js'
import {
    throwDice,
    getDiceScore,
    getDiceScoreArr,
    isDiceScoreComplete,
    resetDiceScore,
    isPlayerMoveComplete,
    reassignDiceScore,
} from './dice.js'
import {
    changeCurrentPlayer,
    current_player,
    validatePlayerMove,
    checkPlayerWin,
    checkOpponentsElimination,
    resetPlayer,
    movePlayerPawn,
    removePlayerFromPlayers,
    getPlayersValue,
} from './player.js'

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

    let isPlayerMoveValid = validatePlayerMove(current_player(), getDiceScore())

    if (!isPlayerMoveValid) {
        changeCurrentPlayer()
        await render_game('invalid_move')
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
                            current_player(),
                            answer
                        )
                        if (isPlayerMoveValid) {
                            const playerElimination = checkOpponentsElimination(
                                current_player(),
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
                                const updateMove = update_game(answer)

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

export const update_game = (data) => {
    const isValidMove = validatePlayerMove(current_player(), data)

    if (!isValidMove) {
        render_game('invalid_move')
        resetDiceScore()
        changeCurrentPlayer()
        return
    }

    movePlayerPawn(current_player(), data)

    const playerWin = checkPlayerWin(current_player())

    if (playerWin) {
        render_game(current_player())
        removePlayerFromPlayers(current_player())
    }

    reassignDiceScore(data)

    if (!getDiceScoreArr().length) {
        resetDiceScore()
        changeCurrentPlayer()
    }
}

export const render_game = (data) => {
    const playersPosition = getPlayers()
    const playersValue = getPlayersValue()
    if (data === 'display_score') {
        console.log(`'${current_player()}' score - '${getDiceScoreArr()}'`)
        return
    }

    if (data === 'invalid_move') {
        console.log(`'${getDiceScore()}' score is invalid at the current time'`)
        console.log('players position -', playersPosition, playersValue)
        console.log('current player -', current_player())
        return
    }

    if (typeof data === 'number') {
        console.log('players position -', playersPosition, playersValue)
        console.log('current player -', current_player())
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
    console.log('current player -', current_player())
    console.log('players position -', playersPosition)
    let i = 0
    while (i < 100) {
        const data = await readInput()

        if (typeof data === 'number') {
            update_game(data)
            await render_game(data)
        }

        if (data === 'display_score') {
            await render_game(data)
        }

        if (data === 'invalid_move') {
            await render_game(data)
        }
        i++
    }
}

;(async function main() {
    await gameloop()
})()
