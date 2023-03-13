import { StartClient, mount } from 'solid-start/entry-client'

import { store } from '/src/store'

store.init()

mount(() => <StartClient />, document)
