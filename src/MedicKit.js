class MedicKit {
    constructor(gameSize) {
        this.gameSize = gameSize

        this.medicKitSize = {
            width: 80,
            height: 80
        }
        this.position = {
            left: Math.random() * (1500 - this.medicKitSize.width),
            top: Math.random() * (700 - this.medicKitSize.height)
        }
        this.init();
    }
    init() {
        this.element = document.createElement('div')
        this.element = document.createElement('img')

        this.element.src = "imgs/medicKit.png"

        this.element.style.position = "absolute"
        this.element.style.width = `${this.medicKitSize.width}px`
        this.element.style.height = `${this.medicKitSize.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`


        document.querySelector('#game-screen').appendChild(this.element)

    }

    getMedicKitLimits() {
        return {
            left: this.position.left,
            top: this.position.top,
            right: this.position.left + this.medicKitSize.width,
            bottom: this.position.top + this.medicKitSize.height,
            width: this.medicKitSize.width,
            height: this.medicKitSize.height
        }
    }
}