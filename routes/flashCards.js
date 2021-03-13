var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');

router.get('/', async (req, res) => {
    try {
        const client = await poolPromise
        const data = await client.query("SELECT * FROM users WHERE id='1'");
        res.setHeader("Content-Type", "application/json")
        res.json(data.rows[0]);
    } catch(e) {
        console.log(e)
    }
})

module.exports = router;