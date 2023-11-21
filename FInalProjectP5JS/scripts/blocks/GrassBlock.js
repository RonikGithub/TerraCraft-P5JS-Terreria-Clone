// Grass Block class with health 8 and a pickaxe is needed to break it.
class GrassBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, grassIMG, collideable, "Grass Block")
        this.typeneeded = "Pickaxe"
        this.hp = 8
    }
}