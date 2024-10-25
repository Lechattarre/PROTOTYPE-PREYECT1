class player {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.player = {
            w: 50,
            h: 50
        }

        this.player = {
            left: 10,
            top: playerSizeSize.height - this.gameSize.h
        }

        this.playerSpecs = {
            color: 'yellow'
        }
    }

    init() {

        this.playerElement = document.createElement('div')

        this.playerElement.style.position = 'absolute'
        this.playerElement.style.backgroundColor = this.playerSpecs.color
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.borderRadius = `50%`

        document.querySelector('game-screen').appendChild(this.playerElement)
    }
}