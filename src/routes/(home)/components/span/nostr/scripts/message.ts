export const fetchMessagesFromAuthors = async (
  relay: Nostr.Relay,
  authors: Authors
) =>
  (
    await relay.list([
      {
        kinds: [1],
        authors: [...authors.keys()],
      },
    ])
  ).map((event) => {
    const message: Message = {
      ...event,
      author: authors.get(event.pubkey),
    }

    return message
  })
