import * as api from 'api'

export async function post (req, res) {
  const user = req.body
  try {
    const response = await api.user.register(user)
    req.session.user = response
    res.end(JSON.stringify(response))
  } catch (err) {
    res.statusCode = err.status || 503
    res.end(JSON.stringify(err))
  }
}
