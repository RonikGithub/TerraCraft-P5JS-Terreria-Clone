// declaring global variables
var b;
var bg;
var pl;
var camera;
var dirtIMG
var grassIMG
var stoneIMG
var logIMG
var leavesIMG
var bgIMG
var gameState = 1
var gameFont
var menu
var pauseMenu
var gui
var respawnButton
var buttonUP
var buttonDOWN
var planksIMG
var ironOreIMG
var diamondOreIMG
var coalOreIMG
var deathScreenIMG
var stickIMG
var pickaxeIMG
var pickaxe2IMG
var axeIMG
var axe2IMG
var ironIMG
var coalIMG
var diamondIMG
var furnaceIMG
var isForeground = true
var timeSinceForegroundChange = 0
var showReachDistance = true
var dayCycle = true
var diamondsMined = 0

// loading all assets for future use
function preload() {
    // attempt to load images
    try {
        gameFont = loadFont('Toriko.ttf');
        dirtIMG = loadImage('blocks/dirt.png');
        grassIMG = loadImage('blocks/grassBlock2.png');
        stoneIMG = loadImage('blocks/stone.png');
        logIMG = loadImage('blocks/spruce_log.png');
        leavesIMG = loadImage('blocks/spruce_leaves.png');
        bgIMG = loadImage('skybg.png');
        buttonUP = loadImage('images/menuButtonUp.png')
        buttonDOWN = loadImage('images/menuButtonDown.png')
        planksIMG = loadImage('blocks/spruce_planks.png')
        ironOreIMG = loadImage('blocks/iron_ore.png')
        coalOreIMG = loadImage('blocks/coal_ore.png')
        deathScreenIMG = loadImage('images/monk.jpg')
        stickIMG = loadImage('images/stick.png')
        pickaxeIMG = loadImage('images/wooden_pickaxe.png')
        pickaxe2IMG = loadImage('images/stone_pickaxe.png')
        axeIMG = loadImage('images/wooden_axe.png')
        axe2IMG = loadImage('images/stone_axe.png')
        ironIMG = loadImage('images/iron_ingot.png')
        coalIMG = loadImage('images/coal.png')
        furnaceIMG = loadImage('images/furnace.png')
        diamondOreIMG = loadImage('blocks/diamond_ore.png')
        diamondIMG = loadImage('images/diamond.png')
    // if unable to load, log error
    } catch (err) {
        console.log(err)
    }
}

// setting up
function setup() {
    // creating the canvas
    createCanvas(400*3, 200*3);
    // creating the player
    pl = new Player('player');
    // creating the camera
    camera = new Camera();
    // creating the background
    bg = new Bg(bgIMG);
    // creating the main menu
    menu = new MainMenu()
    // creating the pause menu
    pauseMenu = new PauseMenu()
    // creating the gui
    gui = new GUI()
    // creating the respawn button
    respawnButton = new Button(600-88, 300-24+60, 88*2, 24*2, 'Respawn', buttonUP, buttonDOWN)
    textSize(40)
    textFont(gameFont)
    
    // generating the terrain
    World.generateTerrain(camera);
}

// counting the fps
let frameCount = 0

// main game loop
function draw() {
    // switching between gamestates
    switch(gameState) {
        // main game gamestate
        case 0:
            noFill();
            
            // doing stuff to the player
            pl.update(camera.getBlockCollisionInRadius(pl.x, pl.y, 3));
            pl.move(camera.getBlockCollisionInRadius(pl.x, pl.y, 3));
            
            // setting the healthbar to the player's health
            gui.healthbar.setHealth(pl.getHealth())

            // drawing the background
            bg.draw();

            
            if (dayCycle) {
                push()
                // darkness value for night time
                let darkness = Gm.remap(Math.sin(frameCount/3000), 0, 1, 0, 230)

                // drawing the night time
                fill(0, 0, 0, darkness)
                noStroke()
                rect(0, 0, 1200, 600)

                // drawing the value of darkness
                fill("black")
                text(darkness, 500, 20)
                pop()
            }
    
            // drawing everything the camera sees
            camera.draw()

            // drawing the player
            pl.draw(camera.x, camera.y);

            // drawing the reach distance
            push()
            fill(0, 0, 0, Math.pow(Math.sin(frameCount/100), 2)*40+20)
            if (showReachDistance) circle(pl.x + camera.x + 8, pl.y + camera.y + 8, 300)
            pop()

            // checking if the player is dead, if so, change the gamestate to the death screen
            if (pl.getHealth() <= 0) gameState = 2

            // if the player presses escape, show the pause menu
            if (keyIsDown(ESCAPE)) {
                pauseMenu.draw()

                // change the gamestate based on the pause menu's update function
                switch(pauseMenu.update()) {
                    case 1:
                        gameState = 1
                        break
                    case 2:
                        gameState = 2
                        break
                }
            }

            // drawing the gui
            gui.draw()

            // camera and player movement
            if (keyIsDown(LEFT_ARROW) && pl.x + camera.x < 1100 || pl.x + camera.x < 100) {
                if (!(camera.x + 5 > 0)) {
                    camera.move(5, 0);
                    bg.move(1, 0)
                }
            }
            if (keyIsDown(RIGHT_ARROW) && pl.x + camera.x> 100 || pl.x + camera.x > 1100) {
                camera.move(-5, 0);
                bg.move(-1, 0)
            }
            if (keyIsDown(UP_ARROW) && pl.y + camera.y < 500) {
                camera.move(0, 5);
                bg.move(0, 1)
            }
            if (keyIsDown(DOWN_ARROW) && pl.y + camera.y > 100) {
                camera.move(0, -5);
                bg.move(0, -1)
            }

            if (pl.y + camera.y > 500 && pl.velocity > 1) {
                camera.move(0, -pl.velocity);
                bg.move(0, -pl.velocity/5)
            }

            if (pl.y + camera.y < 100 && pl.velocity < -1) {
                camera.move(0, -pl.velocity);
                bg.move(0, -pl.velocity/5)
            }

            // if the player presses e, clear the crafting table
            if (keyIsDown(69)) {
                gui.table.clear(gui.hotbar)
            }

            // if the player presses w, add the selected item to the crafting table
            if (keyIsDown(87)) {
                for (let i = 49; i < 58; i++) {
                    if (keyIsDown(i) && gui.hotbar.getSelectedObject() != undefined && gui.table.emptyAtPos(i-49)) {
                        gui.table.add(gui.hotbar.getSelectedObject(), i-49)
                        gui.hotbar.remove(gui.hotbar.getSelectedIndex())
                    }
                }
            } else { // otherwise, use the number keys to select an index in the hotbar
                for (let i = 49; i < 58; i++) {
                    if (keyIsDown(i)) {
                        gui.hotbar.setSelected(i-48)
                    }
                }
            }

            // if the player presses q, craft the item
            if (keyIsDown(81)) {
                gui.table.craft(gui.hotbar)
            }

            // if the player presses s, toggle between foreground and background building
            if (keyIsDown(83) && timeSinceForegroundChange > 10) {
                isForeground = !isForeground
                timeSinceForegroundChange = 0
            }

            // incrementing the frame count
            frameCount++
            timeSinceForegroundChange++
            break;
        
        // main menu gamestate
        case 1:

            // sset the background to black
            background("black");

            // if the menu's update function returns 1, change the gamestate to the main game
            if (menu.update() == 1) {
                gameState = 0
            }

            // draw the menu
            menu.draw();
            break;

        // death screen gamestate
        case 2:
            // background image
            image(deathScreenIMG, 0, 0, 1200, 600)
            push();
            // dark
            fill(0, 0, 0, 191)
            rect(0, 0, 1200, 600)

            // death message
            fill("white");
            textSize(80);
            textAlign(CENTER, CENTER)
            noStroke();
            text("You died", 1200/2, 600/2);
            textSize(40)
            pop();
            respawnButton.draw()
            // if the respawn button is pressed, respawn the player
            if (respawnButton.isPressed()) {
                pl.setHealth(100)
                pl.setPos(300, 100)
                pl.setImmunity(120)
                gameState = 0
            }
            stroke("black")
            break;
    }
}

// mouse click event
function mouseClicked() {
    // if mouse was clicked within 150 pixels of the player, do something
    if (Gm.distance(mouseX, mouseY, pl.x + camera.x + 8, pl.y + camera.y + 8) < 150) {
        // switch of the gamestate
        switch(gameState) {
        // if the gamestate is the main game
        case 0:
            // if left clicked with c, remove block
            if (mouseButton == LEFT && keyIsDown(67)) {
                
                // if player is holding something
                if (gui.hotbar.getSelected() != undefined) {
                    // if the block is the same type as the player's item
                    if (camera.getBlock(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y)).typeneeded == gui.hotbar.getSelectedObject().type) {
                        console.log("Broken with same type")
                        // subtract the block's health by the item's strength
                        camera.subtractBlockHealth(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y), gui.hotbar.getSelectedObject().strength)
                    }
                } else { // if the player is not holding anything deal 1 damage to the block
                    camera.subtractBlockHealth(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y), 1)
                    console.log("Broken with fist")
                    console.log(camera.getBlock(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y)).hp)
                }

                // if the block's health is less than or equal to 0, add the block to the player's inventory and remove the block
                if (camera.getBlock(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y)).hp <= 0) {
                    console.log("Broken")
                    gui.hotbar.add(camera.getBlock(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y)))
                    camera.removeBlockPos(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y))
                }
                //camera.removeBlock(Gm.toNearest16(mouseX - camera.x), Gm.toNearest16(mouseY - camera.y))
            }

            // if left clicked plaece block
            else if (mouseButton == LEFT && gui.hotbar.getSelected() != undefined && gui.hotbar.getSelectedObject().type == "Block") {
                // get the selected item
                switch(gui.hotbar.getSelected()) {
                    case "Grass Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Grass Block", grassIMG, isForeground)
                        break;
                    case "Dirt Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Dirt Block", dirtIMG, isForeground)
                        break;
                    case "Stone Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Stone Block", stoneIMG, isForeground)
                        break;
                    case "Log Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Log Block", logIMG, isForeground)
                        break;
                    case "Leaf Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Leaf Block", leavesIMG, isForeground)
                        break;
                    case "Planks Block":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Planks Block", planksIMG, isForeground)
                        break;
                    case "Iron Ore":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Iron Ore", ironOreIMG, isForeground)
                        break;
                    case "Coal Ore":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Coal Ore", coalOreIMG, isForeground)
                        break;
                    case "Diamond Ore":
                        camera.placeBlock(mouseX, mouseY, 1, 1, "Diamond Ore", diamondOreIMG, isForeground)
                        break;
                }
                // remove the item from the player's inventory
                gui.hotbar.remove(gui.hotbar.getSelectedIndex())
            }
            break;
        }
    }
}

function toggleReachView() {
    showReachDistance = !showReachDistance
}

function toggleDayCycle() {
    dayCycle = !dayCycle
}