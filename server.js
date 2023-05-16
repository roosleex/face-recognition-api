import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.js';
import signin from './controllers/signin.js';
import image from './controllers/image.js';
import profile from './controllers/profile.js';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '9881',
    database : 'smart-brain'
  }
});
//console.log(db.select().table('user));
// db.select().table('user').then(data => {
//     console.log(data);
// });

const APPNAME = 'face-recognition';
const SERVERPORT = 3000;

const app = express();

// parse req.body
app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
    resp.send('OK');
});

app.get('/profile/:id', (req, resp) => { profile(req, resp, db) });

app.put('/image', (req, resp) => { image(req, resp, db) });

app.post('/signin', (req, resp) => { signin(req, resp, db, bcrypt) });

app.post('/register', (req, resp) => { register(req, resp, db, bcrypt) });

app.listen(SERVERPORT, () => {
    console.log(`App ${APPNAME} is running on port ${SERVERPORT}`);
});