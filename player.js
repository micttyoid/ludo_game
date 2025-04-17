import { playersPath } from './playerPath.js'

let players = {
    red: 13,
    green: 3,
    yellow: 42,
    blue: 1,
}

let currentPlayerIndex = 0

export function changeCurrentPlayer() {
    if (currentPlayerIndex === Object.keys(players).length - 1) {
        currentPlayerIndex = 0
    } else {
        currentPlayerIndex += 1
    }
}

export const current_player = () => {
    return Object.keys(players)[currentPlayerIndex]
}

export function validatePlayerMove(player, diceScore) {
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

export function checkPlayerWin(player) {
    if (players[player] === 57) {
        return true
    }

    return false
}

export function removePlayerFromPlayers(player) {
    let playersList = Object.keys(players)

    let newPlayers = {}

    playersList.forEach((pl) => {
        if (pl !== player) {
            Reflect.set(newPlayers, pl, players[pl])
        }
    })

    players = newPlayers
}

export function checkOpponentsElimination(player, diceScore) {
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

export function resetPlayer(player) {
    players[player] = 0
}

export function movePlayerPawn(player, diceScore) {
    const playerMoveValidated = validatePlayerMove(player, diceScore)

    if (playerMoveValidated) {
        players[player] += diceScore
        return true
    }

    return false
}

export const get_players = () => {
    return players
}
export function getPlayers() {
    return players
}

export function getPlayersValue() {
    const result = {}
    const playerList = Object.keys(players)

    playerList.forEach((player) =>
        Reflect.set(result, player, playersPath[player][players[player]])
    )

    return result
}
