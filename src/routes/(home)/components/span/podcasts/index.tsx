// https://transmit.tailwindui.com/
import SpanRSS from '../rss'

interface Podcast {
  title: string
  description: string
  link: string
  image: string
  episodes: Episode[]
}

interface Episode {
  parent: Podcast
  title: string
  description: string
  minutes: number
  image: string
  link: string
  date: Date
  data: string
}

const convertDurationToMinutes = (duration: string = '') => {
  const [hours, minutes] = duration
    .split(':')
    .map(Number)
    .map((n) => (isNaN(n) ? 0 : n))

  return hours * 60 + minutes
}

export default () => {
  const [state, setState] = createStore({
    podcasts: [
      {
        visible: true,
        url: 'https://www.whatbitcoindid.com/podcast?format=RSS',
        data: undefined as Podcast | undefined,
      },
      {
        visible: true,
        url: 'https://anchor.fm/s/45563e80/podcast/rss',
        data: undefined as Podcast | undefined,
      },
    ],
  })

  return (
    <SpanRSS
      title="Podcasts"
      class="bg-red-700"
      icon={IconTablerBrandApplePodcast}
      urls={state.podcasts
        .filter((podcast) => podcast.visible)
        .map((podcast) => podcast.url)}
      convertJSONRSSToCellProps={(json) => {
        const podcast: Podcast = {
          title: json.title || 'Title',
          description: json.description || 'Description',
          link: json.link || '',
          image: json.image || '',
          episodes: [],
        }

        return json.items.map((item) => {
          const episode = {
            parent: podcast,
            title: item.title || 'Title',
            description: item.description || 'Description',
            minutes: convertDurationToMinutes(item.itunes_duration),
            image: item.itunes_image?.href || '',
            link: item.link || '',
            date: new Date(item.published || 0),
            data: item.enclosures[0].url || '',
          }

          const cell = createMutable({
            title: episode.title,
            link: episode.link,
            date: episode.date,
            image: '',
            intersectionCallback: () => (cell.image = episode.image),
            header: episode.parent.title,
            footer: () => {
              const hours = Math.floor(episode.minutes / 60)
              const rest = episode.minutes % 60

              return (hours ? `${hours}h` : '') + ` ${rest}mn`
            },
          })

          return cell
        })
      }}
    />
  )
}
