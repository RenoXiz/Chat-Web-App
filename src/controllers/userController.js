const userModel = require('../models/userModel.js');

const registerUser = async (username, email, password) => {
    const res = await userModel.getUser(email);

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
    const res = await userModel.getUser(email);

    if (res.rowCount > 0) {
        const user = res.rows[0];

        if (user.password == password) {
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

const getUser = async (email) => {
    const res = await userModel.getUser(email);

    if (res.rowCount > 0) {
        return res.rows[0];
    }
    else {
        return false;
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}
