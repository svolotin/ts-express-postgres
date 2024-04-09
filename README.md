# README #

This is a template for nodejs (Typescript) container service on top of postgres

### Local setup and requirements ###

* app can be ran in docker container or in a local nodejs server
* local postgres setup in a local folder
* docker and docker compose V2 needs to be installed
* nodejs and typescript needs to be installed

### Local Postgres ###

* To prepare a local database navigate to a local folder
* run ```./prepare_local_db.sh``` in local folder
* this will run docker compose and create a table as well as sample data.

### App Container ###

* run ```docker compose up -d``` in root folder

### Requests ###

```curl -X POST http://localhost:3000/user -d @payload.json --header "Content-Type: application/json"```
* creates a new row into the database. modify payload.json in root folder to change the fields of the created row

```curl http://localhost:3000/user/```
* lists rows in a database


```curl http://localhost:3000/user/<id>```
* returns a single row by id

```curl -X POST http://localhost:3000/transaction -d @transaction.json --header "Content-Type: application/json"```
* Makes transaction into user_id's account. Modify transaction.json for changing the user and transaction.


### Running in local nodejs server ###

in root folder:

```npm install```

```npm run build```

```npm start```

There needs to be an .env file in the root folder, like following:

```
PG_URL=postgres://postgres:postgres@localhost:5432/example
PG_USER=postgres
PG_PASSWORD=postgres
NODE_PORT=3000
```

### Zapatos ###

This template uses [Zapatos](https://jawj.github.io/zapatos/ ) for accessing the database. Since there are many reports that ORM type of approaches suffers of major performance issues with node, decided to try Zapatos. Currently there is a generated zapatos schema in src/zapatos folder. But in case if schema in database is developed further or changing, typescript schema needs to be regenerated:

* Make sure that local postgres container is running
* In a root folder run following in order to generate database schema into src/zapatos folder
```./update_zapatos_model.sh```

### Unit tests ###

```npm test```

In reality mocha tests in this repository are integration tests

* local postgres needs to be runnin in order to pass tests
* this is not a recommended way for unit testing. Tests depends of too large part of the codebase and will make harder to maintain the codebase.
* supertest is used to run tests on routes

[How to unit test routes]( https://stackoverflow.com/questions/9517880/how-does-one-unit-test-routes-with-express )

[Running router as express mini app]( https://github.com/ladjs/supertest/issues/142 )



### Integration tests ###

* See folder "integration_tests" for instructions

### Roadmap ###

* add validation for input parameters and payload
* add auth middleware for express to validate the jwt token using public keys fetched from IDP's jwks api
* add logger middleware for express and more severe logging
* add github actions workflow for CI/CD
* AWS ECS deployment as well as AWS API Gateway deployment with lambda authorizer on top of ECS container
* add openapi / swagger api doc generator
* adjust error handling little bit for http 404 and 400 series in general (with auth middleware)
* ~~if codebase grows, separate routers and repositories into a separate modules~~ (done)
* Monitoring utility for performance, load and health monitoring.
