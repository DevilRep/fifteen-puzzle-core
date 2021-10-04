import Cell from './Cell';
import ICell from './interfaces/Cell'

export default abstract class AbstractCellDecorator extends Cell {
    protected cell: ICell

    protected constructor(cell: ICell) {
        super(cell.position, cell.display)
        this.cell = cell
    }

    async move(newPosition: number): Promise<void> {
        return this.cell.move(newPosition);
    }

    async moveWhileShuffling(newPosition: number): Promise<void> {
        return this.cell.moveWhileShuffling(newPosition);
    }
}
