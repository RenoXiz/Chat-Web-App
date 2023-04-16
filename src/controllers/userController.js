const userModel = require('../models/userModel.js');

const registerUser = (name, email, password) => {
    const res = userModel.getUser(email);

    if (res == true) {
        return false;
    }
    else {
        const res = userModel.createUser(name, email, password);
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
