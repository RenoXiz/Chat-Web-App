const userModel = require('../models/userModel.js');

const RegisterUser = (name, email, password) => {
    const tempUser = userModel.GetUser(email);

    if (tempUser) {
        return false;
    }
    else {
        userModel.CreateUser(name, email, password);
        return true;
    }
}

module.exports = {
    RegisterUser
}