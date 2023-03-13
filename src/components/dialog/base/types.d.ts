type DialogProps = DialogPropsOnly & InteractiveProps

interface DialogPropsOnly {
  button?: DialogButtonProps

  title?: string

  sticky?: Solid.JSX.Element

  form?: Solid.JSX.Element

  full?: true

  onClose?: (value?: string) => void
}

type DialogButtonProps = DialogButtonPropsOnly & ButtonPropsWithHTMLAttributes

interface DialogButtonPropsOnly {
  text?: string | Solid.JSX.Element
}
