---
name: Quickstart
---

# Quickstart Guide

This Quickstart tutorial will guide you to setup the Hydrus server, we will be using docker in this tutorial,
Therefore you can go through the [Docker container engine](https://docker-curriculum.com/) and its best practices deploying virtualized environments.

## Running hydrus server
> Make sure you have docker-compose installed in your system

### Getting the [hydrus repository](https://github.com/HTTP-APIs/hydrus)
```bash
git clone https://github.com/HTTP-APIs/hydrus
```
### Change directory and run docker-compose
```bash
cd hydrus

docker-compose up --build
```
> If you are using linux you may have to use sudo command with docker

### Hydrus demo server is up and running at
```bash
http://localhost:8080/api/vocab
```

### Adding your own Hydra Documentation

You can serve your own Hydra API documentation:

* create a `doc.py` file as the ones in `examples/` directory containing your own ApiDoc
* set the `APIDOC_REL_PATH` variable in `docker-compose.yml`. This should the relative path from the project root
start-up the demo as above.
  
Your API Documentation will be served by the hydrus server.