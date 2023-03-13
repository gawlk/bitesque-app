export const createSelectableList = <T, L extends T[] = T[]>(
  list: L,
  parameters: {
    selected?: L[number]
    selectedIndex?: number | null
  } = {}
): SelectableList<L[number], L> => {
  const selected = parameters?.selected

  return {
    selected:
      typeof parameters.selected === 'number' &&
      list.includes(selected as L[number])
        ? (selected as L[number])
        : getValueFromIndexInList(parameters.selectedIndex || 0, list),
    list,
    selectIndex: function (index: number | null) {
      this.selected = getValueFromIndexInList(index, this.list)
    },
    getSelectedIndex: function () {
      const index = this.list.indexOf(this.selected as L[number])

      return index === -1 ? null : index
    },
  }
}

export const getIndexOfSelectedInSelectableList = <T, L extends T[] = T[]>(
  sl: SelectableList<T, L>
) => (sl.selected ? sl.list.indexOf(sl.selected) : null)

const getValueFromIndexInList = <T, L extends T[] = T[]>(
  index: number | null,
  list: L
) => (index !== null && list.length > 0 ? list.at(index) || list[0] : null)
