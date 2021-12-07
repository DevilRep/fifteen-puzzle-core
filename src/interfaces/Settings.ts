import FieldSettingsInterface from './FieldSettings';

export default interface Settings {
    readonly shuffleRounds: number
    readonly field: FieldSettingsInterface
}