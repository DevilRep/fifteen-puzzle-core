import CellInterface from "./interfaces/Cell";
import CellDecoratorInterface from "./interfaces/CellDecorator";

export default class DecoratedCell implements CellInterface, CellDecoratorInterface {
    public position: number;
    public display: string;
    private decoratedCell: CellDecoratorInterface;

    constructor(cell: CellDecoratorInterface) {
        this.decoratedCell = cell
        this.position = this.decoratedCell.position
        this.display = this.decoratedCell.display
    }

    async move(newPosition: number): Promise<void> {
        newPosition = newPosition || 0
        return Promise.resolve()
    }

    async moveWhileShuffling(newPosition: number): Promise<void> {
        newPosition = newPosition || 0
        return Promise.resolve()
    }
}