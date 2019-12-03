const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get workouts router, automatically gets the currently logged in users workouts
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "exercise_workouts".id, "exercise_workouts".workout_id, "exercise_workouts".exercise_id, "exercise_workouts".completed, "exercise_workouts".assigned_sets, "exercise_workouts".assigned_reps, "exercise_workouts".assigned_weight, "exercise_workouts".tips, "exercise_workouts".order, "exercises".name, "exercises".links,
    "exercise_workouts".completed_sets, "exercise_workouts".completed_reps, "exercise_workouts".completed_weight, "exercise_workouts".feedback FROM "exercise_workouts"
                    JOIN "exercises" on "exercises".id = "exercise_workouts".exercise_id
                    WHERE workout_id = $1
                    ORDER BY "exercise_workouts".order;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET EXERCISE WORKOUTS ERROR:', error);
        })
});
//put workouts router, send: { id of exercise workout: int, completed_reps: int, completed_sets: int, completed_weight: int, feedback: int }
router.put('/', rejectUnauthenticated, (req, res) =>{
    console.log('the update info is:', req.body)
    let queryText = `UPDATE "exercise_workouts" 
                    SET "completed_reps" = $1, "completed_sets" = $2, 
                    "completed_weight" = $3, "feedback" = $4, "completed" = 'true'
                     WHERE "id" = $5;`;
    let queryInfo = [req.body.completed_reps, req.body.completed_sets, 
                    req.body.completed_weight, req.body.feedback, req.body.id ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('UPDATE EXERCISE WORKOUTS ERROR:', error)
        })
})

//admin add exercises into a workout
router.post('/addExercise', rejectUnauthenticated, (req, res) =>{
    let queryText = `INSERT INTO "exercises" ("name", "links") VALUES ($1, $2);`;
    let queryValues = [req.body.name, req.body.description]
    pool.query(queryText, queryValues)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ADD EXERCISE FROM ADMIN ERROR:', error)
        })
})

module.exports = router;