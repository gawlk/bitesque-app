export const localStorageSetItem = (id?: string, value?: string) => {
  if (id) {
    value ? localStorage.setItem(id, value) : localStorage.removeItem(id)
  }
}
