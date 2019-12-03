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
    "current_streak" INT DEFAULT 0,
    "longest_streak" INT DEFAULT 0,
    "philosophy" VARCHAR (300),
    "admin" BOOLEAN DEFAULT FALSE,
    "pronouns" VARCHAR (100),
    "email_option" BOOLEAN DEFAULT TRUE,
    "img" VARCHAR(10000000) DEFAULT 
);

--Adds 4 users
--Passwords are 1234 for all users
INSERT INTO "user" ( "username", "password", "active", "name", "phone", "email", "emergency_contact_name",
 "emergency_contact_phone", "age", "current_streak", "longest_streak", "philosophy", "admin", "pronouns", "email_option") VALUES 
 ('bobTheBuilder',  '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 'TRUE',
 'bob', '123-123-5432', 'bobdabuilder@gmail.com', 'joe bloe', '192-932-3242', 
 '1/4/1998', 4, 6, 'philosophy', 'FALSE', 'pronouns', 'TRUE'); ('john cena', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 
 'john', '907-905-3459', 'johncena@youcantseeme.com', 'anec nhoj', '192-425-5632', '1/6/7423', 7, 19),
  ('Michael Scarn', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 'Michael Scott', 
  '965-234-5236', 'mscott@dundermifflin.com', 'dwight', '666-666-6666', '9/4/1967', 1, 4), 
  ('lKnope', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 'Leslie Knope', '923-122-2314',
   'bestcongresswoman@gov.gov', 'Ron Swanson', '984-234-2342', '5/7/2342', 7, 88);



CREATE TABLE "workouts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "week" INT,
    "feedback" VARCHAR (140),
    "complete" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "exercises" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (30),
    "default_sets" INT,
    "default_reps" INT,
    "default_weight" INT,
    "links" VARCHAR (300),
    "active" BOOLEAN DEFAULT TRUE,
    "units" VARCHAR (100)
);


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
    "feedback" INT,
    "order" INT
);

CREATE TABLE "goals" (
    "id" SERIAL PRIMARY KEY,
    "user_id" VARCHAR,
    "type" VARCHAR (30),
    "description" VARCHAR (300)
);
CREATE TABLE "injuries" (
    "id" SERIAL PRIMARY KEY,
    "user_id" VARCHAR,
    "type" VARCHAR (30),
    "description" VARCHAR (300),
    "severity" INT
)



--insert workouts
INSERT INTO "workouts" ("user_id", "week") VALUES ( 1, 1), (1, 2), (1, 3), (2,1), (2,2), (3,1), (4,1), (4,2), (4,3);

--insert exercise-workouts
INSERT INTO "exercise_workouts" ("workout_id", "exercise_id", "assigned_reps", "assigned_sets", "assigned_weight", "tips") 
VALUES (1, 1, 3, 4, 120, 'you can do it'), (1, 2, 3, 4, 100, 'this one is gonna kick your ass'), 
(1, 3, 5, 2, 50, 'do it right or else!'), (2, 1, 3, 4, 120, 'you can do it'), (2, 2, 3, 4, 100, 'this one is gonna kick your ass'),
 (2, 3, 5, 2, 50, 'do it right or else!'), (3, 1, 3, 4, 120, 'you can do it'), (3, 2, 3, 4, 100, 'this one is gonna kick your ass'),
  (3, 3, 5, 2, 50, 'do it right or else!');

--insert goals
INSERT INTO "goals" ("user_id", "type", "description") VALUES ( 1, 'short','i want to fly like superman'),
 ( 2, 'long', 'i want to lift a truck on my back'), (3, 'short', 'i want to run around the world 5 times in 5 hours'),
  ( 4, 'short', 'i want to live to be 500 years old');

--insert injuries
INSERT INTO "injuries" ("user_id", "type", "description", "severity") VALUES (1, 'legs', 'the steamroller didnt stop', 3), 
(2, 'foot', 'burned it in a foreman grill', 2), (3, 'neck', 'i done broke it', 3), (4, 'everywhere', 'fell into a quarry', 1);

--insert exercises
INSERT INTO "exercises" ("name", "default_sets", "default_reps", "default_weight", "links", "units")
VALUES ('Goblet Squat', 4, 15, 65, 'https://www.youtube.com/gobletsquat', 'reps'), 
('Cable Rows', 3, 12, 22, 'https://www.youtube.com/cableRows', 'reps'), 
('Overhead Press', 4, 8, 105, 'https://www.youtube.com/OverheadPress', 'reps'), 
('Bench Press', 4, 5, 225, 'https://www.youtube.com/BenchPress', 'reps'), 
('Crunches', 4, 12, 5, 'https://www.youtube.com/Crunches', 'reps'), 
('Deadlift', 4, 5, 200, 'https://www.youtube.com/Deadlift', 'reps'), 
('Cable Flies', 4, 15, 15, 'https://www.youtube.com/Cableflies', 'reps'), 
('Lunges (Dumbbell)', 4, 15, 30, 'https://www.youtube.com/LungesDB', 'reps'), 
('Skull Crushers', 4, 10, 30, 'https://www.youtube.com/SkullCrushers', 'reps'), 
('Tricep Dips', 4, 15, 5, 'https://www.youtube.com/TricepDips', 'reps'), 
('Pelvic Thrusts (Barbell)', 4, 15, 65, 'https://www.youtube.com/PelvicThrusts', 'reps');