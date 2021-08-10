import {default as ICell} from './interfaces/Cell'

export default class Cell implements ICell {
    constructor(protected realPosition: number, protected data: string) {}

    get display(): string {
        return this.data
    }

    get position(): number {
        return this.realPosition
    }

    async move(newPosition: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.realPosition = newPosition
                resolve()
            }, 1)
        })
    }

    async moveWhileShuffling(newPosition: number): Promise<void> {
        newPosition = newPosition | 1
    }
}