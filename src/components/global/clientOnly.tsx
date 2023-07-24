export default (props: Solid.ParentProps) => {
  const [render, setRender] = createSignal(false)

  onMount(() => {
    setRender(true)
  })

  return <Show when={render()}>{props.children}</Show>
}
