import SimpleCellFactory from '../src/SimpleCellFactory'
import AbstractFactory from '../src/interfaces/Factory'
import Cell from '../src/interfaces/Cell'

test('creating a new cell: checking the position', () => {
    const factory: AbstractFactory = new SimpleCellFactory()
    const cell: Cell = factory.create(0, '0')
    expect(cell.position).toBe(0)
})

test('creating a new cell: checking the data', () => {
    const factory: AbstractFactory = new SimpleCellFactory()
    const cell: Cell = factory.create(0, '-')
    expect(cell.display).toBe('-')
})