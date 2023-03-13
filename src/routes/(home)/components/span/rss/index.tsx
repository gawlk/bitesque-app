import { ReactiveMap } from '@solid-primitives/map'
import server$ from 'solid-start/server'

import { Props as CellProps } from '../../cell'
import Span, { Props as SpanProps } from '../base'
import { fetchRSSJSONFromURL } from '../scripts'

interface Props extends Omit<SpanProps, 'cells'> {
  urls: string[]
  convertJSONRSSToCellProps: (
    json: Awaited<ReturnType<typeof fetchRSSJSONFromURL>>
  ) => CellProps[]
}

export default (props: Props) => {
  const cells = new ReactiveMap<string, CellProps[]>()

  onMount(() =>
    createEffect(() =>
      props.urls.map((url) => {
        const [_json, { refetch }] = createResource(
          url,
          server$(fetchRSSJSONFromURL)
        )

        const id = setInterval(() => refetch(), 60 * 60 * 1000)

        onCleanup(() => {
          clearInterval(id)
        })

        createEffect((previousNumberOfItems) => {
          const json = _json()

          const currentNumberOfItems = json?.items.length

          if (
            json &&
            currentNumberOfItems &&
            previousNumberOfItems !== currentNumberOfItems
          ) {
            untrack(async () =>
              cells.set(url, await props.convertJSONRSSToCellProps(json))
            )
          }

          return currentNumberOfItems
        }, 0)
      })
    )
  )

  return (
    <Span
      title={props.title}
      icon={props.icon}
      cells={[...cells.values()].flat()}
      class={[props.class, 'row-span-3']}
    />
  )
}
