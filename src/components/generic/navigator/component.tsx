interface Props {
  default: string
  list: {
    id: string
    component: (props: NavigatorComponentProps) => Solid.JSX.Element
  }[]
}

export default (props: Props) => {
  const [state, setState] = createStore({
    id: props.default,
    history: [] as string[],
  })

  return (
    <Dynamic
      component={props.list.find((obj) => obj.id === state.id)?.component}
      next={(id: string) =>
        setState({
          id: id,
          history: [...state.history, state.id],
        })
      }
      back={
        state.history.length
          ? () =>
              setState(
                produce((s) => (s.id = s.history.pop() || props.default))
              )
          : undefined
      }
      reset={() =>
        setState(
          produce((s) => {
            s.history.length = 0
            s.id = props.default
          })
        )
      }
    />
  )
}
