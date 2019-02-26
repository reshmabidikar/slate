# Custom Field

## Custom Field  Resource



## Custom Field

Each resource provides a set of apis for the creation/modification/deletion/retrieval of custom fields, so there is not CRUD custom field api under this resource.



## Audit Logs

### Retrieve custom field audit logs with history by custom field id

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/customFields/{customFieldId}/auditLogsWithHistory`

> Example Request:

```shell
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/customFields/4b498210-b177-4aae-a539-cf594adaa221/auditLogsWithHistory"

```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2013-08-01T06:00:00.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "4b498210-b177-4aae-a539-cf594adaa221",
    "changedBy": "test_custom_fields",
    "reasonCode": null,
    "comments": null,
    "userToken": "2b3920ae-6b8c-4deb-9ed9-132ff632e692",
    "history": {
      "id": null,
      "createdDate": "2013-08-01T06:00:00.000Z",
      "updatedDate": "2013-08-01T06:00:00.000Z",
      "recordId": 1,
      "accountRecordId": 17,
      "tenantRecordId": 12,
      "fieldName": "Test Custom Field",
      "fieldValue": "test_value",
      "objectId": "01968143-c64b-41d4-94cb-d65748b0f5b6",
      "objectType": "ACCOUNT",
      "isActive": true,
      "tableName": "CUSTOM_FIELD",
      "historyTableName": "CUSTOM_FIELD_HISTORY"
    }
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2013-08-01T06:00:01.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "4b498210-b177-4aae-a539-cf594adaa221",
    "changedBy": "test_custom_fields",
    "reasonCode": null,
    "comments": null,
    "userToken": "6343d19f-cef0-486a-8114-85c7573639a0",
    "history": {
      "id": null,
      "createdDate": "2013-08-01T06:00:01.000Z",
      "updatedDate": "2013-08-01T06:00:01.000Z",
      "recordId": 1,
      "accountRecordId": 17,
      "tenantRecordId": 12,
      "fieldName": "Test Custom Field",
      "fieldValue": "another_test_value",
      "objectId": "01968143-c64b-41d4-94cb-d65748b0f5b6",
      "objectType": "ACCOUNT",
      "isActive": true,
      "tableName": "CUSTOM_FIELD",
      "historyTableName": "CUSTOM_FIELD_HISTORY"
    }
  },
  {
    "changeType": "DELETE",
    "changeDate": "2013-08-01T06:00:01.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "4b498210-b177-4aae-a539-cf594adaa221",
    "changedBy": "test_custom_fields",
    "reasonCode": null,
    "comments": null,
    "userToken": "9a9343bd-9cba-417b-be17-713ff456b5f7",
    "history": {
      "id": null,
      "createdDate": "2013-08-01T06:00:01.000Z",
      "updatedDate": "2013-08-01T06:00:01.000Z",
      "recordId": 1,
      "accountRecordId": 17,
      "tenantRecordId": 12,
      "fieldName": "Test Custom Field",
      "fieldValue": "another_test_value",
      "objectId": "01968143-c64b-41d4-94cb-d65748b0f5b6",
      "objectType": "ACCOUNT",
      "isActive": true,
      "tableName": "CUSTOM_FIELD",
      "historyTableName": "CUSTOM_FIELD_HISTORY"
    }
  }
]

```

**Query Parameters**

None.

**Returns**
    
Returns a list of custom field logs with history.
