import { useLocation } from 'solid-start'

export const addLocationToID = (id: string) =>
  `${useLocation().pathname.slice(1) || 'home'}-${id}`
