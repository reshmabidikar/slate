# Admin

The Admin resource offers a set of endpoints such as the following:

* Administrative APIs to fix improper states 
* Operational APIs such as adding hosts in and out of rotation, clearing internal caches, etc.
* APIs to retrieve low level information from the system

## Administrative Apis

Miscellaneous administrative APIs

### Trigger an invoice generation for all parked accounts

When the system detects an issue invoicing a customer `Account`, it will automatically `PARK` the `Account` as explained [here](http://docs.killbill.io/latest/invoice_subsystem.html#_parked_accounts). This API can be used after the issues have been resolved to remove accounts from the parked state and generate any outstanding invoices needed. 


**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/admin/invoices`

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
    "http://127.0.0.1:8080/1.0/kb/admin/invoices"
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ----------- |
| **offset** | long | no | 0 | starting offset for the page |
| **limit** | long | no | 100 | max results on this page |


**Returns**

If successful, returns a status code of 200 and a list of invoices generated.

### Update the state of a paymentTransaction and associated payment

Provides a way to fix the payment state data for a given `Payment`, if that data becomes corrupted.
This could happen, for example, if a call to a third party payment gateway times out, leaving the system in an unknwon state.


**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/admin/payments/{paymentId}/transactions/{paymentTransactionId}`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    "http://127.0.0.1:8080/1.0/kb/admin/payments/864c1418-e768-4cd5-a0db-67537144b685/transactions/864c1418-e768-4cd5-a0db-67537144b685"
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

**Request Body**

An `AdminPayment' object

**Query Parameters**

None.

**Returns**

If successful, returns a status code of 204 and an empty body.

## Operational Apis

These APIs invalidate caches and move a host in and out of the rotation

### Invalidate a specific cache, or invalidate all caches

Invalidates a specified cache. If no cache is specified, it invalidates all Kill Bill caches on the server.

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://127.0.0.1:8080/1.0/kb/admin/cache"
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **cacheName** | string | no | all caches | cache name |

**Returns**

If successful, returns a status code of 204 and an empty body.

### Invalidate Caches for an Account

Invalidates all Kill Bill caches on the server associated with a specific Account

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache/accounts/{accountId}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://127.0.0.1:8080/1.0/kb/admin/cache/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d"
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

None.

**Response**

If successful, returns a status code of 204 and an empty body.

### Invalidate Caches for a Tenant

Invalidates all Kill Bill caches on the server associated with this Tenant


**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache/tenants`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    "http://127.0.0.1:8080/1.0/kb/admin/cache/tenants"
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

If successful, returns a status code of 204 and an empty body.

### Put the host back into rotation

Adds a server back into the rotation after it has been removed.

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/admin/healthcheck`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    "http://127.0.0.1:8080/1.0/kb/admin/healthcheck"
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

**Response**

If successful, returns a status code of 204 and an empty body.

### Remove a server from the rotation

Removes a server from the rotation during a deployment.


**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/healthcheck`

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

**Response**

If successful, returns a status code of 204 and an empty body.

## Low Level View Apis

This API group currently includes a single API to view entries in the system queues

### Get queue entries

Returns low level details about queue entries. Results can be requested for a specific account or all accounts; for a specific queue or all queues, and for a specific service or all services. In addition optional types of events may be specified, including history, for a specified date range; in processing; bus events; and notifications.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/admin/queues`

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
```"
```ruby
{"busEvents":[],"notifications":[]}
```
```python
{"busEvents":[],"notifications":[]}
```

**Query Parameters**

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **accountId** | string | no | all accounts | account id  |
| **queueName** | string | no | all queues | queue name  |
| **serviceName** | string | no | all services | service name |
| **withHistory** | boolean | no | true | if true include history |
| **minDate** | string | no | from the beginning | earliest date for history |
| **maxDate** | string | no | current date | latest date for history |
| **withInProcessing** | boolean | no | true | if true include in processing |
| **withBusEvents** | boolean | no | true | if true include bus events |
| **withNotifications** | boolean | no | true |if true include notifications |

**Returns**

If successful, returns a status code of 200 and a list of queue entries of the specified types.

