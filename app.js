const express = require('express');
const jwt = require('jsonwebtoken');
const keyStore = require('./keystore');
const userStore = require('./userstore');
const constants = require('./constants');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// login
app.post('/login', (req, res) => {
    let loginResult = login(req);
    if (loginResult) {
        jwt.sign({ loginResult }, keyStore.key, { expiresIn: '30s' }, (err, token) => {
            
            if (err) {
                res.json({ message: constants.AUTH_ERROR });
            }
            res.json({ token });

        });

    } else {
        res.json({ message: constants.AUTH_ERROR });
    }
});

// post
app.post('/post', verifyToken, (req, res) => {
    const authData = req.authData;
    res.json({
        message: constants.POST_CREATED,
        authData
    });
});

// any
app.get('/*', (req, res) => {
    res.json({ message: constants.WELCOME });
});

// token format
// auth: token <acces token>

function verifyToken(req, res, next) {
    // get auth header value
    const tokenHeader = req.headers['auth'];
    if (typeof tokenHeader !== 'undefined') {
        const auth = tokenHeader.split(' ');
        const token = auth[1];

        jwt.verify(token, keyStore.key, (err, authData) => {
            if (err) {
                //not authenticated
                res.json({
                    message: constants.YOU_SHALL_NOT_PASS
                });
            } else {
                req.authData = authData;
                next();
            }
        });
    
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

function login(req) {

    if (req) {
        // login example with userStore mock
        for (let i=0; i <= userStore.length; i++) {
            if (req.body.username == userStore[i].username && req.body.password == userStore[i].password) {
                return { 
                    id: userStore[i].id,
                    username: userStore[i].username,
                    email: userStore[i].email
                }
            }
        }
    }

    return null;
}

app.listen(5000, () => console.log('Server started on port 5000.'));