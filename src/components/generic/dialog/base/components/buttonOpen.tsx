import {
  Button,
  classPropToString,
  dialogButtonBooleanPropsKeysObject,
  removeProps,
} from '/src/components'

interface Props extends DialogButtonProps {}

export default (props: Props) => {
  const propsToSpread = createMemo(
    (): ButtonPropsWithHTMLAttributes =>
      removeProps(
        mergeProps(
          props.rightIcon
            ? {}
            : {
                rightIcon: IconTablerChevronRight,
                rightIconClass:
                  'group-hover:translate-x-0.5 will-change-transform',
              },
          props
        ),
        dialogButtonBooleanPropsKeysObject
      )
  )

  return (
    <Button {...propsToSpread} title={props.title}>
      <Show when={!props.icon}>
        <span
          class={classPropToString([
            !props.center && 'text-left',
            'flex-1 truncate',
          ])}
        >
          {props.text ?? props.title}
        </span>
      </Show>
    </Button>
  )
}
