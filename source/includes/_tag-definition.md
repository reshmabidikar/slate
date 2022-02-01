# Tag Definition

These APIs manage a tag definition resource object, which provides the definition for a user-defined tag.

## Tag Definition Resource

Each tag is associated with a specific tag definition. A tag definition is a schema or template, and a tag is an instance of it. Please refer to the section [AccountTags](https://killbill.github.io/slate/#account-tags) for an overview of tags. The system provides some `System tag definitions` that can be used to add tags to a particular object. Users may define their own tags; however, when using `User Tags`, one must first create the associated tag definition.

The tag definition resource includes the following attributes:

| Name | Type | Generated by | Description |
| ---- | -----| -------- | ------------ |
| **id** | string | system | UUID for the tag definition |
| **isControlTag** | boolean | system | True if this is a control tag |
| **name** | string | user | Name of the tag definition |
| **description** | string | user | Description of the tag definition |
| **applicableObjectTypes** | list | user | see below |

* **applicableObjectTypes**:  A list giving the name(s) of resource types that can be given this tag.


## Tag Definition

The APIs in this group provide the ability to create, retrieve, and delete tag definitions, and also to access their associated audit logs.



### Create a tag definition

Creates a new tag definition.


**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/tagDefinitions`

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
    "http://127.0.0.1:8080/1.0/kb/tagDefinitions"
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
< Location: http://127.0.0.1:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f
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

**Request Body**

A TagDefinition resource object with at least the following attributes: **name**, **description**, and **applicableObjectTypes**. The list of **applicableObjectTypes** may not be empty. 

**Query Parameters**

none

**Response**

If successful, returns a status code of 201 and an empty body.

### List tag definitions

Lists all tag definitions for this tenant

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/tagDefinitions`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/tagDefinitions"
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
},
{
    "id": "00000000-0000-0000-0000-000000000001",
    "isControlTag": true,
    "name": "AUTO_PAY_OFF",
    "description": "Suspends payments until removed.",
    "applicableObjectTypes": [
      "ACCOUNT"
    ],
    "auditLogs": []
},
 ...
 
```
```java
```
```ruby
```
```python
```

**Query Parameters**

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **audit** | string | no | "NONE" | Level of audit information to return |

Audit information options are "NONE", "MINIMAL" (only inserts), or "FULL".

**Response**

If successful, returns a status code of 200 and a list of tag definition objects.


### Retrieve a tag definition by its ID

Retrieves an existing tag definition.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tagDefinitions/{tagDefinitionId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f"
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **audit** | string | no | "NONE" | Level of audit information to return |

Audit information options are "NONE", "MINIMAL" (only inserts), or "FULL".

**Returns**

If successful, returns a status code of 200 and a tag definition object.


### Delete a tag definition

Deletes a tag definition.

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tagDefinitions/{tagDefinitionId}`

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
    "http://127.0.0.1:8080/1.0/kb/tagDefinitions/93f2bc59-e18d-4a5e-a645-9386c76fc03f"
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

**Response**

If successful, returns a status code of 204 and an empty body.


## Audit Logs

Audit logs provide a record of events that occur involving various specific resources. For details on audit logs see [Audit and History](https://killbill.github.io/slate/#using-kill-bill-apis-audit-and-history).

### Retrieve tag definition audit logs with history by id

Retrieves a list of audit log records showing events that occurred involving changes to a specified tag definition. History information is included with each record.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tagDefinitions/{tagDefinitionId}/auditLogsWithHistory`

> Example Request:

```shell
curl \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/tagDefinitions/92991586-df8a-4d8d-9d55-61172c52fa45/auditLogsWithHistory"
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2019-02-26T01:56:48.000Z",
    "objectType": "TAG_DEFINITION",
    "objectId": "92991586-df8a-4d8d-9d55-61172c52fa45",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "039f01ea-460a-4edd-bfbc-39a68149cad2",
    "history": {
      "id": null,
      "createdDate": "2019-02-26T01:56:48.000Z",
      "updatedDate": "2019-02-26T01:56:48.000Z",
      "recordId": 1,
      "accountRecordId": 1,
      "tenantRecordId": 1,
      "name": "good_customer",
      "applicableObjectTypes": "ACCOUNT",
      "description": "a good customer",
      "isActive": true,
      "tableName": "TAG_DEFINITIONS",
      "historyTableName": "TAG_DEFINITION_HISTORY"
    }
  }
]

```

**Query Parameters**

None.

**Response**
    
If successful, returns a status code of 200 and a list of tag definition audit logs with history.