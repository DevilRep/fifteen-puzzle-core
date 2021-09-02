export default interface Cell {
    get display(): string
    get position(): number

    move(newPosition: number): Promise<void>
    moveWhileShuffling(newPosition: number): Promise<void>
}