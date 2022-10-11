class CanvaGallow {
  constructor (canva) {
    this.gallow = canva
  }

  draw (width) {
    this.gallow.lineWidth = width
    this.gallow.lineJoin = 'round'
    this.gallow.lineCap = 'round'
    this.gallow.strokeStyle = '#474744'
  }

  write (width, color, size) {
    this.gallow.font = `bold ${size}px Inter`
    this.gallow.lineWidth = width
    this.gallow.lineCap = 'round'
    this.gallow.lineJoin = 'round'
    this.gallow.fillStyle = color
  }

  drawSpaces (charactersNum) {
    this.draw(6)
    const anchura = 350 / charactersNum
    for (let i = 0; i < charactersNum; i++) {
      this.gallow.moveTo(80 + (anchura * i), 500)
      this.gallow.lineTo(40 + (anchura * i), 500)
    }

    this.gallow.stroke()
    this.gallow.closePath()
  }

  init (word) {
    this.gallow.clearRect(0, 0, 410, 570)
    this.draw(8)
    this.gallow.fillStyle = '#d8dbe0'

    this.gallow.fillRect(0, 0, 410, 570)
    this.gallow.beginPath()
    this.gallow.moveTo(50, 390)
    this.gallow.lineTo(350, 390)
    this.gallow.stroke()
    this.gallow.closePath()

    this.drawSpaces(word.length)
  }

  drawHangman (errsNum) {
    this.draw(8)
    this.gallow.beginPath()

    if (errsNum === 1) {
      this.gallow.moveTo(150, 390)// 1
      this.gallow.lineTo(150, 70)// 1
    }
    if (errsNum === 2) {
      this.gallow.moveTo(150, 70)// 2
      this.gallow.lineTo(275, 70)// 2
    }
    if (errsNum === 3) {
      this.gallow.moveTo(275, 70)// 3
      this.gallow.lineTo(275, 100)// 3
    }
    if (errsNum === 4) {
      this.gallow.moveTo(315, 140)// 4
      this.gallow.arc(275, 145, 40, 0, 2 * Math.PI)// 4
    }
    if (errsNum === 5) {
      this.gallow.moveTo(275, 185)// 5
      this.gallow.lineTo(275, 290)// 5
    }
    if (errsNum === 6) {
      this.gallow.moveTo(275, 205)// 6
      this.gallow.lineTo(235, 215)// 6
    }
    if (errsNum === 7) {
      this.gallow.moveTo(275, 205)// 7
      this.gallow.lineTo(315, 215)// 7
    }
    if (errsNum === 8) {
      this.gallow.moveTo(275, 290)// 8
      this.gallow.lineTo(235, 320)// 8
    }
    if (errsNum === 9) {
      this.gallow.moveTo(275, 290)// 9
      this.gallow.lineTo(315, 320)// 9
    }
    this.gallow.stroke()
    this.gallow.closePath()
  }

  righLetter (word, index) {
    this.write(6, '#0A3871', 54)
    const anchura = 350 / word.length
    this.gallow.fillText(word[index], 40 + (anchura * index), 480)
    this.gallow.stroke()
  }

  wrongLetter (letter, errorsLeft) {
    this.write(6, '#fa1e21', 35)
    this.gallow.fillText(letter, 10 + (35 * errorsLeft), 550, 30)

    this.drawHangman(errorsLeft)
  }
}

export default CanvaGallow
