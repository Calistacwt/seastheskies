import auth from '@/services/auth'
import user from '@/services/user'

const rootServices = {
  reducers: {
    // auth
    [auth.reducerPath]: auth.reducer,

    // user
    [user.reducerPath]: user.reducer,
  },
  middlewares: [
    // auth
    auth.middleware,

    // user
    user.middleware,
  ],
}

export default rootServices
