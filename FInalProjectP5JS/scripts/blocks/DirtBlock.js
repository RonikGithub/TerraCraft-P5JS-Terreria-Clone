// Dirt Block class with health 8 and a pickaxe is needed to break it.
class DirtBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, dirtIMG, collideable, "Dirt Block")
        this.typeneeded = "Pickaxe"
        this.hp = 8
    }
}