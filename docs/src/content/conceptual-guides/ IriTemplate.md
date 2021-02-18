---
name:  IRI Templates in Hydra
menu: Conceptual Guides
---

# IriTemplate explained with an example

>**Note**: *This article uses the term URI and IRI interchangebly, IRIs being genaralized form of URIs supporting Unicode. (For 
 more information see [rfc for URI](https://tools.ietf.org/html/rfc3986) and [rfc for IRI](https://www.ietf.org/rfc/rfc3987.txt))*

IRI Templates provide an easy and elegant way to describe a range of IRIs with the help of variable expansion.
In the context of hypermedia driven APIs, IRI templates are particularly useful when the server can't construct a URI 
by itself; only the client possesses the required information to construct desired IRI.

Hydra provides the `IriTemplate` class that can be used to provide IRI templates to the smart clients, which can be used
by those clients to construct valid IRIs. As the title of this article suggests, we will use an example to explain the
working of `IriTemplate` in detail.

### Example
```json
{
    "@context": "http://localhost:8080/serverapi/context.jsonld",
    "@id": "https://tiles.openplanner.team/planet",
    "@type": "Collection",
    "search": {
        "@type": "IriTemplate",
        "template": "https://c.tile.openstreetmap.org/{z}/{x}/{y}.examplejsonld",
        "variableRepresentation": "BasicRepresentation",
        "mapping": [
            {
                "@type": "IriTemplateMapping",
                "variable": "x",
                "property": "tiles:longitudeTile",
                "required": true
            },
              {
                "@type": "IriTemplateMapping",
                "variable": "y",
                "property": "tiles:latitudeTile",
                "required": true
            },
              {
                "@type": "IriTemplateMapping",
                "variable": "z",
                "property": "tiles:zoomTile",
                "required": true
            }
        ]
    }
}
``` 
You can find more details related to this example [here](https://github.com/HydraCG/Specifications/issues/171)

As explained above, in tiled maps when we open a map the client-side code uses some formula(the formula may vary
according to the tile numbering convention used by the service provider) which uses latitude, longitude, and zoom
to get tile identifiers(here x and y). When it has the value of x and y to identify a tile, it makes a request to the
server for that individual tile.

For example [https://c.tile.openstreetmap.org/15/22994/14232.png](https://c.tile.openstreetmap.org/15/22994/14232.png) will return the tile identified by x = 22994 and
y = 14232 with zoom 15.
For x = 22990 and y = 14232 and zoom = 15 the URI will be [https://c.tile.openstreetmap.org/15/22990/14232.png](https://c.tile.openstreetmap.org/15/22990/14232.png), 
same way we can construct URIs for different combinations of X, Y and zoom. To represent such ranges of URIs we can use a URI template(IRI template) `https://c.tile.openstreetmap.org/{z}/{x}/{y}`.

Such IRI templates can be put in use with the help of Hydra `IriTemplate` class. It consists of a literal `template` 
and a set of mappings(`IriTemplateMapping`). `template` holds the IRI template, here `https://c.tile.openstreetmap.org/{z}/{x}/{y}.examplejsonld` and `IriTemplateMapping` maps variables in the `template` with properties and may specify whether the variable
is required or not.

In the example above variables x, y and z maps to `tiles:longiudeTile`, `tiles:latitudeTile` and `tiles:zoomTile` respectively. And all these variables are specified as `required` to expand the IRI template and create a valid IRI.

As the name suggests, `variableRepresenation` specifies how the IRI template will be expanded and serialized when 
values of variables are provided.
As of now it can possibly have one of two values either `BasicRepresentation` or `ExplicitRepresentation`.
`BasicRepresentation` does not differentiate between literals and IRIs, it simple omits data-type and language
information of literals. While `ExplicitRepresentation` diffrentiates between literals and IRIs by surrounding
literals with double quotes(") and it also explicitly specifies language and data-type information of literals,
for more see detailed [example](http://www.hydra-cg.com/spec/latest/core/#ex-16-the-different-variable-representations).
The client side code might look like this
```js
var client = new HydraClient();
var collection = client.get("/api/planet");
if (colletion.search) {
    var filter = {};
    for (let mapping of collection.search.mappings) {
        filter[mapping.variable] = value of variable; # set value of x, y and z
    }

    var query = urlTemplate
        .parse(collection.search.template)
        .expand(filter);                              # expand the IRI
    var data = client.get(query);
    for (var member of data.members) {
        // do something with the _member_, i.e. display it
    }
}
```
With the help of all these, the Hydra enabled client can expand the IRI template with provided values of variables. If in the future the URI is changed from `https://c.tile.openstreetmap.org/{z}/{x}/{y}` to `https://c.tile.openstreetmap.org/{z}/{y}/{x}`
the client won't have any difficulty adjusting to it. The client will receive the following kind of response from the server
```json
{
    "@context": "http://localhost:8080/serverapi/context.jsonld",
    "@id": "https://tiles.openplanner.team/planet",
    "@type": "Collection",
    "search": {
        "@type": "IriTemplate",
        "template": "https://c.tile.openstreetmap.org/{z}/{y}/{x}.examplejsonld",
        "variableRepresentation": "BasicRepresentation",
        "mapping": [
            {
                "@type": "IriTemplateMapping",
                "variable": "x",
                "property": "tiles:longitudeTile",
                "required": true
            },
              {
                "@type": "IriTemplateMapping",
                "variable": "y",
                "property": "tiles:latitudeTile",
                "required": true
            },
              {
                "@type": "IriTemplateMapping",
                "variable": "z",
                "property": "tiles:zoomTile",
                "required": true
            }
        ]
    }
}
``` 
From the response data above and the client-side code given above, we can see that the client-side code won't require
any changes and keep functioning normally. For x = 22990 and y = 14232 and zoom = 15 the URI constructed by the client
will be [https://c.tile.openstreetmap.org/15/14232/22990.png](https://c.tile.openstreetmap.org/15/14232/22990.png).

### Searching interface supported by hydrus
hydrus utilizes the above explained `IriTemplate` to provide a searching interface over the collection of items.
To every collection response, it attaches an IriTemplate. This `IriTemplate` has template mapping defined for all the properties of the objects contained by the collection.
For illustration the `IriTemplate` generated for DroneCollection(defined in our [flock-vocab](https://github.com/HTTP-APIs/hydra-flock-vocab)) is attached below.
```js
{
 "@type":"IriTemplate",
 "mapping":[
 {
  "@type":"IriTemplateMapping",
  "property":"http://auto.schema.org/speed",
  "required":false,
  "variable":"DroneState[Speed]"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/geo",
  "required":false,
  "variable":"DroneState[Position]"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/Property",
  "required":false,
  "variable":"DroneState[Direction]"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/fuelCapacity",
  "required":false,
  "variable":"DroneState[Battery]"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"https://schema.org/status",
  "required":false,
  "variable":"DroneState[SensorStatus]"
 },
 { 
  "@type":"IriTemplateMapping",
  "property":"vocab:Drone",
  "required":false,
  "variable":"DroneState[DroneURI]"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/name",
  "required":false,
  "variable":"name"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/model",
  "required":false,
  "variable":"model"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://auto.schema.org/speed",
  "required":false,
  "variable":"MaxSpeed"
 },
 {
  "@type":"IriTemplateMapping",
  "property":"http://schema.org/device",
  "required":false,
  "variable":"Sensor"
  }],
"template":"http://localhost:8080/serverapi/DroneCollection{?DroneState[Speed], DroneState[Position], DroneState[Direction], DroneState[Battery], DroneState[SensorStatus], DroneState[DroneURI], name, model, MaxSpeed, Sensor}",
"variableRepresentation":"hydra:BasicRepresentation"
}
```

hydrus also provides support for searching over sub-properties of properties. Variable names of such properties are formed as ` MainProperty[subProperty]`. For example, to search for all the Drones going in some particular direction, a client can use the `DroneState[Direction]` variable.

#### Further related reading

* [URI Templates](https://tools.ietf.org/html/rfc6570)

* [Hydra Templated Links](http://www.hydra-cg.com/spec/latest/core/#templated-links)

* [Filtering or Searching use case of Hydra](https://github.com/HydraCG/Specifications/blob/master/drafts/use-cases/7.searching-events.md)
