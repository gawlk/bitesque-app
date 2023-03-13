import server$ from 'solid-start/server'

import SpanRSS from '../rss'
import { fetchFaviconURLFromURL } from '../scripts'

interface Post {
  title: string
  link: string
  date: Date
  image: string
  comments: string
}

export default () => {
  return (
    <SpanRSS
      title="NEWS"
      class="bg-yellow-600"
      icon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#f5dc72"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      )}
      urls={['https://stacker.news/rss']}
      convertJSONRSSToCellProps={(json) =>
        json.items.map((item) => {
          const post: Post = {
            title: item.title,
            link: item.link,
            date: new Date(item.published || 0),
            image: '',
            comments: item.description || '',
          }

          const cell = createMutable({
            title: post.title,
            link: item.link,
            date: new Date(item.published || 0),
            image: '',
            intersectionCallback: () =>
              server$(fetchFaviconURLFromURL)(item.link).then(
                (image) => (cell.image = image)
              ),
            header: (
              <span class="font-medium lowercase tracking-normal">
                {new URL(post.link).hostname}
              </span>
            ),
            footer: () => {
              const parser = new DOMParser()

              const doc = parser.parseFromString(post.comments, 'text/html')

              const url = [...doc.links].at(0)?.href

              return (
                <Show
                  when={
                    url && new URL(post.link).hostname !== new URL(url).hostname
                  }
                >
                  <a
                    class="underline-offset-1 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={url}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Comments
                  </a>
                </Show>
              )
            },
          })

          return cell
        }) || []
      }
    />
  )
}
