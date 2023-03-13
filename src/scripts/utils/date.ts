export const dateToString = (date: Date) => date.toJSON().split('T')[0]

export const getOrdinalDayFromDayNumber = (day: number) => {
  const rest = (day % 30) % 20

  return `${day}${
    rest === 1 ? 'st' : rest === 2 ? 'nd' : rest === 3 ? 'rd' : 'th'
  }`
}

export const getWeekDayFromDate = (date: Date) =>
  date.toLocaleString('en', {
    weekday: 'long',
  })

export const getMonthFromIndex = (index: number) =>
  new Date(0, index + 1, 0).toLocaleString('en', {
    month: 'long',
  })

export const getWeekDays = () =>
  [...Array(7).keys()].map((index) =>
    getWeekDayFromDate(new Date(0, 0, index + 1))
  )

export const getMonths = () =>
  [...Array(12).keys()].map((index) => getMonthFromIndex(index))

export const getDateBetweenTwoDates = (date1: Date, date2: Date) =>
  new Date((date1.getTime() + date2.getTime()) / 2)
