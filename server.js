const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');
const app = express();
const signin = require('./controlers/signin');
const register = require('./controlers/register');
const tasks = require('./controlers/tasks');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'susan',
        password : 'test',
        database : 'tasks'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.post('/tasks', tasks.handleTasks(db));

app.listen(3001 || process.env.PORT, ()=>{
    console.log(`app is running on port  ${process.env.PORT}`);
})