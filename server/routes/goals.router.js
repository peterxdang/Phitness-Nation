const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get goals router, automatically gets the currently logged in users goals
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "goals" WHERE user_id = $1`
    pool.query(queryText, [req.user.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET GOALS ERROR:', error);
        })
});
//post goals router, send: { user_id: int, type: "String", description: "String" }
router.post('/', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "goals" ( "user_id", "type", "description" ) VALUES ( $1, $2, $3 );`;
    let queryInfo = [ req.user.id, req.body.type, req.body.description ];
    console.log(queryInfo);
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('POST GOALS ERROR:', error);
        })
});
//put goals router, send: { user_id: int, type: "String", description: "String" }
router.put('/', rejectUnauthenticated, (req, res) =>{
    let queryText = `UPDATE "goals" SET "description" = $1, "type" = $2 WHERE "id" = $3;`
    let queryInfo = [req.body.description, req.body.type, req.body.id];
    console.log(queryInfo)
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('PUT GOALS ERROR:', error);
        })
})
//delete goal router, send goal id as a URL param
router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    let queryText = `DELETE FROM "goals" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('DELETE GOALS ERROR:', error);
        })
})

module.exports = router;