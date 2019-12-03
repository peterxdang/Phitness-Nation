
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--DATABASE NAME: phitness_nation

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "name" VARCHAR (30),
    "phone" VARCHAR (12),
    "email" VARCHAR (30),
    "emergency_contact_name" VARCHAR (30),
    "emergency_contact_phone" VARCHAR (12),
    "age" VARCHAR (30),
    "longest_streak" INT,
    "current_streak" INT,
    "philosophy" VARCHAR (300)
);
CREATE TABLE "workouts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "week" INT,
    "feedback" VARCHAR (140)
)

CREATE TABLE "exercise_workouts" (
    "id" SERIAL PRIMARY KEY,
    "workout_id" INT REFERENCES "workouts",
    "exercise_id" INT REFERENCES "exercises",
    "completed" BOOLEAN DEFAULT FALSE,
    "assigned_sets" INT,
    "assigned_reps" INT,
    "assigned_weight" INT,
    "tips" VARCHAR (140),
    "completed_sets" INT,
    "completed_reps" INT,
    "completed_weight" INT,
    "feedback" INT
)
CREATE TABLE "exercises" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (30),
    "default_sets" INT,
    "default_reps" INT,
    "default_weight" INT,
    "links" VARCHAR (300)
)
CREATE TABLE "goals" (
    "id" SERIAL PRIMARY KEY,
    "user_id" VARCHAR,
    "type" VARCHAR (30),
    "description" VARCHAR (300)
)
CREATE TABLE "injuries" (
    "id" SERIAL PRIMARY KEY,
    "user_id" VARCHAR,
    "type" VARCHAR (30),
    "description" VARCHAR (300),
    "severity" INT
)