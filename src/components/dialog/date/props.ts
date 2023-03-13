import { saveableBooleanPropsKeysObject } from '/src/components'

export const dialogDateBooleanPropsKeysObject: BooleanPropsKeysObject<DialogDatePropsOnly> =
  {
    ...saveableBooleanPropsKeysObject,
    value: true,
    max: true,
    min: true,
    reset: true,
  }
