
// Hitbox class for custom collision detection.
class Hitbox {
    // x, y, width, height constructor
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Edge hitboxes for more precise collision detection. By default, they are null.
        this.top = null;
        this.bottom = null;
        this.left = null;
        this.right = null;
    }

    // Creates edge hitboxes. These are only used by the player to detect collision with blocks.
    createEdgeRects() {
        this.top = new Hitbox(this.x+1, this.y, this.width-2, 1);
        this.bottom = new Hitbox(this.x+1, this.y + this.height, this.width-2, 1);
        this.left = new Hitbox(this.x, this.y+1, 1, this.height-2);
        this.right = new Hitbox(this.x + this.width, this.y+1, 1, this.height-2);
    }

    // Updates the position of the hitbox.
    update(x, y) {
        this.x = x;
        this.y = y;
    }

    // Moves the hitbox by x and y.
    move(x, y) {
        this.x += x;
        this.y += y;
    }

    // Draws the hitbox
    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    // Returns true if the hitbox intersects with another hitbox.
    intersects(other) {
        return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y);
    }

    // Returns true if the hitbox intersects with a point
    pointIntersects(x, y) {
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }
}