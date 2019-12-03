const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get workouts router, automatically gets the currently logged in users workouts
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "workouts" WHERE user_id = $1 ORDER BY "workouts".week DESC;`
    pool.query(queryText, [req.user.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET WORKOUTS ERROR:', error);
        })
});
//update workouts router, send: { workout id: int, feedback: int }
router.put('/', rejectUnauthenticated, (req, res) =>{
    let queryText = 'UPDATE "workouts" SET "feedback" = $1, "complete" = true WHERE "id" = $2;';
    let queryInfo = [ req.body.feedback, req.body.id ];
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('UPDATE WORKOUTS ERROR:', error);
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "workouts" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
  })

module.exports = router;