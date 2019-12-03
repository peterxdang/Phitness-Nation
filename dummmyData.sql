--Adds 4 users
--Passwords are 1234 for all users
INSERT INTO "user" ( "username", "password", "name", "phone", "email", "emergency_contact_name",
 "emergency_contact_phone", "age", "current_streak", "longest_streak") VALUES 
 ('bobTheBuilder',  '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 
 'bob', '123-123-5432', 'bobdabuilder@gmail.com', 'joe bloe', '192-932-3242', 
 '1/4/1998', 4, 6), ('john cena', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 
 'john', '907-905-3459', 'johncena@youcantseeme.com', 'anec nhoj', '192-425-5632', '1/6/7423', 7, 19),
  ('Michael Scarn', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 'Michael Scott', 
  '965-234-5236', 'mscott@dundermifflin.com', 'dwight', '666-666-6666', '9/4/1967', 1, 4), 
  ('lKnope', '$2b$10$0NYSkc2fN6BUF8NowAqXM.8HIeYLFQkD917L7hHJRzq04SYpORKvS', 'Leslie Knope', '923-122-2314',
   'bestcongresswoman@gov.gov', 'Ron Swanson', '984-234-2342', '5/7/2342', 7, 88);

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