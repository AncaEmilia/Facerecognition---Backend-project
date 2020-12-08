import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();

const database = {
    user: [
        {
            id:'123',
            name:'maia',
            email:'maia@gmail.com',
            password:'crochete',
            entries: 0,
            joined: new Date()

        },
        {
            id:'124',
            name:'teo',
            email:'teo@gmail.com',
            password:'cartofi',
            entries: 0,
            joined: new Date()

        }

    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'maia@gmail.com'
        }   
    ]
}

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send(database.user);
})

app.post('/signin', (req, res) => {
    // bcrypt.compare("password", 'hash', function(err, res) {
    //     console.log(res);
    // });
    // bcrypt.compare("password", 'hash', function(err, res) {
    //     console.log(res);
    // });

    if(req.body.email === database.user[0].email && 
       req.body.password === database.user[0].password) {
       res.json(database.user[0]);    
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} =req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //    console.log(hash);
    // });
    database.user.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.user[database.user.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.user.forEach(user => {
        if(user.id === id) {
            found= true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.user.forEach(user => {
        if(user.id === id) {
            found=true;
            user.entries++
            return res.json(user.entries);
        }
    })
        if(!found) {
            res.status(404).json('not found');
        }
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})