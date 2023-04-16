const userModel = require('../models/userModel.js');

const registerUser = async (name, email, password) => {
    const res = await userModel.getUser(email);

    if (res == true) {
        return false;
    }
    else {
        const res = await userModel.createUser(name, email, password);
        if (res == true) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = {
    registerUser
}
