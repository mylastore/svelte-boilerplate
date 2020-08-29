import * as api from "api";

export async function post (req, res) {
    try {
        await api.user.logout()
        delete req.session.user
        res.end(JSON.stringify({ message: 'success!' }))
    } catch (err) {
        res.statusCode = err.status
        res.end(JSON.stringify(err))
    }
}
