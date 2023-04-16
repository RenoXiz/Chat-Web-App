const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const https = require('https');
const socketio = require('socket.io');
const router = require('./src/router.js');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(router);

require('./src/socket.js')(io);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});