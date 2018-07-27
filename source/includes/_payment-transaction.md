# Payment Transaction

## Payments Transactions

### Retrieve a payment by transaction external key

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentTransactions`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/paymentTransactions?transactionExternalKey=07655b3c-7f17-4172-b193-ece48e5741ad"
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
  "paymentNumber": "47",
  "paymentExternalKey": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
  "authAmount": 0,
  "capturedAmount": 0,
  "purchasedAmount": 0,
  "refundedAmount": 0,
  "creditedAmount": 0,
  "currency": "USD",
  "paymentMethodId": "c02fa9b0-ae95-42ae-9010-bc11cb160947",
  "transactions": [
    {
      "transactionId": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "transactionExternalKey": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "paymentExternalKey": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "transactionType": "AUTHORIZE",
      "amount": 0,
      "currency": "USD",
      "effectiveDate": "2018-07-18T18:58:11.000Z",
      "processedAmount": 0,
      "processedCurrency": "USD",
      "status": "SUCCESS",
      "gatewayErrorCode": null,
      "gatewayErrorMsg": null,
      "firstPaymentReferenceId": null,
      "secondPaymentReferenceId": null,
      "properties": null,
      "auditLogs": []
    }
  ],
  "paymentAttempts": null,
  "auditLogs": []
}
```
```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **transactionExternalKey** | string | true | transaction external key |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment transaction object.

### Retrieve a payment by transaction id

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentTransactions/{transactionId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/paymentTransactions/07655b3c-7f17-4172-b193-ece48e5741ad"
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
  "paymentNumber": "47",
  "paymentExternalKey": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
  "authAmount": 0,
  "capturedAmount": 0,
  "purchasedAmount": 0,
  "refundedAmount": 0,
  "creditedAmount": 0,
  "currency": "USD",
  "paymentMethodId": "c02fa9b0-ae95-42ae-9010-bc11cb160947",
  "transactions": [
    {
      "transactionId": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "transactionExternalKey": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "paymentExternalKey": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "transactionType": "AUTHORIZE",
      "amount": 0,
      "currency": "USD",
      "effectiveDate": "2018-07-18T18:58:11.000Z",
      "processedAmount": 0,
      "processedCurrency": "USD",
      "status": "SUCCESS",
      "gatewayErrorCode": null,
      "gatewayErrorMsg": null,
      "firstPaymentReferenceId": null,
      "secondPaymentReferenceId": null,
      "properties": null,
      "auditLogs": []
    }
  ],
  "paymentAttempts": null,
  "auditLogs": []
}
```
```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment transaction object.

### Mark a pending payment transaction as succeeded or failed

**HTTP Request** 

`POST http://example.com/1.0/kb/paymentTransactions/{transactionId}`

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
    -d "[{\"paymentId\": \"e8edd4c6-2f85-4375-95f3-e78ca4d85b82\", \"status\": \"SUCCESS\"}]" \
    "http://localhost:8080/1.0/kb/paymentTransactions/07655b3c-7f17-4172-b193-ece48e5741ad"
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Content-Type: application/json
< Content-Length: 0
```
```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

None.

**Returns**

A 201 http status without content.

### Retrieve payment transaction audit logs with history by id

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentTransactions/{transactionId}/auditLogsWithHistory`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/paymentTransactions/07655b3c-7f17-4172-b193-ece48e5741ad/auditLogsWithHistory"
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-18T18:58:11.000Z",
    "objectType": "TRANSACTION",
    "objectId": "07655b3c-7f17-4172-b193-ece48e5741ad",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "84ac4088-dc76-4fde-9ff0-63e228b5e6fc",
    "history": {
      "id": null,
      "createdDate": "2018-07-18T18:58:11.000Z",
      "updatedDate": "2018-07-18T18:58:11.000Z",
      "recordId": 63,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "attemptId": null,
      "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "transactionExternalKey": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "transactionType": "AUTHORIZE",
      "effectiveDate": "2018-07-18T18:58:11.000Z",
      "transactionStatus": "UNKNOWN",
      "amount": 0,
      "currency": "USD",
      "processedAmount": null,
      "processedCurrency": null,
      "gatewayErrorCode": null,
      "gatewayErrorMsg": null,
      "tableName": "PAYMENT_TRANSACTIONS",
      "historyTableName": "PAYMENT_TRANSACTION_HISTORY"
    }
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-18T18:58:11.000Z",
    "objectType": "TRANSACTION",
    "objectId": "07655b3c-7f17-4172-b193-ece48e5741ad",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "84ac4088-dc76-4fde-9ff0-63e228b5e6fc",
    "history": {
      "id": null,
      "createdDate": "2018-07-18T18:58:11.000Z",
      "updatedDate": "2018-07-18T18:58:11.000Z",
      "recordId": 63,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "attemptId": null,
      "paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82",
      "transactionExternalKey": "07655b3c-7f17-4172-b193-ece48e5741ad",
      "transactionType": "AUTHORIZE",
      "effectiveDate": "2018-07-18T18:58:11.000Z",
      "transactionStatus": "SUCCESS",
      "amount": 0,
      "currency": "USD",
      "processedAmount": 0,
      "processedCurrency": "USD",
      "gatewayErrorCode": null,
      "gatewayErrorMsg": null,
      "tableName": "PAYMENT_TRANSACTIONS",
      "historyTableName": "PAYMENT_TRANSACTION_HISTORY"
    }
  }
]
```
```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment transaction object.

## Custom Fields

### Add custom fields to payment transaction

**HTTP Request** 

`POST http://example.com/1.0/kb/paymentTransactions/{transactionId}/customFields`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Content-Type: application/json' \
    -H 'X-Killbill-CreatedBy: demo' \
    -d '[{ 
            "objectId": "8fe697d4-2c25-482c-aa45-f6cd5a48186d",
            "objectType": "TRANSACTION",
            "name": "Test Custom Field",
            "value": "test_value"
    }]' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/customFields' 
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/
< Content-Type: application/json
< Content-Length: 0
```

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    objectType: TRANSACTION
    name: Test Custom Field
    value: test_value
    auditLogs: []
}
```
```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"PAYMENT",
      "name":"Test Custom Field",
      "value":"test_value",
      "auditLogs":[]
   }
]
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a custom field object.

### Retrieve payment transaction custom fields 

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentTransactions/{transactionId}/customFields`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/customFields' 
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
[
  {
    "customFieldId": "e4bac228-872d-4966-8072-2c3ac06442ed",
    "objectId": "8fe697d4-2c25-482c-aa45-f6cd5a48186d",
    "objectType": "TRANSACTION",
    "name": "Test Custom Field",
    "value": "test_value",
    "auditLogs": []
  }
]
```

```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

### Modify custom fields to payment transaction

**HTTP Request** 

`PUT http://example.com/1.0/kb/paymentTransactions/{transactionId}/customFields`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Content-Type: application/json' \
    -H 'X-Killbill-CreatedBy: demo' \
    -d '[{ 
            "customFieldId": "e4bac228-872d-4966-8072-2c3ac06442ed",
            "value": "NewValue"
    }]' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/customFields' 
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

paymentApi.modifyPaymentCustomFields(paymentId, 
                                     customFieldModified, 
                                     requestOptions);
```

```ruby
custom_field.custom_field_id = '7fb3dde7-0911-4477-99e3-69d142509bb9'
custom_field.name = 'Test Modify'
custom_field.value = 'test_modify_value'

payment.modify_custom_field(custom_field,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```
```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'f33e0adc-78df-438a-b920-aaacd7f8597a'
custom_field_id = '9913e0f6-b5ef-498b-ac47-60e1626eba8f'
body = CustomField(custom_field_id=custom_field_id, name='Test Modify', value='test_modify_value')

paymentApi.modify_payment_custom_fields(payment_id,
                                        [body],
                                        created_by,
                                        api_key,
                                        api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
< Content-Length: 0
```

```java
no content
```

```ruby
no content
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customFieldList** | string | true | a list of custom field objects that you want to modify |

**Returns**

A `204` http status without content.

### Remove custom fields from payment transaction

**HTTP Request** 

`DELETE http://example.com/1.0/kb/paymentTransactions/{transactionId}/customFields`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'X-Killbill-CreatedBy: demo' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/77e23878-8b9d-403b-bf31-93003e125712/customFields?customField=e4bac228-872d-4966-8072-2c3ac06442ed' 
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
< Content-Length: 0
```

```java
no content
```
```ruby
no content
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Returns**

A `204` http status without content.

## Tags

### Add tags to payment transaction

**HTTP Request** 

`POST http://example.com/1.0/kb/paymentTransactions/{transactionId}/tags`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Content-Type: application/json' \
    -H 'X-Killbill-CreatedBy: demo' \
    -d '[
            "00000000-0000-0000-0000-000000000001"
        ]' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/tags' 
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/
< Content-Type: application/json
< Content-Length: 0
```

```java
TODO
```
```ruby
TODO
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true | list with tag definition id's to add |

**Returns**

A `201` http status without content.

### Retrieve payment transaction tags 

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentTransactions/{transactionId}/tags`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/tags' 
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
[
  {
    "tagId": "890e3b13-3114-478b-9365-50f1a2682143",
    "objectType": "TRANSACTION",
    "objectId": "8fe697d4-2c25-482c-aa45-f6cd5a48186d",
    "tagDefinitionId": "00000000-0000-0000-0000-000000000001",
    "tagDefinitionName": "AUTO_PAY_OFF",
    "auditLogs": []
  }
]
```

```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

### Remove tags from payment transaction

**HTTP Request** 

`DELETE http://example.com/1.0/kb/paymentTransactions/{transactionId}/tags`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'X-Killbill-CreatedBy: demo' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/tags?tagDef=00000000-0000-0000-0000-000000000001' 	
```

```java
TODO
```

```ruby
TODO
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
< Content-Length: 0
```

```java
TODO
```
```ruby
TODO
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true |  list with tag definition id's that you want to remove it |

**Response**

A `204` http status without content.