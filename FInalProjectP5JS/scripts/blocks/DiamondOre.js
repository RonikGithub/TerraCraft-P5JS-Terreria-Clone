// Diamond Ore Block class can be used to make diamond tools. It is a subclass of Block.
class DiamondOre extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, diamondOreIMG, collideable, "Diamond Ore")
        this.typeneeded = "Pickaxe"
        this.hp = 100
    }
}