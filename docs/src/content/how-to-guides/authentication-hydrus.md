---
name: How to use Authentication in Hydrus
menu: How To Guides
---

# How to Use Authentication and Authorization in Hydrus

> You should be familiar with `hydrus` in general. To get familiar with `hydrus` and other tools of Hydra Ecosystem check out the Tutorials section.

You will be able to understand and implement authentication and authorization in `hydrus` powered APIs after following through with this guide.

`hydrus` provides an authentication procedure that allows operations on endpoints using a simple Two-Factor Authentication method. Authentication is the verification of the credentials of the connection attempt. Two-factor authentication is the process where users need to provide two different authentication factors to define themselves. This is generally considered more secure than single-factor authentication where the user generally provides just one factor typically a password. Authorization involves checking resources that the user is authorized to access or modify via defined roles or claims.

## Enabling Authentication in `hydrus`

Authentication can be enabled while setting up the API using two simple commands:

```python
from hydrus.data.user import add_user
from hydrus.utils import set_authentication, set_token

...omitted code

# Add authorized users to the API.
    add_user(id_=1, paraphrase="test", session=session)
    with set_authentication(app, True):
        # Use authentication for all requests
        with set_token(app, True):
        #Add token based authorization


#start the server
```

- `add_user(id_=1, paraphrase="test", session=session):` This function adds authorized user credentials in the database.
- `with set_authentication(app, True):` This function sets the authentication app context variable to use authentication for each request. Set it to `False` if authentication is not needed for the endpoints.
- `with set_token(app, True):` Once authentication is set for endpoints, this function can enable a basic token-based authorization for the users.

## Authentication system of the API

Currently, the API uses basic two-factor authentication to authenticate the users to the API. user nonce and credentials are used during this process. Here is a step by step explanation of the authentication system :

- The user requests the server for a protected resource.
- The server responds with a `401 response` along with a nonce-value in the `X-Authentication` header as `X-Authentication: nonce-value` and a `basic authentication` challenge.
- The client has to provide the user credentials in the `Authorization header` encoded in the basic authentication format (i.e base64) as `Authorization: Basic encoded-credentials` where the `encoded-credentials` string. This can be generated, say in REPL as:

  ```bash
  from base64 import b64encode
  b64encode(b"username:password").decode("ascii")
  ```

  where username is `id_` and password is `paraphrase` passed in `add_user` method. The output of the given expression will be used in the request header as `Authorization: Basic MTp0ZXN0.`

- Along with the credentials, the client has to provide the nonce value obtained from the server in the `X-Authentication` header of the previous response. The **nonce** is **valid for 1 min** and for **1 request only**. The client shall get a unique nonce every time the server sends a 401 response.
- After successful authentication, the server responds with the user token(if enabled) or the response data.

Here is an example of server failed authentication response:

```bash
 HTTP/1.1 401 UNAUTHORIZED
 Content-type: application/ld+json
 WWW-Authenticate: Basic realm="Login required"
 X-Authentication: ea2ab992-ba92-45ff-89da-2a8e2adce4c1
 Link: <http://localhost:8080/serverapi/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
 Access-Control-Allow-Origin: *
 Content-Length: 48
 Date: Wed, 07 Mar 2018 18:28:04 GMT

{
  "401": "Need credentials to authenticate"
}
```

Here is the corresponding user request to successfully authenticate with the server:

```bash
 GET /serverapi/MovieCollection HTTP/1.1
 Host: localhost:8080
 User-Agent: curl/7.47.0
 Accept: */*
 X-Authentication:ea2ab992-ba92-45ff-89da-2a8e2adce4c1
 Authorization: Basic MTp0ZXN0
```

## Token-based authorization system

Once the client is authenticated, the API assigns a **unique time-bound token** to the client. This token can now be used by the client to access any protected endpoint within the token-expiry time which is set to **45 min**. The user can request the token by successfully authenticating with the server, and the token alone can be used to access any resource without any further authentication.

Here is a step by step explanation of the token-based authorization system:

- The server sends a `200` response with the token value in the `X-Authorization` header.
- The client can now request any resource just by adding the token in the `X-Authorization` request header.

Here is the token generation response after client successfully authenticates in the above request:

```bash
HTTP/1.1 200 OK
 Content-type: application/ld+json
 X-Authorization: f93046c97070998142cbbf8fb42886
 Link: <http://localhost:8080/serverapi/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
 Access-Control-Allow-Origin: *
 Content-Length: 36
 Date: Wed, 07 Mar 2018 18:30:31 GMT

{
  "200": "User token generated"
}
```

This is the sample format of a user request to access any protected endpoint:

```bash
 GET /serverapi/DroneCollection HTTP/1.1
 Host: localhost:8080
 User-Agent: curl/7.47.0
 Accept: */*
 X-Authorization:cb6a897d9d47608fcf75c11b59f6ab
```

Congratulations! you just learned how to use Authentication and Authorization in `hydrus`.


