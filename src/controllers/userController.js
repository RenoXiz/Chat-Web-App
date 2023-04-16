const userModel = require('../models/userModel.js');

const registerUser = (name, email, password) => {
    const tempUser = userModel.getUser(email);

    if (tempUser) {
        return false;
    }
    else {
        userModel.createUser(name, email, password);
        return true;
    }
}

module.exports = {
    registerUser
}
