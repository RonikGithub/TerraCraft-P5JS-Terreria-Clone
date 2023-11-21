class Player {
    constructor(name) {
        this.name = name;
        this.x = 300; // x position
        this.y = 100; // y position
        this.img = loadImage('playerIMG.png') // player image
        this.hitbox = new Hitbox(this.x, this.y, 16, 32) // player hitbox
        this.hitbox.createEdgeRects() // creates the top, bottom, left, and right hitboxes for more precise collision detection
        this.speed = 2; // player speed
        this.gravity = 0.5; // acceleration due to gravity
        this.velocity = 0; // player y velocity
        this.touchingGround = false; // whether or not the player is touching the ground
        this.health = 100 // player health
        this.immunityTimer = 120 // how long the player is immune to damage in frames after dying
    }

    // updating all the player's variables. Takes in an array of blocks to check for collision.
    update(blocks) {
        // updating the player's hitboxes
        this.hitbox.update(this.x, this.y)
        this.hitbox.top.update(this.x, this.y)
        this.hitbox.bottom.update(this.x, this.y + 32)
        this.hitbox.left.update(this.x, this.y)
        this.hitbox.right.update(this.x + 16, this.y)

        // by default, the player is not touching the ground
        let onGround = false;
        // loop through all the blocks around the player
        for (let i = 0; i < blocks.length; i++) {
            // if the block is not collidable, skip it
            if (!blocks[i].collidable) {
                continue;
            }
            // if the player is touching the ground, set onGround to true and break out of the loop
            if (this.hitbox.bottom.intersects(blocks[i].hitbox) && this.velocity >= 0) {
                onGround = true;
                this.touchingGround = true;
                this.y = blocks[i].hitbox.y - this.hitbox.height
                // if the player is moving fast enough, deal damage
                if (this.velocity > 8 && this.immunityTimer <= 0) {
                    this.health -= (this.velocity - 8) * 5
                }
                break
            }
        }
        // if player is on the ground, set velocity to 0
        if (onGround) {
            this.velocity = 0;
        } else { // if player is not on the ground, apply gravity
            if (this.velocity < 20) {
                this.velocity += this.gravity;
            }
            this.y += this.velocity;
        }
        // if immunityTimer is greater than 0, decrement it
        if (this.immunityTimer > 0) {
            this.immunityTimer--
        }
    }

    // move the player left and right. Takes in an array of blocks to check for collision
    move(blocks) {
        // by default, the player is not touching the left or right side of a block
        let intersectsLeft = false;
        let intersectsRight = false;

        // loop through all the blocks around the player
        for (let i = 0; i < blocks.length; i++) {
            // if the block is not collidable, skip it
            if (!blocks[i].collidable) {
                continue;
            }
            // if the player is touching the left or right side of a block, set intersectsLeft or intersectsRight to true and break out of the loop
            if ((this.hitbox.left.intersects(blocks[i].hitbox))) {
                intersectsLeft = true;
                this.x = blocks[i].hitbox.x + blocks[i].hitbox.width
                break
            }
            if ((this.hitbox.right.intersects(blocks[i].hitbox))) {
                intersectsRight = true;
                this.x = blocks[i].hitbox.x - this.hitbox.width
                break
            }
        }

        // if a is pressed and the left side of the player is not touching a block, move the player left
        if (keyIsDown(65) && !intersectsLeft) {
            this.x -= this.speed;
        }
        // if d is pressed and the right side of the player is not touching a block, move the player right
        if (keyIsDown(68) && !intersectsRight) {
            this.x += this.speed;
        }
        // if space is pressed and the player is touching the ground, jump
        if (keyIsDown(32) && this.touchingGround) {
            this.velocity = -5;
        }
        // touching ground is false by default
        this.touchingGround = false;
    }

    // draws the player according to the offset of the camera
    draw(offsetX, offsetY) {
        image(this.img, this.x + offsetX, this.y + offsetY, 16, 32)
    }

    // getting player health
    getHealth() {
        return this.health
    }

    // setting player health
    setHealth(x) {
        this.health = x
    }

    // setting player position
    setPos(x, y) {
        this.x = x
        this.y = y
    }

    // setting player immunity
    setImmunity(x) {this.immunityTimer = x}
    // setGroundY(y1, y2) {
    //     if (y1 < y2) {
    //         this.groundY = y1 - this.hitbox.height
    //     }
    //     else if (y2 < y1) {
    //         this.groundY = y2 - this.hitbox.height
    //     } 
    //     else {
    //         this.groundY = y1 - this.hitbox.height
    //     }
    // }

    // using the players edge hitboxes, check if they are colliding with any blocks. If they are, move the player out of the block. Blocks do not have edge hitboxes
    // checkBlockFaceCollision(blocks) {
    //     for (let i = 0; i < blocks.length; i++) {
    //         if (this.hitbox.top.intersects(blocks[i].hitbox)) {
    //             this.y = blocks[i].hitbox.y + blocks[i].hitbox.height
    //             this.velocity = 0;
    //         }
    //         if (this.hitbox.bottom.intersects(blocks[i].hitbox)) {
    //             if (this.velocity > 0) {
    //                 this.y = blocks[i].hitbox.y - this.hitbox.height
    //                 this.velocity = 0;
    //             }
    //         }
    //         if (this.hitbox.left.intersects(blocks[i].hitbox)) {
    //             this.x = blocks[i].hitbox.x + blocks[i].hitbox.width
    //         }
    //         if (this.hitbox.right.intersects(blocks[i].hitbox)) {
    //             this.x = blocks[i].hitbox.x - this.hitbox.width
    //         }
    //     }
    // }
}