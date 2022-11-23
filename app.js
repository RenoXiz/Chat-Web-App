const express  = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./src/router.js');
const socketio = require('socket.io');
const http = require('http');
const socket = require('./src/socket.js');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Settings
const port = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, 'src/public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));

// Routes
app.use(router);

//Socket
socket(io);

// Starting the server
server.listen(port, () => {
    console.log(`Server on port ${port}`);
});
