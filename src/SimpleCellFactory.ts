import AbstractFactory from './interfaces/AbstractFactory'
import Cell from './Cell'

export default class SimpleCellFactory implements AbstractFactory {
    create(position: number, data: string): Cell {
        return new Cell(position, data)
    }
}