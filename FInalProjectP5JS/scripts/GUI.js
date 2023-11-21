class GUI {
    constructor() {
        // gui elements
        this.healthbar = new HealthBar(10, 10)
        this.hotbar = new Hotbar(359, 524)
        this.table = new CraftingTable(1200 - (600-416), 416)
    }

    draw() {
        // drawing fps
        stroke("black");
        fill("white");
        textSize(40);
        text("FPS: " + int(frameRate()), 10, 20);
        // drawing camera position
        text("Camera X: " + -int(camera.x/16), 10, 40);
        text("Camera Y: " + int(camera.y/16), 10, 60);
        // drawing player position
        text("Player X: " + pl.x/16, 10, 80);
        text("Player Y: " + pl.y/16, 10, 100);
        text("Is Foreground: " + isForeground, 10, 120);
        text("Diamonds Collected: " + diamondsMined, 10, 590);
        fill("black")
        noStroke()

        // drawing gui elements
        this.healthbar.draw()
        this.hotbar.draw()
        this.table.draw()
    }


    // getters and setters
    getHealthbar() {
        return this.healthbar;
    }

    getHotbar() {
        return this.hotbar;
    }

    getTable() {
        return this.table;
    }

    setHealthbar(x) {
        this.healthbar = x;
    }

    setHotbar(x) {
        this.hotbar = x;
    }

    setTable(x) {
        this.table = x;
    }
}