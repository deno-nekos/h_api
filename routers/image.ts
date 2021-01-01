import { ServerRequest, Client, hashProcess, getSubdomainFromHash } from '../deps.ts'

export default async function route (req: ServerRequest, hitomi: Client) {
  const [, hashraw] = req.match
  const hash = hashraw.split('.')[0]

  try {
    const phash = hashProcess(hash)
    const subdomain = getSubdomainFromHash(phash)

    const body = await hitomi.getImage('https://' + subdomain + 'a.hitomi.la/webp/' + phash.raw + '.webp')
    const buffer = await body.arrayBuffer()
    const bytes = new Deno.Buffer(buffer).bytes()

    req.respond({
      status: 200,
      headers: new Headers({ 'Content-Type': 'image/webp' }),
      body: bytes
    })
  } catch (error) {
    req.respond({
      status: 302,
      headers: new Headers({ 'Location': '?' })
    })
  }
}
