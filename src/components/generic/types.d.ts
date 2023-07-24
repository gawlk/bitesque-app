type IconProp = string | ((...args: any[]) => Solid.JSX.Element) | true

type ClassProp = string | (ClassProp | string | false | undefined)[]

type StyleProp = string | Solid.JSX.CSSProperties

type MergePropsWithHTMLProps<
  T,
  HTMLAttributes extends Solid.JSX.HTMLAttributes = Solid.JSX.HTMLAttributes
> = T & Omit<HTMLAttributes, keyof T>

type BooleanPropsKeysObject<Props> = {
  [T in keyof Required<Props>]: boolean
}
