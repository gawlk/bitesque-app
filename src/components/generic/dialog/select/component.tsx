import { addLocationToID, localStorageSetItem } from '/src/scripts'

import { Button, Dialog, Input, classPropToString } from '/src/components'

export interface Props
  extends MergePropsWithHTMLProps<
    DialogSelectProps,
    Solid.JSX.DialogHTMLAttributes
  > {}

const optionToObject = (option: DialogSelectProps['options']['list'][number]) =>
  typeof option === 'string'
    ? {
        value: option,
      }
    : option

const optionToString = (option: DialogSelectOptionProps) =>
  option.text ?? option.value

export default (props: Props) => {
  const [state, setState] = createStore({
    input: undefined as string | undefined,
  })

  let id: string | undefined

  if (props.id) {
    id = addLocationToID(props.id)

    if (props.saveable) {
      const saved = localStorage.getItem(id)

      saved && props.onClose?.(saved)
    }
  }

  const isRelative = createMemo(() => props.position === 'relative')

  return (
    <Dialog
      // TODO: Clean props before spreading
      {...props}
      button={mergeProps(
        {
          id,
          role: 'listbox' as const,
          rightIcon: IconTablerSelector,
          text:
            typeof props.options.selected === 'number'
              ? optionToString(
                  optionToObject(props.options.list[props.options.selected])
                )
              : props.options.list
                  .map(optionToObject)
                  .find((option) => option.value === props.options.selected)
                  ?.label || props.options.selected,
        } as ButtonPropsWithHTMLAttributes,
        props.button
      )}
      onClose={(value?: string) => {
        if (props.saveable) {
          localStorageSetItem(id, value)
        }

        props.onClose?.(value)
      }}
      sticky={
        props.search ? (
          <div class={classPropToString([isRelative() ? 'px-2 pt-2' : 'px-4'])}>
            <Input
              {...props.search}
              leftIcon={IconTablerListSearch}
              label="Name"
              full
              class={['flex-none', props.search?.class]}
              onInput={(value?: string) => setState('input', value)}
            />
          </div>
        ) : undefined
      }
      form={
        <div
          class={classPropToString([
            isRelative() ? 'space-y-1.5' : 'space-y-2',
          ])}
        >
          {untrack(() => {
            const list = createMemo(() =>
              (props.options.list || []).map(optionToObject).filter(
                (option) =>
                  !state.input ||
                  (option.label
                    ? typeof option.label === 'string'
                      ? option.label
                      : typeof option.label === 'function'
                      ? // @ts-ignore
                        option.label()?.textContent
                      : // @ts-ignore
                        option.label.textContent
                    : option.value
                  )
                    .toLowerCase()
                    .includes(state.input.toLowerCase())
              )
            )

            return (
              <Show when={list().length} fallback="The list is empty.">
                <For each={list()}>
                  {(option, index) => {
                    const isSelected = createMemo(
                      () =>
                        (typeof props.options.selected === 'number' &&
                          index() === props.options.selected) ||
                        props.options.selected === option.value ||
                        props.options.selected === option.label
                    )

                    return (
                      <Button
                        full
                        rightIcon={isSelected() ? IconTablerCheck : true}
                        {...option}
                      >
                        <span class="w-full truncate text-left">
                          {optionToString(option)}
                        </span>
                      </Button>
                    )
                  }}
                </For>
              </Show>
            )
          })}
        </div>
      }
    />
  )
}
