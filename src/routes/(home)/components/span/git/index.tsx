import { fetchGithubData } from './scripts'

import Span from '../base'

// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28
// https://www.coingecko.com/en/coins/bitcoin
// https://repo-tracker.com/r/gh/bitcoin/bitcoin
// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#about-repository-statistics
// https://docs.github.com/en/graphql/guides/forming-calls-with-graphql

// Max 60 calls per hour

// https://api.github.com/repos/bitcoin/bitcoin
// https://api.github.com/repos/bitcoin/bitcoin/issues
// https://api.github.com/repos/bitcoin/bitcoin/releases/latest

// https://www.endorlabs.com/blog/how-to-get-the-most-out-of-github-api-rate-limits

// https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28

// Total number of commits
// Open issues (closed issues)
// Number of contributors
// Merged MR
// Stars

export default () => {
  onMount(async () => {
    console.log(await fetchGithubData('general'))

    // const {
    //   name,
    //   full_name,
    //   stargazers_count,
    //   forks_count,
    //   open_issues_count,
    //   subscribers_count,
    // } = await fetchGithubData('general')

    // const commits = (await (await fetch(
    //   'https://api.github.com/repos/bitcoin/bitcoin'
    // )).json()).map((json: any) => ({
    //   author: {
    //     name: json.author.login,
    //     avatar: json.author.avatar_url,
    //     link: json.author.
    //   }
    // }))
  })

  return (
    <Span
      title="Git"
      icon={IconTablerGitMerge}
      class="row-span-2 bg-amber-700"
      cells={[]}
    >
      github link + stats switch from btc to lightnoing to nostr Github live
      commits + stats eofk-
    </Span>
  )
}
