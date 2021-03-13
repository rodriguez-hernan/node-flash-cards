var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');

// I will add a login process later
router.get('/', async (req, res) => {
    try {
        const client = await poolPromise
        const data = await client.query("SELECT * FROM users WHERE id='1'");
        // res.setHeader("Content-Type", "application/json")
        const user = data.rows[0];
        res.render('pages/flashCards', { user } );
    } catch(e) {
        console.log(e)
    }
})

module.exports = router;