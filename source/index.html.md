--- 

title: Kill Bill 

language_tabs: 
   - shell
   - java
   - ruby

search: true 

--- 

# Using Kill Bill APIs

## Introduction 

Kill Bill offers a set of HTTP apis, commonly called REST apis, that rely on HTTP verbs `POST`, `GET`, `PUT`, `DELETE` to match CRUD operations, and that use HTTP response codes to indicate errors. These apis allow to manage Kill Bill resources -- e.g `Account` -- through the use of JSON input and output.

Kill Bill also offers a set of [java apis](https://github.com/killbill/killbill-api/tree/master/src/main/java/org/killbill/billing) that can be used by plugins to make requests, and a set of [java plugin api](https://github.com/killbill/killbill-plugin-api) for Kill Bill core to interact with the plugins. Such apis are beyond the scope of this documentation.

> API client libraries

```
Official libraries for the Kill Bill API are available in several languages,
including java, php, python, ruby, Node, and go. Community-supported libraries
such as .NET are also available. In the following documentation, we assume 
you have a Kill Bill server instance running on `127.0.0.1` on port `8080`.
While Kill Bill supports `https` protocol, all example rely on standard http scheme.
```

```java
//
// You can find the java client on github: https://github.com/killbill/killbill-client-java
//
```

```ruby
#
# You can find the ruby client on github: https://github.com/killbill/killbill-client-ruby
#
```

The description of the api in this documentation is limited to the most common use cases and does not include advanced features that we have crafted over the years from all the use cases we have seen from our users.

For questions about api use, or to report bugs, you can subscribe to the [Kill Bill user mailing list](https://groups.google.com/forum/#!forum/killbilling-users).


## Authentication and RBAC

In order to make apis calls, one needs to authenticate each request by passing an HTTP `Authorization` header and respect the HTTP Basic authentication scheme.


Depending on how the system has been configured, the authentication mechanism can happen using different options -- some or all at the same time:

* Flat file configuration
* Database configuration
* LDAP configuration
* OKTA configuration
 
 The system also supports configuring roles and permissions, to restrict user access to certain resources and operations. The permissions are quite granular and are defined [here](https://github.com/killbill/killbill-api/blob/master/src/main/java/org/killbill/billing/security/Permission.java#L19)


## Multi-Tenancy

> Specifying the basic authentication headers and multi-tenancy headers:

```shell
curl \
-u admin:password \
-H "X-Killbill-ApiKey: bob" \
-H "X-Killbill-ApiSecret: lazar" \
...
```
```java
// Initialization of the KillBillClient instance
KillBillHttpClient killBillHttpClient = new KillBillHttpClient(String.format("http://%s:%d", "127.0.0.1", 8080),
                                            username,
                                            password,
                                            apiKey,
                                            apiSecret,
                                            null,
                                            null,
                                            DEFAULT_CONNECT_TIMEOUT_SEC * 1000,
                                            DEFAULT_READ_TIMEOUT_SEC * 1000,
                                            DEFAULT_REQUEST_TIMEOUT_SEC * 1000);
                                            
KillBillClient killBillClient = new KillBillClient(killBillHttpClient);
```

```ruby
require 'killbill_client'

KillBillClient.url = 'http://127.0.0.1:8080'

# Multi-tenancy and RBAC credentials
options = {
  :username => 'admin',
  :password => 'password',
  :api_key => 'bob',
  :api_secret => 'lazar'
}

# Audit log data
user = 'me'
reason = 'Going through my first tutorial'
comment = 'I like it!'

# Start using....

```


Kill Bill has been designed from the ground up to run multiple logical instances on the same set of servers and database. This allows for instance to cleanly separate different customer data sets. Another common use case is to configure both a production tenant and a test tenant, the later being used for test requests during deployment and for sanity after deployment.

Each api call requires to identify the tenant being used, through the use of 2 http headers:

* **`X-Killbill-ApiKey`**: The api key associated with the tenant. This info is stored in clear in the database.
* **`X-Killbill-ApiSecret`**: The api secret associated with the tenant. This info is hashed and stored along with the `salt` in the database

<aside class="notice">Note: You can control the number of hash iterations through the system property `org.killbill.security.shiroNbHashIterations` whose default value is set to `200000`. If your security requirements are met through other means, you can set this value to `1` to avoid wasting CPU cycles and greatly improve latency. Changing the value on an existing system requires re-hashing the keys.</aside>

## Resource IDs and External Keys

When creating a new resource, there are 2 IDS associated with it: Kill Bill will allocate a unique ID, and the user of the api will also be able to associated its own unique key, also called `external key`. The external key is used for 2 scenarios:

* ID Mapping: Typically one can pass an external key to create a mapping between the ID generated by Kill Bill and a known key for this resource
* Idempotency of the request: Kill Bill ensures that such external key is unique, and so in the eventuality of an api call that times out, one can safely retry with the same external key and the second request would only succeed if the first one did not complete. This ensures idempotency of the call. Such external key must be unique per tenant and across all resources.


## Pagination

Besides the traditional CRUD apis associated with each resource, we also offer pagination apis to allow listing per-tenant resources -- e.g all `Account` in a given tenant. Such apis will allow to pass an `offset` and a `limit`, provided as query parameters, to allow the listing of all resources of a given type, on a page by page basis. In addition to the json list, each response will also include the following http headers:


* **`X-Killbill-Pagination-CurrentOffset`** : The offest of the first record in the returned list
* **`X-Killbill-Pagination-NextOffset`** : The header will only be present if there are additional entries to return and would include the next offset
* **`X-Killbill-Pagination-TotalNbRecords`** : The total number of records
* **`X-Killbill-Pagination-MaxNbRecords`** : TODO
* **`X-Killbill-Pagination-NextPageUri`** : The uri that can be used to retrieve the next page.

```
TODO coding example
```

## Audit and History

Every api in Kill Bill that creates, or modifies state will create an audit log record to track *who* made the change. In addition, we also allow to specify *why* this change was made. Such information is passed for every `POST`, `PUT`, `DELETE` request and relies on special HTTP headers:

* **`X-Killbill-CreatedBy`** : Mandatory header to track who made the change.
* **`X-Killbill-Reason`** : Optional header to track the reason; typically one would use a special reason code -- e.g *COURTESY_REFUND*.
* **`X-Killbill-Comment`** : Optional header to track the metadata; typically one would add more information -- e.g 'Good old faithful customer'.

In addition to the audit log, Kill Bill also records the history of the changes. For instance updating the billing addess of a customer would create an additonal row to track the change and link it to the audit log. The `audit` query parameter can take the following values:

* **`NONE`** <span style="color:#32A9C7">*[Default]*</span>: No audit log is beeing returned. 
* **`MINIMAL`** : Only rows associated to *inserts* are being returned, but no `updates`.
* **`FULL`** : Everything is being returned.  

> Request: Fetching an account specifying `audit=MINIMAL`

```shell
curl \
-u admin:password \
-H "X-Killbill-ApiKey: bob" \
-H "X-Killbill-ApiSecret: lazar" \
-H "Content-Type: application/json" \
-H "X-Killbill-CreatedBy: demo" \
"http://127.0.0.1:8080/1.0/kb/accounts/e8877928-0226-488d-9272-07a5e66d897f?audit=MINIMAL" 
```

```java
TODO  Api does not exist ;-( but would look like:
Account result = killBillClient.getAccount(accountId, AuditLevel.MINIMAL, inputOptions);
```

```ruby
TODO  Api does not exist ;-(

```

> Response: 

```
{
  ...
  "auditLogs": [
    {
      "changeType": "INSERT",
      "changeDate": "2018-02-05T22:39:53.000Z",
      "changedBy": "demo",
      "reasonCode": null,
      "comments": null,
      "userToken": "4858a67e-03b0-4d94-8a8c-bcd6e8599452"
    }
  ]
}  
```

Every api that retrieves information, whether associated to a specific resource, or for a list of resources -- pagination -- will allow to return audit logs. 

Audit and history information associated to a given resource is always stored atomically to ensure that if state was changed, such audit and history information exists and is acurate.

## Versioning

TODO

## Errors


Kill Bill relies on HTTP response codes to indicate the success or failure of an API request:

* **`2xx`** status indicate success
* **`4xx`** status often indicate a client side error -- e.g missing madatory API field
* **`5xx`** status indicate an error with Kill Bill's servers or third party system -- e.g payment gateway returns 5xx.

```
HTTP status code summary
200 - OK
201 - Created: Success in creating a new resource. A Location header is returned to indicate the uri that can be used to fetch the resource
204 - No Content: No change were made in the system, for example in a scenario to attempt to pay an already paid invoice
400 - Bad Request: Invalid/missing parameter from client
401 - Unauthorized: Authorization failed
402 - Request Failed: Request parameter were valid but request failed -- insufficient fund on a payment request
404 - Not Found: The requested resource does not exist
409 - Conflict:	The request conflicts with another request 
422 - Unprocessable Entity: Payment control plugin aborted the call 
500 - Unexpected system error
502 - Bad Gateway : Unknow failure from payment plugin (PLUGIN_FAILURE)
503 - Service Unavailable: Kill Bill or a third party system -- e.g payment gateway -- is unavailable
504 - Gateway Timeout: Payment gateway timed out
```

In addition to these error codes, the system will often return some json to provide more details about the error:

* **`code`** : Each error in Kill Bill is associated with a an [ErrorCode](https://github.com/killbill/killbill-api/blob/master/src/main/java/org/killbill/billing/ErrorCode.java#L21).
* **`formattedMsg`** : A description of the error for the specific resource(s).
* **`cause`** : An optional stack trace.


# Account

## Account Resource

The `Account` resource represents the customer, and tracks typical information such as name, address, email, ... This is the top level per-customer resource, and all other per-customer data will be linked to this resource -- e.g invoices, payments, ...

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>: The external key provided from client.
* **`accountCBA`** <span style="color:#32A9C7">*[System generated]*</span>: The account credit.
* **`accountBalance`** <span style="color:#32A9C7">*[System generated]*</span>: The account balance.
* **`name`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The full name of the account -- e.g `john smith`
* **`firstNameLength`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The length of the first name -- e.g `4` in the case of `john`
* **`email`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The contact email to reach the customer.
* **`billCycleDayLocal`** <span style="color:#32A9C7">*[User or system generated, immutable]*</span>: The default day of the month to bill customers for subscriptions with a billing period a multiple of the month.
* **`currency`** <span style="color:#32A9C7">*[User generated, immutable, default null]*</span>: The default currency for the customer.
* **`parentAccountId`** <span style="color:#32A9C7">*[User generated, default null]*</span>: A reference for the parent account for the [hierarchical model](http://docs.killbill.io/latest/ha.html). 
* **`isPaymentDelegatedToParent`** <span style="color:#32A9C7">*[User generated, default null]*</span>: In the hierarchical model, whether or not the parent account is handling payments for this child account.
* **`paymentMethodId`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The default payment method used by the system to make recuring payments
* **`timeZone`** <span style="color:#32A9C7">*[User generated, immutable, default null, immutable]*</span>: The time zone for the customer.
* **`address1`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`address2`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`postalCode`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`company`** <span style="color:#32A9C7">*[User generated, default null]*</span>:  Address info.
* **`city`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`state`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`country`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`locale`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Address info.
* **`phone`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The phone contact to reach the customer.
* **`notes`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Additonal notes about the customer, usually set by customer service department.
* **`isMigrated`** <span style="color:#32A9C7">*[User generated, default null]*</span>: Whether this account was migrated from another system.
* **`isNotifiedForInvoices`** : TODO deprecated ?

## Retrieve an Account by its external key

Retrieves the details information for the `Account` using its `externalKey`.


**HTTP Request** 

`GET /1.0/kb/accounts`

> Example Request:

```shell
TODO
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.find_by_external_key(external_key, with_balance, with_balance_and_cba, options)
```

> Example Response:

```shell,java
{
  "accountId": "e8877928-0226-488d-9272-07a5e66d897f",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "e8877928-0226-488d-9272-07a5e66d897f",
  "email": "john@example.com",
  "billCycleDayLocal": 0,
  "currency": "USD",
  "parentAccountId": null,
  "isPaymentDelegatedToParent": false,
  "paymentMethodId": null,
  "referenceTime": "2018-02-05T22:39:53.000Z",
  "timeZone": "UTC",
  "address1": null,
  "address2": null,
  "postalCode": null,
  "company": null,
  "city": null,
  "state": null,
  "country": null,
  "locale": null,
  "phone": null,
  "notes": null,
  "isMigrated": null,
  "isNotifiedForInvoices": false,
  "accountBalance": null,
  "accountCBA": null,
  "auditLogs": []
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **accountWithBalance** | boolean | false | if true, returns `accountBalance` info |
| **accountWithBalanceAndCBA** | boolean | false | if true, returns `accountBalance` and `accountCBA` info |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns an account object if a valid identifier was provided.

## Create an Account 

Create a new customer `Account`.

**HTTP Request** 

`POST /1.0/kb/accounts` 

> Example Request:

```shell
curl -v \
  -u admin:password \
  -H "X-Killbill-ApiKey: bob" \
  -H "X-Killbill-ApiSecret: lazar" \
  -H "Content-Type: application/json" \
  -H "X-Killbill-CreatedBy: demo" \
  -X POST \
  --data-binary '{"name":"John Doe","email":"john@example.com","currency":"USD"}' \
  "http://127.0.0.1:8080/1.0/kb/accounts"
```

```java

Account body = new Account();
body.setName("John Doe");
body.setEmail("john@example.com");
body.setCurrency("USD");

TODO user requestOptions


final Account result = killBillClient.createAccount(body, requestOptions);
```

```ruby
account_data = KillBillClient::Model::Account.new
account.name = "John Doe"
account.email = "john@example.com"
account.currency = "USD"

user = 'example_acount'

result = account.create(user, nil, nil, options)

```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://127.0.0.1:8080/1.0/kb/accounts/e8877928-0226-488d-9272-07a5e66d897f
< Content-Type: application/json
< Content-Length: 0
```

```ruby
{
   "accountId":"5d3a2d7c-2772-4527-88fc-9c83a4d64d5d",
   "name":"KillBillClient",
   "externalKey":"1521574729-697033",
   "email":"kill@bill.com",
   "billCycleDayLocal":0,
   "currency":"USD",
   "isPaymentDelegatedToParent":false,
   "timeZone":"UTC",
   "address1":"7, yoyo road",
   "address2":"Apt 5",
   "postalCode":"94105",
   "company":"Unemployed",
   "city":"San Francisco",
   "state":"California",
   "country":"US",
   "locale":"fr_FR",
   "isNotifiedForInvoices":false,
   "auditLogs":[]
} 
```

**Query Parameters**

None.

**Responses**

A `201` http status if this was successful and a `Location` header to indicatate how to fetch the resource.

## Retrieve an Account by its ID

Retrieves the details information for the `Account` using its `accountId`.


**HTTP Request** 

`GET /1.0/kb/accounts/{accountId}`

> Example Request:

```shell
curl \
  -u admin:password \
  -H "X-Killbill-ApiKey: bob" \
  -H "X-Killbill-ApiSecret: lazar" \
  -H "Content-Type: application/json" \
  -H "X-Killbill-CreatedBy: demo" \
  "http://127.0.0.1:8080/1.0/kb/accounts/e8877928-0226-488d-9272-07a5e66d897f"	
```

```java
Account result = killBillClient.getAccount(accountId, inputOptions);
```

```ruby
account = KillBillClient::Model::Account.find_by_id(account_id, with_balance, with_balance_and_cba, options)
```

> Example Response:

```shell,java
{
  "accountId": "e8877928-0226-488d-9272-07a5e66d897f",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "e8877928-0226-488d-9272-07a5e66d897f",
  "email": "john@example.com",
  "billCycleDayLocal": 0,
  "currency": "USD",
  "parentAccountId": null,
  "isPaymentDelegatedToParent": false,
  "paymentMethodId": null,
  "referenceTime": "2018-02-05T22:39:53.000Z",
  "timeZone": "UTC",
  "address1": null,
  "address2": null,
  "postalCode": null,
  "company": null,
  "city": null,
  "state": null,
  "country": null,
  "locale": null,
  "phone": null,
  "notes": null,
  "isMigrated": null,
  "isNotifiedForInvoices": false,
  "accountBalance": null,
  "accountCBA": null,
  "auditLogs": []
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **accountWithBalance** | boolean | false | if true, returns `accountBalance` info |
| **accountWithBalanceAndCBA** | boolean | false | if true, returns `accountBalance` and `accountCBA` info |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns an account object if a valid identifier was provided.

## Update an Account

**HTTP Request** 

`PUT /1.0/kb/accounts/{accountId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.find_by_id(account_id, with_balance, with_balance_and_cba, options)
```

> Example Response:

```shell,java,ruby
{
  "accountId": "e8877928-0226-488d-9272-07a5e66d897f",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "e8877928-0226-488d-9272-07a5e66d897f",
  "email": "john@example.com",
  "billCycleDayLocal": 0,
  "currency": "USD",
  "parentAccountId": null,
  "isPaymentDelegatedToParent": false,
  "paymentMethodId": null,
  "referenceTime": "2018-02-05T22:39:53.000Z",
  "timeZone": "UTC",
  "address1": null,
  "address2": null,
  "postalCode": null,
  "company": null,
  "city": null,
  "state": null,
  "country": null,
  "locale": null,
  "phone": null,
  "notes": null,
  "isMigrated": null,
  "isNotifiedForInvoices": false,
  "accountBalance": null,
  "accountCBA": null,
  "auditLogs": []
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **treatNullAsReset** | boolean | false | TODO |

**Returns**

Returns an account object if a valid identifier was provided.

## Retrieve account tags

**HTTP Request** 

`GET /1.0/kb/accounts/{accountId}/allTags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.all_tags(object_type, included_deleted, audit, options)
```

> Example Response:

```shell,java,ruby

```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **objectType** | string | false | TODO |
| **audit** | string | true | TODO |
| **includedDeleted** | boolean | true | TODO |

**Returns**











TODO

## Block an account

**HTTP Request** 

`PUT /1.0/kb/accounts/{accountId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.set_blocking_state(state_name, service, block_change, block_entitlement, block_billing, requested_date, user, reason, comment, options)
```

> Example Response:

```shell,java,ruby

```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **TODO** | TODO | TODO | TODO |

**Returns**

TODO

## Retrieve blocking states for account

**HTTP Request** 

`GET /1.0/kb/accounts/{accountId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.blocking_states(blocking_state_types, blocking_state_svcs, audit, options)
```

> Example Response:

```shell,java,ruby

```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **TODO** | TODO | TODO | TODO |

**Returns**











TODO

## Retrieve bundles for account

**HTTP Request** 

`GET /1.0/kb/accounts/{accountId}/bundles`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.bundles(options)
```

> Example Response:

```shell,java,ruby

```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **TODO** | TODO | TODO | TODO |

**Returns**











TODO

## Rebalance account CBA

**HTTP Request** 

`POST /1.0/kb/accounts/{accountId}/cbaRebalancing`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account = KillBillClient::Model::Account.bundles(options)
```

> Example Response:

```shell,java,ruby

```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **TODO** | TODO | TODO | TODO |

**Returns**











TODO
