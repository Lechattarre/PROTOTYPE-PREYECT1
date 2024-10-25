const Game = {

    name: 'Videogame 1',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,

    gameSize: {
        width: 1500,
        height: 700
    },

    keys: {
        LEFT: 'KeyA',
        RIGHT: 'KeyD',
        TOP: 'KeyW',
        BOTTOM: 'KeyS',
        SHOOTLEFT: 'ArrowLeft',
        SHOOTRIGHT: 'ArrowRight',
        SHOOTTOP: 'ArrowUp',
        SHOOTBOTTOM: 'ArrowDown'
    },

    init() {
        this.setDimensions()
        this.start()
    },
    start() {
        this.createElements()
        this.setEventListener()
    },

    setDimensions() {
        document.querySelector('#game-screen').style.width = `${this.gameSize.width}px`
        document.querySelector('#game-screen').style.height = `${this.gameSize.height}px`
    },

    createElements() {


        const player = new Player(this.gameSize)
        player.init()



    },

    setEventListener() {
        document.onkeydown = event => {
            switch (event.code) {
                case this.keys.LEFT:
                    this.player.moveLeft()
                    break;
            }

        }
    },

    moveAll() {
        this.player.move()
    }



}