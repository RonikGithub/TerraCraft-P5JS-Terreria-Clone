// Planks block class with health 5 and an axe is needed to break it.
class PlanksBlock extends Block {
    constructor(x, y, img, collideable) {
        super(x, y, planksIMG, collideable, "Planks Block")
        this.typeneeded = "Axe"
        this.hp = 5
    }

    static getRecipe() {
        return [["Log Block"]]
    }
}