interface Props {
  isMoving: boolean
  top: string
  minWidth: string
  zIndex?: number
  width?: number
}

export default (props: Props) => {
  return (
    <Show when={props.isMoving}>
      <div
        style={
          props.zIndex
            ? {
                'z-index': props.zIndex,
              }
            : {}
        }
        class="fixed inset-0 flex justify-center"
      >
        <hr
          class="absolute w-full border-dashed border-black/20"
          style={{ top: `calc(${props.top} - 1px)` }}
        />
        <div
          class="h-full border-x border-dashed border-black/20"
          style={{
            // TODO: Fix magical 672
            width: `${(props.width || 672) + 2}px`,
            'min-width': `calc(${props.minWidth} + 2px)`,
          }}
        />
      </div>
    </Show>
  )
}
