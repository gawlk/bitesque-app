// import {
//   IconTablerCurrency,
//   IconTablerCurrencyBahraini,
//   IconTablerCurrencyBaht,
//   IconTablerCurrencyDinar,
//   IconTablerCurrencyDirham,
//   IconTablerCurrencyDollar,
//   IconTablerCurrencyDollarAustralian,
//   IconTablerCurrencyDollarCanadian,
//   IconTablerCurrencyDollarSingapore,
//   IconTablerCurrencyEuro,
//   IconTablerCurrencyForint,
//   IconTablerCurrencyFrank,
//   IconTablerCurrencyKroneCzech,
//   IconTablerCurrencyKroneDanish,
//   IconTablerCurrencyKroneSwedish,
//   IconTablerCurrencyLira,
//   IconTablerCurrencyNaira,
//   IconTablerCurrencyPound,
//   IconTablerCurrencyReal,
//   IconTablerCurrencyRenminbi,
//   IconTablerCurrencyRiyal,
//   IconTablerCurrencyRubel,
//   IconTablerCurrencyRupee,
//   IconTablerCurrencyShekel,
//   IconTablerCurrencyTaka,
//   IconTablerCurrencyWon,
//   IconTablerCurrencyYen,
//   IconTablerCurrencyZloty,
// } from '@tabler/icons-solidjs'

export const findCurrency = (symbol: string) =>
  currencies.find((currency) => currency.symbol === symbol) || currencies[0]

export const currencies = (
  [
    {
      symbol: 'AED',
      name: 'United Arab Emirates Dirham',
      icon: IconTablerCurrencyDirham,
    },
    {
      symbol: 'ARS',
      name: 'Argentine Peso',
    },
    {
      symbol: 'AUD',
      name: 'Australian Dollar',
      icon: IconTablerCurrencyDollarAustralian,
    },
    {
      symbol: 'BDT',
      name: 'Bangladeshi Taka',
      icon: IconTablerCurrencyTaka,
    },
    {
      symbol: 'BHD',
      name: 'Bahraini Dinar',
      icon: IconTablerCurrencyBahraini,
    },
    {
      symbol: 'BMD',
      name: 'Bermudian Dollar',
    },
    {
      symbol: 'BRL',
      name: 'Brazil Real',
      icon: IconTablerCurrencyReal,
    },
    {
      symbol: 'CAD',
      name: 'Canadian Dollar',
      icon: IconTablerCurrencyDollarCanadian,
    },
    {
      symbol: 'CHF',
      name: 'Swiss Franc',
      icon: IconTablerCurrencyFrank,
    },
    {
      symbol: 'CLP',
      name: 'Chilean Peso',
    },
    {
      symbol: 'CNY',
      name: 'Chinese Yuan',
      icon: IconTablerCurrencyRenminbi,
    },
    {
      symbol: 'CZK',
      name: 'Czech Koruna',
      icon: IconTablerCurrencyKroneCzech,
    },
    {
      symbol: 'DKK',
      name: 'Danish Krone',
      icon: IconTablerCurrencyKroneDanish,
    },
    {
      symbol: 'EUR',
      name: 'Euro',
      icon: IconTablerCurrencyEuro,
    },
    {
      symbol: 'GBP',
      name: 'British Pound Sterling',
      icon: IconTablerCurrencyPound,
    },
    {
      symbol: 'HKD',
      name: 'Hong Kong Dollar',
    },
    {
      symbol: 'HUF',
      name: 'Hungarian Forint',
      icon: IconTablerCurrencyForint,
    },
    {
      symbol: 'IDR',
      name: 'Indonesian Rupiah',
    },
    {
      symbol: 'ILS',
      name: 'Israeli New Shekel',
      icon: IconTablerCurrencyShekel,
    },
    {
      symbol: 'INR',
      name: 'Indian Rupee',
      icon: IconTablerCurrencyRupee,
    },
    {
      symbol: 'JPY',
      name: 'Japanese Yen',
      icon: IconTablerCurrencyYen,
    },
    {
      symbol: 'KRW',
      name: 'South Korean Won',
      icon: IconTablerCurrencyWon,
    },
    {
      symbol: 'KWD',
      name: 'Kuwaiti Dinar',
      icon: IconTablerCurrencyDinar,
    },
    {
      symbol: 'LKR',
      name: 'Sri Lankan Rupee',
    },
    {
      symbol: 'MMK',
      name: 'Burmese Kyat',
    },
    {
      symbol: 'MXN',
      name: 'Mexican Peso',
    },
    {
      symbol: 'MYR',
      name: 'Malaysian Ringgit',
    },
    {
      symbol: 'NGN',
      name: 'Nigerian Naira',
      icon: IconTablerCurrencyNaira,
    },
    {
      symbol: 'NOK',
      name: 'Norwegian Krone',
      icon: IconTablerCurrencyKroneSwedish,
    },
    {
      symbol: 'NZD',
      name: 'New Zealand Dollar',
    },
    {
      symbol: 'PHP',
      name: 'Philippine Peso',
    },
    {
      symbol: 'PKR',
      name: 'Pakistani Rupee',
    },
    {
      symbol: 'PLN',
      name: 'Polish Zloty',
      icon: IconTablerCurrencyZloty,
    },
    {
      symbol: 'RUB',
      name: 'Russian Ruble',
      icon: IconTablerCurrencyRubel,
    },
    {
      symbol: 'SAR',
      name: 'Saudi Riyal',
      icon: IconTablerCurrencyRiyal,
    },
    {
      symbol: 'SEK',
      name: 'Swedish Krona',
    },
    {
      symbol: 'SGD',
      name: 'Singapore Dollar',
      icon: IconTablerCurrencyDollarSingapore,
    },
    {
      symbol: 'THB',
      name: 'Thai Baht',
      icon: IconTablerCurrencyBaht,
    },
    {
      symbol: 'TRY',
      name: 'Turkish Lira',
      icon: IconTablerCurrencyLira,
    },
    {
      symbol: 'TWD',
      name: 'New Taiwan Dollar',
    },
    {
      symbol: 'UAH',
      name: 'Ukrainian hryvnia',
    },
    {
      symbol: 'USD',
      name: 'US Dollar',
      icon: IconTablerCurrencyDollar,
    },
    {
      symbol: 'VEF',
      name: 'Venezuelan bolívar fuerte',
    },
    {
      symbol: 'VND',
      name: 'Vietnamese đồng',
    },
    {
      symbol: 'ZAR',
      name: 'South African Rand',
    },
    {
      symbol: 'XDR',
      name: 'IMF Special Drawing Rights',
    },
  ] as RawCurrency[]
).map(
  (currency): Currency => ({
    icon: IconTablerCurrency,
    ...currency,
  })
)
