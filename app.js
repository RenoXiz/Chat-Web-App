const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const router = require('./src/router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(router);

require('./src/socket.js')(io);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
