import { addLocationToID, debounce, localStorageSetItem } from '/src/scripts'

import {
  Button,
  Interactive,
  baseBooleanPropsKeysObject,
  booleanPropsKeysToArray,
  classPropToString,
  containerBooleanPropsKeysObject,
  inputBooleanPropsKeysObject,
  interactiveBooleanPropsKeysObject,
  removeProps,
} from '/src/components'

type Props = InputPropsWithHTMLAttributes

export default (props: Props) => {
  const [interactiveProps, inputProps] = splitProps(
    removeProps(props, inputBooleanPropsKeysObject),
    booleanPropsKeysToArray([
      interactiveBooleanPropsKeysObject,
      containerBooleanPropsKeysObject,
      baseBooleanPropsKeysObject,
    ]) as never[]
  )

  const [state, setState] = createStore({
    value: props.value,
  })

  let id: string | undefined
  let input: HTMLInputElement | undefined

  if (props.id) {
    id = addLocationToID(props.id)

    if (props.saveable) {
      const saved = localStorage.getItem(id)

      saved && String(saved) !== String(props.value) && props.onInput?.(saved)
    }
  }

  const type = createMemo(
    () =>
      props.type ||
      (props.max || props.min || props.step ? 'number' : undefined)
  )

  onMount(() => {
    // Init input's value without binding to improve performance
    input && (input.value = String(state.value || ''))
  })

  const needsFixing = createMemo(
    () =>
      !props.disabled &&
      type() === 'number' &&
      ((props.max !== undefined && Number(state.value) > props.max) ||
        (props.min !== undefined &&
          (!state.value || Number(state.value) < props.min)))
  )

  const debounceInputPropagation = debounce(
    (value: string | undefined, event: InputEvent) => {
      if (props.saveable) {
        localStorageSetItem(id, value)
      }

      // Push the input to the end of the task for maximum fluidity
      setTimeout(() => props.onInput?.(value, event), 0)
    },
    props.debounce || 50
  )

  return (
    <div class="flex flex-1 space-x-2">
      <Interactive
        kind="focusable"
        {...interactiveProps}
        class={[
          'relative cursor-text',
          needsFixing() && 'border-red-500',
          props.class,
        ]}
        onClick={() => input?.focus()}
      >
        <input
          class={classPropToString([
            needsFixing() && 'text-red-600',
            'flex-1 bg-transparent text-left placeholder:text-stone-400 focus:outline-none',
          ])}
          id={id}
          ref={input}
          aria-invalid={needsFixing()}
          disabled={props.disabled}
          {...inputProps}
          type={type()}
          onInput={(event: InputEvent) => {
            const element = event.target as HTMLInputElement

            const value = element.value

            setState('value', value)

            debounceInputPropagation(value, event)
          }}
        />
      </Interactive>
      <Show when={needsFixing()}>
        <Button
          icon={IconTablerHammer}
          onClick={() => {
            const value = String(
              state.value === undefined ||
                (props.min !== undefined && state.value < props.min)
                ? props.min
                : props.max
            )

            input && (input.value = value)

            setState('value', value)

            if (props.saveable) {
              localStorageSetItem(id)
            }

            props.onInput?.(value)
          }}
        />
      </Show>
    </div>
  )
}
