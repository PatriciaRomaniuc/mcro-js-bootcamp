class Hangman {
    constructor(word, guesses) {
        this.word = word.toLowerCase().split('')
        this.guesses = guesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    get puzzle() {
        let puzzle = ''
        this.word.forEach(letter => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            }
            else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    setStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        
        if (this.guesses === 0) {
            this.status = 'failed'
        }
        else if (finished) {
            this.status = 'finished'
        }
        else {
            this.status = 'playing'
        }
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.guesses}`
        }
        else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        }
        else {
            return 'Great work! You guessed the word.'
        }

    }
    makeGuess(letter) {
        letter = letter.toLowerCase()
        const unique = !this.guessedLetters.includes(letter)
        const badGuess = !this.word.includes(letter)

        if (this.status !== 'playing') {
            return
        }
        if (unique) {
            this.guessedLetters = [...this.guessedLetters, letter]
            if (badGuess) {
                this.guesses -= 1
            }
        }
        this.setStatus()


    }
}

export { Hangman as default}