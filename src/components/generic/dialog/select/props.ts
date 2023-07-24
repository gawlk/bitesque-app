import { saveableBooleanPropsKeysObject } from '/src/components'

export const dialogSelectBooleanPropsKeysObject: BooleanPropsKeysObject<DialogSelectPropsOnly> =
  {
    ...saveableBooleanPropsKeysObject,
    search: true,
    options: true,
  }
