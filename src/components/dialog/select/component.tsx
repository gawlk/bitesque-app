import { addLocationToID, localStorageSetItem } from '/src/scripts'

import { Button, Dialog, Input } from '/src/components'

export interface Props
  extends MergePropsWithHTMLProps<
    DialogSelectProps,
    Solid.JSX.DialogHTMLAttributes
  > {}

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

  return (
    <Dialog
      title={props.title}
      button={mergeProps(
        {
          id,
          role: 'listbox' as const,
          rightIcon: IconTablerSelector,
          text: props.list.selected,
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
        props.search
          ? () => (
              <Input
                {...props.search}
                leftIcon={IconTablerListSearch}
                label="Name"
                full
                class={['flex-none', props.search?.class]}
                onInput={(value?: string) => setState('input', value)}
              />
            )
          : undefined
      }
      form={
        <div class="space-y-2">
          {() => {
            const list = createMemo(() =>
              (props.list.values || [])
                .map((value) =>
                  typeof value === 'string'
                    ? {
                        value,
                      }
                    : value
                )
                .filter(
                  (obj) =>
                    !state.input ||
                    (obj.label
                      ? typeof obj.label === 'string'
                        ? obj.label
                        : typeof obj.label === 'function'
                        ? // @ts-ignore
                          obj.label()?.textContent
                        : // @ts-ignore
                          obj.label.textContent
                      : obj.value
                    )
                      .toLowerCase()
                      .includes(state.input.toLowerCase())
                )
            )

            return (
              <Show when={list().length} fallback="The list is empty.">
                <For each={list()}>
                  {(obj) => (
                    <Button
                      full
                      leftIcon={obj.icon}
                      rightIcon={
                        props.list.selected === obj.value ||
                        props.list.selected === obj.label
                          ? IconTablerCheck
                          : true
                      }
                      value={obj.value}
                    >
                      <span class="w-full truncate text-left">
                        {obj.label || obj.value}
                      </span>
                    </Button>
                  )}
                </For>
              </Show>
            )
          }}
        </div>
      }
    />
  )
}
