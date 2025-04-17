let diceScore = 3
let carryForwardScoreCount = 0
let diceScoreArr = [3]
let diceScoreCount = 1

function generateRandomNumber() {
    let number = Math.round(Math.random() * 6)

    while (!number) {
        number = Math.floor(Math.random() * 6)
    }
    return number
}

function throwDice() {
    const resetScore = isDiceScoreComplete()

    if (resetScore) {
        diceScore = 0
        diceScoreCount = 0
        diceScoreArr = []
    }

    const score = generateRandomNumber()

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

function getDiceScore() {
    return diceScore
}

function getDiceScoreArr() {
    return diceScoreArr
}

function reassignDiceScore(score) {
    diceScore -= score
    const newdiceArr = diceScoreArr.filter((element) => element !== score)

    diceScoreArr = newdiceArr
    diceScoreCount -= 1
}

function isPlayerMoveComplete() {
    if (diceScoreCount) {
        return false
    }

    return true
}

function isDiceScoreComplete() {
    const lastScore = diceScoreArr[diceScoreArr.length - 1]

    if (lastScore !== 6) {
        return true
    }

    return false
}

function resetDiceScore() {
    diceScore = 0
    diceScoreCount = 0
    diceScoreArr = []
}

module.exports = {
    getDiceScore,
    throwDice,
    getDiceScoreArr,
    isDiceScoreComplete,
    resetDiceScore,
    isPlayerMoveComplete,
    reassignDiceScore,
}
