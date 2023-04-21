const database = require('../database.js');

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

const getUser = async (email) => {
    const query = ('SELECT * FROM users WHERE email = $1::text');
    const values = [email];

    try {
        const res = await database.query(query, values);

        return res;

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

module.exports = {
    createUser,
    getUser
}
