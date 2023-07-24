import { Button } from '/src/components'

interface Props extends ButtonPropsWithHTMLAttributes {
  onFiles: (files: FileList | null) => Promise<void> | void
  extensions?: string | string[]
}

export default (props: Props) => {
  let inputFile: HTMLInputElement | undefined

  return (
    <Button
      {...mergeProps(
        (props.children
          ? { rightIcon: IconTablerPlus }
          : { icon: IconTablerPlus }) as Props,
        props
      )}
      onClick={() => inputFile?.click()}
    >
      {props.children}
      <input
        class="hidden"
        multiple
        onChange={(event) =>
          props.onFiles((event.target as HTMLInputElement).files)
        }
        accept={
          Array.isArray(props.extensions)
            ? props.extensions.join(', ')
            : props.extensions
        }
        type="file"
        ref={inputFile}
      />
    </Button>
  )
}
