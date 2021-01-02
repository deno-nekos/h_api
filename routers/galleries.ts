import { ServerRequest, Client, OrderBy } from '../deps.ts'

export default async function route (req: ServerRequest, hitomi: Client) {
  const page = isNaN(Number(req.query.get('page'))) ? Number(req.query.get('page')) : 0
  const limit = isNaN(Number(req.query.get('limit'))) ? Number(req.query.get('limit')) : 10
  const orderBy = req.query.get('orderBy') || 'recent'
  const language = req.query.get('language') || 'all'

  if (!['recent', 'popular'].includes(orderBy)) {
    req.respond({
      status: 400,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        success: false,
        message: 'orderBy query not valid (can be \'recent\' or \'popular\')'
      }, null, 2)
    })
  }

  if (!['all', ...await hitomi.getSupportLanguages()].includes(language)) {
    req.respond({
      status: 400,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        success: false,
        message: 'language query not valid (doesn\'t support that language)'
      }, null, 2)
    })
  }

  try {
    const body = await hitomi.listGalleries(
      orderBy === 'recent' ? OrderBy.recent : OrderBy.popular,
      { page, limit, language, checkLang: false })

    req.respond({
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body, null, 2)
    })
  } catch (_) {
    req.respond({
      status: 302,
      headers: new Headers({ 'Location': '?' })
    })
  }
}
