import { Button, Label } from '/src/components'

export default () => {
  return (
    <Label label="Button">
      <Button full onClick={() => console.log('click')}>
        Button full
      </Button>

      <Button
        leftIcon={IconTabler3dCubeSphere}
        onClick={() => console.log('click')}
      >
        Button with left icon
      </Button>

      <Button
        id="labeled-button"
        leftIcon={IconTabler3dCubeSphere}
        full
        label="label"
        onClick={() => console.log('click')}
      >
        <span class="truncate">
          This is a
          veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery
          long text
        </span>
      </Button>

      <Button
        leftIcon={IconTablerHome}
        full
        rightIcon={IconTablerArrowAutofitRight}
        onClick={() => console.log('click')}
      >
        full + both icons
      </Button>

      <Button
        icon={IconTablerHome}
        title="Button with a home icon"
        onClick={() => console.log('click')}
      />

      <Button
        leftIcon={IconTablerHome}
        full
        rightIcon={IconTablerHome}
        onClick={() => console.log('click')}
      >
        <span class="flex-1">full + flex-1</span>
      </Button>
    </Label>
  )
}
