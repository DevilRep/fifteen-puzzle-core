import AbstractFactory from './interfaces/Factory'
import Cell from './Cell'
import ICell from './interfaces/Cell'

export default class SimpleCellFactory implements AbstractFactory {
    create(position: number, data: string): ICell {
        return new Cell(position, data)
    }
}