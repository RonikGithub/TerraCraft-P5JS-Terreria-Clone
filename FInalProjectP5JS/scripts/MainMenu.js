class MainMenu extends Menu {
    constructor() {
        super()
        // creating 4 buttons on the main menu
        this.newGameButton = new Button(600-88, 300-24 - 60, 88*2, 24*2, 'Play Game', this.imgUP, this.imgDOWN)
        this.instructionsButton = new Button(600-88, 300-24, 88*2, 24*2, 'Instructions', this.imgUP, this.imgDOWN)
        this.optionsButton = new Button(600-88, 300-24 + 60, 88*2, 24*2, 'Options', this.imgUP, this.imgDOWN)
        this.creditsButton = new Button(600-88, 300-24 + 120, 88*2, 24*2, 'Credits', this.imgUP, this.imgDOWN)
        this.backButton = new Button(600-88, 300-24 + 240, 88*2, 24*2, 'Main Menu', this.imgUP, this.imgDOWN)
        this.nextButton = new Button(600-88, 300-24 - 240, 88*2, 24*2, 'Next', this.imgUP, this.imgDOWN)
        this.doDayCycleButton = new Button(600-88, 300-24 + 60, 88*2, 24*2, 'Toggle Day Cycle', this.imgUP, this.imgDOWN)
        this.toggleReachViewButton = new Button(600-88, 300-24, 88*2, 24*2, 'Toggle Reach', this.imgUP, this.imgDOWN)


        this.menuState = 0

        // background image
        this.background = loadImage("images/coconut.jpg")
    }

    // updating the buttons on the main menu. Returns new game state
    update() {
        if (this.newGameButton.isPressed() && this.menuState == 0) {
            return 1
        }
        if (this.instructionsButton.isPressed() && this.menuState == 0) {
            this.menuState = 1
        }
        if (this.optionsButton.isPressed() && this.menuState == 0) {
            this.menuState = 3
        }
        if (this.creditsButton.isPressed() && this.menuState == 0) {
            this.menuState = 4
        }

    }

    // drawing the main menu
    draw() {

        // drawing the background image
        image(this.background, 0, 0, 1200, 600)
        
        push()
        fill(0,0,0,191)
        // drawing the background rectangle
        rect(0, 0, 1200, 600)

        switch(this.menuState) {
            case 0:
                textSize(64)
                textAlign(CENTER, CENTER)
                fill("white")
                // drawing the title
                text("TERRA CRAFT!", 600, 300-140)
                pop()
                noStroke()
                textSize(32)
                // drawing the buttons
                this.newGameButton.draw()
                this.instructionsButton.draw()
                this.optionsButton.draw()
                this.creditsButton.draw()
                break
            case 1:
                push()
                // drawing the instructions
                textSize(36)
                textAlign(CENTER, CENTER)
                fill("white")
                textLeading(28)
                text("Main Goals/storyline: \nBreak a tree [hold c and click the tree 10 times] \nPut logs into slot 1 of your crafting table \nPress 1 to select the logs in your hotbar \nPress w AND 1 at the same time to place logs into slot 1 on table \nPress q to confirm crafting \nCongratulations, you have successfully crafted wooden planks! \nRepeat the crafting process however place 2 planks in slots 1 and 4 to create sticks \nYou now have the items needed to craft basic tools. \nThis game uses the same crafting recipes as “Minecraft”. \nGoogle 'Minecraft tools crafting recipes' for crafting recipes. \nMine Coal, smelt iron, make furnaces, and become richer!\nSee how long you can survive and expand! End Goal: Mine Diamonds", 600, 300)
                if (this.backButton.isPressed()) {
                    this.menuState = 0
                }
                if (this.nextButton.isPressed()) {
                    this.menuState = 2
                }
                this.backButton.draw()
                this.nextButton.draw()
                pop()
                break
            case 2:
                push()
                // drawing the instructions
                textSize(36)
                textAlign(CENTER, CENTER)
                fill("white")
                textLeading(28)
                text("Escape: Toggle Pause Menu \nQ: Craft Item\nW: Place item in table\nE: Clear table\n1-9: Hotbar and table selection\nA: Move Player left\nD: Move Player right\nArrow Keys: Move Camera\nC + Mouse: Break Block\nMouse: Place Block\nS: Toggle foreground/background building", 600, 300)
                if (this.backButton.isPressed()) {
                    this.menuState = 0
                }
                this.backButton.draw()
                pop()
                break
            case 3:
                push()
                // drawing the options

                this.toggleReachViewButton.draw()
                this.doDayCycleButton.draw()
                this.backButton.draw()
                if (this.toggleReachViewButton.isPressed()) {
                    toggleReachView()
                }
                if (this.doDayCycleButton.isPressed()) {
                    toggleDayCycle()
                }
                if (this.backButton.isPressed()) {
                    this.menuState = 0
                }
                pop()
                break
            case 4:
                push()
                // drawing the credits
                textSize(48)
                textAlign(CENTER, CENTER)
                fill("white")
                textLeading(36)
                text("Almighty Creator: Ronik Jagdev\nBlock and Item Textures: Minecraft Avalon Resource Pack\n Button Images: Crusenho Agus Hennihuno from itch.io", 600, 300)
                if (this.backButton.isPressed()) {
                    this.menuState = 0
                }
                pop()
                this.backButton.draw()
        }
    }
}