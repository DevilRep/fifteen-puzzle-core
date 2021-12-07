import FieldSettingsInterface from './interfaces/FieldSettings';
import SettingsInterface from './interfaces/Settings'

export default class DefaultSettings implements SettingsInterface {
    public readonly shuffleRounds = 4
    public readonly field: FieldSettingsInterface = {
        height: 4,
        width: 4,
        get size(): number {
            return this.width * this.height
        }
    }
}