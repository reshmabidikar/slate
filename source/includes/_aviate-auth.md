# Aviate Auth

The Aviate Plugin uses a JWT based authentication mechanism. Thus, a valid JWT is required to access all APIs.

## Auth API

The Auth API generates a JWT for authenticating with the Aviate Plugin. This token must be included in the Authorization header for subsequent API requests. Note that the Auth API must be invoked with an email and password in order to generate the JWT.

**HTTP Request**

`POST /plugins/aviate-plugin/v1/auth`

> Example Request:

```shell
curl -X POST \
    -H 'Content-Type: application/json' \
    -u "<email>:<password>" \
    -H 'X-killbill-apiKey: alphaF' \
    -H 'X-killbill-apisecret: alphaF' \
    'http://127.0.0.1:8080/plugins/aviate-plugin/v1/auth'
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

> Example Response:

````json
{
  "token": "eyJraWQiOiJmSGs3ZkIyQzNlc25EUXdVV0xRM2VYeldpWlVIcVRzd0dpT2cyU2Nnb25FPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmY2Y1NzhjMy01OGVmLTQ3N2YtYTcxNC1lZDU5NmZjZTliNmMiLCJwcm9kdWN0IjoiQXZpYXRlLUZsb2NrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZFb2NJVkFNdCIsImNvZ25pdG86dXNlcm5hbWUiOiJmY2Y1NzhjMy01OGVmLTQ3N2YtYTcxNC1lZDU5NmZjZTliNmMiLCJvcmlnaW5fanRpIjoiNjhmMGEwMDgtMmNmZS00YzM4LTg4ZDItZjA0MzM1ODk0ODNhIiwiZmVhdHVyZXMiOiJwYWlkLXBsYW5zLG9yZ3MtYWNjZXNzLHBsdWdpbi1pbnN0YWxsLGFwcC1hZG1pbixhcHAtaGVhbHRoLGFwcC1xdW90ZSxhcHAtYmkiLCJhdWQiOiIzdG0xcjYxY3B0dTMxaGc5MGNlMTdlMHBzIiwiZXZlbnRfaWQiOiIxY2Y2MjdkNS0zZjg0LTRjZTktYjM2NC0zM2ZhMzc3MTRlODkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTczNzcwNTY5MiwiY3VzdG9tOmJhX2lkIjoiY3VzX05aQXd0TlpCNkxpUmJNIiwiZXhwIjoxNzM3NzA5MjkxLCJpYXQiOjE3Mzc3MDU2OTIsImp0aSI6IjEzMGQ2ZmM3LTU2MGItNDQ3My04YTVlLTIxNzliY2ZkOWIwNCIsImVtYWlsIjoicmVzaDEyM0BnbWFpbC5jb20ifQ.S2CPMIq6zQ3QkOObeYR-jFL67kx3i8i6bSCjUy4SMr3DapBaqjU_q1qettvZ75pHQK0-JxTvSucw14CvDmBikEHyQDv043tIFL2POA0-GvxFdnNzOLEfbeu338ZxWyodGUg-x41HmYG8Q0DEAa0CbZiaj-sI3YMTOB9dRW5UHxSCy7LPpzaNd_ZRB0_MatzTbBgesSMowz9kJMyhnSCKRJLtazdzeNXapij9pg50paasMZPqlqPvvFrc5zHNRUTF84tN19cdvvmj87qZDFMMoc0X8GihrmgqsI6eJ3vAKiECwoeRKPJwHioFxu8Id9atV_1jRoSS-owULkFnfIKDSQ"
}
````

**Request Body**

None


**Query Parameters**

None


**Response**

If successful, returns a status code of 200 and a JSON String with the token.