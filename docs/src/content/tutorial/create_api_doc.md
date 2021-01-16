---
name: Creating API Documentation
menu: Tutorial
---

# Creating an API Documentation using hydra

> This tutorial assumes you are familiar with _hydra, the general workflow_ and have a basic understanding of _python programming language._ To get familiar with these technology, follow the workflow tutorial.

The agent or the server understands about the API after going through the API documentation. API documentation contains all the building blocks of an API, for example it can contain different routes, the supported Operations on the routes, the supported properties of the requests and responses. The properties can be changed during runtime which the smart-agents can understand. This eliminates the need of hard-coding the agents. This helps achieve loose-coupling between client and agents.

The core library is used to create API Documentation or to use an existing one. This tutorial deals with creating the new API Documentation.

In this tutorial we will build an API that can show the list of movies and gives us the ability to add, edit, get or delete movies in the list.

## Setting up the Environment

1. [Install python3](https://www.python.org/downloads/) and [git](https://git-scm.com/downloads).
2. Make sure you have a text editor installed, for example [Visual Studio code](https://code.visualstudio.com/docs/languages/python) or [Pycharm](https://www.jetbrains.com/pycharm/download/). This tutorial will use VS Code.
3. Open the terminal and navigate to your development directory and run the command: `mkdir creating_api_doc` then run `cd creating_api_doc`. You should be inside the `creating_the_api_doc` folder.
4. Create a python virtual environment by using `python3 -m venv venv`
5. Activate the virtual environment by using `source venv/bin/activate`.
6. Install the core library by doing `pip install git+https://github.com/HTTP-APIs/hydra-python-core.git#egg=hydra_python_core`
7. Open your favourite text editor. To open Visual Studio code, in the `creating_api_doc` folder in the terminal run `code .`
8. Create a new file `api_doc.py` in the `creating_api_doc_folder`

Having followed the above steps, we can now start writing code to generate an APIDoc.

## Create an APIDoc.

```python
from hydra_python_core.doc_writer import HydraDoc
# Creating the HydraDoc object, this is the primary class for the Doc
API_NAME = "movie_api"   # Name of the API, will serve as EntryPoint
BASE_URL = "http://localhost:8080/"    # The base url at which the API is hosted
# NOTE: The API will be accessible at BASE_URL + ENTRY_POINT
# (http://localhost:8080/movie_api)
# Create ApiDoc Object
api_doc = HydraDoc(API_NAME,
                   "The Description for the movie API",
                   "This API lets you see the list of good movies and gives you the ability to modify the list",
                   API_NAME,
                   BASE_URL,
                   "vocab") # vocab is the name of vocabulary
```

Add the Movie class to the APIDoc. The class has a title and a description.

```python
from hydra_python_core.doc_writer import HydraClass
# Creating classes for the API
class_title = "Movie"  # Title of the Class
class_description = "The class of the Movie"     # Description of the class
movie_class_ = HydraClass(class_title, class_description)
```

Classes have properties that allow them to store information related to the class. Similar to attributes in a Python class, these are stored as supportedProperty of the HydraClass. Properties have an identifier, title, metadata like readable, writeable and required. Add two properties movie_name and movie_director. These are defined as HydraClassProp objects:

```python
from hydra_python_core.doc_writer import HydraClassProp
# Create new properties for the class
# The URI of the class of the property
prop1_uri = "http://localhost:8080/props#movie_name"
prop1_title = "movie_name"   # Title of the property
movie_name_prop= HydraClassProp(prop1_uri, prop1_title,
                            required=True, read=True, write=True)
prop2_uri = "http://localhost:8080/props#movie_director"
prop2_title = "movie_director"
movie_director_prop = HydraClassProp(prop2_uri, prop1_title,
                            required=True, read=True, write=True)
```

Besides the properties, classes have operations that can modify the data stored within their instances. These operation are defined as HydraClassOp and are stored in supportedOperation of the HydraClass

```python
from hydra_python_core.doc_writer import HydraClassOp, HydraStatus

# Create operations for the class
op_post = "UpdateMovie"  # The name of the operation
op_post_method = "POST"  # The method of the Operation [GET, POST, PUT, DELETE]
# URI of the object that is expected for the operation
op_post_expects = movie_class_.id_
op_post_returns = None   # URI of the object that is returned by the operation
op_post_returns_header = ["Content-Type", "Content-Length"]
op_post_expects_header = []
# List of statusCode for the operation
op_post_status = [HydraStatus(code=200, desc="Movie class updated.")]

op_add = "AddMovie"
op_add_method = "PUT"
op_add_expects = movie_class_.id_
op_add_returns = None   # URI of the object that is returned by the operation
op_add_returns_header = ["Content-Type", "Content-Length"]
op_add_expects_header = []
# List of statusCode for the operation
op_add_status = [HydraStatus(code=200, desc="Movie class Added.")]

op_get = "GetMovie"  # The name of the operation
op_get_method = "GET"  # The method of the Operation [GET, POST, PUT, DELETE]
# URI of the object that is expected for the operation
op_get_expects = None
op_get_returns = movie_class_.id_   # URI of the object that is returned by the operation
op_get_returns_header = ["Content-Type", "Content-Length"]
op_get_expects_header = []
# List of statusCode for the operation
op_get_status = [HydraStatus(code=200, desc="Movie class returned.")]

op_delete = "DeleteMovie"  # The name of the operation
op_delete_method = "DELETE"  # The method of the Operation [GET, POST, PUT, DELETE]
# URI of the object that is expected for the operation
op_delete_expects = movie_class_.id_
op_delete_returns = None   # URI of the object that is returned by the operation
op_delete_returns_header = ["Content-Type", "Content-Length"]
op_delete_expects_header = []
# List of statusCode for the operation
op_delete_status = [HydraStatus(code=200, desc="Movie class deleted.")]

post = HydraClassOp(op_post,
                   op_post_method,
                   op_post_expects,
                   op_post_returns,
                   op_post_expects_header,
                   op_post_returns_header,
                   op_post_status)
add = HydraClassOp(op_add,
                   op_add_method,
                   op_add_expects,
                   op_add_returns,
                   op_add_expects_header,
                   op_add_returns_header,
                   op_add_status)
get = HydraClassOp(op_get,
                   op_get_method,
                   op_get_expects,
                   op_get_returns,
                   op_get_expects_header,
                   op_get_returns_header,
                   op_get_status)
delete = HydraClassOp(op_delete,
                   op_delete_method,
                   op_delete_expects,
                   op_delete_returns,
                   op_delete_expects_header,
                   op_delete_returns_header,
                   op_delete_status)
```

Add the supported properties and supported operations to the Movie class.

```python
movie_class_.add_supported_prop(movie_name_prop)
movie_class_.add_supported_prop(movie_director_prop)
movie_class_.add_supported_op(post)
movie_class_.add_supported_op(add)
movie_class_.add_supported_op(get)
movie_class_.add_supported_op(delete)
```

Add the Movie class to the APIDoc.

```python
api_doc.add_supported_class(movie_class_)
```

A collection is the set of somehow related resource. In Hydra, resource is an item that an agent can attempt to dereference. Movie is a resource, as we want to get a movie name and it's director. To make a list of movies, define a collection. The collection has a title, name, description, manages block(It declares additional, implicit statement about members of collection).

```python
from hydra_python_core.doc_writer import HydraCollection
collection_title = "Movie collection"
collection_name = "MovieCollection"
collection_description = "This collection comprises of all the objects of type Movie"
# A manages block is a way to declare additional, implicit statements about members of a collection.
# Here we are defining that all the members of this collection is of type class_.
collection_managed_by = {
    "property": "rdf:type",
    "object": movie_class_.id_,
}
collection_ = HydraCollection(collection_name=collection_name,
               collection_description=collection_description, manages=collection_managed_by, get=True,
                               post=True)
```

Add this collection to the HydraDoc object.

```python
api_doc.add_supported_collection(collection_)
```

An APIDoc has Resource and the Collection classes, so that the server can identify the class members. This can be done automatically using the `add_baseResource` and `add_baseCollection` methods.

```python
# Other operations
api_doc.add_baseResource()  # Creates the base Resource Class and adds it to the API Documentation
api_doc.add_baseCollection()    # Creates the base Collection Class and adds it to the API Documentation
```

At last, create the EntryPoint object for the API Documentation. All the Collections and classes are assigned endpoints in the EntryPoint object. This object is created automatically by the HydraDoc object and can be created using the `gen_EntryPoint` method.

```python
api_doc.gen_EntryPoint()  # Generates the EntryPoint object for the Doc using the Classes and Collections

```

The complete APIDoc can be viewed by calling the `generate` method which returns a Python dictionary containing the entire API Documentation. The `generate` method can be called for every class defined in the doc_writer module to generate its own Python dictionary.

```python
doc = api_doc.generate()
```

To take a look at the contents of doc you can either print it or write the doc in a new file. To write the doc in a new file, add the following snippet to the end of `api_doc.py` file:

```python
if __name__ == "__main__":
    """Print the complete sample Doc in api_doc_output.py."""
    import json
    dump = json.dumps(doc, indent=4, sort_keys=True)
    doc = '''"""Generated API Documentation sample using doc_writer_sample.py."""
    \ndoc = {}\n'''.format(dump)
    # Python does not recognise null, true and false in JSON format, convert
    # them to string
    doc = doc.replace('true', '"true"')
    doc = doc.replace('false', '"false"')
    doc = doc.replace('null', '"null"')
    with open("api_doc_output.py", "w") as f:
        f.write(doc)

```

Execute this file by running the command `python3 api_doc.py` in the terminal inside the `creating_the_api_doc` directory. This will create a new file `api_doc_output.py` containing the APIDoc.

The complete code for this tutorial can be found [here](https://gist.github.com/priyanshunayan/0dc02d65e1f036b9a45919b5342d00a4).

The complete script for a sample API Documentation can be found in `samples/doc_writer_sample.py`, and the generated ApiDocumentation can be found in `samples/doc_writer_sample_output.py` in the `hydra-python-core` repository.

### In this section, you learnt:

1. How to create classes and collection
2. How to add supported properties and supported operations.
3. About Hydra concepts
4. How to create your own APIDoc using `hydra-python-core` library.

Now, head on to [Setting up and running Hydrus➡️](https://google.com)
