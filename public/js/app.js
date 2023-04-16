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

    var username = localStorage.getItem("username");
    var email = localStorage.getItem("email");

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

    if (username && email) {
        socket.emit('user:login', {
            username: username,
            email: email
        });
    }
    else {
        openLoginModal();

        registerForm.on('submit', (e) => {
            e.preventDefault();

            const username = registerForm.find('#username').val();
            const email = registerForm.find('#email').val();
            const password = registerForm.find('#password').val();

            socket.emit('user:register', {
                username: username,
                email: email,
                password: password
            });
        });

        loginForm.on('submit', (e) => {
            e.preventDefault();

            const email = loginForm.find('#email').val();
            const password = loginForm.find('#password').val();

            socket.emit('user:login', {
                email: email,
                password: password
            });
        });

        socket.on('user:register', (data) => {
            if (data.success) {
                closeRegisterModal();
                openLoginModal();
            }
        });
    }
});
