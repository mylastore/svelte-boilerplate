require('dotenv').config()

import sirv from 'sirv';
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
const { PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'


polka()
  .use(
    compression({threshold: 0}),
    sirv('static', {dev}),
    cookieParser(),
    (req, res, next) => {
      const token = req.cookies['token']
      const profile = token ? jwt.decode(token) : false
      return sapper.middleware({
        session: () => {
          return {
            user: profile,
            token
          }
        }
      })(req, res, next)
    }
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
