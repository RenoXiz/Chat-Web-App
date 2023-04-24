const database = require('../database.js');

const createChannel = async (name, description, users, owner) => {
    const query = ('INSERT INTO channels (name, users, owner, description) VALUES ($1, $2, $3, $4)');
    const values = [name, users, owner.id, description];
    console.log(values);

    try {
        await database.query(query, values);

        const res = await database.query('SELECT * FROM channels WHERE name = $1 AND owner = $2', [name, owner.id]);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getChannelById = async (id) => {
    const query = ('SELECT * FROM channels WHERE id = $1');
    const values = [id];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getChannelsByUser = async (id) => {
    const query = ('SELECT * FROM channels WHERE users::jsonb @> \'[{"id": ' + id + '}]\'');

    try {
        const res = await database.query(query);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getChannelByName = async (name) => {
    const query = ('SELECT * FROM channels WHERE name = $1');
    const values = [name];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getChannelByOwner = async (owner) => {
    const query = ('SELECT * FROM channels WHERE owner = $1');
    const values = [owner];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const updateChannelUsers = async (id, users) => {
    const query = ('UPDATE channels SET users = $1 WHERE id = $2');
    const values = [users, id];

    try {
        await database.query(query, values);

        const res = await database.query('SELECT * FROM channels WHERE id = $1', [id]);

        return res;

    }
    catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const deleteChannel = async (id) => {
    const query = ('DELETE FROM channels WHERE id = $1');
    const values = [id];

    try {
        await database.query(query, values);

        return true;

    }
    catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

module.exports = {
    createChannel,
    getChannelById,
    getChannelByName,
    getChannelByOwner,
    getChannelsByUser,
    updateChannelUsers,
    deleteChannel
}