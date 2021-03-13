var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');

router.get('/', async (req, res) => {
    try {
        const client = await poolPromise
        const user = client.query("SELECT * FROM users WHERE id='1'");
        res.writeHeader("Content-Type", "application/json\n");
        res.json(user);
    } catch(e) {
        console.log(e)
    }
})

module.exports = router;