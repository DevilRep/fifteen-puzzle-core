import Cell from './Cell';
export default class Field {
    cells = [];
    freeCell;
    FIELD_SIZE = 16;
    FIELD_WIDTH = 4;
    constructor() {
        this.freeCell = new Cell(this.FIELD_WIDTH, '0');
        this.init();
    }
    init() {
        let index = this.FIELD_SIZE - 1;
        while (index--) {
            this.cells.push(new Cell(index, index.toString()));
        }
        this.freeCell = new Cell(this.FIELD_WIDTH, '0');
    }
    async newGame() {
        this.init();
    }
    canMove(cell) {
        switch (this.freeCell.position - cell.position) {
            case 1:
            case -1:
            case this.FIELD_WIDTH:
            case -1 * this.FIELD_WIDTH:
                return true;
            default:
                return false;
        }
    }
    async move(position) {
        if (position > this.FIELD_SIZE || position < 0) {
            throw new Error(`Error: position ${position} is invalid`);
        }
        let activeCell = this.cells.find(cell => cell.position === position);
        if (!(activeCell instanceof Cell) || !this.canMove(activeCell)) {
            return;
        }
        await Promise.all([
            activeCell.move(this.freeCell.position),
            this.freeCell.move(activeCell.position)
        ]);
    }
}
//# sourceMappingURL=Field.js.map