// Leaf Block class with health 3 and an axe is needed to break it.
class LeafBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, leavesIMG, collideable, "Leaf Block")
        this.typeneeded = "Axe"
        this.hp = 3
    }
}