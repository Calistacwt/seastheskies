import { Abilities, Actions } from '@/config/enums'

export type RouteContext = {
  // Content
  title: string
  subTitle?: string
  description?: string
  backPath?: string
  breadcrumbs?: Array<{ path: string; label: string }>
  // permission
  action?: Actions
  ability?: Abilities
  // Guard
  signed?: boolean
  guest?: boolean
}
