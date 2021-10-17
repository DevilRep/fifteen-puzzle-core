import Cell from '../interfaces/Cell'

export default interface Factory {
    create(position: number, data: string): Cell
}