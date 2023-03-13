import { Dialog, Label } from '/src/components'

export default () => {
  return (
    <Label label="Dialog">
      <Dialog
        button={{
          text: 'key',
        }}
        title="Title"
      />
    </Label>
  )
}
