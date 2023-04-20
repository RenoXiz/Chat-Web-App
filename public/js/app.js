$(document).ready(function() {

    const registerModalContainer = $('#registerModalContainer');
    const loginModalContainer = $('#loginModalContainer');

    const registerModal = $('#registerModal');
    const loginModal = $('#loginModal');

    const registerModalBtn = $('#registerModalBtn');
    const loginModalBtn = $('#loginModalBtn');

    const registerForm = $('#registerModalForm');
    const loginForm = $('#loginModalForm');

    const socket = io();

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

    if (localStorage.getItem("email") != null) {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        socket.emit('user:login', {
            email: email,
            password: password
        });
    }
    else {
        openLoginModal();
    }

    registerForm.on('submit', (e) => {
        e.preventDefault();

        const username = registerForm.find('#registerUsername').val();
        const email = registerForm.find('#registerEmail').val();
        const password = registerForm.find('#registerPassword').val();

        socket.emit('user:register', {
            username: username,
            email: email,
            password: password
        });
    });

    loginForm.on('submit', (e) => {
        e.preventDefault();

        const email = loginForm.find('#loginEmail').val();
        const password = loginForm.find('#loginPassword').val();

        socket.emit('user:login', {
            email: email,
            password: password
        });
    });

    socket.on('user:register', (data) => {
        if (data.result == true) {
            closeRegisterModal();

            const username = data.user.username;
            const email = data.user.email;

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }
        else {
            openLoginModal();
        }
    });

    socket.on('user:login', (data) => {
        if (data.result == true) {
            closeLoginModal();

            const username = data.user.username;
            const email = data.user.email;
            const password = data.user.password;

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }
        else {
            openLoginModal();
        }
    });
});
