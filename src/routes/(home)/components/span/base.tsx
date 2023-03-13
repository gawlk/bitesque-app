import { classPropToString } from '/src/components'

import Cell, { Props as CellProps } from '../cell'

export interface Props extends Solid.ParentProps {
  title: string
  icon: IconProp
  cells?: CellProps[]
  class: ClassProp
}

export default (props: Props) => {
  return (
    <div
      class={classPropToString([
        'flex flex-col overflow-hidden rounded-xl bg-opacity-25',
        props.class,
      ])}
    >
      <div class="flex justify-between bg-white/5 p-2 pb-1.5">
        <div class="flex items-center">
          <div class="p-2">
            <Dynamic
              component={props.icon as any}
              class="h-6 w-6 text-white/80"
            />
          </div>
          <span
            class="mt-[1px] text-lg font-bold uppercase tracking-wide"
            title={props.title}
          >
            {props.title}
          </span>
        </div>
        <button class="rounded-lg bg-white bg-opacity-10 p-2 hover:bg-opacity-20">
          <IconTablerSettings class="h-6 w-6 text-white/80" />
        </button>
      </div>
      <hr class="border-t-2 border-t-black/10" />
      <Show when={props.cells}>
        <div class="space-y-2 overflow-y-auto p-2 text-sm scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-white/50">
          <For
            each={props.cells?.sort(
              (cellA, cellB) => cellB.date.getTime() - cellA.date.getTime()
            )}
          >
            {(cell) => <Cell {...cell} />}
          </For>
        </div>
      </Show>
      {props.children}
    </div>
  )
}
