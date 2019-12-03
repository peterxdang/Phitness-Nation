
## Phitness Nation

Phitness Nation is a mobile-first web application custom built for personal trainer Phil Putratz and his clients. It allows personal trainers to assign custom workouts to their clients, track their clients' progress, and leave personalized notes to keep them motivated throughout the week.

## Built With

- React
- Redux
- Redux Sagas
- PostgreSQL
- CSS
- HTML
- Material UI
- Bootstrap UI

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Steps to get the development environment running.

1. Download this project.
2. Spin up a database called "phitness_nation" using database.sql queries
2. `npm install`
3. `npm run server`
4. `npm run client`
5. You're good to go!

### Completed Features

- [x] Logged in users can walk through their assigned workouts and track the weights, sets, and reps completed
- [x] Users can update their profile, goals, and injuries
- [x] Admins can create, edit or archive users and exercises
- [x] Admins and regular users can track users' progress and workout streaks
- [x] Admins can create workouts for each user

### Next Steps

- [ ] Users can upload a profile picture

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Authors

* Cassidy Foust
* Nolan Minar
* Jake Ford
* Angela Lilke
* Peter Dang

## Color Palette
84c8b9 - light teal
3d6363 - dark teal
313b47 - dark gray
d2d2d4 - light gray

## Fonts
headers: font-family: 'Roboto Slab', serif;
main text: font-family: 'PT Sans Narrow', sans-serif;