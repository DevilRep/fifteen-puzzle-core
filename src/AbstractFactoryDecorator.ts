import IFactory from './interfaces/AbstractFactory';
import SimpleCellFactory from './SimpleCellFactory';
import ICell from './interfaces/Cell'

export default abstract class AbstractFactoryDecorator extends SimpleCellFactory {
    protected factory: IFactory

    protected constructor(factory: IFactory) {
        super();
        this.factory = factory
    }

    create(position: number, data: string): ICell {
        return this.factory.create(position, data);
    }
}