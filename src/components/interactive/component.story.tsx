import { Interactive, Label } from '/src/components'

export default () => {
  return (
    <Label label="Interactive">
      {/* Interactive have `display: inline-flex` which would display non full Interactive beside each other, to avoid this we wrap some in divs */}

      <Interactive>interactive</Interactive>

      <Interactive full>full</Interactive>

      <Interactive full center>
        full + center
      </Interactive>

      <Interactive label="label">labeled</Interactive>

      <div>
        <Interactive icon={IconTabler123}>icon</Interactive>
      </div>

      <div>
        <Interactive leftIcon={IconTabler123}>left icon</Interactive>
      </div>

      <div>
        <Interactive rightIcon={IconTabler123}>right icon</Interactive>
      </div>

      <div>
        <Interactive leftIcon={IconTabler123} rightIcon={IconTabler123}>
          left + right icon
        </Interactive>
      </div>

      <Interactive leftIcon={IconTablerHome} full rightIcon={IconTablerHome}>
        full
      </Interactive>

      <Interactive leftIcon={IconTablerHome} full rightIcon={IconTablerHome}>
        <span class="flex-1">full + flex-1</span>
      </Interactive>

      <Interactive leftIcon={IconTablerHome} full rightIcon={IconTablerHome}>
        <span class="flex-1 text-center"> full + flex-1 + text-center </span>
      </Interactive>

      <Interactive leftIcon={IconTablerHome} full rightIcon={IconTablerHome}>
        <span class="flex-1 text-right">full + flex-1 + text-right</span>
      </Interactive>

      <div>
        <Interactive class="text-amber-300" leftIcon={IconTabler123}>
          icon + class
        </Interactive>
      </div>

      <div>
        <Interactive leftIconClass="text-blue-300" leftIcon={IconTabler123}>
          icon + icon class
        </Interactive>
      </div>

      <div>
        <Interactive
          class="text-red-300"
          leftIconClass="text-green-300"
          leftIcon={IconTabler123}
        >
          icon + class + icon class
        </Interactive>
      </div>

      <div>
        <Interactive disabled>disabled</Interactive>
      </div>
    </Label>
  )
}
