// This class represents an ITEM in the game, not a block. Should be inherited from
class GameItem {
    // Constructor
    constructor(img, name, type, strength) {
        this.img = img
        this.name = name
        this.type = type
        this.strength = strength
    }

    // draw the item at the given coordinates
    drawItem(x, y) {
        image(this.img, x, y, 16, 16)
    }

    // Getters and Setters ///////////////////////////////////////////
    getImg() {
        return this.img
    }

    setImg(img) {
        this.img = img
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getType() {
        return this.type
    }

    setType(type) {
        this.type = type
    }

    getStrength() {
        return this.strength
    }

    setStrength(strength) {
        this.strength = strength
    }
}