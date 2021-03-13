require('dotenv').config();
const { Pool } = require('pg');

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

const poolPromise = new Pool(config).connect().then(pool => {
        console.log('Connected to postgres')
        return pool
    }).catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    poolPromise
}