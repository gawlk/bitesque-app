import {
  createSelectableList,
  getOrdinalDayFromDayNumber,
  getWeekDayFromDate,
  getWeekDays,
} from '/src/scripts'

import { DialogSelect, Section } from '/src/components'

interface FrequencyOption {
  value: string | number
  label: string
  isDateAConversionDay: IsDateAConversionDay
}

interface Props {
  setter: (isDateAConversionDay: IsDateAConversionDay) => void
}

export const defaultIsDateAConversionDay: IsDateAConversionDay = () => true

export default (props: Props) => {
  const id = 'frequency'

  const maxDays = 28

  const weekDays = getWeekDays()

  const timeFrames = [
    {
      value: 'daily',
      label: 'Every day',
    },
    {
      value: 'weekly',
      label: 'Every week',
      options: {
        selectableList: createSelectableList(
          weekDays.map((label, value): FrequencyOption => {
            value++

            return {
              value,
              label,
              isDateAConversionDay: (date) =>
                label === getWeekDayFromDate(date),
            }
          })
        ),
      },
    },
    {
      value: 'biweekly',
      label: 'Every two weeks',
      options: {
        buttonLabel: 'Pair',
        dialogTitle: 'Select a pair',
        selectableList: createSelectableList(
          [...Array(Math.round(maxDays / 2)).keys()].map(
            (day): FrequencyOption => {
              const day1 = day + 1
              const day2 = day + 15

              return {
                value: `${day1}+${day2}`,
                label: `The ${getOrdinalDayFromDayNumber(
                  day1
                )} and the ${getOrdinalDayFromDayNumber(day2)}`,
                isDateAConversionDay: (date) => {
                  const current = date.getUTCDate()
                  return current === day1 || current === day2
                },
              }
            }
          )
        ),
      },
    },
    {
      value: 'monthly',
      label: 'Every month',
      options: {
        selectableList: createSelectableList(
          [...Array(maxDays).keys()].map((day): FrequencyOption => {
            day++

            return {
              value: day,
              label: `The ${getOrdinalDayFromDayNumber(day)}`,
              isDateAConversionDay: (date) => day === date.getUTCDate(),
            }
          })
        ),
      },
    },
  ]

  const [state, setState] = createStore(
    createSelectableList(timeFrames, {
      selectedIndex: 0,
    })
  )

  createEffect(() =>
    props.setter(
      state.selected?.options?.selectableList.selected?.isDateAConversionDay ||
        defaultIsDateAConversionDay
    )
  )

  return (
    <Section
      id={id}
      number={2}
      title="Frequency"
      description="Secondly you have to decide how often you'd like to convert your fiat money for satoshis. Having it often can be annoying without a dedicated tool but can definitely improve your cost average."
    >
      <div class="space-y-2">
        <DialogSelect
          id={`${id}-choice`}
          button={{
            leftIcon: IconTablerCalendar,
            label: 'Frequency',
            text: state.selected?.label,
            full: true,
          }}
          title="Select a frequency"
          list={{
            selected: state.selected?.value || '',
            values: state.list.map((timeFrame) => ({
              value: timeFrame.value,
              label: timeFrame.label,
            })),
          }}
          onClose={(value?: string) =>
            setState({
              selected:
                state.list.find((timeFrame) => timeFrame.value === value) ??
                null,
            })
          }
        />
        <Show when={state.selected?.options}>
          <DialogSelect
            id={`${id}-option`}
            button={{
              leftIcon: IconTablerAlarm,
              label: state.selected?.options?.buttonLabel || 'Day',
              text: state.selected?.options?.selectableList.selected?.label,
              full: true,
            }}
            title={state.selected?.options?.dialogTitle || `Select a day`}
            list={{
              selected: String(
                state.selected?.options?.selectableList.selected?.value
              ),
              values:
                state.selected?.options?.selectableList.list.map((option) => ({
                  value: String(option.value),
                  label: option.label,
                })) || [],
            }}
            onClose={(value?: string) => {
              const selectedOption =
                state.selected?.options?.selectableList.list?.find(
                  (option) => option.value == value
                )

              if (selectedOption) {
                setState('selected', 'options', 'selectableList', {
                  selected: selectedOption,
                })
              }
            }}
          />
        </Show>
      </div>
    </Section>
  )
}
