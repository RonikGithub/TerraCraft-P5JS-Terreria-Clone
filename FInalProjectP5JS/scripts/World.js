class World {
    // generates the blocks for a tree at certain coordinates
    static generateTree(x, y, camera) {
        // The tree itself
        for (let i = 0; i < 6; i++) {
            camera.addBlock(new LogBlock(x, y-(i*16), logIMG, false));
        }

        // The top of the tree
        camera.addBlock(new LeafBlock(x, y-96, leavesIMG, false));
        camera.addBlock(new LeafBlock(x, y-112, leavesIMG, false));
        for (let i = 80; i >= 16; i-=16) {
            camera.addBlock(new LeafBlock(x-16, y-i, leavesIMG, false));
            camera.addBlock(new LeafBlock(x+16, y-i, leavesIMG, false));
        }

        // The crown of the tree
        for (let i = 32; i >= 16; i-=16) {
            camera.addBlock(new LeafBlock(x-32, y-i, leavesIMG, false));
            camera.addBlock(new LeafBlock(x+32, y-i, leavesIMG, false));
        }
    }


    // function to generate the terrain
    static generateTerrain(camera) {
        // generate a world 10000 blocks wide
        for (let i = 0; i < 10000; i++) {
            // generating perlin noise
            let n = int(noise(i/120)*60)*16 + 16*32

            // generating the terrain
            camera.addBlock(new GrassBlock((i * 16), n, grassIMG, true));
            let dirtLen = int(random()*3)
            let numDirts = 0
            // dirt
            for (let j = n+16; j < n+16*4+dirtLen; j += 16) {
                camera.addBlock(new DirtBlock((i * 16), j, dirtIMG, true));
                numDirts++
            }
            // stone
            for (let k = n+numDirts*16+16; k < 16*128; k += 16) {

                // generate ores
                if (random() < 0.01) {
                    camera.addBlock(new IronOre((i * 16), k, ironOreIMG, true));
                } else if (random() < 0.02) {
                    camera.addBlock(new CoalOre((i * 16), k, coalOreIMG, true));
                } else if (random() < 0.005 && k > 16*100) {
                    camera.addBlock(new DiamondOre((i * 16), k, diamondOreIMG, true));
                } else {
                camera.addBlock(new StoneBlock((i * 16), k, stoneIMG, true));
                }
            }

            // generate trees (5% chance)
            if (random() < 0.05) {
                World.generateTree(i*16, n-16, camera);
            }
        }
    }
}