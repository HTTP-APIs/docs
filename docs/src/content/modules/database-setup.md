---
name: How to setup the database in Hydrus
menu: How To Guides
---

# How to setup the database in Hydrus
> You should be familiar with creating API doc.

After defining API Documentation hydrus needs to setup database for storing resources of API,
hydrus has its own database models that are generic and can be used for most APIs.

The databse models use SQLAlchemy as an ORM Layer mapping relations to Python Classes and Objects.
A good reference for the ORM can be found [here]().

## Creating new connection to database
```python
from sqlalchemy import create_engine

db_engine = create_engine('sqlite:///path/to/database/file')
```
Here `db_engine` acts as a connection on which we can create sessions to interact with the database.
SQLAlchemy includes dialects for SQLite, Postgresql, MySQL, Oracle, MS-SQL, Firebird, Sybase and others
We have used sqlite for demo purpose, more information can be fond [here](https://www.sqlalchemy.org/features.html)

## Creating necessary models
Once we have connected to the database, we need to create the necessary models from hydrus:

```python
from hydrus.data.db_models import Base

Base.metadata.create_all(db_engine)
```
This will successfully create all required models in the connected database.