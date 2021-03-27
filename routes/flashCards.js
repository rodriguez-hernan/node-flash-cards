var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');
var ssn;
// I will add a login process later
/*router.get('/', async (req, res) => {
    try {
        // const client = await poolPromise
        // const data = await client.query("SELECT * FROM users WHERE id='1'");
        // res.setHeader("Content-Type", "application/json")
        // const user = data.rows[0];
        ssn = req.session;
        console.log("session user", ssn.userName);
        console.log("session id", ssn.userId);
        res.render('pages/flashCards', { userName: ssn.userName, userId: ssn.userId });
    } catch(e) {
        console.log(e)
    }
})*/

router.get('/cards/:userId', async (req, res) => {
    try {
        const client = await poolPromise;
        const id = req.params.userId;
        const data = await client.query("SELECT * FROM flashcards WHERE userId=$1", [id]);
        const cards = data.rows;

        res.setHeader("Content-Type", "application/json")
        res.json(cards);
    } catch(e) {
        console.log(e)
    }
})


module.exports = router;