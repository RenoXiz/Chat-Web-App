const userModel = require('../models/userModel.js');

const registerUser = async (username, email, password) => {
    const res = await userModel.getUserByEmail(email);

    if (res.rowCount > 0) {
        return false;
    }
    else {
        const res = await userModel.createUser(username, email, password);

        if (res.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

const loginUser = async (email, password) => {
    const res = await userModel.getUserByEmail(email);

    if (res.rowCount > 0) {
        const user = res.rows[0];

        if (user.password == password) {
            createToken(user.id);

            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

const loginUserByToken = async (token) => {
    const res = await userModel.getUserByToken(token);

    if (res.rowCount > 0) {
        const user = res.rows[0];

        if (user.token == token) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

const logoutUser = async (token) => {
    const res = await userModel.getUserByToken(token);

    if (res.rowCount > 0) {
        const user = res.rows[0];

        if (user.token != null) {
            const res = await userModel.deleteToken(id);

            if (res.rowCount > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

const createToken = async (id) => {
    const res = await userModel.createToken(id);

    if (res.rowCount > 0) {
        return true;
    }
    else {
        return false;
    }
}

const getUserById = async (id) => {
    const res = await userModel.getUserById(id);

    if (res.rowCount > 0 || res != false) {
        return res.rows[0];
    }
    else {
        return null;
    }
}

const getUserByEmail = async (email) => {
    const res = await userModel.getUserByEmail(email);

    if (res.rowCount > 0 || res != false) {
        return res.rows[0];
    }
    else {
        return null;
    }
}

const getUserByToken = async (token) => {
    const res = await userModel.getUserByToken(token);

    if (res.rowCount > 0 || res != false) {
        return res.rows[0];
    }
    else {
        return null;
    }
}

const getToken = async (id) => {
    const res = await userModel.getUserById(id);

    if (res.rowCount > 0 || res != false) {
        return res.rows[0].token;
    }
    else {
        return null;
    }
}

module.exports = {
    registerUser,
    loginUser,
    loginUserByToken,
    logoutUser,
    getUserById,
    getUserByEmail,
    getUserByToken,
    getToken
}
