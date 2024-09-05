import UrlPattern from 'url-pattern'

export interface MockApi {
  url: string
  method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK'
}

const mockUrls: MockApi[] = [
  {
    url: '/auth/app',
    method: 'POST',
  },
  {
    url: '/auth/login',
    method: 'POST',
  },
  {
    url: '/auth/logout',
    method: 'DELETE',
  },
  {
    url: '/auth/forgot-password',
    method: 'POST',
  },
  {
    url: '/auth/reset-password',
    method: 'POST',
  },
  {
    url: '/auth/setup-password',
    method: 'POST',
  },
  {
    url: '/auth/change-password',
    method: 'POST',
  },
  {
    url: '/profile/me',
    method: 'GET',
  },
]

export default function (path: string, method: MockApi['method']) {
  const mocked = mockUrls.findIndex((mock) => {
    const pattern = new UrlPattern(mock.url)

    return pattern.match(path) && mock.method === method
  })

  return mocked !== -1
}
