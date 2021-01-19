---
name: Quickstart
---

# Quickstart Guide

This Quickstart tutorial will guide you to setup the Hydrus server, we will be using docker in this tutorial,
Therefore you can go through the [Docker container engine](https://docker-curriculum.com/).
## Requirements
* Install [git](https://git-scm.com/downloads)
* Make sure you have [docker-compose](https://docs.docker.com/compose/install/) installed in your system

## Running hydrus server

1. Getting the [hydrus repository](https://github.com/HTTP-APIs/hydrus)
```bash
git clone https://github.com/HTTP-APIs/hydrus.git
```
2. Change directory and run docker-compose
```bash
cd hydrus

docker-compose up --build
```
> If you are using linux you may have to use sudo command with docker

3. Hydrus demo server is up and running at
```bash
http://localhost:8080/api/vocab
```