var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');

router.get('/', async (req, res) => {
    try {
        const client = await poolPromise
        const user = client.query("SELECT * FROM users WHERE id='1'");
        res.setHeader("Content-Type", "application/json")
        res.json(user);
    } catch(e) {
        console.log(e)
    }
})

module.exports = router;