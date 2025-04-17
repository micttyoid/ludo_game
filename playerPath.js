/**
 * game_loop
 * read_input
 * update_game
 * render_game
 */

const path = [
    'S',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    'S',
    9,
    10,
    11,
    12,
    'S',
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    'S',
    22,
    23,
    24,
    25,
    'S',
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    'S',
    35,
    36,
    37,
    38,
    'S',
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    'S',
    48,
    49,
    50,
    51,
]

const homePath = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']

function addHomePathToPlayers(homePath, playerPath) {
    for (let i = 0; i < homePath.length; i++) {
        playerPath.push(homePath[i])
    }
}

function generateRedRelativePath(generalPath, homePath) {
    const result = []

    for (let i = 0; i < generalPath.length - 1; i++) {
        result.push(generalPath[i])
    }

    addHomePathToPlayers(homePath, result)

    return result
}

function generateGreenRelativePath(generalPath, homePath) {
    const result = []

    for (let i = 13; i < generalPath.length; i++) {
        result.push(generalPath[i])

        if (i === generalPath.length - 1) {
            for (let i = 0; i < 12; i++) {
                result.push(generalPath[i])
            }
        }
    }

    addHomePathToPlayers(homePath, result)

    return result
}

function generateYellowRelativePath(generalPath, homePath) {
    const result = []

    for (let i = 26; i < generalPath.length; i++) {
        result.push(generalPath[i])

        if (i === generalPath.length - 1) {
            for (let i = 0; i < 25; i++) {
                result.push(generalPath[i])
            }
        }
    }

    addHomePathToPlayers(homePath, result)

    return result
}

function generateBlueRelativePath(generalPath, homePath) {
    const result = []

    for (let i = 39; i < generalPath.length; i++) {
        result.push(generalPath[i])

        if (i === generalPath.length - 1) {
            for (let i = 0; i < 38; i++) {
                result.push(generalPath[i])
            }
        }
    }

    addHomePathToPlayers(homePath, result)

    return result
}

export const playersPath = {
    red: generateRedRelativePath(path, homePath),
    green: generateGreenRelativePath(path, homePath),
    yellow: generateYellowRelativePath(path, homePath),
    blue: generateBlueRelativePath(path, homePath),
}
