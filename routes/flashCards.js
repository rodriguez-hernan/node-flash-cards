var express = require('express');
var router = express.Router();
const { poolPromise } = require('../db');
var ssn;
// I will add a login process later
router.get('/', async (req, res) => {
    try {
        ssn = req.session;
        console.log("session user", ssn.userName);
        console.log("session id", ssn.userId);
        res.render('pages/flashCards', { userName: ssn.userName, userId: ssn.userId });
    } catch(e) {
        console.log(e)
    }
})

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

router.post('/saveCard', async (req, res) => {
    try {
        const client = await poolPromise;
        const userId = req.body.userId;
        const sidea = req.body.sidea;
        const sideb = req.body.sideb;

        const data = await client.query(`
            INSERT INTO flashcards (sidea, sideb, topicid, userid)
             VALUES ($1, $2, $3, $4)`, [sidea, sideb, '1', userId],
            (err, result) => {
                if (err) console.log('inserting error', err);
                console.log('insert result', result);
                res.json({success: true});
            });

    } catch (e) {
        console.log(e)
    }
})

router.delete('/deleteCard/:id', async (req, res) => {
    try {
        const client = await poolPromise;
        const { id } = req.params;
        const data = await client.query(`
            DELETE FROM flashcards WHERE id=$1`, [id],
            (err, result) => {
                if (err) console.log('delete error', err);
                console.log('delete result', result);
                res.json({success: true});
            });

    } catch (e) {
        console.log(e)
    }
})

module.exports = router;