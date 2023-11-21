class Camera {
    constructor() {
        this.x = 0; // x position of the camera
        this.y = 0; // y position of the camera
        this.renderQueue = []; // render queue
        this.blockMatrix = []; // matrix of all blocks
    }

    // method to add a block to the block matrix
    addBlock(block) {
        let xB = block.x/16;
        let yB = block.y/16;
        if (this.blockMatrix[xB] == undefined) {
            this.blockMatrix[xB] = [];
        }
        this.blockMatrix[xB][yB] = block;
        //console.log(block)
    }

    // method to get a block at a specific position
    getBlock(x, y) {
        let xB = x/16;
        let yB = y/16;
        return this.blockMatrix[xB][yB];
    }

    // method to remove a block
    removeBlock(block) {
        let xB = block.x/16;
        let yB = block.y/16;
        this.blockMatrix[xB][yB] = undefined;
    }

    // method to remove a block at a specific position
    removeBlockPos(x, y) {
        let xB = x/16;
        let yB = y/16;
        this.blockMatrix[xB][yB] = undefined;
    }

    // method to subtract block health at a specific block
    subtractBlockHealth(block, amount) {
        let xB = block.x/16;
        let yB = block.y/16;
        this.blockMatrix[xB][yB].hp -= amount;
    }

    // method to subtract block health at a specific position
    subtractBlockHealth(x, y, amount) {
        let xB = x/16;
        let yB = y/16;
        this.blockMatrix[xB][yB].hp -= amount;
    }

    // method to add an object to the render queue
    addToRenderQueue(obj) {
        this.renderQueue.push(obj);
    }

    // method to adjust the camera's position
    move(x, y) {
        this.x += x;
        this.y += y;
    }

    // method to set the camera's position
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    // This code is used to get the highest block in a specific column
    getHighestBlockY(x) {
        let highestBlock = undefined;
        // loop through the column
        for (let i = 0; i < this.blockMatrix.length; i++) {
            // if the block is defined, set the highest block to the y value of the block
            if (this.blockMatrix[x][i] != undefined) {
                highestBlock = this.blockMatrix[x][i].y;
                break
            }
        }
        
        // return the highest block's y value
        return highestBlock;
    }

    // This code is used to get the blocks in a specific radius of the player, the radius is the amount of blocks to check in each direction
    getBlockCollisionInRadius(x, y, radius) {
        let blocks = [];
        // loop through the blocks in the radius
        for (let i = Math.abs(int(x/16) - radius); i < Math.abs(int(x/16) + radius); i++) {
            for (let j = Math.abs(int(y/16) - radius); j < Math.abs(int(y/16) + radius); j++) {
                // if the block is defined, push it to the array
                if (this.blockMatrix[i] != undefined && this.blockMatrix[i][j] != undefined) {
                    blocks.push(this.blockMatrix[i][j]);
                }
            }
        }
        // return the array
        return blocks;
    }

    draw() {
        
        // shadow colour
        let c = color(0, 0, 0);
        c.setAlpha(100); // making it transparent
        fill(c)
        noStroke()
        
        // loop through the blocks in the block matrix. Will only loop through the blocks that are on the screen
        for (let i = Math.abs(int(this.x/16)); i < (Math.abs(this.x/16) + 1200/16); i++) {
            let darkStart = 10000 // darkStart is used to determine when to start drawing the "shadow" rectangle
            for (let j = int(this.y/16); j < -this.y/16 + 600/16; j++) {
                // if the block is defined, draw it
                if (this.blockMatrix[i][j] != undefined) {
                    this.blockMatrix[i][j].draw(this.x, this.y);
                    // if the block is collidable, set darkStart to the y value of the block
                    if (darkStart == 10000 && this.blockMatrix[i][j].collidable) {
                        darkStart = this.blockMatrix[i][j].y + 16;
                    }
                }
            }
            // draw the "shadow" rectangle
            rect(i*16 + this.x, darkStart + this.y, 16, 6000 + darkStart)
            rect(i*16 + this.x, darkStart + this.y + 16, 16, 6000 + darkStart + 16)
            rect(i*16 + this.x, darkStart + this.y + 32, 16, 6000 + darkStart + 32)
        }
       //pop()

        // drawing the render queue
        for (let i = 0; i < this.renderQueue.length; i++) {
            // only draw if it's on screen
            if (this.renderQueue[i].x + this.x > -100 && this.renderQueue[i].x + this.x < 1200 && this.renderQueue[i].y + this.y > -100 && this.renderQueue[i].y + this.y < 600) {
                this.renderQueue[i].draw(this.x, this.y);
            }
        }
    }

    // method to swap two blocks
    swapBlocks(block1, block2) {
        let x1 = block1.x;
        let y1 = block1.y;
        let x2 = block2.x;
        let y2 = block2.y;

        let x1B = x1/16;
        let y1B = y1/16;
        let x2B = x2/16;
        let y2B = y2/16;

        // block1.x = x2;
        // block1.y = y2;
        // block2.x = x1;
        // block2.y = y1;

        this.blockMatrix[x1B][y1B] = block2;
        this.blockMatrix[x2B][y2B] = block1;
    }

    // method to randomize blocks in a specific radius
    randomizeBlocks(x, y, radius) {
        for (let i = Math.abs(int(x/16) - radius); i < Math.abs(int(x/16) + radius); i++) {
            for (let j = Math.abs(int(y/16) - radius); j < Math.abs(int(y/16) + radius); j++) {
                if (this.blockMatrix[i] != undefined && this.blockMatrix[i][j] != undefined) {
                    let block = this.blockMatrix[i][j];
                    let xB = block.x/16;
                    let yB = block.y/16;
                    let x = block.x;
                    let y = block.y;
                    let block2 = this.blockMatrix[int(random(0, this.blockMatrix.length))][int(random(0, this.blockMatrix[0].length))];
                    let xB2 = block2.x/16;
                    let yB2 = block2.y/16;
                    let x2 = block2.x;
                    let y2 = block2.y;
                    block.x = x2;
                    block.y = y2;
                    block2.x = x;
                    block2.y = y;
                    this.blockMatrix[xB][yB] = block2;
                    this.blockMatrix[xB2][yB2] = block;
                }
            }
        }
    }

    // method to add a block to the block matrix
    placeBlock(mouseX, mouseY, playerX, playerY, block, img, collidable) {
        let originX = playerX + 8 ; // the players head x
        let originY = playerY + 8; // the players head y
        let posX = mouseX - this.x;
        let posY = mouseY - this.y;
        let xB = posX
        let yB = posY
        if (Gm.distance(originX, originY, posX, posY) > 32) {
            let angle = atan2(posY - originY, posX - originX);
            xB = originX + cos(angle) * 32;
            yB = originY + sin(angle) * 32;
        }

        // switch statement to determine which block to add
        switch(block) {
            case "Grass Block":
                this.addBlock(new GrassBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Dirt Block":
                this.addBlock(new DirtBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Stone Block":
                this.addBlock(new StoneBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Log Block":
                this.addBlock(new LogBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Leaf Block":
                this.addBlock(new LeafBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Planks Block":
                this.addBlock(new PlanksBlock(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Iron Ore":
                this.addBlock(new IronOre(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
                break;
            case "Coal Ore":
                this.addBlock(new CoalOre(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
            case "Diamond Ore":
                this.addBlock(new DiamondOre(Gm.toNearest16(posX), Gm.toNearest16(posY), img, collidable))
        }
    }
}
