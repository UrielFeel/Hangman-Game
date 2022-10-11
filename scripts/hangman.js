export const hangman = {
  secretWord: '',
  discoverdLetters: [],
  wrongLetters: [],
  isAlive: undefined,
  chooseSecretWord: function (words, word) {
    this.resetWord()
    
    if(word){
      this.secretWord = word.toUpperCase()
    }else{
      this.secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase()
    }

    this.discoverdLetters = Array(this.secretWord.length).fill('_')
    console.log(this.discoverdLetters)
    return this.secretWord
  },
  resetWord: function () {
    this.secretWord = ''
    this.discoverdLetters = []
    this.wrongLetters = []
    this.isAlive = undefined
  },
  pickLetter: function (letter) {
    letter = letter.toUpperCase()
    if (!/^[a-zñ]$/i.test(letter)) return

    if (this.secretWord.includes(letter)) {
      for (let i = 0; i < this.secretWord.length; i++) {
        if (this.secretWord[i] === letter) {
          this.discoverdLetters[i] = letter
        }
      }
      console.log(this.discoverdLetters)
    } else if (!this.wrongLetters.includes(letter)) {
      this.wrongLetters.push(letter)
      console.log(this.wrongLetters)
    }

    if (this.secretWord === this.discoverdLetters.join('')) {
      this.isAlive = true
      console.log('You win!')
    } else if (this.wrongLetters.length > 8) {
      this.isAlive = 'dead'
      console.log(`You lose, the word was "${this.secretWord}"`)
    }
  }
}


