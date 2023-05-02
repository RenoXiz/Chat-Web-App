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

    const searchChannelForm = $('#searchChannelForm');

    const newChannelModalContainer = $('#newChannelModalContainer');
    const newChannelModal = $('#newChannelModal');
    const newChannelModalBtn = $('#newChannelModalBtn');
    const newChannelForm = $('#newChannelModalForm');

    const channelListContainer = $('#channelListContainer');

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

    const openNewChannelModal = () => {
        newChannelModalContainer.css('opacity', 1);
        newChannelModalContainer.css('visibility', 'visible');
        newChannelModal.toggleClass('modal-close');
    }

    const closeNewChannelModal = () => {
        newChannelModalContainer.css('opacity', 0);
        newChannelModalContainer.css('visibility', 'hidden');
        newChannelModal.toggleClass('modal-close');
    }

    const closeModals = () => {
        closeRegisterModal();
        closeLoginModal();
    }

    const getAllChannels = () => {
        socket.emit('channel:get', {
            token: token
        });
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

    newChannelModalBtn.on('click', (e) => {
        e.preventDefault();
        openNewChannelModal();
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

    searchChannelForm.on('submit', (e) => {
        e.preventDefault();

        const channelName = searchChannelForm.find('#searchChannelName').val();

        socket.emit('channel:search', {
            name: channelName,
            token: token
        });
    });

    newChannelForm.on('submit', (e) => {
        e.preventDefault();

        const channelName = newChannelForm.find('#channelName').val();
        const channelDescription = newChannelForm.find('#channelDescription').val();

        socket.emit('channel:create', {
            name: channelName,
            description: channelDescription,
            token: token
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

            getAllChannels();
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

            getAllChannels();
        }
        else {
            openLoginModal();
        }
    });

    socket.on('channel:create', (data) => {
        if (data.result == true) {
            closeNewChannelModal();
        }
        else {
            openNewChannelModal();
        }
    });

    socket.on('channel:get', (data) => {
        if (data.result == true) {
            console.log(data);

            var channels = data.channels;

            channels.forEach(channel => {
                const channelElement = $(`
                <div class="channel-contianer w-100 m-4" id="${channel.id}">
                    <button class="channel-btn w-100 d-flex flex-row">
                        <div class="channel-image me-4">
                            <span class="material-symbols-outlined align-middle">
                                group
                            </span>
                        </div>
                        <div class="channel-name">
                            <h3>${channel.name}</h3>
                        </div>
                    </button>
                </div>`);

                channelListContainer.append(channelElement);
            });
        }
        else {
            console.log(data);
        }
    });
});
