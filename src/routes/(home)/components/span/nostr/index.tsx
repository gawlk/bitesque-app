import { ReactiveMap } from '@solid-primitives/map'
import { nip19, relayInit } from 'nostr-tools'

import { fetchAndUpdateAuthors, fetchMessagesFromAuthors } from './scripts'

import { Props as CellProps } from '../../cell'
import Span from '../base'

export default () => {
  const cells = new ReactiveMap<string, CellProps>()

  onMount(async () => {
    console.log('mount')

    const relay = relayInit('wss://relay.damus.io')

    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })

    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    await relay.connect()

    const authors: Authors = new Map()

    const npubs = [
      'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m', // Jack
      'npub1a2cww4kn9wqte4ry70vyfwqyqvpswksna27rtxd8vty6c74era8sdcw83a', // Lyn Alden
      'npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx', // Odell
    ]

    npubs.map((npub) =>
      authors.set(String(nip19.decode(npub).data), {
        npub,
      })
    )

    await fetchAndUpdateAuthors(relay, authors)

    const messages = await fetchMessagesFromAuthors(relay, authors)

    console.log(messages)

    messages.map((message) => {
      cells.set(message.id, {
        title: message.content,
        image: message.author?.picture || '',
        link: '',
        header: message.author?.name,
        date: new Date(message.created_at * 1000),
      })
    })

    // const subscription = relay.sub([
    //   {
    //     since: new Date().getTime(),
    //     kinds: [1],
    //     authors,
    //   },
    // ])

    // subscription.on('event', (event: Event) => {
    //   console.log('we got the event we wanted:', event)
    // })

    // subscription.on('eose', () => {
    //   subscription.unsub()
    // })
  })

  return (
    <Span
      title="nostr"
      class="row-span-3 bg-purple-900"
      icon={IconTablerFeather}
      cells={[...cells.values()]}
    />
  )
}
