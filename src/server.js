import sirv from 'sirv';
import polka from 'polka'
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import bodyParser from 'body-parser'

const FileStore = sessionFileStore(session)

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'
const secret = process.env.SECRET_KEY

polka()
  .use(
    bodyParser.json(),
    session({
      secret: secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 100
      },
      store: new FileStore({
        path: '.sessions'
      })
    }),
    compression({threshold: 0}),
    sirv('static', {dev}),
    sapper.middleware({
      session: (req, res) => {
        return ({
          user: req.session.user
        })}
    })
  )
  .listen(PORT, err => {
    if (err) return console.log('error', err)
  })
