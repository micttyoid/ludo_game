const { playersPath } = require('./playerPath')

let players = {
    red: 13,
    green: 3,
    yellow: 42,
    blue: 1,
}

let currentPlayerIndex = 0

function changeCurrentPlayer() {
    if (currentPlayerIndex === Object.keys(players).length - 1) {
        currentPlayerIndex = 0
    } else {
        currentPlayerIndex += 1
    }
}

function currentPlayer() {
    return Object.keys(players)[currentPlayerIndex]
}

function validatePlayerMove(player, diceScore) {
    const playerCurrentPosition = players[player]

    if (playerCurrentPosition === 0) {
        if (diceScore < 6) {
            return false
        }
    }

    const playerPosition = playerCurrentPosition + diceScore
    const result = playersPath[player].length >= playerPosition

    if (result) {
        return true
    } else {
        return false
    }
}

function checkPlayerWin(player) {
    if (players[player] === 57) {
        return true
    }

    return false
}

function removePlayerFromPlayers(player) {
    let playersList = Object.keys(players)

    let newPlayers = {}

    playersList.forEach((pl) => {
        if (pl !== player) {
            Reflect.set(newPlayers, pl, players[pl])
        }
    })

    players = newPlayers
}

function checkOpponentsElimination(player, diceScore) {
    const playerPosition = players[player] + diceScore
    const playerValue = playersPath[player][playerPosition]

    const result = []

    const playersList = Object.keys(players)

    for (let i = 0; i < playersList.length; i++) {
        if (playersList[i] !== player) {
            const oppPlayerPosition = playersList[i]

            const oppPlayerValue =
                playersPath[playersList[i]][players[oppPlayerPosition]]

            if (playerValue === oppPlayerValue) {
                result.push(playersList[i])
            }
        }
    }

    if (!result.length) {
        return false
    }

    if (result.length === 1) {
        return result[0]
    }

    return result
}

function resetPlayer(player) {
    players[player] = 0
}

function movePlayerPawn(player, diceScore) {
    const playerMoveValidated = validatePlayerMove(player, diceScore)

    if (playerMoveValidated) {
        players[player] += diceScore
        return true
    }

    return false
}

function getPlayers() {
    return players
}

function getPlayersValue() {
    const result = {}
    const playerList = Object.keys(players)

    playerList.forEach((player) =>
        Reflect.set(result, player, playersPath[player][players[player]])
    )

    return result
}

module.exports = {
    changeCurrentPlayer,
    currentPlayer,
    validatePlayerMove,
    checkPlayerWin,
    checkOpponentsElimination,
    resetPlayer,
    movePlayerPawn,
    getPlayers,
    removePlayerFromPlayers,
    getPlayersValue,
}
