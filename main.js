import { hangman } from './scripts/hangman'
import CanvaGallow from './scripts/canvaGallow'

const main = document.querySelector('main')

const game = document.querySelector('#game')
const landing = document.querySelector('#landing')

const gallow = new CanvaGallow(document.querySelector('#gallow').getContext('2d'))

const words = ['hola', 'adios', 'pizza', 'humanidad', 'humano', 'persona', 'gente', 'hombre', 'mujer', 'bebe', 'niño', 'niña', 'adolescente', 'adulto', 'adulta', 'anciano', 'anciana', 'don', 'doña', 'señor', 'señora', 'caballero', 'dama', 'individuo']

function play (word) {
  if (main.contains(landing)) {
    main.removeChild(landing)
    game.style.display = 'flex'
  }
  
  gallow.init(hangman.chooseSecretWord(words, word))
  
  window.addEventListener('keydown', keysHandler)
  modal.close()
}

const addWord = document.querySelector('#addWord').onclick = (e)=>{
 const newWord = prompt('Cual es la nueva palabra?')
 if(newWord){
   words.push(newWord)
   play(newWord)
 }
}

const btnPlay = document.querySelector('#play')
btnPlay.onclick = (e)=>{
  play()
}

// modales
const modal = document.querySelector('#modal')
const modalBody = document.querySelector('#modal-body')

document.querySelector('.close').onclick = () => {
  if (hangman.isAlive === undefined) {
    window.addEventListener('keydown', keysHandler)
  }
  modal.close()
}

document.querySelector('#salir').onclick = ()=>{
  if(confirm('seguro que quiere salir?')){
    main.appendChild(landing)
    window.removeEventListener('keydown', keysHandler)
    game.style.display = 'none'
  }
  modal.close()
  window.addEventListener('keydown', keysHandler)

}


const menu = document.querySelector('#menu')
menu.onclick = (e) => {
  window.removeEventListener('keydown', keysHandler)

  modalBody.innerHTML = '<h2>Menu</h2>'
  modal.showModal()
}

function win () {
  modalBody.innerHTML = '<img src="/trophy.png" class="modal-img" alt=""><h2>Felicidades Ganaste!</h2>'
  modal.showModal()
  window.removeEventListener('keydown', keysHandler)
}

function lose () {
  modalBody.innerHTML = `<img src="/hangman.png" class="modal-img" alt=""><h2>Game Over!</h2><p>La palabra era: "${hangman.secretWord}"</p>`
  modal.showModal()
  window.removeEventListener('keydown', keysHandler)
}

document.querySelector('#newGame').onclick = ()=>{
  if (confirm('Seguro que quiere iniciar un nuevo juego?')){
    play()
  }
  modal.close()
  window.addEventListener('keydown', keysHandler)

}

//

const keysHandler = (e) => {
  pick(e.key)
}

function pick (letter){
  letter = letter.toUpperCase()

  // is a letter?
  if (!/^[a-zñ]$/i.test(letter) || hangman.wrongLetters.includes(letter) || hangman.discoverdLetters.includes(letter)) return

  hangman.pickLetter(letter)
  if (hangman.secretWord.includes(letter)) {
    for (let i = 0; i < hangman.secretWord.length; i++) {
      if (hangman.secretWord[i] === letter) {
        gallow.righLetter(hangman.secretWord, i)
      }
    }
  } else if (hangman.wrongLetters.includes(letter) && hangman.wrongLetters[hangman.wrongLetters.length - 1]) {
    gallow.wrongLetter(letter, hangman.wrongLetters.length)
  }

  if (hangman.isAlive === true) {
    win()
  } else if (hangman.isAlive === 'dead') {
    lose()
  }
}

document.querySelector('#toggle-check').onclick = (e)=>{
  document.body.classList.toggle('dark')
}

document.querySelector('#keyboard').oninput = (e)=>{
  pick(e.target.value)

  e.target.value = ""
}
