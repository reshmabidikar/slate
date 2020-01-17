# Admin

The admin resource offers a set of enpoints of the following nature:

* Administrative apis to fix existing state 
* Operational apis such as adding hosts in and out of rotation, clearing internal caches, ...
* Retrieve low level information from the system

## Administrative Apis

### Trigger an invoice generation for all parked accounts

When the system detects an issue invoicing a customer `Account`, it will automatically `PARK` the `Account` as explained in this [documentation](http://docs.killbill.io/0.20/invoice_subsystem.html#_parked_accounts). 

After the issue was corrected -- e.g bug was fixed -- one can get all all the `Account` out of that state by triggering the following endpoint.


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
| **offset** | long | false | offset for the next pagination call or 0 if not specified |
| **limit** | long | false | limit results or default to 100 if not specified |

This api behaves like a [pagination api](https://killbill.github.io/slate/#using-kill-bill-apis-pagination) so the pagination headers can be used to paginate over results.


**Returns**

A 200 http status without content.

### Update existing paymentTransaction and associated payment state

Provides a way to fix the payment state data for a given `Payment`.
Typically this could happen under a scenario where the call to the third party payment gateway timed-out, and the system is left in an unknwon state.
Later, after possibly retrieveing third party payment gateway data, one can fix the state in Kill Bill using this endpoint.


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

## Operational Apis

### Invalidates the given Cache if specified, otherwise invalidates all caches


Ability to invalidate some/all the caches on a given Kill Bill node/server.

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache`

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

### Invalidates Caches per account level

Ability to invalidate some/all of the caches associated to a specific `Account` on a given Kill Bill node/server.


**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache/accounts/{accountId}`

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

None.

**Returns**

A 204 http status without content.

### Invalidates Caches per tenant level

Ability to invalidate some/all of the caches associated to a specific `Tenant` on a given Kill Bill node/server.


**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/admin/cache/tenants`

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

### Put the host back into rotation

Kill Bill provides some [apis to return the healtcheck](http://docs.killbill.io/0.20/debugging.html#_healthchecks_and_metrics) of a particular server. Such healthcheck is configurable and also extensible to plugins, i.e each plugin can also return its own healthcheck status.

The following endpoint can be used to add a server back into the rotation during a deployment.

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

### Put the host out of rotation

The following endpoint can be used to remove a server back into the rotation during a deployment.


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

**Returns**

A 204 http status without content.

## Low Level View Apis

### Get queues entries

Returns low level details about the queued notifications for a given `Account`.

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

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **accountId** | string | false | account id or if not specified return across all accounts |
| **queueName** | string | false | queue name or if not specified return across all queues |
| **serviceName** | string | false | service name or if not specified return across all services|
| **withHistory** | boolean | false | choose true to get history |
| **minDate** | string | false | minimum date |
| **maxDate** | string | false | maximun date |
| **withInProcessing** | boolean | false | choose true to get processing |
| **withBusEvents** | boolean | false | choose true to get bus events |
| **withNotifications** | boolean | false |choose true to get notifications |

**Returns**

A 200 http status.


