// Coal ore class can be used to make coal. It is a subclass of Block. Has 40 hp.
class CoalOre extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, coalOreIMG, collideable, "Coal Ore")
        this.typeneeded = "Pickaxe"
        this.hp = 40
    }
}