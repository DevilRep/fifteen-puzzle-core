import Cell from './Cell'

export default class Field {
    protected cells: Array<Cell> = []
    protected freeCell: Cell
    protected readonly FIELD_SIZE = 16
    protected readonly FIELD_WIDTH = 4
    public isNewGame: boolean = false

    constructor() {
        this.freeCell = new Cell(this.FIELD_SIZE, '0')
        this.init()
    }

    protected init(): void {
        this.cells = []
        for(let index: number = 1; index <= this.FIELD_SIZE - 1; index++) {
            this.cells.push(new Cell(index, index.toString()))
        }
        this.freeCell = new Cell(this.FIELD_SIZE, '0')
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
        if (cellPosition > this.FIELD_SIZE || cellPosition < 1) {
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