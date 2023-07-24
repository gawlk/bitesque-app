import { type MousePositionInside } from '@solid-primitives/mouse'

export const resize = (
  dialog: HTMLDialogElement,
  mousePosition: MousePositionInside,
  transform: DialogTransform,
  direction: DialogResizeDirection,
  setDimensions: (dimensions: DialogDimensions) => void
) => {
  const { x: originMouseX, y: originMouseY } = mousePosition

  const { offsetTop, offsetHeight, offsetWidth } = dialog
  const { innerHeight, innerWidth } = window

  const maxWidth = innerWidth - 2 * Math.abs(transform.x)
  const maxHeight = innerHeight - offsetTop - transform.y

  createEffect(() => {
    const { x: currentMouseX, y: currentMouseY } = mousePosition

    const x =
      direction !== 's'
        ? (currentMouseX - originMouseX) *
          (direction === 'w' || direction === 'sw' ? -2 : 2)
        : 0

    const y =
      direction !== 'w' && direction !== 'e' ? currentMouseY - originMouseY : 0

    setDimensions({
      width: Math.min(offsetWidth + x, maxWidth),
      height: Math.min(offsetHeight + y, maxHeight),
    })
  })
}
