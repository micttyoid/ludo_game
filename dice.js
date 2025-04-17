let diceScore = 3
let carryForwardScoreCount = 0
let diceScoreArr = [3]
let diceScoreCount = 1

export function throwDice() {
    const resetScore = isDiceScoreComplete()

    if (resetScore) {
        diceScore = 0
        diceScoreCount = 0
        diceScoreArr = []
    }

    const score = Math.floor(Math.random() * 6) + 1

    if (carryForwardScoreCount === 3) {
        diceScore = 0
        diceScoreCount = 0
        diceScoreArr = []
        carryForwardScoreCount = 0
        return
    }

    if (score === 6) {
        carryForwardScoreCount++
        diceScore += score
        diceScoreArr.push(score)
        diceScoreCount += 1
        return
    }

    diceScore += score
    diceScoreArr.push(score)
    diceScoreCount += 1
}

export function isDiceScoreComplete() {
    const lastScore = diceScoreArr[diceScoreArr.length - 1]

    if (lastScore !== 6) {
        return true
    }

    return false
}

export function getDiceScore() {
    return diceScore
}

export function getDiceScoreArr() {
    return diceScoreArr
}

export function reassignDiceScore(score) {
    diceScore -= score
    const newdiceArr = diceScoreArr.filter((element) => element !== score)

    diceScoreArr = newdiceArr
    diceScoreCount -= 1
}

export function isPlayerMoveComplete() {
    if (diceScoreCount) {
        return false
    }

    return true
}

export function resetDiceScore() {
    diceScore = 0
    diceScoreCount = 0
    diceScoreArr = []
}
