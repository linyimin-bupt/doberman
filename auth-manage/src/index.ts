import * as express from 'express'
import { adminRrouter } from './router/admin'
const app = express()

app.use(express.json())
app.use('/', adminRrouter)

app.listen(8888)
