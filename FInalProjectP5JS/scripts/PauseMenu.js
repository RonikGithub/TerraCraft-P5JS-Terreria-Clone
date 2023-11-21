class PauseMenu extends Menu {
    constructor() {
        // calls the constructor of the parent class
        super()
        // x coord of the buttons
        this.x = 1200 - (88*2) - (88/2)

        // creating the buttons
        this.mainMenuButton = new Button(this.x, 24 + 50, 88*2, 24*2, 'Main Menu', this.imgUP, this.imgDOWN)
        this.saveButton = new Button(this.x, 24 + 60 + 50, 88*2, 24*2, 'Suicide', this.imgUP, this.imgDOWN)
    }

    // returns new gamestate when button is pressed
    update() {
        if (this.mainMenuButton.isPressed()) {
            return 1
        }
        if (this.saveButton.isPressed()) {
            return 2
        }
    }

    // drawing the pause menu 
    draw() {
        textSize(32)
        // drawing the menu buttons
        this.mainMenuButton.draw()
        this.saveButton.draw()
    }
}
