const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function askQuestion(input) {
    return new Promise((resolve) => {
        rl.question(input, (answer) => resolve(answer))
    })
}

module.exports = { askQuestion }
