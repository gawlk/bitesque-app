type IsDateAConversionDay = (date: Date) => boolean

interface Fiat {
  currency: Currency
  initial: number
  recurrent: number
}
