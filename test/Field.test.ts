import Field from '../src/Field'
import SimpleCellFactory from '../src/SimpleCellFactory'
import Cell from '../src/interfaces/Cell'

test('creating a new object with sorted data', () => {
    const field: Field = new Field(new SimpleCellFactory())
    expect(field.toString()).toBe('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})

test('stating a new game while creating a new object', () => {
    const field: Field = new Field(new SimpleCellFactory())
    expect(field.isNewGame).toBeTruthy()
})

test('starting a new game: was game ended?', () => {
    const field: Field = new Field(new SimpleCellFactory())
    expect(field.isWon).toBeFalsy()
})

/**
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 15 16
 *
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 16
 * 13 14 15 12
 */
test('moving cell 12 down: position are changed', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(12)
    expect(field.toString()).toBe('1,2,3,4,5,6,7,8,9,10,11,16,13,14,15,12')
})

test('moving cell 12 down: the flag `isNewGame` is changed', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(12)
    expect(field.isNewGame).toBeFalsy()
})

/**
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 15 16
 *
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 16 15
 */
test('moving cell 15 right: positions are changed', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(15)
    expect(field.toString()).toBe('1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15')
})

test('moving cell 15 right: the flag `isNewGame` is changed', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(15)
    expect(field.isNewGame).toBeFalsy()
})

test('moving cell 15 right and back it to previous position: was the flag `isWon` changed?', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(15)
    await field.move(16)
    expect(field.isWon).toBeTruthy()
})

test('moving cells 15 and 14 right: was the flag `isWon` changed?', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(15)
    await field.move(14)
    expect(field.isWon).toBeFalsy()
})

/**
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 15 16
 */
test('trying to move cell 11: positions are not changed', async () => {
    expect.assertions(1);
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(11)
    } catch (error) {
        expect(error.message).toBe('can\'t move the cell 11')
    }
})

test('trying to move cell 11: the flag `isNewGame` is not changed', async () => {
    expect.assertions(1);
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(11)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('trying to move cell with position less than 1: positions are not changed', async () => {
    expect.assertions(1)
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(0)
    } catch (error) {
        expect(error.message).toBe('position 0 is invalid')
    }
})

test('try to move cell with position less than 1: the flag `isNewGame` is not changed', async () => {
    expect.assertions(1);
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(0)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('try to move cell with position more than 16: positions are not changed', async () => {
    expect.assertions(1)
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(17)
    } catch (error) {
        expect(error.message).toBe('position 17 is invalid')
    }
})

test('try to move cell with position more than 16: the flag `isNewGame` is not changed', async () => {
    expect.assertions(1);
    const field: Field = new Field(new SimpleCellFactory())
    try {
        await field.move(0)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('stating a new game after moving the cell 12: the flag `isNewGame` is changed', async () => {
    const field: Field = new Field(new SimpleCellFactory())
    await field.move(12)
    await field.newGame()
    expect(field.isNewGame).toBeTruthy()
})

test('creating cells using factory', () => {
    const field: Field = new Field({
        create(): Cell {
            return {
                get position(): number {
                    return 2
                },
                get display(): string {
                    return 'data'
                },
                move(): Promise<void> {
                    return Promise.resolve()
                }
            }
        }
    })
    expect(field.toString()).toBe('2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2')
})
