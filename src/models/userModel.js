const client = require('../database.js');

const createUser = async (username, email, password) => {
    await client.connect();

    const query = ('INSERT INTO users (name, email, password) VALUES ($1::text, $2::text, $3::text)');
    const values = [username, email, password];

    try {
        await client.query(query, values);

        const res = await client.query('SELECT * FROM users WHERE email = $1::text', [email]);

        if (res.rowCount > 0) {
            console.log(res.rows[0]);
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

const getUser = async (email) => {
    await client.connect();

    const query = ('SELECT * FROM users WHERE email = $1::text');
    const values = [email];

    try {
        const res = await client.query(query, values);

        if (res.rowCount > 0) {
            console.log(res.rows[0]);
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.log('Error: ' + error);
        return false;
    }
}

module.exports = {
    createUser,
    getUser
}
