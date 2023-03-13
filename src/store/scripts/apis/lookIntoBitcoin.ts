import { createFetcher } from '/src/scripts'

const compute = (json: any, dataIndex: number) => {
  const data = json.response.chart.figure.data[dataIndex]

  return (data.y as (number | null)[]).map((value, index) => ({
    time: data.x[index].split('T')[0],
    ...(typeof value === 'number' ? { value } : {}),
  })) as LightweightCharts.SingleValueData[]
}

export const lookIntoBitcoinFetcher = {
  ...createFetcher('https://www.lookintobitcoin.com/django_plotly_dash/app'),
  fetchRealizedPrice: async function () {
    return compute(
      await this.fetchJSONFromBody('/realized_price/_dash-update-component', {
        output: 'chart.figure',
        outputs: { id: 'chart', property: 'figure' },
        inputs: [
          {
            id: 'url',
            property: 'pathname',
            value: '/charts/realized-price/',
          },
        ],
        changedPropIds: ['url.pathname'],
      }),
      1
    )
  },
  fetchBalancedPrice: async function () {
    return compute(
      await this.fetchJSONFromBody('/price_prediction/_dash-update-component', {
        output: 'chart.figure',
        outputs: { id: 'chart', property: 'figure' },
        inputs: [
          {
            id: 'url',
            property: 'pathname',
            value: '/charts/bitcoin-price-prediction/',
          },
        ],
        changedPropIds: ['url.pathname'],
      }),
      4
    )
  },
  fetchCVDDPrice: async function () {
    return compute(
      await this.fetchJSONFromBody('/price_prediction/_dash-update-component', {
        output: 'chart.figure',
        outputs: { id: 'chart', property: 'figure' },
        inputs: [
          {
            id: 'url',
            property: 'pathname',
            value: '/charts/bitcoin-price-prediction/',
          },
        ],
        changedPropIds: ['url.pathname'],
      }),
      1
    )
  },
  fetchTerminalPrice: async function () {
    return compute(
      await this.fetchJSONFromBody('/price_prediction/_dash-update-component', {
        output: 'chart.figure',
        outputs: { id: 'chart', property: 'figure' },
        inputs: [
          {
            id: 'url',
            property: 'pathname',
            value: '/charts/bitcoin-price-prediction/',
          },
        ],
        changedPropIds: ['url.pathname'],
      }),
      5
    )
  },
  fetchFundingRates: async function () {
    return compute(
      await this.fetchJSONFromBody('/funding_rates/_dash-update-component', {
        output: '..chart.figure...exchange.options...loading-1.style..',
        outputs: [
          { id: 'chart', property: 'figure' },
          {
            id: 'exchange',
            property: 'options',
          },
          { id: 'loading-1', property: 'style' },
        ],
        inputs: [
          {
            id: 'url',
            property: 'pathname',
            value: '/charts/bitcoin-funding-rates/',
          },
          {
            id: 'currency',
            property: 'value',
            value: 'funding_rate_usd',
          },
          { id: 'exchange', property: 'value', value: 'binance' },
        ],
        changedPropIds: ['exchange.value'],
      }),
      1
    )
  },
}
