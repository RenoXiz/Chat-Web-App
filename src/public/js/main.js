$(document).ready(function() {
    const socket = io();
    
    const login_form = $('#login-form');

    const chat = $('#chat');
    chat.append('<div class="message">Bienvenido al chat!</div>');

    const users = $('#users');
    const message_form = $('#message-form');

    const login_warp = $('.login-warp');
    const chat_warp = $('.chat-warp');

    let username = '';

    socket.on('connect', function() {
        //Login
        login_form.submit(function(e) {
            e.preventDefault();

            username = $('#username').val();

            socket.emit('user:login', username, data => {
                if (data) {
                    login_warp.hide();
                    chat_warp.show();
                } else {
                    alert('El usuario ya existe');
                }
            });
        });

        //Send message
        message_form.submit(function(e) {
            e.preventDefault();
    
            data = {
                username: username,
                message: $('#message').val()
            }
            
            data = JSON.stringify(data);

            socket.emit('chat:message', data);
        });

        //Usuarios
        socket.on('user:users', data => {
            let html = '';

            for (let i = 0; i < data.length; i++) {
                html += `<li class="list-group-item">${data[i]}</li>`;
            }

            users.html(html);
        });

        //Chat
        socket.on('chat:message', data => {
            data = JSON.parse(data);

            chat.append(`<div class="message"><strong>${data.username}:</strong> ${data.message}</div>`);
        });
    });
})