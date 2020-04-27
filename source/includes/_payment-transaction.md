# Payment Transaction

Payment transactions belong to a [Payment](https://killbill.github.io/slate/#payment-payment-resource) object.

They represent a particular payment operation, and while most operations happen at the `Payment` level, there are a few endpoints
that work directly at the transaction level.

## Payments Transaction

#### PaymentTransaction

* **`transactionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`transactionExternalKey`** <span style="color:#32A9C7">*[User generated, default transactionId, immutable]*</span>: The external key provided from client.
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>: The (`Payment`) external key provided from client.
* **`amount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Amount for this transaction.
* **`currency`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Currency for this transaction.
* **`effectiveDate`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The effective date of the transaction.
* **`processedAmount`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The amount processed by the gateway -- will often match the `amount`, but could be different - e.g currency conversion
* **`processedCurrency`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The currency processed by the gateway -- will often match the `currency`, but could be different - e.g currency conversion
* **`status`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Transaction status 
* **`gatewayErrorCode`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Error code returned by the payment gateway.
* **`gatewayErrorMsg`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Error message returned by the payment gateway.
* **`firstPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Payment gateway reference.
* **`secondPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: This is typically the `ID` from the actual payment processor, when the gateway is a PSP.
* **`properties`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Properties passed during payment operation to be interpreted by the plugin - those are plugin specific.


### Retrieve a payment by transaction external key

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentTransactions`

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

`GET http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}`

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

`POST http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}`

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
    -d '[{"paymentId": "e8edd4c6-2f85-4375-95f3-e78ca4d85b82", "status": "SUCCESS"}]' \
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

`GET http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/auditLogsWithHistory`

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

Custom fields are {key, value} attributes that can be attached to any customer resources, and in particularly on the `PaymentTransaction` objects.

### Add custom fields to payment transaction

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/customFields`

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
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 paymentTransactionId, 
                                 ObjectType.TRANSACTION, 
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

PaymentTransactionApi.createTransactionCustomFields(paymentTransactionId, 
                                                    customFields, 
                                                    requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()
body = CustomField(name='Test Custom Field', value='test_value')

paymentTransactionApi.create_transaction_custom_fields(payment_transaction_id,
                                                       [body],
                                                       created_by,
                                                       api_key,
                                                       api_secret)
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
TODO
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

`GET http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/customFields`

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
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

List<CustomField> customFields = paymentTransactionApi.getTransactionCustomFields(paymentTransactionId,
                                                                                  AuditLevel.NONE,
                                                                                  requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

paymentTransactionApi.get_transaction_custom_fields(payment_transaction_id, api_key, api_secret)
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
TODO
```
```python
[{'audit_logs': [],
 'custom_field_id': '893e0286-2b48-493b-99af-aac9b172dc75',
 'name': 'Test Custom Field',
 'object_id': '924bebe7-58e7-40e8-a5ed-192efb59d8ee',
 'object_type': 'TRANSACTION',
 'value': 'test_value'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

### Modify custom fields to payment transaction

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/customFields`

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
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

paymentTransactionApi.modifyTransactionCustomFields(paymentTransactionId, 
                                                    customFieldModified, 
                                                    requestOptions);
```

```ruby
TODO
```
```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

custom_field_id = '9913e0f6-b5ef-498b-ac47-60e1626eba8f'
body = CustomField(custom_field_id=custom_field_id, name='Test Modify', value='test_modify_value')

paymentTransactionApi.modify_transaction_custom_fields(payment_transaction_id,
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

None.

**Returns**

A `204` http status without content.

### Remove custom fields from payment transaction

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/customFields`

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
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

paymentTransactionApi.deleteTransactionCustomFields(paymentTransactionId, 
                                                    customFieldsId, 
                                                    requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

payment_transaction_id = 'f33e0adc-78df-438a-b920-aaacd7f8597a'

paymentTransactionApi.delete_transaction_custom_fields(payment_transaction_id,
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
| **customField** | string | true | the list of custom field object IDs that should be deleted.|

**Returns**

A `204` http status without content.

## Tags

See section [Account Tags](#account-tags) for an introduction.

The are no `system` tags applicable for an `PaymentTransaction`.

Let's assume there is an existing `user` tagDefintion already created with `tagDefinitionId`=`353752dd-9041-4450-b782-a8bb03a923c8`.

### Add tags to payment transaction

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/tags`

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
            "353752dd-9041-4450-b782-a8bb03a923c8"
        ]' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/tags' 
```

```java
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("917992d3-5f1f-4828-9fff-799cc4211aa9");

UUID tagDefinitionId = UUID.fromString("353752dd-9041-4450-b782-a8bb03a923c8");

Tags result = PaymentTransactionApi.createTransactionTags(paymentTransactionId, 
                                                          ImmutableList.<UUID>of(tagDefinitionId), 
                                                          requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

tag = ["353752dd-9041-4450-b782-a8bb03a923c8"]

paymentTransactionApi.create_transaction_tags(payment_transaction_id,
                                              tag,
                                              created_by,
                                              api_key,
                                              api_secret)
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
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: TRANSACTION
    objectId: 917992d3-5f1f-4828-9fff-799cc4211aa9
    tagDefinitionId: 353752dd-9041-4450-b782-a8bb03a923c8
    tagDefinitionName: AUTO_PAY_OFF
    auditLogs: []
}
```
```ruby
TODO
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `201` http status without content.

### Retrieve payment transaction tags 

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/tags`

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
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");

Boolean includedDeleted = false; // Will not include deleted tags

List<Tag> tags = paymentTransactionApi.getTransactionTags(paymentTransactionId, 
                                                          includedDeleted, 
                                                          AuditLevel.FULL, 
                                                          requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

payment_transaction_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

paymentTransactionApi.get_transaction_tags(payment_transaction_id, api_key, api_secret)
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
    "tagDefinitionId": "353752dd-9041-4450-b782-a8bb03a923c8",
    "tagDefinitionName": "foo",
    "auditLogs": []
  }
]
```

```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@cae768d7
    tagId: d724f79d-fad1-4758-b35e-d62708450d90
    objectType: TRANSACTION
    objectId: e659f0f3-745c-46d5-953c-28fe9282fc7d
    tagDefinitionId: 353752dd-9041-4450-b782-a8bb03a923c8
    tagDefinitionName: foo
    auditLogs: [class AuditLog {
        changeType: INSERT
        changeDate: 2012-08-25T00:00:02.000Z
        objectType: TAG
        objectId: d724f79d-fad1-4758-b35e-d62708450d90
        changedBy: Toto
        reasonCode: i am god
        comments: no comment
        userToken: e36f7ba5-fb5b-41c0-b47c-77c48ab37dd9
        history: null
    }]
}
```
```ruby
TODO
```
```python
[{'audit_logs': [],
 'object_id': '41b6b214-c3f7-40ea-89cd-6a4ecbd9083b',
 'object_type': 'TRANSACTION',
 'tag_definition_id': '353752dd-9041-4450-b782-a8bb03a923c8',
 'tag_definition_name': 'foo',
 'tag_id': '865e0c77-def7-4880-ac80-11c21a5e571d'}]
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

`DELETE http://127.0.0.1:8080/1.0/kb/paymentTransactions/{transactionId}/tags`

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true | the list of tag definition ID identifying the tags that should be removed. |

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'X-Killbill-CreatedBy: demo' \
    'http://127.0.0.1:8080/1.0/kb/paymentTransactions/8fe697d4-2c25-482c-aa45-f6cd5a48186d/tags?tagDef=353752dd-9041-4450-b782-a8bb03a923c8' 	
```

```java
import org.killbill.billing.client.api.gen.PaymentTransactionApi;
protected PaymentTransactionApi paymentTransactionApi;

UUID paymentTransactionId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");

UUID tagDefinitionId = UUID.fromString("353752dd-9041-4450-b782-a8bb03a923c8");

paymentTransactionApi.deleteTransactionTags(paymentTransactionId, 
                                            ImmutableList.<UUID>of(tagDefinitionId), 
                                            requestOptions);
```

```ruby
TODO
```

```python
paymentTransactionApi = killbill.api.PaymentTransactionApi()

payment_transaction_id = 'dce5b2a0-0f0f-430b-9427-545ba4be5c7f'
tag = ["353752dd-9041-4450-b782-a8bb03a923c8"] 

paymentTransactionApi.delete_transaction_tags(payment_transaction_id,
                                              created_by,
                                              api_key,
                                              api_secret,
                                              tag_def=tag)
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
TODO
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true |  list with tag definition id's that you want to remove it |

**Response**

A `204` http status without content.
