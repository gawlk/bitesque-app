import { Dialog, Label, StoryDialogSelect } from '/src/components'

export default () => {
  return (
    <Label label="Dialog">
      <Dialog
        button={{
          text: 'key',
        }}
        title="Title"
      >
        Normal dialog
      </Dialog>
      <Dialog title="Moveable" moveable>
        Moveable dialog
      </Dialog>
      <Dialog title="Resizable" resizable>
        Resizable dialog
      </Dialog>
      <Dialog title="Moveable + Resizable" moveable resizable>
        Moveable + Resizable dialog
        <Dialog title="Moveable + Resizable" moveable resizable>
          Moveable + Resizable dialog
          <Dialog title="Moveable + Resizable" moveable resizable>
            Moveable + Resizable dialog
            <Dialog title="Moveable + Resizable" moveable resizable>
              Moveable + Resizable dialog
            </Dialog>
            <StoryDialogSelect />
          </Dialog>
          <Dialog title="Moveable + Resizable" moveable resizable>
            Moveable + Resizable dialog
            <Dialog title="Moveable + Resizable" moveable resizable>
              Moveable + Resizable dialog
            </Dialog>
            <StoryDialogSelect />
          </Dialog>
        </Dialog>
        <StoryDialogSelect />
      </Dialog>
    </Label>
  )
}
