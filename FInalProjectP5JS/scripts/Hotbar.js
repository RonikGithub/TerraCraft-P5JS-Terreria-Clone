
// Hotbar class to store items
class Hotbar {

    // constructor
    constructor(x, y) {
        // array of items in the hotbar
        this.bar = [];

        // x and y coords of the hotbar
        this.x = x
        this.y = y

        // the currently selected item index
        this.selected = 0
    }

    // method to add an item to the hotbar
    add(item) {
        if (item.name == "Diamond Ore") {diamondsMined++}
        // loops through the hotbar
        for (let i = 0; i < 9; i++) {
            // if the position is empty, add the item to the hotbar at that position
            if (this.bar[i] == undefined) {
                this.bar[i] = [item, 1];
                break
            }

            // if the item is already in the hotbar, increase the amount of that item
            if (this.bar[i][0].name == item.name) {
                this.bar[i][1] += 1;
                break
            }
        }
    }

    // method to remove an item from the hotbar at a specific index
    remove(index) {
        // if the index is undefined, return nothing
        if (this.bar[index] == undefined) {
            return
        }
        // decrease the amount of the item at the index
        this.bar[index][1] -= 1;

        // if the amount of the item is 0, remove the item from the hotbar
        if (this.bar[index][1] <= 0) {
            this.bar[index] = undefined;
        }
    }

    // method to draw the hotbar
    draw() {
        push()
        fill(255, 255, 255, 100)
        stroke(0)
        strokeWeight(3)
        textSize(24)

        // loops through the hotbar
        for (let i = 0; i < 9; i++) {

            // if the index is the selected index, draw a yellow background
            if (this.selected == i) {
                fill(255, 149, 0, 200)
            } else { // otherwise, draw a white background
                fill(255, 255, 255, 100)
            }
            rect(this.x + (i * 54), this.y, 48, 48)

            push()
            noStroke()
            fill(0)
            // draw the number of the slot
            text(i + 1, this.x + (i * 54) + 35, this.y + 44)

            // if the slot is used, draw the amount of the item in the slot
            if (this.bar[i] != undefined) {
                text("x" + this.bar[i][1], this.x + (i * 54) + 4, this.y + 44)
            }
            pop()
        }
        pop()
        // draw the items in the hotbar
        for (let i = 0; i < this.bar.length; i++) {
            if (this.bar[i] != undefined) {
                this.bar[i][0].drawItem(this.x + (i * 54) + 16, this.y + 16);
            }
        }
    }

    // method to set the selected index
    setSelected(x) {
        this.selected = x - 1;
    }

    // method to get the selected items name
    getSelected() {
        if (this.bar[this.selected] == undefined) {
            return undefined
        }
        return this.bar[this.selected][0].name;
    }

    // method to get the selected items object
    getSelectedObject() {
        if (this.bar[this.selected] == undefined) {
            return undefined
        }
        return this.bar[this.selected][0];
    }

    // method to get the selected index
    getSelectedIndex() {
        return this.selected;
    }

    // method to check if the hotbar has an empty slot
    hasEmptySlot() {
        for (let i = 0; i < 9; i++) {
            if (this.bar[i] == undefined) {
                return true
            }
        }
        return false
    }
}