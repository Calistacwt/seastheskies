type ProfileMenu = {
  path: string
  icon: string
  label: string
}

const profileMenu: ProfileMenu[] = [
  {
    icon: 'ri-lock-line',
    path: '/auth/change-password',
    label: 'Change Password',
  },
]

export default profileMenu
