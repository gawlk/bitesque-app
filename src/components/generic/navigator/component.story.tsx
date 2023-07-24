import { Button, Label, Navigator } from '/src/components'

export default () => {
  return (
    <Label label="Navigator">
      <Navigator
        default="/"
        list={[
          {
            id: '/',
            component: (props) => (
              <div>
                <Button onClick={() => props.next('/b')}>go to /b</Button>
                <Button disabled={!props.back} onClick={() => props.back?.()}>
                  back
                </Button>
                <Button onClick={() => props.reset()}>reset</Button>
              </div>
            ),
          },
          {
            id: '/b',
            component: (props) => (
              <div>
                <Button onClick={() => props.next('/')}>go to /</Button>
                <Button disabled={!props.back} onClick={() => props.back?.()}>
                  back
                </Button>
              </div>
            ),
          },
        ]}
      />
    </Label>
  )
}
