// Stone block class with health 30 and a pickaxe is needed to break it.
class StoneBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, stoneIMG, collideable, "Stone Block")
        this.typeneeded = "Pickaxe"
        this.hp = 30
    }
}