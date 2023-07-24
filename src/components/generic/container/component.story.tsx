import { Container, Label } from '/src/components'

export default () => {
  return (
    <Label label="Container">
      <Container>container</Container>

      <Container rounded="full">rounded = full</Container>

      <Container color="transparent">color = transparent</Container>

      <Container title="Bob">title = "Bob"</Container>

      <Container orientation="horizontal">orientation = "horizontal"</Container>

      <Container orientation="vertical">orientation = "vertical"</Container>

      <Container component="button">component = "button"</Container>

      <Container class="border-red-500">class = border-red-500</Container>

      <Container style="border-color: red; color: red">
        style = "border-color: red; color: red"
      </Container>
    </Label>
  )
}
