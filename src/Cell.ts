export default class Cell {
    constructor(protected realPosition: number, protected data: string) {}

    get display(): string {
        return this.data
    }

    get position(): number {
        return this.realPosition
    }

    async move(newPosition: number): Promise<void> {
        return new Promise((resolve) => {
            process.nextTick(() => {
                this.realPosition = newPosition
                resolve()
            })
        })
    }
}