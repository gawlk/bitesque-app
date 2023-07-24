type DialogDateProps = DialogDatePropsOnly & DialogProps

interface DialogDatePropsOnly extends SaveableProps {
  value: Date

  max?: Date

  min?: Date

  reset?: {
    default: Date
    callback: () => void
  }
}
