namespace FifteenPuzzle {
    export class Cell {
        constructor(protected realPosition: number, protected data: string) {}

        get display(): string {
            return this.data
        }

        get position(): number {
            return this.realPosition
        }

        async move(newPosition: number): Promise<void> {
            this.realPosition = newPosition
        }
    }
}