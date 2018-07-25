# Admin

## Trigger an invoice generation for all parked accounts

**HTTP Request** 

`POST http://example.com/1.0/kb/admin/invoices`

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
    "http://localhost:8080/1.0/kb/admin/invoices"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

adminApi.triggerInvoiceGenerationForParkedAccounts(offset, 
                                                   limit, 
                                                   requestOptions);
```

```ruby
ofset = 0
limit = 100
user = "demo"

KillBillClient::Model::Admin.trigger_invoice_generation_for_parked_accounts(ofset, 
                                                                            limit, 
                                                                            user, 
                                                                            options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.trigger_invoice_generation_for_parked_accounts('test', api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json
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
| **offset** | long | true | offset |
| **limit** | long | true | limit results |

**Returns**

A 200 http status without content.

## Get queues entries

**HTTP Request** 

`GET http://example.com/1.0/kb/admin/queues`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/octet-stream" \
    "http://localhost:8080/1.0/kb/admin/queues"
```

```java
UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");
String queueName = null;
String serviceName = null;
Boolean withHistory = true;
String minDate = null;
String maxDate = null;
Boolean withInProcessing = true;
Boolean withNotifications = true;
OutputStream outputStream = null;


adminApi.getQueueEntries(accountId,
                         queueName, 
                         serviceName, 
                         withHistory, 
                         minDate, 
                         maxDate, 
                         withInProcessing, 
                         withBusEvents, 
                         withNotifications, 
                         outputStream, 
                         requestOptions);
```

```ruby
account_id = "864c1418-e768-4cd5-a0db-67537144b685"
KillBillClient::Model::Admin.get_queues_entries(account_id, options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.get_queue_entries(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/octet-stream

{"busEvents":[],"notifications":[]}
```
```java
{"busEvents":[],"notifications":[]}
```
```ruby
"{\"busEvents\":[],\"notifications\":[]}"
```
```python
"{\"busEvents\":[],\"notifications\":[]}"
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **accountId** | string | false | account id |
| **queueName** | string | false | queue name |
| **serviceName** | string | false | service name |
| **withHistory** | boolean | false | choose true to get history |
| **minDate** | string | false | minimum date |
| **maxDate** | string | false | maximun date |
| **withInProcessing** | boolean | false | choose true to get processing |
| **withBusEvents** | boolean | false | choose true to get bus events |
| **withNotifications** | boolean | false |choose true to get notifications |

**Returns**

A 200 http status.

## Update existing paymentTransaction and associated payment state

**HTTP Request** 

`PUT http://example.com/1.0/kb/admin/payments/{paymentId}/transactions/{paymentTransactionId}`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    "http://localhost:8080/1.0/kb/admin/payments/864c1418-e768-4cd5-a0db-67537144b685/transactions/864c1418-e768-4cd5-a0db-67537144b685"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

UUID paymentId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");
UUID paymentTransactionId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");

String lastSuccessPaymentState = "AUTH_FAILED";
String currentPaymentStateName = "AUTH_FAILED";
String transactionStatus = "PAYMENT_FAILURE";

AdminPayment body = new AdminPayment(lastSuccessPaymentState, 
                                     currentPaymentStateName, 
                                     transactionStatus);

adminApi.updatePaymentTransactionState(paymentId, 
                                       paymentTransactionId, 
                                       body, 
                                       requestOptions);
```

```ruby
payment_id = "6cb944a-b308-4488-b046-4b4d61d375a6"
transaction_id = "8gb944a-b308-4488-b046-4b4d61d375r3"
transaction_status = "AUTH_FAILED"
user =  "demo"
reason = nil
comment = nil

KillBillClient::Model::Admin.fix_transaction_state(payment_id, 
                                                   transaction_id, 
                                                   transaction_status, 
                                                   user, 
                                                   reason, 
                                                   comment, 
                                                   options)
```

```python
adminApi = killbill.api.AdminApi()

payment_id = '8gb944a-b308-4488-b046-4b4d61d375r3'
payment_transaction_id = '6cb944a-b308-4488-b046-4b4d61d375a6'
body = AdminPayment(transaction_status='AUTH_FAILED')
created_by = 'demo'

adminApi.update_payment_transaction_state(payment_id, 
                                          payment_transaction_id, 
                                          body, 
                                          created_by,
                                          api_key, 
                                          api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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

A 204 http status without content.

## Invalidates the given Cache if specified, otherwise invalidates all caches

**HTTP Request** 

`DELETE http://example.com/1.0/kb/admin/cache`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://localhost:8080/1.0/kb/admin/cache"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

String cacheName = null;

adminApi.invalidatesCache(cacheName, requestOptions);
```

```ruby
cache_name = nil
KillBillClient::Model::Admin.invalidates_cache(cache_name, options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.invalidates_cache(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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
| **cacheName** | string | false | cache name |

**Returns**

A 204 http status without content.

## Invalidates Caches per account level

**HTTP Request** 

`DELETE http://example.com/1.0/kb/admin/cache/accounts/{accountId}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://localhost:8080/1.0/kb/admin/cache/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");

adminApi.invalidatesCacheByAccount(accountId, requestOptions);
```

```ruby
account_id = "2ad52f53-85ae-408a-9879-32a7e59dd03d"
KillBillClient::Model::Admin.invalidates_cache_by_account(account_id, options)
```

```python
adminApi = killbill.api.AdminApi()
account_id = '2ad52f53-85ae-408a-9879-32a7e59dd03d'

adminApi.invalidates_cache_by_account(account_id, api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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
| **accountId** | string | true | account id |

**Returns**

A 204 http status without content.

## Invalidates Caches per tenant level

**HTTP Request** 

`DELETE http://example.com/1.0/kb/admin/cache/tenants`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://localhost:8080/1.0/kb/admin/cache/tenants"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

adminApi.invalidatesCacheByTenant(requestOptions);
```

```ruby
KillBillClient::Model::Admin.invalidates_cache_by_tenant(options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.invalidates_cache_by_tenant(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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

A 204 http status without content.

## Put the host back into rotation

**HTTP Request** 

`PUT http://example.com/1.0/kb/admin/healthcheck`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    "http://localhost:8080/1.0/kb/admin/healthcheck"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

adminApi.putInRotation(requestOptions);
```

```ruby
KillBillClient::Model::Admin.put_in_rotation(options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.put_in_rotation(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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

A 204 http status without content.

## Put the host out of rotation

**HTTP Request** 

`DELETE http://example.com/1.0/kb/admin/healthcheck`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://localhost:8080/1.0/kb/admin/healthcheck"
```

```java
import org.killbill.billing.client.api.gen.AdminApi;
protected AdminApi adminApi;

adminApi.putOutOfRotation(requestOptions);
```

```ruby
KillBillClient::Model::Admin.put_out_of_rotation(options)
```

```python
adminApi = killbill.api.AdminApi()

adminApi.put_out_of_rotation(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
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

A 204 http status without content.