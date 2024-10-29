class Background {
    constructor(gameSize) {

        this.backgroundSize = {

            width: gameSize.width,
            heigth: gameSize.heigth
        }
        this.init()
    }

    init() {
        this.backgroundElement = document.createElement('img')

    }
}