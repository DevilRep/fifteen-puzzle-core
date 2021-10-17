import IFactory from '../interfaces/Factory';
import SimpleCellFactory from '../SimpleCellFactory';
import ICell from '../interfaces/Cell'

export default abstract class AbstractFactory extends SimpleCellFactory {
    protected factory: IFactory

    protected constructor(factory: IFactory) {
        super();
        this.factory = factory
    }

    create(position: number, data: string): ICell {
        return this.factory.create(position, data);
    }
}