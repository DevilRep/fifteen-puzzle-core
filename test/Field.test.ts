import Field from '../src/Field'

test('creating a new object with sorted data', () => {
    let field: Field = new Field()
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})

test('stating a new game while creating a new object', () => {
    let field: Field = new Field()
    expect(field.isNewGame).toBeTruthy()
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
test('moving cell 12 down: checking position', async () => {
    let field: Field = new Field()
    await field.move(12)
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,16,13,14,15,12')
})

test('moving cell 12 down: checking is game new', async () => {
    let field: Field = new Field()
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
test('moving cell 15 right: checking positions', async () => {
    let field: Field = new Field()
    await field.move(15)
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15')
})

test('moving cell 12 down: checking is game new', async () => {
    let field: Field = new Field()
    await field.move(15)
    expect(field.isNewGame).toBeFalsy()
})

/**
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 15 16
 */
test('try to move cell 11: checking positions', async () => {
    expect.assertions(1);
    let field: Field = new Field()
    try {
        await field.move(11)
    } catch (error) {
        expect(error.message).toEqual('can\'t move the cell 11')
    }
})

test('try to move cell 11: checking is game new', async () => {
    expect.assertions(1);
    let field: Field = new Field()
    try {
        await field.move(11)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('try to move cell with position less than 1: checking positions', async () => {
    expect.assertions(1)
    let field: Field = new Field()
    try {
        await field.move(0)
    } catch (error) {
        expect(error.message).toEqual('Error: position 0 is invalid')
    }
})

test('try to move cell with position less than 1: checking is game new', async () => {
    expect.assertions(1);
    let field: Field = new Field()
    try {
        await field.move(0)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('try to move cell with position more than 16: checking positions', async () => {
    expect.assertions(1)
    let field: Field = new Field()
    try {
        await field.move(17)
    } catch (error) {
        expect(error.message).toEqual('Error: position 17 is invalid')
    }
})

test('try to move cell with position more than 16: checking is game new', async () => {
    expect.assertions(1);
    let field: Field = new Field()
    try {
        await field.move(0)
    } catch (error) {
        expect(field.isNewGame).toBeTruthy()
    }
})

test('starting a new game after moving the cell 12: checking positions', async () => {
    let field: Field = new Field()
    await field.move(12)
    await field.newGame()
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})

test('stating a new game after moving the cell 12: checking is game new', async () => {
    let field: Field = new Field()
    await field.move(12)
    await field.newGame()
    expect(field.isNewGame).toBeTruthy()
})