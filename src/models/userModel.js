const client = require('../database.js');

const CreateUser = async (name, email, password) => {
    await client.connect();

    const query = ('INSERT INTO users (name, email, password) VALUES ($1::text, $2::text, $3::text)');
    const values = [name, email, password];

    try {
        const res = await client.query(query, values);
        
        console.log(res.row[0]);
        return res.row[0];
    }
    catch (error) {
        console.log('Error: ' + error);
    }

    await client.end();
}

const GetUser = async (email) => {
    await client.connect();

    const query = ('SELECT * FROM users WHERE email = $1::text');
    const values = [email];

    try {
        const res = await client.query(query, values);

        return res.row[0];
    }
    catch (error) {
        console.log('Error: ' + error);
    }

    await client.end();
}

module.exports = {
    CreateUser,
    GetUser
}