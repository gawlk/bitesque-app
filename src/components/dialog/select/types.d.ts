type DialogSelectProps = DialogSelectPropsOnly & DialogProps

interface DialogSelectPropsOnly extends SaveableProps {
  search?: Omit<InputPropsWithHTMLAttributes, 'onInput'>

  list: {
    selected: string | null
    values:
      | string[]
      | {
          value: string
          label?: string | Solid.JSX.Element
          icon?: IconProp
        }[]
  }
}
