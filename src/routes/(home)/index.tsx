import Span from './components/span/base'
import SpanBlogs from './components/span/blogs'
import SpanGit from './components/span/git'
import SpanNOSTR from './components/span/nostr'
import SpanOrdinals from './components/span/ordinals'
import SpanPodcasts from './components/span/podcasts'
import SpanPrice from './components/span/price'
import SpanStacker from './components/span/stacker'

export default () => (
  <main class="h-screen flex-1 grid-rows-4 gap-4 space-y-4 p-4 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-5">
    <SpanPodcasts />

    <SpanGit />

    <SpanBlogs />

    <SpanPrice />

    <SpanNOSTR />

    <SpanStacker />

    <Span
      title="Mempool"
      icon={IconTablerBox}
      class="row-span-2 bg-emerald-800"
      cells={[]}
    >
      Live mempool data https://mempool.space/docs/api/rest time (and block
      time) to halving Sustainble energy https://batcoinz.com/
      https://twitter.com/DSBatten
    </Span>

    <SpanOrdinals />
  </main>
)
