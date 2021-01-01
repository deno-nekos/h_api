import { ServerRequest } from '../deps.ts'

export default function route (req: ServerRequest) {
  req.respond({
    status: 200,
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      success: true,
      endpoints: [
        { path: '/', description: 'show endpoints', example: '/', returns: 'this' },
        {
          path: '/gallery/<id: number>',
          description: 'show infomations about gallery', example: '/gallery/1806299',
          returns: 'https://doc.deno.land/https/deno.land/x/hitomi@v0.1.1/mod.ts#GalleryInfo'
        },
        {
          path: '/image/<hash: string>.webp',
          description: 'get webp image binary from hash',
          example: '/image/9d9e063c98ebf1d88f10308c0fb279b236c54fba1cd8de5b85d07b1ddb68c696.webp', returns: 'webp binary'
        }
      ]
    })
  })
}
