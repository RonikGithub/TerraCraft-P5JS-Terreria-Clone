// class responsible for drawing the background
class Bg {
    // constructor takes in image
    constructor(img) {
        this.img = img
        // x and y coords of the background
        this.x = 0
        this.y = 0
    }

    // called to draw the background
    draw() {
        // draws a 4x4 grid of the background image
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                // calculates the x and y coords of the image
                let imgX = x * 400 + this.x
                let imgY = y * 200 + this.y

                // if the image is off the screen, it is moved to the other side
                if (imgX > 1200) {
                    imgX -= 1600
                }
                if (imgY > 600) {
                    imgY -= 800
                }
                if (imgX < - 400) {
                    imgX += 1600
                }
                if (imgY < - 200) {
                    imgY += 800
                }

                // draws the image
                image(this.img, imgX, imgY, 400, 200)
            }
        }
    }

    // method to move the background
    move(x, y) {
        this.x += x
        this.y += y
    }
}