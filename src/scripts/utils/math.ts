export const average = (values: number[]) =>
  values.reduce((p, c) => (c += p)) / values.length
