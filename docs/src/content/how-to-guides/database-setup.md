---
name: How to setup the database in Hydrus
menu: How To Guides
---

# How to set up the database in hydrus
> You should be familiar with creating API docs.

After defining API Documentation hydrus needs to set up a database for storing resources of API,
hydrus has its own database models that are generic and can be used for most APIs.

The database models use SQLAlchemy as an ORM Layer mapping relations to Python Classes and Objects.
A good reference for the ORM can be found [here](https://docs.sqlalchemy.org/en/13/orm/tutorial.html).

## Creating a new connection to the database
```python
from sqlalchemy import create_engine

db_engine = create_engine('sqlite:///path/to/database/file')
```
Here `db_engine` acts as a connection on which we can create sessions to interact with the database.
SQLAlchemy includes dialects for SQLite, Postgresql, MySQL, Oracle, MS-SQL, Firebird, Sybase, and others.

We have used SQLite for demo purpose,
more information can be found [here](https://www.sqlalchemy.org/features.html)

## Creating necessary models
Once we have connected to the database, we need to create the necessary models from hydrus:

```python
from hydrus.data.db_models import Base

Base.metadata.create_all(db_engine)
```
This will successfully create all required models in the connected database.