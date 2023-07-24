import {
  Container,
  IconInteractive,
  classPropToString,
  interactiveBooleanPropsKeysObject,
  removeProps,
} from '/src/components'

interface Props extends MergePropsWithHTMLProps<InteractiveProps> {}

export default (passedProps: Props) => {
  const props = mergeProps(
    {
      color: 'secondary',
    },
    passedProps
  )

  const containerProps = removeProps(props, interactiveBooleanPropsKeysObject)

  const iconProps = removeProps(containerProps, {
    onClick: true,
    onclick: true,
    class: true,
    style: true,
    ref: true,
  })

  return (
    <Container
      {...containerProps}
      orientation={props.orientation || props.icon ? undefined : 'horizontal'}
      class={[
        // Width
        props.full && 'w-full min-w-0',

        // Center
        props.center && 'justify-center',

        // Hover & Active
        !props.disabled && 'hover:brightness-150 active:brightness-75',

        // State
        (() => {
          if (props.disabled) {
            return 'opacity-60'
          } else if (props.kind) {
            return `group appearance-none transition duration-200 will-change-transform focus:outline-none disabled:transform-none motion-reduce:transform-none ${
              props.kind === 'clickable' ? 'cursor-pointer select-none' : ''
            }`
          }
        })(),

        'inline-flex items-center',

        props.class,
      ]}
    >
      <Show
        when={!props.icon}
        fallback={
          <>
            <IconInteractive
              {...iconProps}
              icon={props.icon}
              class={props.iconClass}
              style={props.iconStyle}
            />
            {props.children}
          </>
        }
      >
        <Show when={props.leftIcon}>
          <IconInteractive
            {...iconProps}
            side="left"
            icon={props.leftIcon}
            class={props.leftIconClass}
            style={props.leftIconStyle}
          />
        </Show>

        <Show when={props.label}>
          <label
            for={props.id}
            class={classPropToString([
              'pointer-events-none select-none self-start whitespace-pre-wrap text-black/50',
            ])}
          >
            {`${props.label}: `}
          </label>
        </Show>

        {props.children}

        <Show when={props.rightIcon || (props.center && props.leftIcon)}>
          <IconInteractive
            {...iconProps}
            side="right"
            icon={props.rightIcon}
            class={props.rightIconClass}
            style={props.rightIconStyle}
          />
        </Show>
      </Show>
    </Container>
  )
}
