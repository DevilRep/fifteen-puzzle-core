import Field from '../src/Field'

test('initialization while creating an object creates the sorted data', () => {
    let field: Field = new Field()
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
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
test('moving 12 down', async () => {
    let field: Field = new Field()
    await field.move(12)
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,16,13,14,15,12')
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
test('moving 15 right', async () => {
    let field: Field = new Field()
    await field.move(15)
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15')
})

/**
 *  1  2  3  4
 *  4  5  6  8
 *  9 10 11 12
 * 13 14 15 16
 */
test('can\'t move 11', async () => {
    expect.assertions(1);
    let field: Field = new Field()
    try {
        await field.move(11)
    } catch (error) {
        expect(error.message).toEqual('can\'t move the cell 11')
    }
})

test('moving to position less than 1', async () => {
    expect.assertions(1)
    let field: Field = new Field()
    try {
        await field.move(0)
    } catch (error) {
        expect(error.message).toEqual('Error: position 0 is invalid')
    }
})

test('moving to position more than 16', async () => {
    expect.assertions(1)
    let field: Field = new Field()
    try {
        await field.move(17)
    } catch (error) {
        expect(error.message).toEqual('Error: position 17 is invalid')
    }
})

test('initialization using init() creates the sorted data', async () => {
    let field: Field = new Field()
    await field.move(12)
    field.init()
    expect(field.toString()).toEqual('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})