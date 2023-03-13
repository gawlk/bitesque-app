type RecordAny = Record<string, any>

type RecordBoolean = Record<string, boolean>

type BooleanPropsKeys = RecordBoolean | RecordBoolean[]

export const booleanPropsKeysToArray = (propsKeys: BooleanPropsKeys) => {
  const reducedPropsKeys = Array.isArray(propsKeys)
    ? propsKeys.reduce(
        (previous, current) => ({
          ...previous,
          ...current,
        }),
        {}
      )
    : propsKeys

  return Object.keys(reducedPropsKeys).filter((key) => reducedPropsKeys[key])
}

export const keepProps = <T extends RecordAny>(
  props: T,
  propsKeys: BooleanPropsKeys
) => splitProps(props, booleanPropsKeysToArray(propsKeys))[0]

export const removeProps = <T extends RecordAny>(
  props: T,
  propsKeys: BooleanPropsKeys
) => splitProps(props, booleanPropsKeysToArray(propsKeys))[1]

export const classPropToString = (classes?: ClassProp): string =>
  Array.isArray(classes)
    ? classes
        .map((c) => (Array.isArray(c) ? classPropToString(c) : c))
        .filter((c) => c as string)
        .join(' ')
        .trim()
    : classes || ''

export const stylePropToCSSProperties = (
  style?: string | Solid.JSX.CSSProperties
) => {
  if (!style) {
    return undefined
  } else if (typeof style === 'object') {
    return style
  }

  const styleObject: Solid.JSX.CSSProperties = {}

  ;(style || '').replace(/([\w-]+)\s*:\s*([^;]+)/g, (_, prop, value) => {
    styleObject[prop] = value
    return ''
  })

  return styleObject
}
