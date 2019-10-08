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
        // The HTTP method can be configured through the `method` key, and a default
        // header "X-Special-Header" has been configured for this resource
        create: { method: 'post', path: '/posts/create' },
   
        // There are no restrictions for dynamic segments and HTTP methods
        addComment: { method: 'put', path: '/blogs/{id}/comment' },
   
        // `queryParamAlias` will map parameter names to their alias when
        // constructing the query string
        bySubject: { path: '/blogs', queryParamAlias: { subjectId: 'subject_id' } }
      }
    }
  })

  export default client;