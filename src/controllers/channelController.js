const channelModel = require('../models/channelModel.js');

const createChannel = async (name, description, owner) => {
    var users = [{
        "id":owner.id,
        "username":owner.username,
        "email":owner.email
    }];
    users = JSON.stringify(users);

    const res = await channelModel.getChannelByName(name);

    if (res.rowCount > 0) {
        return false;
    }
    else {
        const res = await channelModel.createChannel(name, description, users, owner);

        if (res.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

const addUserToChannel = async (channelId, userId) => {
    const res = await channelModel.getChannelById(channelId);

    if (res.rowCount > 0) {
        const users = res.rows[0].users;
        users = JSON.parse(users);

        if (users.includes(userId)) {
            return false;
        }
        else {
            users.push(userId);
            const res = await channelModel.updateChannelUsers(channelId, users);

            if (res.rowCount > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}

const removeUserFromChannel = async (channelId, userId) => {
    const res = await channelModel.getChannelById(channelId);

    if (res.rowCount > 0) {
        const users = res.rows[0].users;
        users = JSON.parse(users);

        if (users.includes(userId)) {
            users.splice(users.indexOf(userId), 1);
            const res = await channelModel.updateChannelUsers(channelId, users);

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

const getChannelById = async (id) => {
    const res = await channelModel.getChannelById(id);

    if (res.rowCount > 0) {
        return res.rows[0];
    }
    else {
        return false;
    }
}

const getChannelByName = async (name) => {
    const res = await channelModel.getChannelByName(name);

    if (res.rowCount > 0) {
        return res.rows[0];
    }
    else {
        return false;
    }
}

const getChannelByOwner = async (owner) => {
    const res = await channelModel.getChannelsByOwner(owner);

    if (res.rowCount > 0) {
        return res.rows[0];
    }
    else {
        return false;
    }
}

const getChannelsByUser = async (userId) => {
    const res = await channelModel.getChannelsByUser(userId);

    if (res.rowCount > 0) {
        return res.rows;
    }
    else {
        return false;
    }
}

module.exports = {
    createChannel,
    addUserToChannel,
    removeUserFromChannel,
    getChannelById,
    getChannelByName,
    getChannelByOwner,
    getChannelsByUser
}