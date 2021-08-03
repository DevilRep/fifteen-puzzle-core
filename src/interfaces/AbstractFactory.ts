import Cell from '../interfaces/Cell'

export default interface AbstractFactory {
    create(position: number, data: string): Cell
}