// game math
class Gm {

    // returns the previous multiple of 16 to the given number. Similar to the Math.floor() function, but for 16
    static toNearest16(n) {
        return n - (n%16)
    }

    // returns the distance between two points
    static distance(x1, y1, x2, y2) {
        return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
    }

    // converts a number from one range to another
    static remap(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    }
}