const userController = require('./controllers/userController.js');

const socket = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected: ' + socket.id);

        socket.on('user:register', async (data) => {
            const result = await userController.registerUser(data.username, data.email, data.password);

            if (result == true) {
                const user = await userController.getUserByEmail(data.email);
                const token = await userController.getToken(user.id);
                    
                socket.emit('user:login', {user: user, token:token , result: true});
                console.log('User registered in: ' + user.username);
                socket.username = user.id;
            }
            else {
                socket.emit('user:register', {result: false});
            }
        });

        socket.on('user:login', async (data) => {
            if (data.token != null) {
                const result = await userController.loginUserByToken(data.token);

                if (result == true) {
                    const user = await userController.getUserByToken(data.token);
                    const token = await userController.getToken(user.id);
                    
                    socket.emit('user:login', {user: user, token:token , result: true});
                    console.log('User logged in: ' + user.username);
                    socket.username = user.id;
                }
                else {
                    socket.emit('user:login', {result: false});
                }
            }
            else {
                var result = await userController.loginUser(data.email, data.password);

                if (result == true) {
                    const user = await userController.getUserByEmail(data.email);
                    const token = await userController.getToken(user.id);
                    
                    socket.emit('user:login', {user: user, token: token, result: true});
                    console.log('User logged in: ' + user.username);
                    socket.username = user.id;
                }
                else {
                    socket.emit('user:login', {result: false});
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected: ' + socket.id);
        });
    });
}

module.exports = socket;