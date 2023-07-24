import {
  Icon,
  iconInteractiveBooleanPropsKeysObject,
  removeProps,
} from '/src/components'

interface Props extends MergePropsWithHTMLProps<IconInteractiveProps> {}

export default (props: Props) => {
  const iconProps = removeProps(props, iconInteractiveBooleanPropsKeysObject)

  return (
    <Icon
      {...iconProps}
      class={[
        (() => {
          switch (props.size) {
            case 'xs':
              switch (props.side) {
                case 'left':
                  return '-ml-0.5 mr-0.5'
                case 'right':
                  return 'ml-0.5 -mr-0.5'
                default:
                  return
              }
            case 'sm':
              switch (props.side) {
                case 'left':
                  return '-ml-1 mr-1'
                case 'right':
                  return 'ml-1 -mr-1'
                default:
                  return
              }
            default:
              switch (props.side) {
                case 'left':
                  return '-ml-1.5 mr-1.5'
                case 'right':
                  return 'ml-1.5 -mr-1.5'
                default:
                  return 'm-0.5'
              }
          }
        })(),

        props.class,
      ]}
    />
  )
}
