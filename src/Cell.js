export default class Cell {
    realPosition;
    data;
    constructor(realPosition, data) {
        this.realPosition = realPosition;
        this.data = data;
    }
    get display() {
        return this.data;
    }
    get position() {
        return this.realPosition;
    }
    async move(newPosition) {
        this.realPosition = newPosition;
    }
}
//# sourceMappingURL=Cell.js.map