class CraftingTable {
    constructor(x, y) {
        // x and y coords of the crafting table
        this.x = x
        this.y = y

        // the 3x3 matrix of the crafting table
        this.matrix = []

        // All crafting recipes as a 3x3 matrix
        this.planksRecipe = [["Log Block", undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
        this.sticksRecipe = [["Planks Block", "Planks Block", undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
        this.pickaxeRecipe = [["Planks Block", undefined, undefined], ["Planks Block", "Stick", "Stick"], ["Planks Block", undefined, undefined]]
        this.pickaxe2Recipe = [["Stone Block", undefined, undefined], ["Stone Block", "Stick", "Stick"], ["Stone Block", undefined, undefined]]
        this.axeRecipe = [["Planks Block", "Planks Block", undefined], ["Planks Block", "Stick", "Stick"], [undefined, undefined, undefined]]
        this.axe2Recipe = [["Stone Block", "Stone Block", undefined], ["Stone Block", "Stick", "Stick"], [undefined, undefined, undefined]]
        this.furnaceRecipe = [["Stone Block", "Stone Block", "Stone Block"], ["Stone Block", undefined, "Stone Block"], ["Stone Block", "Stone Block", "Stone Block"]]
        this.coalRecipe = [["Coal Ore", undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
        this.ironRecipe = [["Iron Ore", undefined, undefined], ["Iron Ore", "Furnace", "Coal"], ["Iron Ore", undefined, undefined]]
        this.diamondRecipe = [["Diamond Ore", undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]

        // All crafting recipes as a dictionary
        this.recipies = {
            "Planks Block": this.planksRecipe,
            "Stick": this.sticksRecipe,
            "Pickaxe": this.pickaxeRecipe,
            "Pickaxe2": this.pickaxe2Recipe,
            "Axe": this.axeRecipe,
            "Axe2": this.axe2Recipe,
            "Furnace": this.furnaceRecipe,
            "Coal": this.coalRecipe,
            "Iron": this.ironRecipe
        }
    }

    // method to add an item to the crafting table at a specific position
    add(item, pos) {
        // uses math we learned in school to convert the position to x and y coords
        let x = pos % 3
        let y = Math.floor(pos / 3)

        // if the x coord is undefined, make it an empty array
        if (this.matrix[x] == undefined) {
            this.matrix[x] = []
        }

        // adds the item to the matrix
        this.matrix[x][y] = item
    }

    // method to see if a position on the table is empty
    emptyAtPos(pos) {
        // uses math we learned in school to convert the position to x and y coords`
        let x = pos % 3
        let y = Math.floor(pos / 3)

        // if the x coord is undefined, the position is empty
        if (this.matrix[x] == undefined) {
            return true
        }

        // if the y coord is undefined, the position is empty
        if (this.matrix[x][y] == undefined) {
            return true
        }

        // if the position is not empty, return false
        return false
    }

    // method to clear the crafting table and add all items to the hotbar
    clear(hotbar) {

        // loops through the matrix
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // if the position is not empty, add the item to the hotbar and set the position to undefined
                if (this.matrix[i] != undefined && this.matrix[i][j] != undefined) {
                    hotbar.add(this.matrix[i][j])
                    this.matrix[i][j] = undefined
                }
            }
        }

        // clears the matrix
        this.matrix = []
    }

    // method to craft new items
    craft(hotbar) {

        // converts the matrix of objects to a matrix of names
        let nameMatrix = []
        for (let i = 0; i < 3; i++) {
            nameMatrix[i] = []
            for (let j = 0; j < 3; j++) {
                if (this.matrix[i] != undefined && this.matrix[i][j] != undefined) {
                    nameMatrix[i][j] = this.matrix[i][j].name
                } else {
                    nameMatrix[i][j] = undefined
                }
            }
        }


        // Checking if the matrix is equal to any of the recipes. If it is, add the item to the hotbar and clear the crafting table
        if (tools.areMatrixesEqual(nameMatrix, this.planksRecipe)) {
            for (let i = 0; i < 4; i++) {
                hotbar.add(new PlanksBlock(0, 0, planksIMG, false))
            }
        }

        if (tools.areMatrixesEqual(nameMatrix, this.sticksRecipe)) {
            for (let i = 0; i < 4; i++) {
                hotbar.add(new Stick())
            }
        }

        if (tools.areMatrixesEqual(nameMatrix, this.pickaxeRecipe)) {
            hotbar.add(new Pickaxe())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.pickaxe2Recipe)) {
            hotbar.add(new Pickaxe2())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.axeRecipe)) {
            hotbar.add(new Axe())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.axe2Recipe)) {
            hotbar.add(new Axe2())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.furnaceRecipe)) {
            hotbar.add(new Furnace())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.coalRecipe)) {
            hotbar.add(new Coal())
        }

        if (tools.areMatrixesEqual(nameMatrix, this.ironRecipe)) {
            for (let i = 0; i < 3; i++) {
                hotbar.add(new Iron())
            }
            hotbar.add(new Furnace())
        }

        
        this.matrix = []


        // console.log(tools.areMatrixesEqual(nameMatrix, this.planksRecipe))
        // console.table(nameMatrix)
        // console.table(this.planksRecipe)
    }

    // method to draw the crafting table
    draw() {

        push()
        fill(255, 255, 255, 100)
        stroke(0)
        strokeWeight(3)
        textSize(24)
        
        // loops through the matrix and draws the items
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // background rects
                rect(this.x + (i * 54), this.y + (j * 54), 48, 48)
                push()
                noStroke()
                fill(0)
                // slot numbers
                text((i + 1) + ((j)*3), this.x + (i * 54) + 35, this.y + 44 + (j * 54))
                pop()

                // if the position is not empty, draw the item
                if (this.matrix[i] != undefined) {
                    if (this.matrix[i][j] != undefined) {
                        //text(this.matrix[i][j].name, this.x + (i * 54) + 4, this.y + 44 + (j * 54))
                        //this.matrix[i][j].draw(this.x + (i * 54) + 16 - this.matrix[i][j].x, this.y + 16 + (j * 54) - this.matrix[i][j].y);
                        this.matrix[i][j].drawItem(this.x + (i * 54) + 16, this.y + 16 + (j * 54))
                    } else {
                        //text("undefined", this.x + (i * 54) + 4, this.y + 44 + (j * 54))
                    }
                }
            }
        }
    }

    //method to return the recipe dictionary
    getRecipes() {
        return this.recipies
    }

    // method to return a recipe from the dictionary
    getRecipe(name) {
        return this.recipies[name]
    }
}