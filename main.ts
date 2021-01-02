import rootRoute from './routers/root.ts'
import imageRoute from './routers/image.ts'
import galleryRoute from './routers/gallery.ts'
import galleriesRoute from './routers/galleries.ts'

import { createApp, Client } from './deps.ts'

const port = Number(Deno.env.get('PORT')) || 8080
const hitomi = new Client()
const app = createApp()

app.get('/', rootRoute)
app.get('/galleries', async (req) => await galleriesRoute(req, hitomi))
app.get(/^\/image\/(.+)/, async (req) => await imageRoute(req, hitomi))
app.get(/^\/gallery\/(.+)/, async (req) => await galleryRoute(req, hitomi))

app.listen({ port })
