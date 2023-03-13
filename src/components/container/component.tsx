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
            default:
              return 'text-white'
          }
        })(),

        // Background color
        (() => {
          switch (props.color) {
            case 'primary':
              return 'bg-white'
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
              return 'border-white'
            case 'tertiary':
              return 'border-black hover:border-neutral-600'
            default:
              return 'border-neutral-600'
          }
        })(),

        // Padding
        (() => {
          switch (props.size) {
            case 'sm':
              return (() => {
                switch (props.padding) {
                  case 'horizontal':
                    return 'px-3 py-1.5'
                  case 'vertical':
                    return 'px-1.5 py-3'
                  case 'square':
                    return 'p-1.5'
                }
              })()
            default:
              return (() => {
                switch (props.padding) {
                  case 'horizontal':
                    return 'px-4 py-2'
                  case 'vertical':
                    return 'px-2 py-4'
                  case 'square':
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
