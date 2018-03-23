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

`GET http://example.com/1.0/kb/accounts`

> Example Request:

```shell
TODO
```

```java
TODO
```

```ruby
external_key = 'example_external_key'
with_balance = false
with_balance_and_cba = false

account = KillBillClient::Model::Account.new
account.find_by_external_key(external_key,
                             with_balance,
                             with_balance_and_cba, 
                             options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
{
  "accountId": "e8877928-0226-488d-9272-07a5e66d897f",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "example_external_key",
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

Returns an account object if a valid external key was provided.

## Create an Account 

Create a new customer `Account`.

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts` 

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
account = KillBillClient::Model::Account.new
account.name = "John Doe"
account.email = "john@example.com"
account.currency = "USD"

account.create(user, reason, comment, options)

```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://127.0.0.1:8080/1.0/kb/accounts/e8877928-0226-488d-9272-07a5e66d897f
< Content-Type: application/json
< Content-Length: 0
```
```java
**TODO**
```

```ruby
{
   "accountId":"87dccc88-f504-493e-a05f-9b4a702c3add",
   "name":"John Doe",
   "externalKey":"87dccc88-f504-493e-a05f-9b4a702c3add",
   "email":"john@example.com",
   "billCycleDayLocal":0,
   "currency":"USD",
   "isPaymentDelegatedToParent":false,
   "timeZone":"UTC",
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

`GET http://example.com/1.0/kb/accounts/{accountId}`

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
account_id = "e8877928-0226-488d-9272-07a5e66d897f"
with_balance = false
with_balance_and_cba = false
account = KillBillClient::Model::Account.new
account.find_by_id(account_id,
                   with_balance, 
                   with_balance_and_cba,
                   options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
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

`PUT http://example.com/1.0/kb/accounts/{accountId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.name = 'Another Name'
treat_null_as_reset = true

account.update(treat_null_as_reset,
               user,
               reason,
               comment, 
               options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
{
   "accountId":"37e759ed-e769-4e81-9e39-afb75a33056d",
   "name":"Another Name",
   "externalKey":"1521656367-130272",
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
   "notes":"My notes",
   "isNotifiedForInvoices":false,
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **treatNullAsReset** | boolean | false | account treat null as reset |

**Returns**

Returns an account object.

## Retrieve account tags

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/allTags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
object_type = 'ACCOUNT'
included_deleted = false
audit = 'NONE'

account.all_tags(object_type, 
                 included_deleted, 
                 audit, 
                 options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
[
   {
      "tagId":"ce1715f6-35e8-4d86-9063-65a54625992d",
      "objectType":"ACCOUNT",
      "objectId":"0f55a05d-9946-41d7-be75-ee71f49829b1",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **objectType** | string | false | choose type of object (e.g. `ACCOUNT`, `BUNDLE`, etc) |
| **includedDeleted** | boolean | true | choose true to include deleted tags |
| **audit** | enum | false | level of audit logs returned |

**Returns**
    
Returns a list of tag objects

## Block an account

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
state_name = "STATE1"
service = "ServiceStateService"
block_change = false
block_entitlement = false
block_billing = false
requested_date = "2013-08-01"

account.set_blocking_state(state_name,
                           service,
                           block_change, 
                           block_entitlement,
                           block_billing, 
                           requested_date,
                           user, 
                           reason, 
                           comment,
                           options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
[
   {
      "blockedId":"2f1cccd9-5cea-4695-8b6c-ad0b8a040f88",
      "stateName":"STATE1",
      "service":"ServiceStateService",
      "blockChange":false,
      "blockEntitlement":false,
      "blockBilling":false,
      "effectiveDate":"2013-08-01T06:00:00.000Z",
      "type":"ACCOUNT",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **requestedDate** | string | true | Requested date for block an account |

**Returns**

Returns a blocking stage object.

## Retrieve blocking states for account

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
blocking_state_types = 'ACCOUNT'
blocking_state_svcs = nil
audit = 'NONE'

account.blocking_states(blocking_state_types,
                        blocking_state_svcs, 
                        audit,
                        options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
[
   {
      "blockedId":"d13b2272-d182-499c-a393-8efed203ae7d",
      "stateName":"STATE1",
      "service":"ServiceStateService",
      "blockChange":false,
      "blockEntitlement":false,
      "blockBilling":false,
      "effectiveDate":"2013-08-01T06:00:00.000Z",
      "type":"ACCOUNT",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **blockingStateTypes** | string | true | blocking state types |
| **blockingStateSvcs** | string | false | blocking state svcs |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a blocking stage object

## Retrieve bundles for account

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/bundles`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.bundles(options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
[
  {
    "accountId": "string",
    "bundleId": "string",
    "externalKey": "string",
    "subscriptions": [
      {
        "accountId": "string",
        "bundleId": "string",
        "subscriptionId": "string",
        "externalKey": "string",
        "startDate": "2018-03-20",
        "productName": "string",
        "productCategory": "BASE",
        "billingPeriod": "DAILY",
        "phaseType": "TRIAL",
        "priceList": "string",
        "planName": "string",
        "state": "PENDING",
        "sourceType": "NATIVE",
        "cancelledDate": "2018-03-20",
        "chargedThroughDate": "2018-03-20",
        "billingStartDate": "2018-03-20",
        "billingEndDate": "2018-03-20",
        "billCycleDayLocal": 0,
        "events": [
          {
            "eventId": "string",
            "billingPeriod": "string",
            "plan": "string",
            "product": "string",
            "priceList": "string",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "string",
            "serviceStateName": "string",
            "phase": "string",
            "auditLogs": [
              {
                "changeType": "string",
                "changeDate": "2018-03-20T17:16:30.893Z",
                "changedBy": "string",
                "reasonCode": "string",
                "comments": "string",
                "userToken": "string"
              }
            ],
            "effectiveDate": "2018-03-20"
          }
        ],
        "priceOverrides": [
          {
            "planName": "string",
            "phaseName": "string",
            "phaseType": "string",
            "fixedPrice": 0,
            "recurringPrice": 0
          }
        ],
        "auditLogs": [
          {
            "changeType": "string",
            "changeDate": "2018-03-20T17:16:30.893Z",
            "changedBy": "string",
            "reasonCode": "string",
            "comments": "string",
            "userToken": "string"
          }
        ]
      }
    ],
    "timeline": {
      "accountId": "string",
      "bundleId": "string",
      "externalKey": "string",
      "events": [
        {
          "eventId": "string",
          "billingPeriod": "string",
          "plan": "string",
          "product": "string",
          "priceList": "string",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "string",
          "serviceStateName": "string",
          "phase": "string",
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:30.893Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ],
          "effectiveDate": "2018-03-20"
        }
      ],
      "auditLogs": [
        {
          "changeType": "string",
          "changeDate": "2018-03-20T17:16:30.893Z",
          "changedBy": "string",
          "reasonCode": "string",
          "comments": "string",
          "userToken": "string"
        }
      ]
    },
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:30.893Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  }
]
]
```


**Query Parameters**

None.

**Returns**

Returns a list of account bundle objects.

## Rebalance account CBA

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/cbaRebalancing`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.cba_rebalancing(user, 
                        reason,
                        comment,
                        options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Response**

A `200` http status without content.

## List children accounts

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/children`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = account.account_id
with_balance = false
with_balance_and_cba = false
audit = 'NONE'

childrens_account = KillBillClient::Model::Account.children(account_id,
                                                            with_balance, 
                                                            with_balance_and_cba, 
                                                            audit, 
                                                            options)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
[
  {
    "accountId": "string",
    "name": "string",
    "firstNameLength": 0,
    "externalKey": "string",
    "email": "string",
    "billCycleDayLocal": 0,
    "currency": "string",
    "parentAccountId": "string",
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": "string",
    "timeZone": "string",
    "address1": "string",
    "address2": "string",
    "postalCode": "string",
    "company": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "locale": "string",
    "phone": "string",
    "notes": "string",
    "isMigrated": false,
    "isNotifiedForInvoices": false,
    "accountBalance": 0,
    "accountCBA": 0,
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:30.906Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **accountWithBalance** | boolean | false | if true, returns `accountBalance` info |
| **accountWithBalanceAndCBA** | boolean | false | if true, returns `accountBalance` and `accountCBA` info |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of account objects.

## Remove custom fields from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/customField`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

account.remove_custom_field(custom_field_id                                                                                           eld_id, 
                            user, 
                            reason,
                            comment, 
                            options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Response**

A `200` http status without content.

## Retrieve account custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

account.custom_fields(audit, options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"ACCOUNT",
      "name":"Test Custom Field",
      "value":"test_value",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Add custom fields to account

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'ACCOUNT'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

account.add_custom_field(custom_field, 
                         user,
                         reason,
                         comment,
                         options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"6e571e22-b794-413c-be6f-1b2aa4bf9824",
      "objectId":"0149ffc6-fdfd-40b1-8cf4-29a66aef51d4",
      "objectType":"ACCOUNT",
      "name":"Test Custom Field",
      "value":"test_value",
      "auditLogs":[]
   }
]
```
**Query Parameters**

None.

**Returns**

Returns a custom field object.

## Set account email notification

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/emailNotifications`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_email_notifications = KillBillClient::Model::Account.new
account_email_notifications.account_id = account.account_id
account_email_notifications.is_notified_for_invoices = 'true'
      
account_email_notifications.update_email_notifications(user,
                                                       reason,
                                                       comment,
                                                       options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Response**

A `200` http status without content.

## Retrieve account email notification

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/emailNotifications`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.email_notifications(options)
```

> Example Response:

```ruby
{
   "accountId":"58acec2f-1ae3-43db-9672-0c288a0eea9e",
   "isNotifiedForInvoices":true
}
```


**Query Parameters**

None.

**Returns**

Returns invoice email object.

## Retrieve an account emails

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/emails`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'
account.emails(audit, options)
```

> Example Response:

```ruby
[
   {
      "accountId":"e4ca38b3-934d-42e8-a292-ffb0af5549f2",
      "email":"email@example.com"
   }
]
```


**Query Parameters**

None.

**Returns**

Returns a list of objects with account id's and their emails.

## Add account email

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/emails`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.email = 'email@example.com'

account.add_email(account.email,
                  user,
                  reason,
                  comment,
                  options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Response**

A `200` http status without content.

## Delete email from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/emails/{email}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
email = 'email@example.com'

account.remove_email(email,
                     user,
                     reason,
                     comment,
                     options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Response**

A `200` http status without content.

## Retrieve account invoice payments

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/invoicePayments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit ='NONE'
with_plugin_info = false
with_attempts = false

account.invoice_payments(audit,
                         with_plugin_info,
                         with_attempts,
                         options)
```

> Example Response:

```ruby
[
   {
      "targetInvoiceId":"d1d6e8d8-c476-4b53-badf-c23f78c02c09",
      "accountId":"e967f6ac-e713-4bbd-aa7e-473e6d35674c",
      "paymentId":"3f84661c-4fb7-42ac-8a02-3e8f48840e51",
      "paymentNumber":"319",
      "paymentExternalKey":"3f84661c-4fb7-42ac-8a02-3e8f48840e51",
      "authAmount":0,
      "capturedAmount":0,
      "purchasedAmount":50.0,
      "refundedAmount":0,
      "creditedAmount":0,
      "currency":"USD",
      "paymentMethodId":"6c064894-60cb-4d7e-a679-7b2464522968",
      "transactions":[
         {
            "transactionId":"91c7363c-76b9-48f5-aafa-f098d4470a2a",
            "transactionExternalKey":"91c7363c-76b9-48f5-aafa-f098d4470a2a",
            "paymentId":"3f84661c-4fb7-42ac-8a02-3e8f48840e51",
            "paymentExternalKey":"3f84661c-4fb7-42ac-8a02-3e8f48840e51",
            "transactionType":"PURCHASE",
            "amount":50.0,
            "currency":"USD",
            "effectiveDate":"2013-08-01T06:00:01.000Z",
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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | Choose true if you want plugin info. |
| **withAttempts** | boolean | false | Choose true if you want payment attempts. |

**Returns**

Return a list of invoice payments objects.

## Trigger a payment for all unpaid invoices

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/invoicePayments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_payment                  = KillBillClient::Model::InvoicePayment.new
invoice_payment.account_id       = account.account_id
invoice_payment.purchased_amount = '50.0'
external_payment                 = true

invoice_payment.bulk_create(external_payment,
                            user,
                            reason,
                            comment,
                            options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **externalPayment** | boolean | true | Choose true if you use a external payment method. |
| **paymentAmount** | string | true | Total payment amount. |

**Response**

A `200` http status without content.

## Retrieve account invoices

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/invoices`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.invoices(with_items,
                 options)
```

> Example Response:

```ruby
[
   {
      "amount":50.0,
      "currency":"USD",
      "status":"COMMITTED",
      "creditAdj":0.0,
      "refundAdj":0.0,
      "invoiceId":"d981abbb-3622-487a-9564-d594c9d04f83",
      "invoiceDate":"2013-08-01",
      "targetDate":"2013-08-01",
      "invoiceNumber":"1563",
      "balance":0.0,
      "accountId":"1f310060-dad6-4151-87af-c58a4fe87679",
      "items":[
         {
            "invoiceItemId":"5f3b4e9c-66bd-4c5c-b84a-4ae951cc2f1d",
            "invoiceId":"d981abbb-3622-487a-9564-d594c9d04f83",
            "accountId":"1f310060-dad6-4151-87af-c58a4fe87679",
            "itemType":"EXTERNAL_CHARGE",
            "description":"Some description",
            "startDate":"2013-08-01",
            "amount":50.0,
            "currency":"USD",
            "auditLogs":[]
         }
      ],
      "isParentInvoice":false,
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withItems** | boolean | true | Choose true if you want items info. |

**Returns**

Return a list with invoice objects.

## Retrieve overdue state for account

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/overdue`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.overdue(options)
```

> Example Response:

```ruby
{
   "name":"__KILLBILL__CLEAR__OVERDUE_STATE__",
   "externalMessage":"",
   "daysBetweenPaymentRetries":[
      8,
      8,
      8
   ],
   "disableEntitlementAndChangesBlocked":false,
   "blockChanges":false,
   "clearState":true
}
```


**Query Parameters**

None.

**Returns**

Returns a overdue state object.

## Retrieve account payment methods

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/paymentMethods`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = account.account_id
with_plugin_info = false

payment_method.find_all_by_account_id(account_id, 
                                      with_plugin_info,
                                      options)
```

> Example Response:

```ruby
{
   "paymentMethodId":"059ecfb8-6b4d-4a89-9537-63a687e6cf10",
   "externalKey":"unknown",
   "accountId":"fa488b6e-c52a-450a-94bf-6607ae8b484f",
   "isDefault":true,
   "pluginName":"__EXTERNAL_PAYMENT__",
   "pluginInfo":{
      "properties":[]
   },
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | Choose true if you want plugin info. |

**Returns**

Returns a list of payment method objects.

## Add a payment method

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/paymentMethods`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
pm             = KillBillClient::Model::PaymentMethod.new
pm.account_id  = account.account_id
pm.plugin_name = '__EXTERNAL_PAYMENT__'
pm.plugin_info = nil

is_default = true

pm.create(is_default, 
          user, 
          reason, 
          comment,
          options)
```

> Example Response:

```ruby
{
   "paymentMethodId":"059ecfb8-6b4d-4a89-9537-63a687e6cf10",
   "externalKey":"unknown",
   "accountId":"fa488b6e-c52a-450a-94bf-6607ae8b484f",
   "isDefault":true,
   "pluginName":"__EXTERNAL_PAYMENT__",
   "pluginInfo":{
      "properties":[]
   },
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **isDefault** | boolean | true | Choose true if you want to set new payment as default. |
| **payAllUnpaidInvoices** | boolean | true | Choose true if you want to pay all unpaid invoices. |

**Returns**

Returns a payment method object.

## Set the default payment method

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/paymentMethods/{paymentMethodId}/setDefault`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = account.account_id
KillBillClient::Model::PaymentMethod.set_default(payment_method_id,
                                                 account_id,
                                                 user,
                                                 reason,
                                                 comment,
                                                 options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **payAllUnpaidInvoices** | boolean | true | Choose true if you want to pay all unpaid invoices. |

**Response**

A `200` http status without content.

## Retrieve account payments

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.payments(options)
```

> Example Response:

```ruby
[
   {
      "accountId":"6577439c-b783-4c60-82b2-c23e7b46eb97",
      "paymentId":"b83132eb-1bf9-4a02-8572-376e4b1f06c9",
      "paymentNumber":"325",
      "paymentExternalKey":"b83132eb-1bf9-4a02-8572-376e4b1f06c9",
      "authAmount":0,
      "capturedAmount":0,
      "purchasedAmount":50.0,
      "refundedAmount":0,
      "creditedAmount":0,
      "currency":"USD",
      "paymentMethodId":"6041ffab-ae5f-45d3-bdf8-ce8cbfa5fd5c",
      "transactions":[
         {
            "transactionId":"be9dceca-9c5d-4038-818c-57e6fccfbe92",
            "transactionExternalKey":"be9dceca-9c5d-4038-818c-57e6fccfbe92",
            "paymentId":"b83132eb-1bf9-4a02-8572-376e4b1f06c9",
            "paymentExternalKey":"b83132eb-1bf9-4a02-8572-376e4b1f06c9",
            "transactionType":"PURCHASE",
            "amount":50.0,
            "currency":"USD",
            "effectiveDate":"2013-08-01T06:00:02.000Z",
            "processedAmount":50.0,
            "processedCurrency":"USD",
            "status":"SUCCESS",
            "auditLogs":[

            ]
         }
      ],
      "auditLogs":[

      ]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |
| **withAttempts** | boolean | false | choose true if you want payment attempts |

**Returns**

Returns a list of all account payments object.

## Trigger a payment (authorization, purchase or credit)

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
transaction = KillBillClient::Model::Transaction.new
transaction.amount = '50.0'

payment_method_id = payment_method.payment_method_id
refresh_options = nil

# Authorization
transaction.auth(account.account_id, payment_method_id, @user, reason, comment, @options, refresh_options)

# Purchase
transaction.purchase(account.account_id, payment_method_id, @user, reason, comment, @options, refresh_options)

# Credit
transaction.credit(account.account_id, payment_method_id, @user, reason, comment, @options, refresh_options)


```

> Example Response:

```ruby
{
   "accountId":"2ad4cae9-c44a-43f9-b3f8-2e3e4e097838",
   "paymentId":"b4c5b34f-cd3e-4269-9f71-55daf8edde60",
   "paymentNumber":"333",
   "paymentExternalKey":"b4c5b34f-cd3e-4269-9f71-55daf8edde60",
   "authAmount":50.0,
   "capturedAmount":0,
   "purchasedAmount":0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"132d59c0-8c28-4115-947d-f57d430bc458",
   "transactions":[
      {
         "transactionId":"e038a04e-5304-4570-ab89-b7f04e8f496c",
         "transactionExternalKey":"e038a04e-5304-4570-ab89-b7f04e8f496c",
         "paymentId":"b4c5b34f-cd3e-4269-9f71-55daf8edde60",
         "paymentExternalKey":"b4c5b34f-cd3e-4269-9f71-55daf8edde60",
         "transactionType":"AUTHORIZE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:01.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **paymentMethodId** | string | true | payment method id |

**Returns**

Returns a payment transaction object.

## Add tags to account

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

account.add_tag(tag_name,
                user,
                reason,
                comment,
                options)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"ACCOUNT",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[

      ]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true | tag list to add |

**Returns**

Returns a account tag object.

## Remove tags from account

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

account.remove_tag(tag_name,
                   user,
                   reason,
                   comment,
                   options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true |  list of tags that you want to remove it |

**Response**

A `200` http status without content.

## Retrieve account tags

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/tags`

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

account.tags(included_deleted,
             audit,
             options)
```

> Example Response:

```ruby
[
  {
    "tagId": "string",
    "objectType": "ACCOUNT",
    "objectId": "string",
    "tagDefinitionId": "string",
    "tagDefinitionName": "string",
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:31.059Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of account tag objects.

## Retrieve account timeline

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/timeline `

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = account.account_id
audit = 'MINIMAL'

KillBillClient::Model::AccountTimeline.timeline(account_id,
                                                audit,
                                                options)
```

> Example Response:

```ruby
{
  "account": {
    "accountId": "string",
    "name": "string",
    "firstNameLength": 0,
    "externalKey": "string",
    "email": "string",
    "billCycleDayLocal": 0,
    "currency": "string",
    "parentAccountId": "string",
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": "string",
    "timeZone": "string",
    "address1": "string",
    "address2": "string",
    "postalCode": "string",
    "company": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "locale": "string",
    "phone": "string",
    "notes": "string",
    "isMigrated": false,
    "isNotifiedForInvoices": false,
    "accountBalance": 0,
    "accountCBA": 0,
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:31.069Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  },
  "bundles": [
    {
      "accountId": "string",
      "bundleId": "string",
      "externalKey": "string",
      "subscriptions": [
        {
          "accountId": "string",
          "bundleId": "string",
          "subscriptionId": "string",
          "externalKey": "string",
          "startDate": "2018-03-20",
          "productName": "string",
          "productCategory": "BASE",
          "billingPeriod": "DAILY",
          "phaseType": "TRIAL",
          "priceList": "string",
          "planName": "string",
          "state": "PENDING",
          "sourceType": "NATIVE",
          "cancelledDate": "2018-03-20",
          "chargedThroughDate": "2018-03-20",
          "billingStartDate": "2018-03-20",
          "billingEndDate": "2018-03-20",
          "billCycleDayLocal": 0,
          "events": [
            {
              "eventId": "string",
              "billingPeriod": "string",
              "plan": "string",
              "product": "string",
              "priceList": "string",
              "eventType": "START_ENTITLEMENT",
              "isBlockedBilling": false,
              "isBlockedEntitlement": false,
              "serviceName": "string",
              "serviceStateName": "string",
              "phase": "string",
              "auditLogs": [
                {
                  "changeType": "string",
                  "changeDate": "2018-03-20T17:16:31.070Z",
                  "changedBy": "string",
                  "reasonCode": "string",
                  "comments": "string",
                  "userToken": "string"
                }
              ],
              "effectiveDate": "2018-03-20"
            }
          ],
          "priceOverrides": [
            {
              "planName": "string",
              "phaseName": "string",
              "phaseType": "string",
              "fixedPrice": 0,
              "recurringPrice": 0
            }
          ],
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:31.070Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ]
        }
      ],
      "timeline": {
        "accountId": "string",
        "bundleId": "string",
        "externalKey": "string",
        "events": [
          {
            "eventId": "string",
            "billingPeriod": "string",
            "plan": "string",
            "product": "string",
            "priceList": "string",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "string",
            "serviceStateName": "string",
            "phase": "string",
            "auditLogs": [
              {
                "changeType": "string",
                "changeDate": "2018-03-20T17:16:31.070Z",
                "changedBy": "string",
                "reasonCode": "string",
                "comments": "string",
                "userToken": "string"
              }
            ],
            "effectiveDate": "2018-03-20"
          }
        ],
        "auditLogs": [
          {
            "changeType": "string",
            "changeDate": "2018-03-20T17:16:31.070Z",
            "changedBy": "string",
            "reasonCode": "string",
            "comments": "string",
            "userToken": "string"
          }
        ]
      },
      "auditLogs": [
        {
          "changeType": "string",
          "changeDate": "2018-03-20T17:16:31.070Z",
          "changedBy": "string",
          "reasonCode": "string",
          "comments": "string",
          "userToken": "string"
        }
      ]
    }
  ],
  "invoices": [
    {
      "amount": 0,
      "currency": "string",
      "status": "string",
      "creditAdj": 0,
      "refundAdj": 0,
      "invoiceId": "string",
      "invoiceDate": "2018-03-20",
      "targetDate": "2018-03-20",
      "invoiceNumber": "string",
      "balance": 0,
      "accountId": "string",
      "credits": [
        {
          "creditAmount": 0,
          "currency": "string",
          "invoiceId": "string",
          "invoiceNumber": "string",
          "effectiveDate": "2018-03-20",
          "accountId": "string",
          "description": "string",
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:31.070Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ]
        }
      ],
      "items": [
        {
          "invoiceItemId": "string",
          "invoiceId": "string",
          "linkedInvoiceItemId": "string",
          "accountId": "string",
          "childAccountId": "string",
          "bundleId": "string",
          "subscriptionId": "string",
          "planName": "string",
          "phaseName": "string",
          "usageName": "string",
          "itemType": "string",
          "description": "string",
          "startDate": "2018-03-20",
          "endDate": "2018-03-20",
          "amount": 0,
          "currency": "string",
          "childItems": [
            {}
          ],
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:31.070Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ]
        }
      ],
      "isParentInvoice": false,
      "auditLogs": [
        {
          "changeType": "string",
          "changeDate": "2018-03-20T17:16:31.070Z",
          "changedBy": "string",
          "reasonCode": "string",
          "comments": "string",
          "userToken": "string"
        }
      ],
      "bundleKeys": "string"
    }
  ],
  "payments": [
    {
      "targetInvoiceId": "string",
      "accountId": "string",
      "paymentId": "string",
      "paymentNumber": "string",
      "paymentExternalKey": "string",
      "authAmount": 0,
      "capturedAmount": 0,
      "purchasedAmount": 0,
      "refundedAmount": 0,
      "creditedAmount": 0,
      "currency": "string",
      "paymentMethodId": "string",
      "transactions": [
        {
          "transactionId": "string",
          "transactionExternalKey": "string",
          "paymentId": "string",
          "paymentExternalKey": "string",
          "transactionType": "AUTHORIZE",
          "amount": 0,
          "currency": "AED",
          "effectiveDate": "2018-03-20T17:16:31.070Z",
          "processedAmount": 0,
          "processedCurrency": "string",
          "status": "SUCCESS",
          "gatewayErrorCode": "string",
          "gatewayErrorMsg": "string",
          "firstPaymentReferenceId": "string",
          "secondPaymentReferenceId": "string",
          "properties": [
            {
              "key": "string",
              "value": "string",
              "isUpdatable": false
            }
          ],
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:31.070Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ]
        }
      ],
      "paymentAttempts": [
        {
          "accountId": "string",
          "paymentMethodId": "string",
          "paymentExternalKey": "string",
          "transactionId": "string",
          "transactionExternalKey": "string",
          "transactionType": "AUTHORIZE",
          "effectiveDate": "2018-03-20T17:16:31.070Z",
          "stateName": "string",
          "amount": 0,
          "currency": "AED",
          "pluginName": "string",
          "pluginProperties": [
            {
              "key": "string",
              "value": "string",
              "isUpdatable": false
            }
          ],
          "auditLogs": [
            {
              "changeType": "string",
              "changeDate": "2018-03-20T17:16:31.070Z",
              "changedBy": "string",
              "reasonCode": "string",
              "comments": "string",
              "userToken": "string"
            }
          ]
        }
      ],
      "auditLogs": [
        {
          "changeType": "string",
          "changeDate": "2018-03-20T17:16:31.070Z",
          "changedBy": "string",
          "reasonCode": "string",
          "comments": "string",
          "userToken": "string"
        }
      ]
    }
  ]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |
| **parallel** | boolean | false | parallel |

**Returns**

Returns a list of account tag objects.

## Move a given child credit to the parent level

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{childAccountId}/transferCredit`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account.transfer_child_credit(user,
                              reason,
                              comment,
                              options)
```

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Returns**

A `200` http status without content.

## List accounts

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/pagination`

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
with_balance = false
with_balance_and_cba = false

account.find_in_batches(offset,
                        limit,
                        with_balance,
                        with_balance_and_cba,
                        options)
```

> Example Response:

```ruby
[
  {
    "accountId": "string",
    "name": "string",
    "firstNameLength": 0,
    "externalKey": "string",
    "email": "string",
    "billCycleDayLocal": 0,
    "currency": "string",
    "parentAccountId": "string",
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": "string",
    "timeZone": "string",
    "address1": "string",
    "address2": "string",
    "postalCode": "string",
    "company": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "locale": "string",
    "phone": "string",
    "notes": "string",
    "isMigrated": false,
    "isNotifiedForInvoices": false,
    "accountBalance": 0,
    "accountCBA": 0,
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:31.091Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **accountWithBalance** | boolean | false | if true, returns `accountBalance` info |
| **accountWithBalanceAndCBA** | boolean | false | if true, returns `accountBalance` and `accountCBA` info |

**Returns**

Returns a list with all accounts.

## Search accounts

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/pagination`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
search_key = 'example'
offset = 0
limit = 100
with_balance = false
with_balance_and_cba = false

account.find_in_batches_by_search_key(search_key,
                                      offset,
                                      limit,
                                      with_balance,
                                      with_balance_and_cba,
                                      options)
```

> Example Response:

```ruby
[
  {
    "accountId": "string",
    "name": "string",
    "firstNameLength": 0,
    "externalKey": "string",
    "email": "string",
    "billCycleDayLocal": 0,
    "currency": "string",
    "parentAccountId": "string",
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": "string",
    "timeZone": "string",
    "address1": "string",
    "address2": "string",
    "postalCode": "string",
    "company": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "locale": "string",
    "phone": "string",
    "notes": "string",
    "isMigrated": false,
    "isNotifiedForInvoices": false,
    "accountBalance": 0,
    "accountCBA": 0,
    "auditLogs": [
      {
        "changeType": "string",
        "changeDate": "2018-03-20T17:16:31.109Z",
        "changedBy": "string",
        "reasonCode": "string",
        "comments": "string",
        "userToken": "string"
      }
    ]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **searchKey** | string | true | What you want to find? |
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **accountWithBalance** | boolean | false | if true, returns `accountBalance` info |
| **accountWithBalanceAndCBA** | boolean | false | if true, returns `accountBalance` and `accountCBA` info |

**Returns**

Return a list with accounts matched with the search key entered.
