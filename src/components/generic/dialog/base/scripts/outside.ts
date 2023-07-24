import { makeEventListener } from '@solid-primitives/event-listener'

export const makeClickOutsideEventListener = (
  dialog: HTMLDialogElement,
  close: () => void
) =>
  makeEventListener(
    document.body,
    'click',
    (event) => {
      if (dialog) {
        const { pageX, pageY } = event
        const { top, right, bottom, left } = dialog.getBoundingClientRect()

        if (pageX < left || pageY < top || pageX > right || pageY > bottom) {
          let element = event.target as HTMLElement | null

          while (element && element !== dialog && element !== document.body) {
            element = element.parentElement
          }

          setTimeout(() => element !== dialog && close(), 1)
        }
      }
    },
    { passive: true }
  )
