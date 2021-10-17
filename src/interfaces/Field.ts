export default interface Field {
    newGame(): Promise<void>
    move(newPosition: number): Promise<void>
    moveWhileShuffling(newPosition: number): Promise<void>
    toString(): Promise<void>
}