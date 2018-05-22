# Payment

## Payment Resource

The `Payment` resource represent the payments created by the user.

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated]*</span>
* **`authAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`capturedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`purchasedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`refundedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`creditedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`currency`** <span style="color:#32A9C7">*TODO*</span>
* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`transactions`** <span style="color:#32A9C7">*[See `PaymentTransaction` bellow]*</span>
* **`paymentAttempts`** <span style="color:#32A9C7">*[`PaymentAttempt`]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

### PaymentTransaction

* **`transactionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`transactionExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span> 
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span> 
* **`amount`** <span style="color:#32A9C7">*TODO*</span> 
* **`currency`** <span style="color:#32A9C7">*TODO*</span> 
* **`effectiveDate`** <span style="color:#32A9C7">*TODO*</span> 
* **`processedAmount`** <span style="color:#32A9C7">*TODO*</span> 
* **`processedCurrency`** <span style="color:#32A9C7">*TODO*</span> 
* **`status`** <span style="color:#32A9C7">*TODO*</span> 
* **`gatewayErrorCode`** <span style="color:#32A9C7">*TODO*</span> 
* **`gatewayErrorMsg`** <span style="color:#32A9C7">*TODO*</span> 
* **`firstPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`secondPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`properties`** <span style="color:#32A9C7">*[`PluginProperty`]*</span> 

## Capture an existing authorization

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "b2a187b8-0028-4de8-b349-0ebe4e714a5a"
transaction.amount     = "483.22"
transaction.currency   = "BTC"

transaction.capture(user, 
                    reason, 
                    comment, 
                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'b2a187b8-0028-4de8-b349-0ebe4e714a5a'
body = PaymentTransaction(payment_id=payment_id, 
                          amount=50.0, 
                          currency='USD')

paymentApi.capture_authorization(payment_id,
                                 body,
                                 created_by,
                                 api_key,
                                 api_secret)
```

> Example Response:

```ruby
{
   "accountId":"fc82dba5-69e0-492c-be50-bc7e1642f987",
   "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
   "paymentNumber":"63",
   "paymentExternalKey":"payment1-323475",
   "authAmount":240922.1504832,
   "capturedAmount":483.22,
   "purchasedAmount":0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"BTC",
   "paymentMethodId":"395cfcd1-7a7d-40a6-bc5d-f722833072d2",
   "transactions":[
      {
         "transactionId":"41c95fbc-c9a2-4981-a7ef-7f16f20055ae",
         "transactionExternalKey":"payment1-323475-auth1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"AUTHORIZE",
         "amount":240922.1504832,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":240922.1504832,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"a6afaec2-4e6f-4e4c-af94-9a03c39c6032",
         "transactionExternalKey":"payment1-323475-capture1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"CAPTURE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Capture an existing authorization [using external key]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.amount                   = "483.22"
transaction.currency                 = "BTC"
transaction.transaction_external_key = "payment1-323475"

transaction.capture(user, 
                    reason, 
                    comment, 
                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0,
                          currency='USD')

paymentApi.capture_authorization_by_external_key(body, 
                                                 created_by, 
                                                 api_key, 
                                                 api_secret)
```

> Example Response:

```ruby
{
   "accountId":"fc82dba5-69e0-492c-be50-bc7e1642f987",
   "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
   "paymentNumber":"63",
   "paymentExternalKey":"payment1-323475",
   "authAmount":483.22,
   "capturedAmount":483.22,
   "purchasedAmount":0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"BTC",
   "paymentMethodId":"395cfcd1-7a7d-40a6-bc5d-f722833072d2",
   "transactions":[
      {
         "transactionId":"41c95fbc-c9a2-4981-a7ef-7f16f20055ae",
         "transactionExternalKey":"payment1-323475-auth1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"AUTHORIZE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"a6afaec2-4e6f-4e4c-af94-9a03c39c6032",
         "transactionExternalKey":"payment1-323475-capture1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"CAPTURE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Retrieve a payment by id [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_id = "12c70604-cede-4df3-a321-38be4d176e9a"
with_plugin_info = false
with_attempts = false

KillBillClient::Model::Payment.find_by_id(payment_id, 
                                          with_plugin_info, 
                                          with_attempts, 
                                          options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e'

paymentApi.get_payment(payment_id, api_key, api_secret)
```

> Example Response:

```ruby
{
   "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
   "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
   "paymentNumber":"65",
   "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
   "transactions":[
      {
         "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"dff69d54-9593-4d19-893e-287720272175",
         "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:06.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
{'account_id': '1686f19d-bc3a-4a4b-987f-837b0547df50',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
 'payment_id': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
 'payment_method_id': '54c9a68e-155d-44ec-b5a0-694f9a4e0962',
 'payment_number': '428',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 15, 58, 4, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
                   'payment_id': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '0eff43b1-133e-4a8b-ab75-061d72a1879c',
                   'transaction_id': '0eff43b1-133e-4a8b-ab75-061d72a1879c',
                   'transaction_type': 'AUTHORIZE'}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment object.

## Retrieve a payment by external key

**HTTP Request** 

`GET http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
external_key = "example_payment_external_key"
with_plugin_info = false
with_attempts = false

KillBillClient::Model::Payment.find_by_external_key(external_key, 
                                                    with_plugin_info, 
                                                    with_attempts, 
                                                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key' 

paymentApi.get_payment_by_external_key(payment_external_key,
                                       api_key,
                                       api_secret)
```

> Example Response:

```ruby
{
   "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
   "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
   "paymentNumber":"65",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
   "transactions":[
      {
         "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"dff69d54-9593-4d19-893e-287720272175",
         "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:06.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
{'account_id': '35e08817-3fcd-46a2-aa35-148bbe47c2d9',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'sample_external_key',
 'payment_id': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
 'payment_method_id': '41cc673a-2030-4ad1-ad91-0a2a22b8732b',
 'payment_number': '430',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 17, 14, 32, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
                   'payment_id': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '8c0bfe29-44b2-4aaf-937a-e368c233dccf',
                   'transaction_id': '8c0bfe29-44b2-4aaf-937a-e368c233dccf',
                   'transaction_type': 'AUTHORIZE'}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment object.

## Complete an existing transaction [payment]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "7dcda896-808b-414c-aad4-74ddc98e3dcb"
refresh_options        = nil

transaction.complete_initial_transaction(user, 
                                         reason, 
                                         comment, 
                                         options, 
                                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '7dcda896-808b-414c-aad4-74ddc98e3dcb'
body = PaymentTransaction(payment_id=payment_id)

paymentApi.complete_transaction(payment_id,
                                body,
                                created_by,
                                api_key,
                                api_secret)
```

> Example Response:

```ruby
{
   "accountId":"f25f5fe5-63ab-4478-89f1-cc868982f19a",
   "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
   "paymentNumber":"84",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"0c6f5c90-3b90-4a35-b378-c22a2bea598b",
   "transactions":[
      {
         "transactionId":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "transactionExternalKey":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "paymentExternalKey":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `204` http status without content.

## Complete an existing transaction [using external key]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
refresh_options                  = nil

transaction.complete_initial_transaction(user, 
                                         reason, 
                                         comment, 
                                         options, 
                                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key)

paymentApi.complete_transaction_by_external_key(body,
                                                created_by,
                                                api_key,
                                                api_secret)
```

> Example Response:

```ruby
{
   "accountId":"f25f5fe5-63ab-4478-89f1-cc868982f19a",
   "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
   "paymentNumber":"84",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"0c6f5c90-3b90-4a35-b378-c22a2bea598b",
   "transactions":[
      {
         "transactionId":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "transactionExternalKey":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "paymentExternalKey":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `204` http status without content.

## Void an existing payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction             = KillBillClient::Model::Transaction.new
transaction.payment_id  = "29b34a3d-d301-4e57-8fc2-2c0a201c4fd0"

transaction.void(user, 
                 reason, 
                 comment, 
                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '29b34a3d-d301-4e57-8fc2-2c0a201c4fd0'
body = PaymentTransaction(payment_id=payment_id)

paymentApi.void_payment(payment_id,
                        body,
                        created_by,
                        api_key,
                        api_secret)
```
> Example Response:

```ruby
{
   "transactionId":"29b34a3d-d301-4e57-8fc2-2c0a201c4fd0",
   "transactionExternalKey":"payment2-121268-void",
   "paymentId":"275889ca-60aa-4801-9b53-8b2e0b9844ca",
   "paymentExternalKey":"payment2-121268",
   "transactionType":"VOID",
   "effectiveDate":"2013-08-01T06:00:07.000Z",
   "processedAmount":0.0,
   "status":"SUCCESS",
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment transaction object.

## Void an existing payment [using external key]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "payment2-121268-void"

transaction.void(user, 
                 reason, 
                 comment, 
                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key)

paymentApi.void_payment_by_external_key(body,
                                        created_by,
                                        api_key,
                                        api_secret)
```
> Example Response:

```ruby
{
   "transactionId":"29b34a3d-d301-4e57-8fc2-2c0a201c4fd0",
   "transactionExternalKey":"payment2-121268-void",
   "paymentId":"275889ca-60aa-4801-9b53-8b2e0b9844ca",
   "paymentExternalKey":"payment2-121268",
   "transactionType":"VOID",
   "effectiveDate":"2013-08-01T06:00:07.000Z",
   "processedAmount":0.0,
   "status":"SUCCESS",
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

A `204` http status without content.

## Record a chargeback [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/chargebacks`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                = KillBillClient::Model::Transaction.new
transaction.payment_id     = "42ab1653-051f-416c-8c70-bf5d4061d4fa"
transaction.amount         = '50.0'
transaction.currency       = 'USD'
transaction.effective_date = nil
refresh_options            = nil

transaction.chargeback(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '42ab1653-051f-416c-8c70-bf5d4061d4fa'
body = PaymentTransaction(payment_id=payment_id,
                          amount=50.0,
                          currency='USD',
                          effective_date=None)

paymentApi.chargeback_payment(payment_id,
                              body,
                              created_by,
                              api_key,
                              api_secret)
```

> Example Response:

```ruby
{
   "accountId":"82d3625e-65f0-403e-a3aa-8077accb4295",
   "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "paymentNumber":"67",
   "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":0.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"bde4c67d-4069-4d1c-bd46-029ddda0532f",
   "transactions":[
      {
         "transactionId":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "transactionExternalKey":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "transactionExternalKey":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Record a chargeback [using external key]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/chargebacks`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
transaction.amount               = '50.0'
transaction.currency             = 'USD'
transaction.effective_date       = nil
refresh_options                  = nil

transaction.chargeback(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0,
                          currency='USD',
                          effective_date=None)

paymentApi.chargeback_payment_by_external_key(body,
                                              created_by,
                                              api_key,
                                              api_secret)
```

> Example Response:

```ruby
{
   "accountId":"82d3625e-65f0-403e-a3aa-8077accb4295",
   "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "paymentNumber":"67",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":0.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"bde4c67d-4069-4d1c-bd46-029ddda0532f",
   "transactions":[
      {
         "transactionId":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "transactionExternalKey":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "transactionExternalKey":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Record a chargeback reversal [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/chargebackReversals`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "9ceb96a2-5407-482b-8847-7b08cc64213f"
transaction.payment_id               = "74a82e25-120a-4a39-a7f7-7b5c2b4ac05d"

transaction.chargeback_reversals(user, 
                                 reason, 
                                 comment, 
                                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '74a82e25-120a-4a39-a7f7-7b5c2b4ac05d'
transaction_external_key = '9ceb96a2-5407-482b-8847-7b08cc64213f'
body = PaymentTransaction(payment_id=payment_id,
                          transaction_external_key=transaction_external_key)

paymentApi.chargeback_reversal_payment(payment_id,
                                       body,
                                       created_by,
                                       api_key,
                                       api_secret)
```

> Example Response:

```ruby
{
   "accountId":"d513c084-2ee4-4e65-aea5-b47dde03d2d4",
   "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
   "paymentNumber":"66",
   "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c5676241-85dd-47ba-be4c-5dec75fade33",
   "transactions":[
      {
         "transactionId":"9ceb96a2-5407-482b-8847-7b08cc64213f",
         "transactionExternalKey":"9ceb96a2-5407-482b-8847-7b08cc64213f",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "transactionExternalKey":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"112ad9f1-5a36-447c-aadc-ac20c6e56feb",
         "transactionExternalKey":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "transactionType":"CHARGEBACK",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":0.0,
         "status":"PAYMENT_FAILURE",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Record a chargeback reversal [using external key]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/chargebackReversals`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"

transaction.chargeback_reversals(user, 
                                 reason, 
                                 comment, 
                                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
body = PaymentTransaction(payment_external_key=payment_external_key,
                          transaction_external_key=transaction_external_key)

paymentApi.chargeback_reversal_payment_by_external_key(body,
                                                       created_by,
                                                       api_key,
                                                       api_secret)
```

> Example Response:

```ruby
{
   "accountId":"58f01daa-df0f-424e-b430-ad54c3653d70",
   "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
   "paymentNumber":"71",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"29b3f923-5985-496e-835a-c26f3742c13d",
   "transactions":[
      {
         "transactionId":"231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c",
         "transactionExternalKey":"231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "transactionExternalKey":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"b193f299-9788-4dc9-abc8-b1971bee68e1",
         "transactionExternalKey":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "transactionType":"CHARGEBACK",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":0.0,
         "status":"PAYMENT_FAILURE",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Add custom fields to payment [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'PAYMENT'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

payment.add_custom_field(custom_field, 
                         user,
                         reason,
                         comment,
                         options)
```

```python
paymentApi = killbill.api.PaymentApi()
body = CustomField(name='Test Custom Field', value='test_value')

paymentApi.create_payment_custom_fields(payment_id,
                                        [body],
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

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

## Retrieve payment custom fields [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

payment.custom_fields(audit, options)
```

```python
paymentApi = killbill.api.PaymentApi()

paymentApi.get_payment_custom_fields(payment_id, api_key, api_secret)
```

> Example Response:

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
[{'audit_logs': [],
 'custom_field_id': '893e0286-2b48-493b-99af-aac9b172dc75',
 'name': 'Test Custom Field',
 'object_id': '924bebe7-58e7-40e8-a5ed-192efb59d8ee',
 'object_type': 'PAYMENT',
 'value': 'test_value'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to payment [payment]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
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

## Remove custom fields from payment [payment]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

payment.remove_custom_field(custom_field_id,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'f33e0adc-78df-438a-b920-aaacd7f8597a'

paymentApi.delete_payment_custom_fields(payment_id,
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

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

## Refund an existing payment

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/refunds`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "dce5b2a0-0f0f-430b-9427-545ba4be5c7f"
transaction.amount     = '50.0'
refresh_options        = nil

transaction.refund(user, 
                   reason, 
                   comment, 
                   options, 
                   refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'dce5b2a0-0f0f-430b-9427-545ba4be5c7f' 
body = PaymentTransaction(payment_id=payment_id,
                          amount=50.0)

paymentApi.refund_payment(payment_id,
                          body,
                          created_by,
                          api_key,
                          api_secret)
```

> Example Response:

```ruby
{
   "accountId":"6c297750-3a6d-42a4-9d75-c900fbc75ddf",
   "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "paymentNumber":"69",
   "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"ba2b0bd4-43f2-4b4a-839c-5a2fa40ea0de",
   "transactions":[
      {
         "transactionId":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "transactionExternalKey":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"28740a66-834a-4005-81d5-55a4550751b9",
         "transactionExternalKey":"28740a66-834a-4005-81d5-55a4550751b9",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Refund an existing payment with external key

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/refunds`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
transaction.amount               = '50.0'
refresh_options                  = nil

transaction.refund_by_external_key(user, 
                                   reason, 
                                   comment, 
                                   options, 
                                   refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'example_payment_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0)

paymentApi.refund_payment_by_external_key(body,
                                          created_by,
                                          api_key,
                                          api_secret)
```
> Example Response:

```ruby
{
   "accountId":"6c297750-3a6d-42a4-9d75-c900fbc75ddf",
   "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "paymentNumber":"69",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"ba2b0bd4-43f2-4b4a-839c-5a2fa40ea0de",
   "transactions":[
      {
         "transactionId":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "transactionExternalKey":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"28740a66-834a-4005-81d5-55a4550751b9",
         "transactionExternalKey":"28740a66-834a-4005-81d5-55a4550751b9",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Add tags to payment [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

payment.add_tag(tag_name,
                user,
                reason,
                comment,
                options)
```

```python
paymentApi = killbill.api.PaymentApi()
tag = ["00000000-0000-0000-0000-000000000002"]

paymentApi.create_payment_tags(payment_id,
                               tag,
                               created_by,
                               api_key,
                               api_secret)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"PAYMENT",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
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

## Retrieve payment tags [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
included_deleted = false
audit = 'NONE'

payment.tags(included_deleted,
             audit,
             options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

paymentApi.get_payment_tags(payment_id, api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"PAYMENT",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
```
```python
[{'audit_logs': [],
 'object_id': '41b6b214-c3f7-40ea-89cd-6a4ecbd9083b',
 'object_type': 'PAYMENT',
 'tag_definition_id': '00000000-0000-0000-0000-000000000002',
 'tag_definition_name': 'AUTO_INVOICING_OFF',
 'tag_id': '865e0c77-def7-4880-ac80-11c21a5e571d'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

## Remove tags from payment [payment]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

payment.remove_tag(tag_name,
                   user,
                   reason,
                   comment,
                   options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'dce5b2a0-0f0f-430b-9427-545ba4be5c7f'
tag = ["00000000-0000-0000-0000-000000000002"] 

paymentApi.delete_payment_tags(payment_id,
                               created_by,
                               api_key,
                               api_secret,
                               tag_def=tag)
```

> Example Response:

```ruby
no content
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

## Cancels a scheduled payment attempt retry

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentTransactionId}/cancelScheduledPaymentTransaction`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                = KillBillClient::Model::Transaction.new
transaction.transaction_id = "231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c"

transaction.cancel_scheduled_payment(user, 
                                     reason, 
                                     comment, 
                                     options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_transaction_id = '231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c'

paymentApi.cancel_scheduled_payment_transaction_by_id(payment_transaction_id,
                                                      created_by,
                                                      api_key,
                                                      api_secret)
```

> Example Response:

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

## Cancels a scheduled payment attempt retry [using external key]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/cancelScheduledPaymentTransaction`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "example_payment_external_key"

transaction.cancel_scheduled_payment(user, 
                                     reason, 
                                     comment, 
                                     options)
```

```python
paymentApi = killbill.api.PaymentApi()
transaction_external_key = 'example_payment_external_key'

paymentApi.cancel_scheduled_payment_transaction_by_external_key(transaction_external_key,
                                                                created_by,
                                                                api_key,
                                                                api_secret)
```
> Example Response:

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

## Combo api to create a new payment transaction on a existing (or not) account

New payment transaction type can be: authorization, purchase or credit

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/combo`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
combo_transaction = KillBillClient::Model::ComboTransaction.new
combo_transaction.account = account_obj
combo_transaction.payment_method = payment_method_obj
combo_transaction.transaction = transaction_obj

refresh_options = nil

# Authorization
combo_transaction.auth(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)

# Purchase
combo_transaction.purchase(user, 
                           reason, 
                           comment, 
                           options, 
                           refresh_options)

# Credit
combo_transaction.credit(user, 
                         reason, 
                         comment, 
                         options, 
                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
body = ComboPaymentTransaction(account_obj, payment_method_obj, payment_transaction_obj)

paymentApi.create_combo_payment(body,
                                created_by,
                                api_key,
                                api_secret)
```

> Example Response:

```ruby
{
   "accountId":"86bb6cbc-1324-47fe-99f6-f0f2bf47f3da",
   "paymentId":"125de719-c4db-4c8c-be98-2a75f0d09011",
   "paymentNumber":"83",
   "paymentExternalKey":"test_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"3a61344c-c9b5-4ef6-92cc-581bcb8b20de",
   "transactions":[
      {
         "transactionId":"a93d034b-ef54-4664-88c4-5be20272b330",
         "transactionExternalKey":"a93d034b-ef54-4664-88c4-5be20272b330",
         "paymentId":"125de719-c4db-4c8c-be98-2a75f0d09011",
         "paymentExternalKey":"test_key",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Get payments

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/pagination`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
offset = 0
limit = 100
payment.find_in_batches(offset, 
                        limit, 
                        options)
```

```python
paymentApi = killbill.api.PaymentApi()

paymentApi.get_payments(api_key, api_secret)
```

> Example Response:

```ruby
[
    {
       "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
       "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
       "paymentNumber":"65",
       "paymentExternalKey":"example_payment_external_key",
       "authAmount":0,
       "capturedAmount":0,
       "purchasedAmount":50.0,
       "refundedAmount":50.0,
       "creditedAmount":0,
       "currency":"USD",
       "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
       "transactions":[
          {
             "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"PURCHASE",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:04.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          },
          {
             "transactionId":"dff69d54-9593-4d19-893e-287720272175",
             "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"REFUND",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:06.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          }
       ],
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '5b23cc61-4afc-48bd-9fe8-0fafda02a00f',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '9e283f36-269b-4d51-8341-1ff354b8c631',
 'payment_id': '9e283f36-269b-4d51-8341-1ff354b8c631',
 'payment_method_id': '4acc1167-22f9-4c89-a8e7-051814ba78f0',
 'payment_number': '533',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 8, 45, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '9e283f36-269b-4d51-8341-1ff354b8c631',
                   'payment_id': '9e283f36-269b-4d51-8341-1ff354b8c631',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': 'b144e485-7570-4748-b5d2-7c25d720b264',
                   'transaction_id': 'b144e485-7570-4748-b5d2-7c25d720b264',
                   'transaction_type': 'PURCHASE'}]}, {'account_id': '5b23cc61-4afc-48bd-9fe8-0fafda02a00f',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '078b62a4-1197-44b1-801d-3a0c01a53702',
 'payment_id': '078b62a4-1197-44b1-801d-3a0c01a53702',
 'payment_method_id': '4acc1167-22f9-4c89-a8e7-051814ba78f0',
 'payment_number': '534',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 8, 46, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '078b62a4-1197-44b1-801d-3a0c01a53702',
                   'payment_id': '078b62a4-1197-44b1-801d-3a0c01a53702',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '9c184ba0-723b-4d5b-ad57-be26fb15fd40',
                   'transaction_id': '9c184ba0-723b-4d5b-ad57-be26fb15fd40',
                   'transaction_type': 'AUTHORIZE'}]}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **audit** | enum | false | level of audit logs returned | 
| **pluginName** | string | false | plugin name |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a list with all payments.

## Search payments

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/search/{searchKey}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
search_key = 'PURCHASE'
offset = 0
limit = 100

payment.find_in_batches_by_search_key(search_key,
                                      offset,
                                      limit,
                                      options)
```

```python
paymentApi = killbill.api.PaymentApi()
search_key = 'SUCCESS'

paymentApi.search_payments(search_key, api_key, api_secret)
```

> Example Response:

```ruby
[
    {
       "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
       "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
       "paymentNumber":"65",
       "paymentExternalKey":"example_payment_external_key",
       "authAmount":0,
       "capturedAmount":0,
       "purchasedAmount":50.0,
       "refundedAmount":50.0,
       "creditedAmount":0,
       "currency":"USD",
       "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
       "transactions":[
          {
             "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"PURCHASE",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:04.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          },
          {
             "transactionId":"dff69d54-9593-4d19-893e-287720272175",
             "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"REFUND",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:06.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          }
       ],
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '494df5a9-d8da-4e56-852a-459fdaca85d1',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
 'payment_id': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
 'payment_method_id': 'b7c26570-3515-4055-a8a8-4d6d4b45dc28',
 'payment_number': '537',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 12, 8, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
                   'payment_id': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '0fa4d97d-086b-43b3-a9f2-085c9cc382c2',
                   'transaction_id': '0fa4d97d-086b-43b3-a9f2-085c9cc382c2',
                   'transaction_type': 'PURCHASE'}]}, {'account_id': '494df5a9-d8da-4e56-852a-459fdaca85d1',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'b937a96e-36b4-46fa-a609-64d568403551',
 'payment_id': 'b937a96e-36b4-46fa-a609-64d568403551',
 'payment_method_id': 'b7c26570-3515-4055-a8a8-4d6d4b45dc28',
 'payment_number': '538',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 12, 9, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': 'b937a96e-36b4-46fa-a609-64d568403551',
                   'payment_id': 'b937a96e-36b4-46fa-a609-64d568403551',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '49884122-aa64-4518-b2de-55fe4fbde856',
                   'transaction_id': '49884122-aa64-4518-b2de-55fe4fbde856',
                   'transaction_type': 'AUTHORIZE'}]}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **audit** | enum | false | level of audit logs returned | 
| **pluginName** | string | false | plugin name |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Return a list with payments matched with the search key entered.
