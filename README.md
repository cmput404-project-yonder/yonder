# Yonder

## Team Members

-   Luke Kim
-   Anas Mohamed
-   Gengyuan Huang
-   Ji Heon (Jamie) Kim
-   Jerwyn Alqueza

## Instructions

-   To run both backend & frontend use `start.sh`.
-   To run backend only run `cd backend/server; python manage.py runserver`
-   To run frontend only run `cd frontend; yarn start`

## Setup

### Backend

-   Install python3, django & its dependencies are handled by `start.sh`

-   Yonder uses PostgreSQL for db.

    <details>
    <summary>PostgreSQL setup</summary>

    -   Install PostgreSQL using `sudo apt-get install libpq-dev postgresql postgresql-contrib`, then restart psql service with `sudo service postgresql restart`
    -   Next setup db for Postgres by running the following
        -   `sudo su - postgres`
        -   `psql`
        -   `CREATE DATABASE [database_name];`
        -   `CREATE USER [user] WITH PASSWORD '[password]';`
        -   `ALTER ROLE [user] SET client_encoding TO 'utf8';`
        -   `ALTER ROLE [user] SET default_transaction_isolation TO 'read committed';`
        -   `ALTER ROLE [user] SET timezone TO 'UTC';`
        -   `GRANT ALL PRIVILEGES ON DATABASE [database_name] TO [user];`
        -   Quit psql with `\q` then `exit`

-   To setup secrets, use the sample env file by `mv .env.sample .env`. Then populate it with the required secrets.

    -   To generate a new secret key for Django run `$ python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`.

    </details>

### Frontend

-   Make sure you have `nodejs` v14 installed, if you don't follow this [guide](https://github.com/nodesource/distributions/blob/master/README.md).
-   Install yarn with `npm install -g yarn`.

## Resources

-   Boilerplate Django-React code: https://github.com/saasitive/django-react-boilerplate
