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
        this.moveAll()
    },

    setDimensions() {
        document.querySelector('#game-screen').style.width = `${this.gameSize.width}px`
        document.querySelector('#game-screen').style.height = `${this.gameSize.height}px`
    },

    createElements() {


        this.player = new Player(this.gameSize)

    },


    setEventListener() {
        document.onkeydown = event => {
            switch (event.code) {
                case this.keys.LEFT:
                    console.log("izquierda")
                    this.player.moveLeft()
                    break;

                case this.keys.RIGHT:
                    console.log("derecha")
                    this.player.moveRight()
                    break;

                case this.keys.TOP:
                    console.log("Arriba")
                    this.player.moveTop()
                    break;
                case this.keys.BOTTOM:

                    console.log("abajo")
                    this.player.moveBottom()
                    break;

                // SHOOTS
                // case this.keys.SHOOTLEFT:
                //     console.log("dispara izquierda")
                //     this.player.moveRight()
                //     break;
                // case this.keys.SHOOTRIGHT:
                //     console.log("dispara derecha")
                //     this.player.moveRight()
                //     break;
                // case this.keys.SHOOTTOP:
                //     console.log("dispara arriba")
                //     this.player.moveRight()
                //     break;
                // case this.keys.SHOOTBOTTOM:
                //     console.log("dispara abajo")
                //     this.player.moveRight()
                //     break;

            }

        }
    },
    moveAll() {
        this.player.move()
    }



}