class Button {
    constructor(x, y, width, height, text, img, hoverIMG) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.text = text
        this.hitbox = new Hitbox(this.x, this.y, this.width, this.height)
        this.img = img
        this.hoverIMG = hoverIMG
    }

    isPressed() {
        if (this.hitbox.pointIntersects(mouseX, mouseY) && mouseIsPressed) {
            return true
        }
        return false
    }

    draw() {
        if (this.img != null) {
            push()
            if (this.hitbox.pointIntersects(mouseX, mouseY)) {
                image(this.hoverIMG, this.x, this.y, this.width, this.height)
                textAlign(CENTER, CENTER)
                fill(0)
                text(this.text, this.x + this.width / 2, this.y + this.height / 2 + 3)
            } else {
                image(this.img, this.x, this.y, this.width, this.height)
                textAlign(CENTER, CENTER)
                fill(0)
                text(this.text, this.x + this.width / 2, this.y + this.height / 2)
            }
            pop()
        } else {
            push()
            stroke("black")
            if (this.hitbox.pointIntersects(mouseX, mouseY)) {
                fill(200)
            } else {
                fill(255)
            }
            rect(this.x, this.y, this.width, this.height)
            textAlign(CENTER, CENTER)
            fill(0)
            text(this.text, this.x + this.width / 2, this.y + this.height / 2)
            pop()
        }
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    getText() {
        return this.text
    }

    getHitbox() {
        return this.hitbox
    }

    getImg() {
        return this.img
    }

    getHoverImg() {
        return this.hoverIMG
    }

    setX(x) {
        this.x = x
    }

    setY(y) {
        this.y = y
    }

    setWidth(width) {
        this.width = width
    }

    setHeight(height) {
        this.height = height
    }

    setText(text) {
        this.text = text
    }

    setHitbox(hitbox) {
        this.hitbox = hitbox
    }

    setImg(img) {
        this.img = img
    }

    setHoverImg(hoverIMG) {
        this.hoverIMG = hoverIMG
    }
}