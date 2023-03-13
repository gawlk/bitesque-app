export const priceToUSLocale = (price: number) => numberToUSLocale(price, 2)

export const percentageToUSLocale = (percentage: number) =>
  numberToUSLocale(percentage, 1)

const numberToUSLocale = (value: number, digits: number) =>
  value.toLocaleString('en-us', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
