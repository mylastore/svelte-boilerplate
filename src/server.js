import sirv from 'sirv';
import helmet from 'helmet';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import bodyParser from 'body-parser'
import polka from 'polka'

const FileStore = sessionFileStore(session)

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'
const secretKey = process.env.SECRET_KEY

polka()
    .use(
        bodyParser.json(),
        session({
            secret: secretKey,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3600000 // 1hr
            },
            store: new FileStore({
                path: '.sessions'
            })
        }),
        helmet({
            directives: {
                defaultSrc: [`'self'`],
                reportUri: `/api/csp/report`
            },
            contentSecurityPolicy: {
                reportOnly: true
            }
        }),
        compression({threshold: 0}),
        sirv('static', {dev}),
        sapper.middleware({
            session: req => ({
                user: req.session && req.session.user
            })
        })
    )
    .listen(PORT, err => {
        if (err) return console.log('error', err)
    })
