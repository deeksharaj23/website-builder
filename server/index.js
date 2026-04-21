import 'dotenv/config'
import { createApp } from './app.js'

const app = createApp()

// Match Vite proxy default (vite.config.js -> 5178)
const port = Number(process.env.PORT || 5178)
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`)
})

