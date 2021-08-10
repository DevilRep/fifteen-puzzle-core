import Cell from './interfaces/Cell'
import AbstractFactory from './interfaces/AbstractFactory'

export default class Field {
    protected cells: Array<Cell> = []
    protected freeCell: Cell
    protected readonly FIELD_SIZE: number = 16
    protected readonly FIELD_WIDTH: number = 4
    protected factory: AbstractFactory
    protected readonly MOVE_ALL_RANDOM_ROUNDS: number = 10
    protected isGameEnded: boolean = false

    constructor(factory: AbstractFactory) {
        this.factory = factory
        this.freeCell = this.factory.create(this.FIELD_SIZE, '0')
        this.init()
    }

    protected init(): void {
        this.cells = []
        for(let index: number = 1; index <= this.FIELD_SIZE - 1; index++) {
            this.cells.push(this.factory.create(index, index.toString()))
        }
        this.freeCell = this.factory.create(this.FIELD_SIZE, '0')
        this.isGameEnded = false
    }

    protected puzzlesNear(index: number, previousChosen: number): number[] {
        const result: number[] = []
        let amplitudes: number[] = [this.FIELD_WIDTH, -1 * this.FIELD_WIDTH]
        amplitudes.forEach(amplitude => {
            let elementIndex = index - amplitude
            if (
                elementIndex > 0 &&
                elementIndex <= this.FIELD_SIZE &&
                elementIndex !== previousChosen
            ) {
                result.push(elementIndex)
            }
        })
        amplitudes = [-1, 1]
        amplitudes.forEach(amplitude => {
            let elementIndex = index - amplitude
            if (
                Math.ceil(elementIndex / this.FIELD_WIDTH) === Math.ceil(index / this.FIELD_WIDTH) &&
                elementIndex !== previousChosen
            ) {
                result.push(elementIndex)
            }
        })
        return result
    }

    async newGame(): Promise<void> {
        this.init()
        let index = this.MOVE_ALL_RANDOM_ROUNDS
        let previousChosen: number = 0
        while(index--) {
            const puzzles = this.puzzlesNear(this.freeCell.position, previousChosen)
            const chosenElement = this.randomFromArray(puzzles, 1, puzzles.length)
            previousChosen = this.freeCell.position
            await this.moveWhileShuffling(chosenElement)
        }
    }

    protected randomFromArray(array: number[], min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return array[Math.floor(Math.random() * (max - min + 1)) + min - 1]
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

    protected getCellToMove(cellPosition: number): Cell {
        if (cellPosition > this.FIELD_SIZE || cellPosition < 1) {
            throw new Error(`position ${cellPosition} is invalid`)
        }
        let activeCell: Cell | undefined = this.cells.find(cell => cell.position === cellPosition)
        if (typeof(activeCell) === 'undefined' || !this.canMove(activeCell)) {
            throw new Error(`can't move the cell ${cellPosition}`)
        }
        return activeCell
    }

    protected async moveWhileShuffling(cellPosition: number): Promise<void> {
        const activeCell: Cell = this.getCellToMove(cellPosition)
        await Promise.all([
            activeCell.moveWhileShuffling(this.freeCell.position),
            this.freeCell.moveWhileShuffling(activeCell.position)
        ])
        if (this.isGameShouldEnd()) {
            this.isGameEnded = true
        }
    }

    async move(cellPosition: number): Promise<void> {
        const activeCell: Cell = this.getCellToMove(cellPosition)
        await Promise.all([
            activeCell.move(this.freeCell.position),
            this.freeCell.move(activeCell.position)
        ])
        if (this.isGameShouldEnd()) {
            this.isGameEnded = true
        }
    }

    toString(): string {
        return this.cells.map(cell => cell.position).join(',') + ',' + this.freeCell.position.toString()
    }

    protected isGameShouldEnd(): boolean {
        return this.cells.filter((cell: Cell, index: number) => {
            return cell.position !== index + 1
        }).length === 0
    }

    get isWon(): boolean {
        return this.isGameEnded
    }
}