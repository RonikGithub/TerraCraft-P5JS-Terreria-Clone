class HealthBar {
    constructor(x, y) {
        // x and y coords of the bar
        this.x = x
        this.y = y
        this.health = 100 // health of the player
        this.baseIMG = loadImage("images/healthbar.png") // image of the bar
    }

    // sets health to x
    setHealth(x) {
        this.health = x
    }

    // removes x health
    removeHealth(x) {
        this.health -= x
    }

    // function to draw the health bar
    draw() {
        
        push()
        // drawing the actual bar
        fill(238,38,38)
        rect(this.x + 18 + 950, this.y + 20, this.health*1.75, 24)
        fill(137,21,21)
        rect(this.x + 18 + 950, this.y + 20 + 20, this.health*1.75, 24/5)
        
        // drawing the image that encloses the bar
        image(this.baseIMG, this.x + 950, this.y, 200, 55)

        // drawing the text that shows the health
        textSize(20)
        textAlign(RIGHT, CENTER)
        fill("white")
        stroke("black")
        text(this.health + "/100", this.x + 18 + 950 + 180, this.y + 20 + 12 + 25)
        pop()
    }
}