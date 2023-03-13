export const createFetcher = (
  baseUrl: string,
  parameters?: {
    rate?: {
      max: number
      timeout: number
    }
  }
) => {
  const state = {
    timeoutQueue: [] as number[],
  }

  return {
    baseUrl,
    fetch: async function (path: string, init?: RequestInit | undefined) {
      while (state.timeoutQueue.length > (parameters?.rate?.max || 50)) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const timeoutId = setTimeout(() => {
        const index = state.timeoutQueue.findIndex(
          (_timeoutId) => _timeoutId === timeoutId
        )

        index !== -1 && state.timeoutQueue.splice(index, 1)
      }, parameters?.rate?.timeout || 30000) as unknown as number

      state.timeoutQueue.push(timeoutId)

      return fetch(`${baseUrl}${path}`, init)
    },
    fetchText: async function (path: string, init?: RequestInit | undefined) {
      return (await this.fetch(path, init)).text()
    },
    fetchJSON: async function <T>(
      path: string,
      init?: RequestInit | undefined
    ) {
      return (await this.fetch(path, init)).json() as Promise<T>
    },
    fetchJSONFromBody: async function <T>(path: string, body?: Object) {
      return (
        await this.fetch(path, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        })
      ).json() as Promise<T>
    },
  }
}
