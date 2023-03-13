interface Author {
  npub: string
  raw?: string
  name?: string
  picture?: string
}

type Authors = Map<string, Author>

interface Message extends Nostr.Event {
  author?: Author
}
