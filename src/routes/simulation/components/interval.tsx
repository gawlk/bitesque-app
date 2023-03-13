import { DialogDate, Section } from '/src/components'

interface Props {
  setter: (start: Date, end: Date) => void
}

export const defaultEnd = new Date(new Date().getFullYear(), 0, 0, 0, 0)

export const defaultStart = new Date(new Date().getFullYear() - 5, 0, 0, 0, 0)

export default (props: Props) => {
  const id = 'interval'
  const max = new Date(defaultEnd)
  const min = new Date(0)

  const [state, setState] = createStore({
    start: defaultStart,
    end: defaultEnd,
  })

  createEffect(() => {
    props.setter(state.start, state.end)
  })

  return (
    <Section
      id={id}
      title="Interval"
      description="Select an interval here"
      number={3}
    >
      <div class="space-y-2">
        <For
          each={[
            {
              key: 'start' as 'start' | 'end',
              icon: IconTablerArrowBarRight,
              label: 'Start',
              title: 'Starting date',
              default: defaultStart,
            },
            {
              key: 'end' as 'start' | 'end',
              icon: IconTablerArrowBarToRight,
              label: 'End',
              title: 'Ending date',
              default: defaultEnd,
            },
          ]}
        >
          {(obj) => (
            <DialogDate
              id={`${id}-${obj.key}`}
              button={{
                leftIcon: obj.icon,
                label: obj.label,
                full: true,
                text: state[obj.key]
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
              }}
              title={obj.title}
              value={state[obj.key]}
              reset={{
                default: obj.default,
                callback: () => setState(obj.key, obj.default),
              }}
              max={max}
              min={min}
              onClose={(value) => {
                if (value) {
                  setState(obj.key, new Date(value))
                }
              }}
            />
          )}
        </For>
      </div>
    </Section>
  )
}
