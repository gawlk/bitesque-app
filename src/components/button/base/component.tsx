import { Interactive } from '/src/components'

// Inspirations
// https://uiverse.io/Voxybuns/lucky-fireant-71
// https://www.joshwcomeau.com/animation/3d-button/

type Props = ButtonPropsWithHTMLAttributes

export default (props: Props) => {
  return (
    <Interactive component="button" kind="clickable" {...props}>
      {props.children}
    </Interactive>
  )
}
