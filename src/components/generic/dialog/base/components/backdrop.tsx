import { classPropToString } from '/src/components'

interface Props {
  show: boolean
  open: boolean
  zIndex: number
}

export default (props: Props) => {
  return (
    <Show when={props.show}>
      <div
        class={classPropToString([
          props.open ? 'opacity-100' : 'opacity-0',
          'fixed inset-0 bg-black/25 blur-sm transition-opacity',
        ])}
        style={{
          'z-index': props.zIndex,
        }}
      />
    </Show>
  )
}
