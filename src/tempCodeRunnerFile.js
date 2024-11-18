import express, { json } from 'express' 
import { artistRouter } from './routes/artists'


const app = express()
app.use(json())
app.disable('x-powered-by')


app.use('/artist', artistRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})