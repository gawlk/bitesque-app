interface Props {
  show?: boolean
  onMouseDown: (direction: DialogResizeDirection) => void
  onDblClick: (dimensions: DialogDimensions) => void
}

export default (props: Props) => {
  return (
    <Show when={props.show}>
      <div
        onMouseDown={() => props.onMouseDown('w')}
        onDblClick={() =>
          props.onDblClick({
            width: undefined,
          })
        }
        class="absolute left-0 bottom-0 mb-4 hidden h-full w-2 cursor-ew-resize md:block"
      />
      <div
        onMouseDown={() => props.onMouseDown('sw')}
        onDblClick={() =>
          props.onDblClick({
            width: undefined,
            height: undefined,
          })
        }
        class="absolute left-0 bottom-0 hidden h-4 w-4 cursor-nesw-resize md:block"
      />
      <div
        onMouseDown={() => props.onMouseDown('s')}
        onDblClick={() => props.onDblClick({ height: undefined })}
        class="absolute bottom-0 hidden h-2 w-[calc(100%-2rem)] cursor-ns-resize md:block"
      />
      <div
        onMouseDown={() => props.onMouseDown('se')}
        onDblClick={() =>
          props.onDblClick({
            width: undefined,
            height: undefined,
          })
        }
        class="absolute right-0 bottom-0 hidden h-4 w-4 cursor-nwse-resize  md:block"
      />
      <div
        onMouseDown={() => props.onMouseDown('e')}
        onDblClick={() => props.onDblClick({ width: undefined })}
        class="absolute right-0 bottom-0 mb-4 hidden h-full w-2 cursor-ew-resize md:block"
      />
    </Show>
  )
}
