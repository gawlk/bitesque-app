import {
  baseBooleanPropsKeysObject,
  classPropToString,
  containerBooleanPropsKeysObject,
  iconBooleanPropsKeysObject,
  interactiveBooleanPropsKeysObject,
  removeProps,
  stylePropToCSSProperties,
} from '/src/components'

interface Props extends MergePropsWithHTMLProps<IconProps> {}

export default (props: Props) => {
  const dynamicProps = removeProps(props, [
    baseBooleanPropsKeysObject,
    containerBooleanPropsKeysObject,
    interactiveBooleanPropsKeysObject,
    iconBooleanPropsKeysObject,
  ])

  const isSpan = createMemo(
    () =>
      !props.icon ||
      typeof props.icon === 'boolean' ||
      (typeof props.icon === 'string' && props.icon.startsWith('<'))
  )

  const isImage = createMemo(() => !isSpan() && typeof props.icon === 'string')

  return (
    <Dynamic
      {...dynamicProps}
      {...(props.style ? { style: stylePropToCSSProperties(props.style) } : {})}
      component={
        isSpan() ? 'span' : isImage() ? 'img' : (props.icon as Solid.Component)
      }
      {...(isImage()
        ? { src: props.icon, loading: 'lazy' }
        : isSpan() && props.icon !== true
        ? { innerHTML: props.icon }
        : {})}
      class={classPropToString([
        (() => {
          switch (props.size) {
            case '2xl':
              return 'h-10 w-10'
            case 'xl':
              return 'h-8 w-8'
            case 'lg':
              return 'h-6 w-6'
            case 'sm':
              return 'h-4 w-4'
            default:
              return 'h-5 w-5'
          }
        })(),

        (() => {
          if (isImage()) {
            return 'rounded-md object-contain'
          } else {
            switch (props.color) {
              case 'primary':
                return 'text-stone-500'
              case 'red':
                return 'text-red-500'
              case 'green':
                return 'text-green-500'
              default:
                return 'text-stone-400'
            }
          }
        })(),

        props.disabled ? 'transition-none' : 'transition duration-200',

        'flex-none',

        props.class,
      ])}
    />
  )
}
