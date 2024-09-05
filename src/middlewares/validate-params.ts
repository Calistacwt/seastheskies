import { NavigateFn } from '@tanstack/react-router'

export default function (params: { [keys: string]: string }, navigate: NavigateFn, to: string) {
  if (Object.prototype.hasOwnProperty.call(params, '**')) {
    navigate({ to, replace: true }).catch(console.error)
  }
}
