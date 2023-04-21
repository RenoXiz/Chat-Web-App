const userController = require('./controllers/userController.js');

const socket = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected: ' + socket.id);

        socket.on('user:register', async (data) => {
            const {username, email, password} = data;
            
            const result = await userController.registerUser(username, email, password);

            if (result == true) {
                const user = await userController.getUser(email);
            
                socket.emit('user:register', {user: user, result: true});
                console.log('User registered: ' + user.username);
                socket.username = user.username;
            }
            else {
                socket.emit('user:register', {result: false});
            }
        });

        socket.on('user:login', async (data) => {
            const {email, password} = data;

            const result = await userController.loginUser(email, password);

            if (result == true) {
                const user = await userController.getUser(email);
                
                socket.emit('user:login', {user: user, result: true});
                console.log('User logged in: ' + user.username);
                socket.username = user.username;
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

module.exports = socket;