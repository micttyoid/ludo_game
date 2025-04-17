import readline from 'readline'
import { render_game, update_game } from './gameplay.js'
import { get_players, current_player } from './player.js'

const answers_to_terminate = ['finish', 'done', 'exit', 'quit']

const bod2y = (answer) => {
    const playersPosition = get_players()
    console.log('current player -', current_player())
    console.log('players position -', playersPosition)

    switch (true) {
        case typeof answer === 'number':
            update_game(answer)
            return render_game(answer)
        case answer === 'display_score' || answer === 'invalid_move':
            return render_game(answer)
    }
}

const body = (answer) => {
    // Your processing logic here
    console.log(`You entered: ${answer}`)
}

// Create readline interface
const leer_linea = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

// Given asnwer, do something, and return question
let n_turn = 0
const questioner = (answer) => {
    n_turn = n_turn + 1
    return `${n_turn}th turn`
}

const loop = (prompt) => {
    leer_linea.question(
        prompt + '\nEnter something (or "exit" to quit): ',
        (answer) => {
            if (answers_to_terminate.includes(answer.toLowerCase())) {
                return leer_linea.close()
            } else {
                body(answer)
                const next_prompt = questioner(answer)
                return loop(next_prompt)
            }
        }
    )
}

leer_linea.on('close', () => {
    console.log('Bye!')
    process.exit(0)
})

// Start the loop
loop('Game begins.')
