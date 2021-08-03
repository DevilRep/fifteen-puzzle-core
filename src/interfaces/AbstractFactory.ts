import Cell from '../Cell'

export default interface AbstractFactory {
    create(position: number, data: string): Cell
}