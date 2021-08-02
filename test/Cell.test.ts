import Cell from '../src/Cell'

test('display shows the data from the constructor', () => {
    let cell: Cell = new Cell(2, '1')
    expect(cell.display).toBe('1')
})

test('position shows the data from the constructor', () => {
    let cell: Cell = new Cell(1, '2')
    expect(cell.position).toBe(1)
})

test('move updates the position', async () => {
    let cell: Cell = new Cell(2, '2')
    await cell.move(10)
    expect(cell.position).toBe(10)
})