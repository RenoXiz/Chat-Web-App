const userController = require('./controllers/userController');

const sockets = (io) => {
    
    io.on('connection', (socket) => {
        console.log('Client connected: ' + socket.id);

        socket.on('user:register', (data) => {
            const {username, email, password} = data;
            
            const result = userController.RegisterUser(username, email, password);

            if (result) {
                socket.emit('user:register', {result: true});
                console.log('User registered: ' + username + ' ' + email);
            }
            else {
                socket.emit('user:register', {result: false});
            }
        });

        socket.on('user:login', (data) => {
            const {email, password} = data;

            const result = userController.LoginUser(email, password);

            if (result) {
                socket.emit('user:login', {result: true});
                console.log('User logged in: ' + email);
                socket.username = email;
            }
            else {
                socket.emit('user:login', {result: false});
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected: ' + socket.id);
        });
    });

}

module.exports = sockets;