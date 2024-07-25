# Stackoverflow API

This is the api collection for a clone stackoverflow api
Api contains:
1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)
4. Subscription (A user can subscribe to a question and get a notification when the question is answered)

See Postman API Documentation/Collections - [https://documenter.getpostman.com/view/13841071/2sA3kXFgHm](https://documenter.getpostman.com/view/13841071/2sA3kXFgHm)

## App Structure

```sh
|--- src
|    |--- config
|    |--- controllers
|    |--- db
|        |--- migrations
|        |--- seeds
|    |--- interfaces
|    |--- middlewares
|    |--- models
|    |--- routes
|         |--- v1
|    |--- services
|    |--- types
|         |--- enums
|    |--- utils
|    |--- validators
|    |--- __tests__
|--- server.ts
|--- .env
|--- package.json
|--- tsconfig.json
|--- Makefile
|--- [... other environment files]

# Just like the folder name is defined above, it state what it does and handles.
# `Middleware` - Handles all middleware files
# `Model` - Handles all database model files

....
....
....

# Specifics...

# `Folder DB` - has the schema and migration files in SQL i.e db >> migrations and db >> schema.sql

# `Makefile` - Here you can see different commands to run, most especially for migrations.

# Running migrations --------------
    # Install Go-Migrate locally
        # run:
        1. curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz
        2. sudo mv migrate.linux-amd64 /usr/bin/migrate
        3. which migrate

    # This should install Go-Migrate on your linux environment
    Typing command `migrate` should show the usage

    # Running a migration command
        - In the Makefile we have three commands
            `new_migration` - to create a new new miration
            `migrateup` - to move a migration to the database
            `migratedown` - to remove previous migrations
        - Usage
          - run command  `make new_migration name=create_users` to create user migration files, the up and down files will be generated in path `src/db/migrations`
          - run command  `make migrateup` to move migrations to database
          - run command  `make migratedown` to remove migrations from database
 
```

## Development Environment

### Setup

Ensure you have the following softwares installed:

- [Node](https://nodejs.org)
- [Docker](https://docs.docker.com/install/) (if you need to run as container)
- [Git](https://www.atlassian.com/git/tutorials/install-git)
- [Go-Migrate](https://github.com/golang-migrate/migrate) (to run migrations)

- Clone the [repository](https://gitlab.com/kora-assessment/be-adesoji-awobajo) and proceed with the instructions below.


### Running locally

This app is written with Typescript, and Nodejs powers it. You can use `npm` or `yarn` (preferrably, if installed), to install packages.

## Install packages and dependancies

```
yarn install
```

### Start server

```
yarn run dev
```

### Server should be up on:

```
http://localhost:3000
```

## Running as Docker Container

Ensure you have docker and docker compose installed to do this, to check if `docker` and `docker compose` is installed correctly run:

```
docker -v
```

```
docker-compose -v
```

- From within the project directory:

- Run docker compose to start the apps: backend_api, mysql (database), adminer (database manager)

```
yarn docker
```

### Viewing the running ports

Open a new terminal window and run the following command:

```
docker ps
```

You will be given a printout showing your running containers. Part of the printout should contain something like this:

```
.....   0.0.0.0:3000-3000/tcp,     backend_api

```

```
.....    0.0.0.0:8080->8080/tcp,     database_manager

```

```
.....   0.0.0.0:3306->3306/tcp,     mysql

```

This tells you that the various machines exist "locally" at 0.0.0.0 and that the exposed web port have been mapped to port 8080.

### Stopping Containers

To stop the services from running, run:

```
yarn docker:up
```

### Starting Container

```
yarn docker:down
```

This will start the app again.

Ensure you update the necessary configurations in the `.env` file, particularly the database configuration and then restart the `backend_api` container.



## Testing APIs with Documentation -- [See on Postman](https://documenter.getpostman.com/view/13841071/2sA3kXFgHm)

```sh
# Running documentation locally
    - Goto the Postman link above, and on the top right, Click on "Run in Postman", make sure you have postman running locally

# Documentation structure
|--- src
|    |--- Auth
|    |--- Question
|    |--- Reply
|    |--- Rating
|    |--- Subscription

# `Auth` - This defines all authentication to the api
    # Login
    # Register
    # Logout

# `Question` - CRUD operations for questions
    # CREATE, READ, UPDATE

# `Reply` - CRUD operations for replies
    # CREATE, READ, UPDATE

# `Rating` - CRUD operations for rating
    # CREATE, READ, UPDATE

# `Subscription` - CRUD operations for subcription
    # CREATE, READ, UPDATE 
```