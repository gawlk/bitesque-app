import { Interactive } from '/src/components'

type Props = ButtonPropsWithHTMLAttributes

export default (props: Props) => {
  return (
    <Interactive component="button" kind="clickable" {...props}>
      {props.children}
    </Interactive>
  )
}
