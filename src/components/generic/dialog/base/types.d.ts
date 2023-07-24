type DialogProps = DialogPropsOnly &
  Omit<InteractiveProps, keyof DialogPropsOnly>

interface DialogPropsOnly {
  button?: DialogButtonProps

  position?: 'relative' | 'fixed' | 'full'

  title?: string

  sticky?: Solid.JSX.Element

  form?: Solid.JSX.Element

  full?: true

  footer?: Solid.JSX.Element

  moveable?: boolean

  resizable?: boolean

  onClose?: (value?: string) => void
}

type DialogButtonProps = DialogButtonPropsOnly & ButtonPropsWithHTMLAttributes

interface DialogButtonPropsOnly {
  text?: string | Solid.JSX.Element
}

type DialogResizeDirection = 'w' | 'sw' | 's' | 'se' | 'e'

interface DialogTransform {
  x: number
  y: number
}

interface DialogDimensions {
  width?: number
  height?: number
}
