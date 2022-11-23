let users = [];

const socket = (io) => {
    io.on('connection', (socket) => {
        //console.log('New user connected', socket.id);

        //Login
        socket.on('user:login', (data, callback) => {
            if (users.indexOf(data) != -1) {
                callback(false);
            } else {
                users.push(data);
                callback(true);
                socket.username = data;
                io.sockets.emit('user:users', users);
            }
        });

        //Disconnect
        socket.on('disconnect', () => {
            if (!socket.username) return;

            index = users.indexOf(socket.username);
            users.splice(index, 1);

            io.sockets.emit('user:users', users);
        });

        //Chat
        socket.on('chat:message', (data) => {
            io.sockets.emit('chat:message', data);
        });
    });
}

module.exports = socket;