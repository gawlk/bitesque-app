type InputPropsWithHTMLAttributes = MergePropsWithHTMLProps<
  InputProps,
  Solid.JSX.InputHTMLAttributes
>

type InputProps = InputPropsOnly & InteractiveProps

interface InputPropsOnly extends SaveableProps {
  value?: string | number

  max?: number

  min?: number

  debounce?: number

  onInput?: (value?: string, event?: InputEvent) => void
}
