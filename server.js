const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');
const pg = require('pg');
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
app.get('/tasks', tasks.getTasks(db));
app.get('/tasks/:id', tasks.getTask(db));
app.post('/tasks', tasks.addTask(db));
app.delete('./tasks/:id', tasks.deleteTask(db));
app.put('./tasks/:id', tasks.updateTask(db));

app.listen(3001 || process.env.PORT, ()=>{
    console.log(`app is running on port  ${process.env.PORT}`);
})