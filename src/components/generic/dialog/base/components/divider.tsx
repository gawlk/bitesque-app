import { classPropToString } from '/src/components'

interface Props extends BaseProps {}

export default (props: Props) => {
  return (
    <Show when={props.color !== 'transparent'}>
      <hr
        class={classPropToString([
          'flex-none border-t-2 border-black/5',

          props.class,
        ])}
      />
    </Show>
  )
}
