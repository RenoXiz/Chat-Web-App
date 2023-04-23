$(document).ready(function() {

    //Variables

    const registerModalContainer = $('#registerModalContainer');
    const loginModalContainer = $('#loginModalContainer');

    const registerModal = $('#registerModal');
    const loginModal = $('#loginModal');

    const registerModalBtn = $('#registerModalBtn');
    const loginModalBtn = $('#loginModalBtn');

    const registerForm = $('#registerModalForm');
    const loginForm = $('#loginModalForm');

    //Socket

    const socket = io();

    var username = null;
    var email = null;
    var token = null;

    //Funciones

    const openRegisterModal = () => {
        registerModalContainer.css('opacity', 1);
        registerModalContainer.css('visibility', 'visible');
        registerModal.toggleClass('modal-close');
    }

    const openLoginModal = () => {
        loginModalContainer.css('opacity', 1);
        loginModalContainer.css('visibility', 'visible');
        loginModal.toggleClass('modal-close');
    }

    const closeRegisterModal = () => {
        registerModalContainer.css('opacity', 0);
        registerModalContainer.css('visibility', 'hidden');
        registerModal.toggleClass('modal-close');
    }

    const closeLoginModal = () => {
        loginModalContainer.css('opacity', 0);
        loginModalContainer.css('visibility', 'hidden');
        loginModal.toggleClass('modal-close');
    }

    const closeModals = () => {
        closeRegisterModal();
        closeLoginModal();
    }

    //Botones

    registerModalBtn.on('click', (e) => {
        e.preventDefault();
        closeLoginModal();
        openRegisterModal();
    });

    loginModalBtn.on('click', (e) => {
        e.preventDefault();
        closeRegisterModal();
        openLoginModal();
    });

    //Formularios

    registerForm.on('submit', (e) => {
        e.preventDefault();

        username = registerForm.find('#registerUsername').val();
        email = registerForm.find('#registerEmail').val();
        password = registerForm.find('#registerPassword').val();

        socket.emit('user:register', {
            username: username,
            email: email,
            password: password
        });
    });

    loginForm.on('submit', (e) => {
        e.preventDefault();

        email = loginForm.find('#loginEmail').val();
        password = loginForm.find('#loginPassword').val();

        socket.emit('user:login', {
            email: email,
            password: password,
            token: null
        });
    });

    //Comprovacion de usuario

    token = sessionStorage.getItem("token");

    if (token != null) {

        socket.emit('user:login', {
            email: null,
            password: null,
            token: token
        });
    }
    else {
        openLoginModal();
    }

    //Socket events

    socket.on('user:register', (data) => {
        if (data.result == true) {
            closeRegisterModal();

            token = data.user.token;

            sessionStorage.setItem("token", token);

            username = data.user.username;
            email = data.user.email;
        }
        else {
            openLoginModal();
        }
    });

    socket.on('user:login', (data) => {
        if (data.result == true) {
            closeLoginModal();

            token = data.token;

            sessionStorage.setItem("token", token);

            username = data.user.username;
            email = data.user.email;
        }
        else {
            openLoginModal();
        }
    });
});
