import forge from 'mappersmith';
import EncodeJson from 'mappersmith/middleware/encode-json'

const client = forge({
    host: 'http://localhost:5000',
    middleware: [ EncodeJson ],
    resources: {
      User: {
        create: { method: 'post', path: '/users/create' },
        login: { method: 'post', path: '/users/login' },
        logout: { method: 'post', path: '/users/logout' }
      },
      Post: {
        create: { method: 'post', path: '/posts/create' },
      }
    }
  })

  export default client;