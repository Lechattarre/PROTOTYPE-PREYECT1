const Game = {

    name: 'Videogame 1',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,

    gameSize: {
        width: 600,
        height: 500
    },

    init() {
        this.setDimensions()
        this.createElements()
    },

    setDimensions() {
        document.querySelector('#game-screen').style.width = `${this.gameSize.width}px`
        document.querySelector('#game-screen').style.height = `${this.gameSize.height}px`
    },

    createElements() {


        const player = new player(this.gameSize)
        player.init()

    }
}