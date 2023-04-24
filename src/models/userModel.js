const database = require('../database.js');
const crypto = require('crypto');

const createUser = async (username, email, password) => {
    const query = ('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)');
    const values = [username, email, password];

    try {
        await database.query(query, values);

        const res = await database.query('SELECT * FROM users WHERE email = $1', [email]);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const createToken = async (id) => {
    const query = ('UPDATE users SET token = $1 WHERE id = $2');
    const tokenLength = 50;
    const randomBytes = crypto.randomBytes(tokenLength);
    const token = randomBytes.toString('base64');
    const values = [token, id];

    try {
        await database.query(query, values);

        return true;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getUserById = async (id) => {
    const query = ('SELECT * FROM users WHERE id = $1');
    const values = [id];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getUserByEmail = async (email) => {
    const query = ('SELECT * FROM users WHERE email = $1');
    const values = [email];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getUserByToken = async (token) => {
    const query = ('SELECT * FROM users WHERE token = $1');
    const values = [token];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const deleteToken = async (id) => {
    const query = ('UPDATE users SET token = NULL WHERE id = $1');

    try {
        await database.query(query, [id]);

        return true;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

module.exports = {
    createUser,
    createToken,
    getUserById,
    getUserByEmail,
    getUserByToken,
    deleteToken
}
