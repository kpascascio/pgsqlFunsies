require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bp = require('body-parser');

app.use(bp.json());
app.use('/api/user', require('./controllers/user'));
app.use('/api/login', require('./controllers/session'));
app.use('/api/log', require('./controllers/log'));
app.use('/api/definition', require('./controllers/definition'));
console.log(process.env.TEST)

http.listen(3000, () => {
    console.log('Server is running on port 3000')
})