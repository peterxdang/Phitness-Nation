const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get injury router, automatically fetches the logged in users injuries
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "injuries" WHERE user_id = $1`
    pool.query(queryText, [req.user.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET INJURIES ERROR:', error);
        })
});
//post injury router, send: {user_id: int, type: "String", description: "String", severity: int }
router.post('/', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "injuries" ( "user_id", "type", "description", "severity" ) VALUES ( $1, $2, $3, $4 );`;
    let queryInfo = [ req.user.id, req.body.type, req.body.description, req.body.severity ];
    console.log(queryInfo);
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('POST INJURIES ERROR:', error);
        })
});
//update goals route, send: { description: "String", type: "String", severity: int, id: int}
router.put('/', rejectUnauthenticated, (req, res) =>{
    let queryText = `UPDATE "injuries" SET "description" = $1, "type" = $2, "severity" = $3 WHERE "id" = $4;`
    let queryInfo = [req.body.description, req.body.type, req.body.severity, req.body.id];
    console.log(queryInfo)
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('PUT INJURIES ERROR:', error);
        })
})
//DELETE GOALS ROUTE, SEND GOAL ID
router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    let queryText = `DELETE FROM "injuries" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('DELETE INJURIES ERROR:', error);
        })
})

module.exports = router;