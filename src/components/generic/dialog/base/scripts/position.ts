import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'
import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { type MousePositionInside } from '@solid-primitives/mouse'
import { useWindowSize } from '@solid-primitives/resize-observer'

const fixTransformAxisValue = (value: number, min: number, max: number) => {
  const snapRange = 10

  const capedValue = Math.min(Math.max(value, min), max)

  return Math.abs(capedValue) <= snapRange ? 0 : capedValue
}

export const createAbsolutePositionEffect = (
  dialog: HTMLDialogElement,
  transform: DialogTransform,
  mousePosition: MousePositionInside,
  callback: (x: number, y: number) => void
) => {
  const { x: originMouseX, y: originMouseY } = mousePosition
  const { offsetTop, offsetHeight, offsetWidth } = dialog
  const { innerHeight, innerWidth } = window
  const { x: dialogX, y: dialogY } = transform

  createEffect(() => {
    const { x: currentMouseX, y: currentMouseY } = mousePosition

    const x = dialogX + currentMouseX - originMouseX
    const y = dialogY + currentMouseY - originMouseY

    const maxX = (innerWidth - offsetWidth) / 2
    const minX = -maxX

    const minY = -offsetTop
    const maxY = innerHeight - offsetHeight - offsetTop

    callback(
      fixTransformAxisValue(x, minX, maxX),
      fixTransformAxisValue(y, minY, maxY)
    )
  })
}

export const createRelativePositionEffect = (
  dialog: HTMLDialogElement,
  buttonOpen: HTMLButtonElement
) => {
  const windowSize = useWindowSize()

  let cleanup: (() => void) | undefined

  const [isIntersecting, setIsIntersecting] = createSignal(false)

  createEffect(
    on(
      [isIntersecting, () => [windowSize.height, windowSize.width]],
      ([isIntersecting]) => {
        cleanup?.()

        if (
          isIntersecting &&
          window.getComputedStyle(dialog).position === 'absolute'
        ) {
          cleanup = autoUpdate(buttonOpen, dialog, async () => {
            const { x, y } = await computePosition(buttonOpen, dialog, {
              middleware: [
                offset(4),
                flip(),
                shift({
                  padding: 5,
                }),
              ],
            })

            Object.assign(dialog.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${buttonOpen?.clientWidth}px`,
            })
          })
        }
      }
    )
  )

  createIntersectionObserver(
    [buttonOpen] as unknown as Solid.Accessor<Element[]>,
    ([buttonOpenEntry]) =>
      setIsIntersecting(buttonOpenEntry?.isIntersecting ?? false)
  )

  onCleanup(() => {
    cleanup?.()
  })
}
