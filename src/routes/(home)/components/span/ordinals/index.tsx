import server$ from 'solid-start/server'

import { Button } from '/src/components'

import Span from '../base'
import { fetchOrdinalsPreviews } from '../scripts'

export default () => {
  const [state, setState] = createStore({
    previews: [] as string[],
    index: 6,
  })

  onMount(() => {
    const [_previews, { refetch }] = createResource(
      true,
      server$(fetchOrdinalsPreviews)
    )

    createEffect(() => {
      const previews = _previews()

      untrack(() => {
        if (previews) {
          setState({
            previews: Array.from(new Set([...previews, ...state.previews])),
          })
        }
      })
    })
  })
  return (
    <Span
      title="Ordinals"
      icon={IconTablerPhoto}
      class="relative row-span-2 bg-neutral-700"
    >
      <iframe
        sandbox="allow-scripts"
        // @ts-ignore
        scrolling="no"
        loading="lazy"
        frameborder="0"
        src={state.previews.at(state.index)}
        class="h-full w-full"
      />
      <div class="absolute inset-x-0 bottom-0 flex justify-between p-2">
        <Button onClick={() => setState('index', (i) => i + 1)}>{'<'}</Button>
        <Button onClick={() => setState('index', (i) => i - 1)}>{'>'}</Button>
      </div>
    </Span>
  )
}
