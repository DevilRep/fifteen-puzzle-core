export default interface CellDecorator {
    readonly display: string
    readonly position: number

    move(newPosition: number): Promise<void>
    moveWhileShuffling(newPosition: number): Promise<void>
}