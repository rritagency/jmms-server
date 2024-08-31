require('dotenv').config();

const {createPool} = require('@vercel/postgres');

const pool = createPool({
    connectionString : process.env.POSTGRES_URL
});


pool.on('connect', ()=>{
    console.log(`Connected to the Database`);
});

pool.on('error', (err)=>{
        console.error('Error occurred ', err);
        process.exit(-1);
});


module.exports = {
    query: (text, params) => pool.query(text, params)
}