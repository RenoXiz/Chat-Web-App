const userController = require('./controllers/userController.js');
const channelController = require('./controllers/channelController.js');
const e = require('express');

const socket = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected: ' + socket.id);
        
        //Login and register

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

        socket.on('user:logout', async (data) => {
            const result = await userController.logoutUser(data.token);

            if (result == true) {

            }
            else {

            }
        });

        //Chat

        socket.on('channel:get', async (data) => {
            const result = await userController.getUserByToken(data.token);

            if (result != false) {
                const channels = await channelController.getChannelsByUser(result.id);

                socket.emit('channel:get', {channels: channels, result: true});
            }
        });

        socket.on('channel:enter', async (data) => {
            socket.join(data.channel);
            console.log('User ' + socket.username + ' entered channel: ' + data.channel);
        });

        socket.on('channel:leave', async (data) => {
            socket.leave(data.channel);
            console.log('User ' + socket.username + ' left channel: ' + data.channel);
        });

        socket.on('channel:create', async (data) => {
            const result = await userController.getUserByToken(data.token);

            if (result != false) {
                const channel = await channelController.createChannel(data.name, data.description, result);

                socket.emit('channel:create', {channel: channel, result: true});
            }
        });

        socket.on('message:get', async (data) => {
            const channel = data.channel;

        });

        socket.on('disconnect', () => {
            console.log('Client disconnected: ' + socket.id);
        });
    });
}

module.exports = socket;