import { ServerRequest, Client } from '../deps.ts'

export default async function route (req: ServerRequest, hitomi: Client) {
  const [, idraw] = req.match
  const id = Number(idraw)

  if (isNaN(id)) {
    req.respond({
      status: 400,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ success: false, message: 'provied id not valid (is it number?)' }, null, 2)
    })
    return
  }

  try {
    const body = await hitomi.getGalleryInfo(id)
    const modfiles = []

    for (const file of body.files) {
      const { url, hash,...etc } = file
      modfiles.push({ 
        url: new URL('/image/' + hash + '.webp', 'http://' + req.headers.get('Host')).toString(),
        hash,
        ...etc
      })
    }

    body.files = modfiles

    req.respond({
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body, null, 2)
    })
  } catch (error) {
    req.respond({
      status: 502,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ sucess: false, message: 'internal server error: ' + error.message }, null, 2)
    })
  }
}
