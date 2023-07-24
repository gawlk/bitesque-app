type ContainerPropsWithHTMLAttributes = MergePropsWithHTMLProps<ContainerProps>

type ContainerProps = ContainerPropsOnly & BaseProps

interface ContainerPropsOnly extends Solid.ParentProps {
  component?: string | Solid.Component

  rounded?: 'full' | 'none'

  orientation?: 'horizontal' | 'vertical' | 'none'

  border?: boolean
}
