const express  = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');

const router = require('./src/router.js');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('./src/sockets.js')(io);

// Settings
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Middlewares
//app.use(morgan('dev'));

// Routes
app.use(router);

// Starting the server
server.listen(port, () => {
    console.log(`Server on port ${port}`);
});
