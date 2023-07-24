interface NavigatorComponentProps {
  next: (id: string) => void
  reset: () => void
  back?: () => void
}
