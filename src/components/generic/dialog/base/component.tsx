import { useMousePosition } from '@solid-primitives/mouse'
import { useWindowSize } from '@solid-primitives/resize-observer'

import {
  createAbsolutePositionEffect,
  createRelativePositionEffect,
  makeClickOutsideEventListener,
  resize,
} from './scripts'

import {
  DialogButtonClose,
  DialogButtonMaximize,
  DialogButtonOpen,
  DialogDivider,
  DialogForm,
  DialogLinesDefaultPosition,
} from './components'

import {
  classPropToString,
  dialogBooleanPropsKeysObject,
  removeProps,
} from '/src/components'

import Backdrop from './components/backdrop'
import Resizers from './components/resizers'

export interface Props
  extends MergePropsWithHTMLProps<
    DialogProps,
    Solid.JSX.DialogHTMLAttributes
  > {}

const md = 768 // Number of pixel for the tailwind's "md" media query to trigger
const top = '10vh'
const minWidth = '20rem'

export default (props: Props) => {
  const [state, setState] = createStore({
    show: false,
    open: false,
    maximized: false,
    action: null as 'moving' | 'resizing' | null,
    value: '',
    transform: {
      x: 0,
      y: 0,
    } as DialogTransform,
    dimensions: {
      width: undefined,
      height: undefined,
    } as DialogDimensions,
    zIndex: 0,
  })

  const dialogProps = removeProps(props, dialogBooleanPropsKeysObject)

  const mousePosition = useMousePosition()

  const isWindowLarge = createMemo(() => useWindowSize().width >= md)
  const isAble = createMemo(() => props.moveable || props.resizable)
  const isRelative = createMemo(() => props.position === 'relative')
  const isModal = createMemo(
    () => isWindowLarge() && !(isRelative() || isAble())
  )

  let dialog: HTMLDialogElement | undefined
  let buttonOpen: HTMLButtonElement | undefined

  let resizeDirection: DialogResizeDirection = 's'

  const [dialogs, setDialogs] = createSignal<HTMLElement | undefined>(undefined)

  const moveToFront = () => {
    const baseZIndex = 100

    const list = dialogs()?.getElementsByTagName('dialog')

    const zIndexes = Array.from(list || [])
      .filter((dialog) => dialog.open)
      .map((dialog) => (Number(dialog.style.zIndex) || baseZIndex) - baseZIndex)

    const maxZIndex = zIndexes.length ? Math.max(...zIndexes) : 0

    setState('zIndex', baseZIndex + maxZIndex + 1)
  }

  const close = (element?: HTMLElement) => {
    const value = String(
      element && 'value' in element ? element.value ?? '' : ''
    )

    setState({
      value: value,
      open: false,
    })
  }

  const onMouseDown = (action: Exclude<typeof state.action, null>) => {
    setState('action', action)

    window.addEventListener('mouseup', () => setState('action', null), {
      once: true,
    })
  }

  const onResizing = (direction: DialogResizeDirection) => {
    if (props.resizable) {
      resizeDirection = direction
      onMouseDown('resizing')
    }
  }

  onMount(() => {
    setDialogs(document.getElementById('dialogs') || undefined)

    createEffect(
      on(
        () => state.action === 'moving',
        (moving) => {
          if (moving && dialog) {
            createAbsolutePositionEffect(
              dialog,
              state.transform,
              mousePosition,
              (x, y) => {
                setState('transform', {
                  x,
                  y,
                })
              }
            )
          }
        }
      )
    )

    createEffect(
      on(
        () => state.action === 'resizing',
        (resizing) => {
          if (resizing && dialog) {
            resize(
              dialog,
              mousePosition,
              state.transform,
              resizeDirection,
              (dimensions) => setState('dimensions', dimensions)
            )
          }
        }
      )
    )

    createEffect(
      on(
        () => state.open,
        (current, previous) => {
          if (!current && previous) {
            props.onClose?.(state.value || undefined)
          }
        }
      )
    )

    createEffect(() => {
      if (isRelative() && dialog && buttonOpen) {
        createRelativePositionEffect(dialog, buttonOpen)
      }
    })

    let clearClickEvent: (() => void) | undefined

    createEffect(() => {
      if (isRelative() && state.open && dialog) {
        clearClickEvent?.()

        clearClickEvent = makeClickOutsideEventListener(dialog, close)
      }
    })

    onCleanup(() => {
      clearClickEvent?.()
    })
  })

  // TODO: Clean child if parent is closed

  return (
    <div class={classPropToString([props.button?.full && 'w-full'])}>
      <DialogButtonOpen
        {...props.button}
        class={[isRelative() && 'md:relative', props.button?.class]}
        title={props.title}
        ref={buttonOpen}
        onClick={(event) => {
          // @ts-ignore
          props.button?.onClick?.(event)

          if (!state.open) {
            moveToFront()

            dialog?.show()

            setState('show', true)
            setTimeout(() => setState('open', true), 50)
          } else {
            close()
          }
        }}
      />

      <Portal mount={dialogs()}>
        <Backdrop
          show={state.show && isModal()}
          open={state.open}
          zIndex={state.zIndex}
        />

        <DialogLinesDefaultPosition
          isMoving={state.action === 'moving'}
          top={top}
          minWidth={minWidth}
          width={state.dimensions.width}
          zIndex={state.zIndex}
        />

        {/* TODO: Use `Container` component here */}
        <dialog
          {...dialogProps}
          // TODO: Change to something else, won't trigger if animations are disabled by a user
          onTransitionEnd={(event) => {
            if (event.target === dialog && !state.open) {
              setState('show', false)
              dialog.close()
            }
          }}
          ref={dialog}
          onMouseDown={(event) => {
            event.stopPropagation()

            moveToFront()
          }}
          style={{
            ...(isWindowLarge() && !isRelative() && !state.maximized
              ? {
                  ...(state.dimensions.width
                    ? {
                        'max-width': `${state.dimensions.width}px`,
                        'min-width': minWidth,
                      }
                    : {}),

                  ...(state.dimensions.height
                    ? {
                        height: '100%',
                        'max-height': `${state.dimensions.height}px`,
                      }
                    : {}),

                  // TODO: Changes to 16 to 1rem
                  transform: `translate(${state.transform.x}px, ${
                    state.transform.y + (!state.open ? 16 : 0)
                  }px)`,

                  top,
                }
              : {}),
            'z-index': state.zIndex,
          }}
          class={classPropToString([
            props.full && 'h-full',

            state.open && 'open:translate-x-0 open:opacity-100',

            props.moveable && 'md:shadow-xl',

            (() => {
              switch (props.position) {
                case 'relative':
                  return 'absolute m-0 min-w-[12rem] space-y-1.5 rounded-xl border-2'
                default:
                  return `${
                    state.maximized || props.position === 'full'
                      ? 'h-full max-h-full'
                      : 'top-auto bottom-0 mt-[5vh] max-h-[95vh] rounded-t-2xl border-t-2 md:mt-0 md:h-fit md:max-h-[32rem] md:max-w-2xl md:rounded-b-2xl md:border-2'
                  } peer fixed w-full max-w-full flex-col space-y-3 open:flex`
              }
            })(),

            (() => {
              switch (props.color) {
                case 'transparent':
                  return 'bg-transparent'
                default:
                  return `bg-white`
              }
            })(),

            state.action || state.maximized ? 'duration-[0ms]' : 'duration-150',

            !!state.action && 'select-none',

            state.maximized && 'top-0',

            'border-black/5 p-0 text-black opacity-0 transition backdrop:bg-transparent motion-reduce:transform-none motion-reduce:transition-none',
          ])}
        >
          <Show when={!isRelative()}>
            <div
              onDblClick={() => {
                if (!state.maximized) {
                  setState('transform', {
                    x: 0,
                    y: 0,
                  })
                }
              }}
              onMouseDown={() => {
                if (!state.maximized && props.moveable) {
                  onMouseDown('moving')
                }
              }}
              class={classPropToString([
                props.moveable && 'md:cursor-move',
                'flex items-center px-4 pt-4 pb-3',
              ])}
            >
              <DialogButtonClose close={close} />
              <h2 class="flex-grow truncate text-center text-xl font-semibold">
                {props.title}
              </h2>
              <span
                class="min-w-0 flex-1 md:hidden"
                style={{
                  'max-width': '2.75rem',
                }}
              />
              <DialogButtonMaximize
                maximized={state.maximized}
                onClick={() => {
                  moveToFront()

                  setState('maximized', (maximized) => !maximized)
                }}
              />
            </div>

            <DialogDivider class="!mt-0" color={props.color} />
          </Show>

          <Show when={props.sticky}>
            {props.sticky}

            <DialogDivider color={props.color} />
          </Show>

          <div
            class={classPropToString([
              (() => {
                if (props.color === 'transparent') return ''

                let classes = '!mt-0 '

                if (isRelative()) {
                  classes += `px-2 `
                  if (props.footer) {
                    classes += 'py-1.5'
                  } else {
                    classes += 'py-2'
                  }
                } else {
                  // TODO: Fix padding mess + pt-4 when nothing other than children
                  classes += 'px-4 py-3'
                  // if (props.footer) {
                  //   classes += 'py-3'
                  // } else {
                  //   classes += 'py-4'
                  // }
                }

                return classes
              })(),

              'relative flex-1 overflow-y-auto',
            ])}
          >
            <Resizers
              show={props.resizable}
              onMouseDown={(direction) => onResizing(direction)}
              onDblClick={(dimensions) => setState('dimensions', dimensions)}
            />

            {props.children}

            <Show when={props.form}>
              <DialogForm close={close}>{props.form}</DialogForm>
            </Show>
          </div>

          <Show when={props.footer}>
            <DialogDivider class="!mt-0" color={props.color} />

            <div class="flex items-center px-4 pb-4">
              <DialogForm close={close}>{props.footer}</DialogForm>
            </div>
          </Show>
        </dialog>
      </Portal>
    </div>
  )
}
