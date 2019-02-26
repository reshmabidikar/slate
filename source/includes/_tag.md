# Tag

## Tag  Resource


Please refer to the section [AccountTags](https://killbill.github.io/slate/#account-tags) for an overview about tags.



## Tag

Each resource provides a set of apis for the creation/modification/deletion/retrieval of tags, so there is not CRUD tag api under this resource.



## Audit Logs

### Retrieve tag audit logs with history by tag id

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tags/{tagId}/auditLogsWithHistory`

> Example Request:

```shell
curl  \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tags/26e22dbf7-a493-4402-b1e3-4bec54c39f31/auditLogsWithHistory"

```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2013-09-01T06:00:05.000Z",
    "objectType": "TAG",
    "objectId": "6e22dbf7-a493-4402-b1e3-4bec54c39f31",
    "changedBy": "test_fixed_and_recurrring_items",
    "reasonCode": null,
    "comments": "Closing account",
    "userToken": "06d4fa80-f6ab-4760-aa97-2cd4ab83fd37",
    "history": {
      "id": null,
      "createdDate": "2013-09-01T06:00:05.000Z",
      "updatedDate": "2013-09-01T06:00:05.000Z",
      "recordId": 1,
      "accountRecordId": 11,
      "tenantRecordId": 2,
      "tagDefinitionId": "00000000-0000-0000-0000-000000000002",
      "objectId": "037a6b81-f351-4e09-b2ea-f76f2fb0189e",
      "objectType": "ACCOUNT",
      "isActive": true,
      "tableName": "TAG",
      "historyTableName": "TAG_HISTORY"
    }
  }
]

```

**Query Parameters**

None.

**Returns**
    
Returns a list of tag audit logs with history.
