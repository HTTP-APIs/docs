---
name: Pagination in Hydra
menu: Conceptual Guides
---
# Pagination with `hydra:PartialCollectionView` and client-initiated pagination

The responses containing the members of a collection can get huge. So, to limit the bytes of data transferred over the network, we sometimes need pagination. Hydra provides two convenient ways to initiate pagination. One way is to do this server-side, i.e. using `hydra:PartialCollectionView`. The other way involves the client, where the client can create the query on the fly to construct the desired views of the collection.

`hydrus` provides support for the pagination through `hydra:PartialCollectionView`. By default, `hydrus`, always returns paginated responses for collections. The user can disable it by using `--no-pagination` flag while starting the server. The default page-size is 10, which can be changed using the `--pagesize` or `--ps` CLI parameter while launching the server. 
If pagination is enabled, every request to get collection will return a `view` of the collection with a fixed number of the maximum elements it can contain. It will also provide controls to get other pages(views) of the same collection.

#### Example Response :
```json
{
  "@id":  "http://api.example.com/DroneCollection" ,
  "@type":  "Collection" ,
  "member": [ {
      "@id":  "/Drone/2sdmsd1iw3mskce6"​ ,
      "@type":  "Drone"
      },
      {
      "@id":  "/Drone/cjn3udneuh73db5f"​ ,
      "@type":  "Drone"
      },
      {
      "@id":  "/Drone/feidndn37dnuff8w"​ ,
      "@type":  "Drone"
      },
      {
      "@id":  "/Drone/fuefh37hdedh311q"​ ,
      "@type":  "Drone"
      }
  ],
  "totalItems" :  100 ,
  "view": {
      "@id":  "/DroneCollection?page=3" ,
      "@type":  "PartialCollectionView" ,
      "first":  "/DroneCollection?page=1" ,
      "previous":  "/DroneCollection?page=2" ,
      "next":  "/DroneCollection?page=4" ,
      "last":  "/DroneCollection?page=25" ,
  }
}
```
## Client-initiated pagination:

Client-initiated(or client-controlled) pagination gives control of the pagination mechanism to the client.
With the help of `IriTemplate` discussed [here](http://www.hydraecosystem.org/IriTemplate), `hydrus` attaches an `IriTemplate` with 
`IriTemplateMapping`s for `limit`, `offset` and `pageIndex`. The client can use these parameters to control pagination. In the following example, the value for the limit is set to 1 in the URL. Similarly, one can set different values for `offset` and `pageIndex` in runtime easily.

##### Example response for limit = 1:
```json
{
  "@context": "/serverapi/contexts/DroneCollection.jsonld",
  "@id": "/serverapi/DroneCollection/",
  "@type": "DroneCollection",
  "members": [
    {
      "@id": "/serverapi/Drone/cf5d8c22-6341-4ed0-8820-1c899ff849d8",
      "@type": "Drone"
    }
  ],
  "search": {
    "@type": "IriTemplate",
    "mapping": [
      {
        "@type": "IriTemplateMapping",
        "property": "http://auto.schema.org/speed",
        "required": false,
        "variable": "DroneState[Speed]"
      },
     .../other search params
      {
        "@type": "IriTemplateMapping",
        "property": "pageIndex",
        "required": false,
        "variable": "pageIndex"
      },
      {
        "@type": "IriTemplateMapping",
        "property": "limit",
        "required": false,
        "variable": "limit"
      },
      {
        "@type": "IriTemplateMapping",
        "property": "offset",
        "required": false,
        "variable": "offset"
      }
    ],
    "template": "/serverapi/Drone{?DroneState[Speed], DroneState[Position], DroneState[Direction], DroneState[Battery], DroneState[SensorStatus], DroneState[DroneID], name, model, MaxSpeed, Sensor, pageIndex, limit, offset}",
    "variableRepresentation": "hydra:BasicRepresentation"
  },
  "totalItems": 2,
  "view": {
    "@id": "/serverapi/DroneCollection?limit=1&page=1",
    "@type": "PartialCollectionView",
    "first": "/serverapi/DroneCollection?limit=1&page=1",
    "last": "/serverapi/DroneCollection?limit=1&page=2",
    "next": "/serverapi/DroneCollection?limit=1&page=2"
  }
}
```
#### Related reading

* [PartialCollectionView](https://www.w3.org/community/hydra/wiki/Pagination#PartialCollectionView)

* [Client-initiated pagination](http://www.hydra-cg.com/spec/latest/core/#client-initiated-pagination)

