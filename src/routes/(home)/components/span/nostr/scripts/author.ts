export const fetchAndUpdateAuthors = async (
  relay: Nostr.Relay,
  authors: Authors
) =>
  (
    await relay.list([
      {
        kinds: [0],
        authors: [...authors.keys()],
      },
    ])
  ).map(({ pubkey, content: rawContent }) => {
    const author = authors.get(pubkey)

    if (author) {
      const { name, picture } = JSON.parse(rawContent)

      author.raw = rawContent
      author.name = name
      author.picture = picture
    }
  })
