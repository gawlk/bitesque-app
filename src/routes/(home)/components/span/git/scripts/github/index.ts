import { createFetcher } from '/src/scripts'

const isDev = import.meta.env.DEV

const fetcher = createFetcher('https://api.github.com/repos/bitcoin/bitcoin')

export const fetchGithubData = async (
  kind: 'general' | 'commits' | 'latest-release'
) => {
  switch (kind) {
    case 'general':
      return isDev
        ? JSON.parse((await import('./mock/general.json?raw')).default)
        : fetcher.fetchJSON('')
    case 'commits':
      return isDev
        ? JSON.parse((await import('./mock/commits.json?raw')).default)
        : fetcher.fetchJSON('/commits')
    case 'latest-release':
      return isDev
        ? JSON.parse((await import('./mock/latest-realese.json?raw')).default)
        : fetcher.fetchJSON('/releases/latest')
  }
}
