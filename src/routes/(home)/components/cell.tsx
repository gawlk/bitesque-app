import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { A } from 'solid-start'

import { getWeekDayFromDate } from '/src/scripts'

import { classPropToString } from '/src/components'

export interface Props {
  title: string
  link: string
  date: Date
  image: string
  intersectionCallback?: () => void
  header?: Solid.JSX.Element
  footer?: Solid.JSX.Element
}

export default (props: Props) => {
  const [state, setState] = createStore({
    imageLoaded: false,
  })

  let link: HTMLAnchorElement | undefined
  let img: HTMLImageElement | undefined

  createEffect(() => {
    if (img) {
      createIntersectionObserver(
        () => [img as Element],
        (entries) =>
          entries.forEach(
            ({ isIntersecting }) =>
              isIntersecting && !props.image && props.intersectionCallback?.()
          ),
        {
          rootMargin: '50%',
        }
      )
    }
  })

  return (
    <div
      onClick={(event) => event.target !== link && link?.click()}
      class="flex cursor-pointer space-x-2 rounded-lg bg-white bg-opacity-10 p-2 leading-tight hover:bg-opacity-20"
    >
      <div class="inline-block h-10 w-10 flex-none rounded-lg bg-white/10">
        <img
          ref={img}
          src={props.image}
          onLoad={() => setState('imageLoaded', true)}
          class={classPropToString([
            state.imageLoaded ? 'opacity-85' : 'opacity-0',
            'h-full w-full rounded-md object-cover shadow transition-opacity',
          ])}
          loading="lazy"
        />
      </div>
      <span class="w-full min-w-0 space-y-0.5">
        <span class="block truncate text-xs font-semibold uppercase tracking-wider text-white/60">
          {props.header}
        </span>
        <A
          class="block break-words font-medium"
          href={props.link}
          rel="noopener noreferrer"
          target="_blank"
          ref={link}
          innerHTML={props.title}
        />
        <span class="block text-xs font-medium text-white/60">
          <span class="flex justify-between">
            <span class="block text-xs font-medium text-white/60">
              {() => {
                const { date } = props

                const today = new Date()
                today.setHours(23, 59, 59, 59)

                const diff =
                  (today.getTime() - date.getTime()) / 1000 / 60 / 60 / 24

                return diff <= 1
                  ? 'Today'
                  : diff <= 7
                  ? getWeekDayFromDate(date)
                  : date.toLocaleDateString(undefined, {
                      month: 'short',
                      day: '2-digit',
                      year: '2-digit',
                    })
              }}
            </span>
            <span class="block text-xs font-medium text-white/60">
              {props.footer}
            </span>
          </span>
        </span>
      </span>
    </div>
  )
}
