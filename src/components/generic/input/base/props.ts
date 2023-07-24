import { saveableBooleanPropsKeysObject } from '/src/components'

export const inputBooleanPropsKeysObject: BooleanPropsKeysObject<InputPropsOnly> =
  {
    ...saveableBooleanPropsKeysObject,

    value: true,

    max: true,
    min: true,

    debounce: true,
    onInput: true,

    long: true,
  }
