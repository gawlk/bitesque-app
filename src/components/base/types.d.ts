type BaseProps = BasePropsOnly

interface BasePropsOnly {
  disabled?: boolean

  size?: '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs'

  color?: 'primary' | 'secondary' | 'tertiary' | 'red' | 'green' | 'transparent'

  class?: ClassProp

  style?: StyleProp
}
