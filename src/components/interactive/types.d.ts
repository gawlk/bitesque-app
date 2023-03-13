type InteractiveProps = InteractivePropsOnly & ContainerProps

interface InteractivePropsOnly {
  kind?: 'clickable' | 'focusable'

  label?: string

  full?: boolean

  center?: boolean

  icon?: IconProp
  iconClass?: string
  iconStyle?: string | Solid.JSX.CSSProperties

  leftIcon?: IconProp
  leftIconClass?: string
  leftIconStyle?: string | Solid.JSX.CSSProperties

  rightIcon?: IconProp
  rightIconClass?: string
  rightIconStyle?: string | Solid.JSX.CSSProperties
}
