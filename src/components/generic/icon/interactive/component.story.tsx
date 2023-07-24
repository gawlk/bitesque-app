import { IconInteractive, Label } from '/src/components'

import Logo from '/src/assets/svg/logoOrange.svg'

export default () => {
  const solidIconURL = 'https://start.solidjs.com/logo.svg'

  return (
    <Label label="Icon (in Interactive)">
      <IconInteractive icon={Logo} side="left" />

      <IconInteractive icon={Logo} />

      <IconInteractive icon={Logo} side="right" />
    </Label>
  )
}
