class SmallEnemy {
    constructor(gameSize) {

        this.gameSize = gameSize

        this.size = {
            width: 40,
            height: 40
        }

        this.position = {
            left: Math.random() * (1500 - this.size.width),
            top: Math.random() * (700 - this.size.height)
        }
        this.physics = {
            speed: {
                left: 4.5,
                top: 4.5
            }

        }

        this.dieSound = new Audio('sounds/blood.wav')

        this.init();

    }

    init() {
        this.element = document.createElement('div')
        this.element = document.createElement('img')
        this.element.src = "imgs/Smallenemy.png"

        this.element.style.position = "absolute"
        this.element.style.width = `${this.size.width}px`
        this.element.style.height = `${this.size.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`


        document.querySelector('#game-screen').appendChild(this.element)
    }

    move() {
        if (this.position.left >= this.gameSize.width - this.size.width || this.position.left <= 0) {
            this.physics.speed.left *= -1
        }

        if (this.position.top >= this.gameSize.height - this.size.height || this.position.top <= 0) {
            this.physics.speed.top *= -1
        }

        this.position.left += this.physics.speed.left
        this.position.top += this.physics.speed.top

        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
    }

    getSmallEnemiesLimits() {
        return {
            left: this.position.left,
            top: this.position.top,
            right: this.position.left + this.size.width,
            bottom: this.position.top + this.size.height,
            width: this.size.width,
            height: this.size.height
        }
    }
}

