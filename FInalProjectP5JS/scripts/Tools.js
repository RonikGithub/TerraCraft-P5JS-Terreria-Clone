// random tools
class tools {
    // returns a dictionary of all blocks
    static blocks() {
        const blocks = {
            "dirt": new DirtBlock(),
            "grass": new GrassBlock(),
            "stone": new StoneBlock(),
            "log": new LogBlock(),
            "leaves": new LeafBlock()
        }
        return blocks
    }

    // gets a block with a key from the dictionary
    static block(blockName) {
        return this.blocks()[blockName]
    }

    // method that returns true if two matrixes are equal
    static areMatrixesEqual(matrix1, matrix2) {
        if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
            return false;
        }
    
        for (let i = 0; i < matrix1.length; i++) {
            for (let j = 0; j < matrix1[0].length; j++) {
                if (matrix1[i][j] !== matrix2[i][j]) {
                    return false;
                }
            }
        }
    
        return true;
    }
}