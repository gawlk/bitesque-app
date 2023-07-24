import { Icon, Label } from '/src/components'

import Logo from '/src/assets/svg/logoOrange.svg'

export default () => {
  const solidIconURL = 'https://start.solidjs.com/logo.svg'

  return (
    <Label label="Icon">
      <Icon />

      <Icon icon={IconTabler123} />

      <Icon icon={IconTabler123} color="red" />

      <Icon icon={Logo} title="Logo" />

      <Icon icon={solidIconURL} />

      <Icon icon={solidIconURL} size="lg" />

      <Icon icon={solidIconURL} size="xl" />

      <Icon icon={solidIconURL} size="2xl" />
    </Label>
  )
}
