import Cell from './Cell'

export default class Field {
    protected cells: Array<Cell> = []
    protected freeCell: Cell
    protected readonly FIELD_SIZE = 16
    protected readonly FIELD_WIDTH = 4

    constructor() {
        this.freeCell = new Cell(this.FIELD_WIDTH, '0')
        this.init()
    }

    init(): void {
        let index: number = this.FIELD_SIZE - 1
        while(index--) {
            this.cells.push(new Cell(index, index.toString()))
        }
        this.freeCell = new Cell(this.FIELD_WIDTH, '0')
    }

    async newGame(): Promise<void> {
        this.init()
    }

    protected canMove(cell: Cell): boolean {
        switch (this.freeCell.position - cell.position) {
            case 1:
            case -1:
            case this.FIELD_WIDTH:
            case -1 * this.FIELD_WIDTH:
                return true
            default:
                return false
        }
    }

    async move(cellPosition: number): Promise<void> {
        if (cellPosition > this.FIELD_SIZE || cellPosition < 0) {
            throw new Error(`Error: position ${cellPosition} is invalid`)
        }

        let activeCell: Cell | undefined = this.cells.find(cell => cell.position === cellPosition)
        if (!(activeCell instanceof Cell) || !this.canMove(activeCell)) {
            throw new Error(`can't move the cell ${cellPosition}`)
        }
        await Promise.all([
            activeCell.move(this.freeCell.position),
            this.freeCell.move(activeCell.position)
        ])
    }

    toString(): string {
        return this.cells.map(cell => cell.position).join(',') + ',' + this.freeCell.position.toString()
    }
}