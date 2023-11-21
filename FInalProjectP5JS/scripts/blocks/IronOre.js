// Iron ore class can be used to make iron tools. It is a subclass of Block.
class IronOre extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, ironOreIMG, collideable, "Iron Ore")
        this.typeneeded = "Pickaxe"
        this.hp = 50
    }
}