# Tag Definition

## Tag Definition Resource


Each tag is associated to a specific tag definition, the tag definition being the schema/template and the tag the instance of it. Please refer to the section [AccountTags](https://killbill.github.io/slate/#account-tags) for an overview about tags. The system already provides some `System tag definitions` that can be used to add tags to a particular object. However, when using `User Tags`, ome must first create the associated tag definition.

Creating, listing, deleting such tag defintions is the purpose of the apis below.



## Tag Definition

### Create a tag definition

**HTTP Request** 

`POST http://example.com/1.0/kb/tagDefinitions`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
     -d '{ "name": "good_customer", "description": "a good customer", "applicableObjectTypes": ["ACCOUNT"]}' \
    "http://localhost:8080/1.0/kb/tagDefinitions"
```



```java
```

```ruby
```

```python

```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 
< Location: http://localhost:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f
< Content-Type: application/json
< Content-Length: 0
```
```java
```
```ruby
```
```python
no content
```

**Returns**

A 201 http status without content.

### Retrieve a tag definition by its ID

**HTTP Request** 

`GET http://example.com/1.0/kb/tagDefinitions/{tagDefinitionId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f"
```

```java
```

```ruby
```

```python
```

> Example Response:

```shell
{
  "id": "93f2bc59-e18d-4a5e-a645-9386c76fc03f",
  "isControlTag": false,
  "name": "good_customer",
  "description": "a good customer",
  "applicableObjectTypes": [
    "ACCOUNT"
  ],
  "auditLogs": []
}
```
```java
```
```ruby
```
```python
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | string | false | whether or not to return associated audit logs |

**Returns**

Returns a tag definition object.


### Delete a tag definition

**HTTP Request** 

`DELETE http://example.com/1.0/kb/tagDefinitions/{tagDefinitionId}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f"
```

```java
```

```ruby
```

```python
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 
< Content-Type: application/json

```
```java
```
```ruby
```
```python
```

**Query Parameters**

None.

**Returns**

A 204 http status without content.