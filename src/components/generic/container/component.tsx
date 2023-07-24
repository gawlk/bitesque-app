import {
  baseBooleanPropsKeysObject,
  classPropToString,
  containerBooleanPropsKeysObject,
  removeProps,
  stylePropToCSSProperties,
} from '/src/components'

type Props = ContainerPropsWithHTMLAttributes

export default (props: Props) => {
  const dynamicProps = removeProps(props, [
    baseBooleanPropsKeysObject,
    containerBooleanPropsKeysObject,
  ])

  return (
    <Dynamic
      {...mergeProps({ component: 'div' }, dynamicProps)}
      {...(props.style ? { style: stylePropToCSSProperties(props.style) } : {})}
      class={classPropToString([
        // Text color
        (() => {
          switch (props.color) {
            case 'primary':
              return 'text-black'
            case 'red':
              return 'text-red-800'
            case 'green':
              return 'text-green-800'
            default:
              return 'text-white'
          }
        })(),

        // Background color
        (() => {
          switch (props.color) {
            case 'primary':
              return 'bg-white'
            case 'secondary':
              return 'bg-neutral-100'
            case 'red':
              return 'bg-red-200'
            case 'green':
              return 'bg-green-200'
            case 'transparent':
              return 'bg-transparent'
            default:
              return 'bg-black'
          }
        })(),

        // Border width
        (() => {
          if (props.border !== false) {
            switch (props.size) {
              default:
                return 'border'
            }
          }
        })(),

        // Border color
        (() => {
          switch (props.color) {
            case 'primary':
            case 'secondary':
            case 'red':
            case 'green':
              return 'border-transparent'
            case 'tertiary':
              return 'border-transparent hover:border-neutral-600'
            default:
              return 'border-white border-opacity-5'
          }
        })(),

        // Padding
        (() => {
          switch (props.size) {
            case 'xs':
              return (() => {
                switch (props.orientation) {
                  case 'horizontal':
                    return 'px-2 py-1'
                  case 'vertical':
                    return 'px-1 py-2'
                  default:
                    return 'p-1'
                }
              })()
            case 'sm':
              return (() => {
                switch (props.orientation) {
                  case 'horizontal':
                    return 'px-3 py-1.5'
                  case 'vertical':
                    return 'px-1.5 py-3'
                  default:
                    return 'p-1.5'
                }
              })()
            default:
              return (() => {
                switch (props.orientation) {
                  case 'horizontal':
                    return 'px-4 py-2'
                  case 'vertical':
                    return 'px-2 py-4'
                  default:
                    return 'p-2'
                }
              })()
          }
        })(),

        // Roundness
        (() => {
          switch (props.rounded) {
            case 'full':
              return 'rounded-full'
            case 'none':
              return
            default:
              return 'rounded-lg'
          }
        })(),

        // Text size
        (() => {
          switch (props.size) {
            case 'sm':
              return 'text-sm'
            default:
              return 'text-base'
          }
        })(),

        'break-words',

        props.class,
      ])}
    >
      {props.children}
    </Dynamic>
  )
}
