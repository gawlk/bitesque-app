import { Input, Label } from '/src/components'

export default () => {
  const [state, setState] = createStore({
    value1: '',
    value2: 2,
  })

  return (
    <Label label="Input">
      <Input placeholder="Placeholder" />

      <Input placeholder="Readonly" readonly={true} />

      <Input placeholder="Disabled" disabled />

      <Input label="Label" value="value" />

      <Input placeholder="Icon" leftIcon={IconTablerHome} />

      <div class="space-y-1">
        <p>Value updated (passed as prop) on input (debounced by default)</p>
        <div class="flex items-center space-x-2">
          <Input
            placeholder="Value"
            value={state.value1}
            onInput={(value) => setState('value1', value || '')}
          />
          <span>{state.value1}</span>
        </div>
      </div>

      <Input label="Number" value="1" type="number" />

      <Input label="Step" value="1" step="0.5" />

      <div class="flex items-center space-x-2">
        <Input
          label="Min 10"
          step="2"
          value={String(state.value2)}
          min={10}
          onInput={(value) => value && setState('value2', Number(value))}
        />
        <span>{state.value2}</span>
      </div>
    </Label>
  )
}
