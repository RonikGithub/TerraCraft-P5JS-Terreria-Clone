// Log Block class with health 10 and an axe is needed to break it.
class LogBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, logIMG, collideable, "Log Block")
        this.typeneeded = "Axe"
        this.hp = 10
    }
}