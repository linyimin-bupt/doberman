import * as express               from 'express'
import * as session               from 'express-session'
import { adminRrouter           } from './router/admin'
import { login, restrict        } from './router/auth'

const app = express()
app.use(session({
  secret: 'auth manage', 
  cookie: { maxAge: 600000 },
  resave: false,
  saveUninitialized: true,
}))
app.use(express.json())

app.post('/login', login)
app.use('/',restrict, adminRrouter)


app.listen(8888)
