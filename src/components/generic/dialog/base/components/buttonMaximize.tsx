import { Button } from '/src/components'

interface Props {
  maximized: boolean
  onClick: ButtonPropsWithHTMLAttributes['onClick']
}

export default (props: Props) => {
  return (
    <Button
      color="green"
      size="xs"
      icon={
        props.maximized ? IconTablerArrowsMinimize : IconTablerArrowsMaximize
      }
      onMouseDown={(event) => event.stopPropagation()}
      onClick={props.onClick}
      class="ml-4 hidden md:inline-flex"
    />
  )
}
