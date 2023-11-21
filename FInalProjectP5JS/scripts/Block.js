// parent block class for all the types of blocks in the game
class Block {
    constructor(x, y, img, collidable, name) {
        this.x = x;
        this.y = y;
        this.img = img
        this.hitbox = new Hitbox(this.x, this.y, 16, 16) // hitbox for the block
        this.collidable = collidable // determines if the block can be walked through
        this.name = name
        this.type = "Block"
        this.strength = 1
    }

    // Getters and Setters ///////////////////////////////////////////
    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    // draw the block given the offset of the camera
    draw(offsetX, offsetY) {
        image(this.img, this.x + offsetX, this.y + offsetY, 16, 16)
    }

    // draw the block at the given coordinates
    drawItem(x, y) {
        image(this.img, x, y, 16, 16)
    }
}