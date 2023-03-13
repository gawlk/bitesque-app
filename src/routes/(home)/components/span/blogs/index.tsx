import server$ from 'solid-start/server'

import SpanRSS from '../rss'
import { fetchFaviconURLFromURL } from '../scripts'

interface Blog {
  title: string
  description: string
  link: string
  image: string
  posts: Post[]
}

interface Post {
  parent: Blog
  title: string
  description: string
  link: string
  date: Date
}

export default () => {
  const [state, setState] = createStore({
    blogs: [
      {
        visible: true,
        url: 'https://www.lynalden.com/rss',
        data: undefined as Blog | undefined,
      },
      {
        visible: true,
        url: 'https://www.btctimes.com/rss',
        data: undefined as Blog | undefined,
      },
      {
        visible: true,
        url: 'https://www.nobsbitcoin.com/rss/',
        data: undefined as Blog | undefined,
      },
    ],
  })

  return (
    <SpanRSS
      title="Blogs"
      class="bg-cyan-700"
      icon={IconTablerTypography}
      urls={state.blogs
        .filter((podcast) => podcast.visible)
        .map((blog) => blog.url)}
      convertJSONRSSToCellProps={(json) => {
        const blog: Blog = createMutable({
          title: json.title || 'Title',
          description: json.description || 'Description',
          link: json.link || '',
          image: '',
          posts: [],
        })

        const cells = json.items.map((item) => {
          const post: Post = {
            parent: blog,
            title: item.title || 'Title',
            description: item.description || 'Description',
            link: item.link || '',
            date: new Date(item.published || 0),
          }

          return createMutable({
            title: post.title,
            link: post.link,
            image: '',
            date: post.date,
            header: post.parent.title,
          })
        })

        server$(fetchFaviconURLFromURL)(json.link).then((image) => {
          blog.image = image

          cells.forEach((cell) => (cell.image = image))
        })

        return cells
      }}
    />
  )
}
