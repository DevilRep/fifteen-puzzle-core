import Cell from './interfaces/Cell'
import AbstractFactory from './interfaces/Factory'
import SettingsInterface from './interfaces/Settings';
import DefaultSettings from './DefaultSettings';

export default class Field {
    protected cells: Array<Cell> = []
    protected freeCell: Cell
    protected factory: AbstractFactory
    protected isGameEnded: boolean = false
    protected settings: SettingsInterface = new DefaultSettings()

    get isWon(): boolean {
        return this.isGameEnded
    }

    protected init(): void {
        this.cells = []
        for(let index: number = 1; index <= this.settings.field.size - 1; index++) {
            this.cells.push(this.factory.create(index, index.toString()))
        }
        this.freeCell = this.factory.create(this.settings.field.size, '0')
        this.isGameEnded = false
    }

    protected puzzlesNear(index: number, previousChosen: number): number[] {
        const result: number[] = []
        let amplitudes: number[] = [this.settings.field.width, -1 * this.settings.field.width]
        amplitudes.forEach(amplitude => {
            let elementIndex = index - amplitude
            if (
                elementIndex > 0 &&
                elementIndex <= this.settings.field.size &&
                elementIndex !== previousChosen
            ) {
                result.push(elementIndex)
            }
        })
        amplitudes = [-1, 1]
        amplitudes.forEach(amplitude => {
            let elementIndex = index - amplitude
            if (
                Math.ceil(elementIndex / this.settings.field.width) === Math.ceil(index / this.settings.field.width) &&
                elementIndex !== previousChosen
            ) {
                result.push(elementIndex)
            }
        })
        return result
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
            case this.settings.field.width:
            case -1 * this.settings.field.width:
                return true
            default:
                return false
        }
    }

    protected getCellToMove(cellPosition: number): Cell {
        if (cellPosition > this.settings.field.size || cellPosition < 1) {
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

    protected isGameShouldEnd(): boolean {
        return this.cells.filter((cell: Cell, index: number) => {
            return cell.position !== index + 1
        }).length === 0
    }

    constructor(factory: AbstractFactory) {
        this.factory = factory
        this.freeCell = this.factory.create(this.settings.field.size, '0')
        this.init()
    }

    async newGame(): Promise<void> {
        this.init()
        let index = this.settings.shuffleRounds
        let previousChosen: number = 0
        while(index--) {
            const puzzles = this.puzzlesNear(this.freeCell.position, previousChosen)
            const chosenElement = this.randomFromArray(puzzles, 1, puzzles.length)
            previousChosen = this.freeCell.position
            await this.moveWhileShuffling(chosenElement)
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
}