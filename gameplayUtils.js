import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

export async function askQuestion(input) {
    return new Promise((resolve) => {
        rl.question(input, (answer) => resolve(answer))
    })
}
