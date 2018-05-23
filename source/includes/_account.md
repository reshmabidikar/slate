# Account

## Account Resource

The `Account` resource represents the customer, and tracks typical information such as name, address, email, ... This is the top level per-customer resource, and all other per-customer data will be linked to this resource -- e.g invoices, payments, ...

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default `accountId`, immutable]*</span>: The external key provided from client.
* **`accountCBA`** <span style="color:#32A9C7">*[System generated]*</span>: The account credit.
* **`accountBalance`** <span style="color:#32A9C7">*[System generated]*</span>: The account balance.
* **`name`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The full name of the account -- e.g `john smith`
* **`firstNameLength`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The length of the first name -- e.g `4` in the case of `john`
* **`email`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The contact email to reach the customer.
* **`billCycleDayLocal`** <span style="color:#32A9C7">*[User or system generated, immutable]*</span>: The default day of the month to bill customers for subscriptions with a billing period a multiple of the month.
* **`currency`** <span style="color:#32A9C7">*[User generated, immutable, default null]*</span>: The default currency for the customer. Beware, that any invoice generation with a null `currency` would fail.
* **`parentAccountId`** <span style="color:#32A9C7">*[User generated, default null]*</span>: A reference for the parent account for the [hierarchical model](http://docs.killbill.io/latest/ha.html). 
* **`isPaymentDelegatedToParent`** <span style="color:#32A9C7">*[User generated, default null]*</span>: In the hierarchical model, whether or not the parent account is handling payments for this child account.
* **`paymentMethodId`** <span style="color:#32A9C7">*[User generated, default null]*</span>: The default payment method used by the system to make recuring payments
* **`timeZone`** <span style="color:#32A9C7">*[User generated, immutable, default null, immutable]*</span>: The time zone for the customer. This is used by the system to make any transformation from `DateTime` to `LocalDate`.
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

```python
accountApi = killbill.api.AccountApi()
external_key = 'example_external_key'

accountApi.get_account(external_key, api_key, api_secret)
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
   "accountId":"e8877928-0226-488d-9272-07a5e66d897f",
   "name":"John Doe",
   "firstNameLength":null,
   "externalKey":"example_external_key",
   "email":"john@example.com",
   "billCycleDayLocal":0,
   "currency":"USD",
   "parentAccountId":null,
   "isPaymentDelegatedToParent":false,
   "paymentMethodId":null,
   "referenceTime":"2018-02-05T22:39:53.000Z",
   "timeZone":"UTC",
   "address1":null,
   "address2":null,
   "postalCode":null,
   "company":null,
   "city":null,
   "state":null,
   "country":null,
   "locale":null,
   "phone":null,
   "notes":null,
   "isMigrated":null,
   "isNotifiedForInvoices":false,
   "accountBalance":null,
   "accountCBA":null,
   "auditLogs":[]
}
```
```python
{
 'account_balance': None,
 'account_cba': None,
 'account_id': '07c0cef4-41c5-4606-b2cd-661332cdd41c',
 'address1': None,
 'address2': None,
 'audit_logs': [],
 'bill_cycle_day_local': 0,
 'city': None,
 'company': None,
 'country': 'USA',
 'currency': 'USD',
 'email': None,
 'external_key': 'example_external_key',
 'first_name_length': None,
 'is_migrated': False,
 'is_notified_for_invoices': False,
 'is_payment_delegated_to_parent': False,
 'locale': None,
 'name': 'John',
 'notes': None,
 'parent_account_id': None,
 'payment_method_id': None,
 'phone': None,
 'postal_code': None,
 'reference_time': datetime.datetime(2018, 5, 3, 15, 53, 44, tzinfo=tzutc()),
 'state': 'CA',
 'time_zone': 'UTC'
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
```python
accountApi = killbill.api.AccountApi()
created_by = 'example'
body = Account(name='John Doe', 
               email='john@example.com', 
               currency='USD')

accountApi.create_account(body, 
                          created_by, 
                          api_key, 
                          api_secret)
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

```python
no content
```

**Query Parameters**

None.

**Responses**

A `201` http status if this was successful and a `Location` header to indicate how to fetch the resource.

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
```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'

accountApi.get_account(account_id, api_key, api_secret)
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
   "accountId":"e8877928-0226-488d-9272-07a5e66d897f",
   "name":"John Doe",
   "firstNameLength":null,
   "externalKey":"e8877928-0226-488d-9272-07a5e66d897f",
   "email":"john@example.com",
   "billCycleDayLocal":0,
   "currency":"USD",
   "parentAccountId":null,
   "isPaymentDelegatedToParent":false,
   "paymentMethodId":null,
   "referenceTime":"2018-02-05T22:39:53.000Z",
   "timeZone":"UTC",
   "address1":null,
   "address2":null,
   "postalCode":null,
   "company":null,
   "city":null,
   "state":null,
   "country":null,
   "locale":null,
   "phone":null,
   "notes":null,
   "isMigrated":null,
   "isNotifiedForInvoices":false,
   "accountBalance":null,
   "accountCBA":null,
   "auditLogs":[]
}
```
```python
{
 'account_balance': None,
 'account_cba': None,
 'account_id': '07c0cef4-41c5-4606-b2cd-661332cdd41c',
 'address1': None,
 'address2': None,
 'audit_logs': [],
 'bill_cycle_day_local': 0,
 'city': None,
 'company': None,
 'country': 'USA',
 'currency': 'USD',
 'email': None,
 'external_key': 'rpwtgr',
 'first_name_length': None,
 'is_migrated': False,
 'is_notified_for_invoices': False,
 'is_payment_delegated_to_parent': False,
 'locale': None,
 'name': 'John',
 'notes': None,
 'parent_account_id': None,
 'payment_method_id': None,
 'phone': None,
 'postal_code': None,
 'reference_time': datetime.datetime(2018, 5, 3, 15, 53, 44, tzinfo=tzutc()),
 'state': 'CA',
 'time_zone': 'UTC'
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

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'
created_by = 'example'
body = Account(name='Another Name')

accountApi.update_account(account_id, 
                          body, 
                          created_by, 
                          api_key, 
                          api_secret)
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
```python
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **treatNullAsReset** | boolean | false | If set to true, any null value will be set to `null`. If set to false, any null value will be ignored.|

**Returns**

A `204` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'

accountApi.get_account_tags(account_id, api_key, api_secret)
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
```python
[
  {
    'audit_logs': [],
    'object_id': '8f2618dc-9e8e-4df6-b835-68c747a48313',
    'object_type': 'ACCOUNT',
    'tag_definition_id': '00000000-0000-0000-0000-000000000002',
    'tag_definition_name': 'AUTO_INVOICING_OFF',
    'tag_id': '726a64eb-0fc2-4e1b-81c4-ebf879a3b5b6'
  }
]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **objectType** | string | false | choose type of object (e.g. `ACCOUNT`, `BUNDLE`, `SUBSCRIPTION`) |
| **includedDeleted** | boolean | true | choose true to include deleted tags |
| **audit** | enum | false | level of audit logs returned |

**Returns**
    
Returns a list of tag objects

## Block an account

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/block`

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

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'
body = BlockingState(state_name='STATE1',
                     service='ServiceStateService',
                     is_block_change=False,
                     is_block_entitlement=False,
                     is_block_billing=False)

accountApi.add_account_blocking_state(account_id, 
                                      body, 
                                      created_by, 
                                      api_key, 
                                      api_secret)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
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
| **requestedDate** | string | true | Requested date for block an account |

**Returns**

A `201` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'

accountApi.get_blocking_states(account_id, api_key, api_secret)
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
```python
[
  {
    'audit_logs': [],
    'blocked_id': '7e7dd5a9-6b65-4f40-a14b-1f4f408ef83c',
    'effective_date': datetime.datetime(2018, 5, 3, 19, 19, 12, tzinfo=tzutc()),
    'is_block_billing': False,
    'is_block_change': False,
    'is_block_entitlement': False,
    'service': 'ServiceStateService',
    'state_name': 'STATE1',
    'type': 'ACCOUNT'
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

Returns a blocking state object

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

```python
accountApi = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'

accountApi.get_account_bundles(account_id, api_key, api_secret)
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
      "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
      "bundleId":"a5221798-699a-48ac-a2d1-962839fd8fc9",
      "externalKey":"3-6138e5ee-2763-4729-829b-e7de038b46d0-889153",
      "subscriptions":[
         {
            "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
            "bundleId":"a5221798-699a-48ac-a2d1-962839fd8fc9",
            "subscriptionId":"937ff1a8-2290-4bb5-9166-7b7bb99cbccf",
            "externalKey":"3-6138e5ee-2763-4729-829b-e7de038b46d0-889153",
            "startDate":"2013-08-01",
            "productName":"Super",
            "productCategory":"BASE",
            "billingPeriod":"MONTHLY",
            "phaseType":"TRIAL",
            "priceList":"DEFAULT",
            "planName":"super-monthly",
            "state":"ACTIVE",
            "sourceType":"NATIVE",
            "chargedThroughDate":"2013-08-01",
            "billingStartDate":"2013-08-01",
            "billCycleDayLocal":31,
            "events":[
               {
                  "eventId":"c5ba5861-d4e4-46de-9ac5-d72ddf086ff2",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"super-monthly",
                  "product":"Super",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"super-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"2add66b9-cd9f-47c3-906a-899aad32a350",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"super-monthly",
                  "product":"Super",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"super-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"86be39b0-0a70-4e15-a891-ed20aed6c12d",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-31",
                  "plan":"super-monthly",
                  "product":"Super",
                  "priceList":"DEFAULT",
                  "eventType":"PHASE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"PHASE",
                  "phase":"super-monthly-evergreen",
                  "auditLogs":[]
               }
            ],
            "priceOverrides":[
               {
                  "planName":"super-monthly",
                  "phaseName":"super-monthly-trial",
                  "phaseType":"TRIAL",
                  "fixedPrice":0
               },
               {
                  "planName":"super-monthly",
                  "phaseName":"super-monthly-evergreen",
                  "phaseType":"EVERGREEN",
                  "recurringPrice":1000.0
               }
            ],
            "auditLogs":[]
         },
         {
            "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
            "bundleId":"a5221798-699a-48ac-a2d1-962839fd8fc9",
            "subscriptionId":"cf1c90f9-928c-43c1-9b88-633a0ac6d7f2",
            "externalKey":"3-6138e5ee-2763-4729-829b-e7de038b46d0-889153",
            "startDate":"2013-08-01",
            "productName":"Gas",
            "productCategory":"ADD_ON",
            "billingPeriod":"NO_BILLING_PERIOD",
            "phaseType":"EVERGREEN",
            "priceList":"DEFAULT",
            "planName":"gas-monthly",
            "state":"ACTIVE",
            "sourceType":"NATIVE",
            "billingStartDate":"2013-08-01",
            "billCycleDayLocal":31,
            "events":[
               {
                  "eventId":"08ec39ef-e9f5-4e58-957d-650d174938ab",
                  "billingPeriod":"NO_BILLING_PERIOD",
                  "effectiveDate":"2013-08-01",
                  "plan":"gas-monthly",
                  "product":"Gas",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"gas-monthly-evergreen",
                  "auditLogs":[]
               },
               {
                  "eventId":"729268e7-583b-49f2-be84-477ae444c363",
                  "billingPeriod":"NO_BILLING_PERIOD",
                  "effectiveDate":"2013-08-01",
                  "plan":"gas-monthly",
                  "product":"Gas",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"gas-monthly-evergreen",
                  "auditLogs":[]
               }
            ],
            "priceOverrides":[
               {
                  "planName":"gas-monthly",
                  "phaseName":"gas-monthly-evergreen",
                  "phaseType":"EVERGREEN"
               }
            ],
            "auditLogs":[]
         }
      ],
      "timeline":{
         "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
         "bundleId":"a5221798-699a-48ac-a2d1-962839fd8fc9",
         "externalKey":"3-6138e5ee-2763-4729-829b-e7de038b46d0-889153",
         "events":[
            {
               "eventId":"08ec39ef-e9f5-4e58-957d-650d174938ab",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"super-monthly",
               "product":"Super",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"super-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"c5ba5861-d4e4-46de-9ac5-d72ddf086ff2",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"super-monthly",
               "product":"Super",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"super-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"2add66b9-cd9f-47c3-906a-899aad32a350",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"super-monthly",
               "product":"Super",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"super-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"729268e7-583b-49f2-be84-477ae444c363",
               "billingPeriod":"NO_BILLING_PERIOD",
               "effectiveDate":"2013-08-01",
               "plan":"gas-monthly",
               "product":"Gas",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"gas-monthly-evergreen",
               "auditLogs":[]
            },
            {
               "eventId":"86be39b0-0a70-4e15-a891-ed20aed6c12d",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-31",
               "plan":"super-monthly",
               "product":"Super",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"super-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "auditLogs":[]
      },
      "auditLogs":[]
   },
   {
      "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
      "bundleId":"e71f6dc2-ece9-4d31-8cea-81472784ded3",
      "externalKey":"2-6138e5ee-2763-4729-829b-e7de038b46d0-979751",
      "subscriptions":[
         {
            "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
            "bundleId":"e71f6dc2-ece9-4d31-8cea-81472784ded3",
            "subscriptionId":"2be86a1f-0516-4fda-a094-7467f2171d7f",
            "externalKey":"2-6138e5ee-2763-4729-829b-e7de038b46d0-979751",
            "startDate":"2013-08-01",
            "productName":"Standard",
            "productCategory":"BASE",
            "billingPeriod":"MONTHLY",
            "phaseType":"TRIAL",
            "priceList":"DEFAULT",
            "planName":"standard-monthly",
            "state":"ACTIVE",
            "sourceType":"NATIVE",
            "chargedThroughDate":"2013-08-01",
            "billingStartDate":"2013-08-01",
            "billCycleDayLocal":31,
            "events":[
               {
                  "eventId":"4e9cff06-c558-48b0-adad-6dda59ac551c",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"standard-monthly",
                  "product":"Standard",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"standard-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"2d32bd25-46d6-448e-a5ca-f07c56dd2feb",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"standard-monthly",
                  "product":"Standard",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"standard-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"d7754b8e-cc06-4bb7-afbf-022860261f14",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-31",
                  "plan":"standard-monthly",
                  "product":"Standard",
                  "priceList":"DEFAULT",
                  "eventType":"PHASE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"PHASE",
                  "phase":"standard-monthly-evergreen",
                  "auditLogs":[]
               }
            ],
            "priceOverrides":[
               {
                  "planName":"standard-monthly",
                  "phaseName":"standard-monthly-trial",
                  "phaseType":"TRIAL",
                  "fixedPrice":0
               },
               {
                  "planName":"standard-monthly",
                  "phaseName":"standard-monthly-evergreen",
                  "phaseType":"EVERGREEN",
                  "recurringPrice":100.0
               }
            ],
            "auditLogs":[]
         }
      ],
      "timeline":{
         "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
         "bundleId":"e71f6dc2-ece9-4d31-8cea-81472784ded3",
         "externalKey":"2-6138e5ee-2763-4729-829b-e7de038b46d0-979751",
         "events":[
            {
               "eventId":"4e9cff06-c558-48b0-adad-6dda59ac551c",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"standard-monthly",
               "product":"Standard",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"standard-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"2d32bd25-46d6-448e-a5ca-f07c56dd2feb",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"standard-monthly",
               "product":"Standard",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"standard-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"d7754b8e-cc06-4bb7-afbf-022860261f14",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-31",
               "plan":"standard-monthly",
               "product":"Standard",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"standard-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "auditLogs":[]
      },
      "auditLogs":[]
   },
   {
      "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
      "bundleId":"3c7d6f02-bd9b-4f23-8a44-d806d3cbe330",
      "externalKey":"1-6138e5ee-2763-4729-829b-e7de038b46d0-909112",
      "subscriptions":[
         {
            "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
            "bundleId":"3c7d6f02-bd9b-4f23-8a44-d806d3cbe330",
            "subscriptionId":"d64a410b-49b6-47af-88a3-cbd203289246",
            "externalKey":"1-6138e5ee-2763-4729-829b-e7de038b46d0-909112",
            "startDate":"2013-08-01",
            "productName":"Sports",
            "productCategory":"BASE",
            "billingPeriod":"MONTHLY",
            "phaseType":"TRIAL",
            "priceList":"DEFAULT",
            "planName":"sports-monthly",
            "state":"ACTIVE",
            "sourceType":"NATIVE",
            "chargedThroughDate":"2013-08-01",
            "billingStartDate":"2013-08-01",
            "billCycleDayLocal":31,
            "events":[
               {
                  "eventId":"ae420517-05d4-4a5d-bbe9-0f81a433efd3",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"sports-monthly",
                  "product":"Sports",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"sports-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"d2179af5-1deb-4e2a-a934-9bad8cac04bd",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"sports-monthly",
                  "product":"Sports",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"sports-monthly-trial",
                  "auditLogs":[]
               },
               {
                  "eventId":"d45754a1-eb41-4a87-9714-80e2975a9f9a",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-31",
                  "plan":"sports-monthly",
                  "product":"Sports",
                  "priceList":"DEFAULT",
                  "eventType":"PHASE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"PHASE",
                  "phase":"sports-monthly-evergreen",
                  "auditLogs":[]
               }
            ],
            "priceOverrides":[
               {
                  "planName":"sports-monthly",
                  "phaseName":"sports-monthly-trial",
                  "phaseType":"TRIAL",
                  "fixedPrice":0
               },
               {
                  "planName":"sports-monthly",
                  "phaseName":"sports-monthly-evergreen",
                  "phaseType":"EVERGREEN",
                  "recurringPrice":500.0
               }
            ],
            "auditLogs":[]
         },
         {
            "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
            "bundleId":"3c7d6f02-bd9b-4f23-8a44-d806d3cbe330",
            "subscriptionId":"b313e0f1-0c2e-4be7-bb6a-b4c8aff36341",
            "externalKey":"1-6138e5ee-2763-4729-829b-e7de038b46d0-909112",
            "startDate":"2013-08-01",
            "productName":"OilSlick",
            "productCategory":"ADD_ON",
            "billingPeriod":"MONTHLY",
            "phaseType":"DISCOUNT",
            "priceList":"DEFAULT",
            "planName":"oilslick-monthly",
            "state":"ACTIVE",
            "sourceType":"NATIVE",
            "chargedThroughDate":"2013-08-31",
            "billingStartDate":"2013-08-01",
            "billCycleDayLocal":31,
            "events":[
               {
                  "eventId":"1f06a132-d7e7-4fb6-ad96-8ef0a55ec38b",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"oilslick-monthly",
                  "product":"OilSlick",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"oilslick-monthly-discount",
                  "auditLogs":[]
               },
               {
                  "eventId":"d783e243-2aa9-4463-a81b-030772d7945c",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"oilslick-monthly",
                  "product":"OilSlick",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"oilslick-monthly-discount",
                  "auditLogs":[]
               },
               {
                  "eventId":"267a056b-85b9-4912-8231-597e9905519c",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-09-01",
                  "plan":"oilslick-monthly",
                  "product":"OilSlick",
                  "priceList":"DEFAULT",
                  "eventType":"PHASE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"PHASE",
                  "phase":"oilslick-monthly-evergreen",
                  "auditLogs":[]
               }
            ],
            "priceOverrides":[
               {
                  "planName":"oilslick-monthly",
                  "phaseName":"oilslick-monthly-discount",
                  "phaseType":"DISCOUNT",
                  "recurringPrice":4.0
               },
               {
                  "planName":"oilslick-monthly",
                  "phaseName":"oilslick-monthly-evergreen",
                  "phaseType":"EVERGREEN",
                  "recurringPrice":7.95
               }
            ],
            "auditLogs":[]
         }
      ],
      "timeline":{
         "accountId":"6138e5ee-2763-4729-829b-e7de038b46d0",
         "bundleId":"3c7d6f02-bd9b-4f23-8a44-d806d3cbe330",
         "externalKey":"1-6138e5ee-2763-4729-829b-e7de038b46d0-909112",
         "events":[
            {
               "eventId":"1f06a132-d7e7-4fb6-ad96-8ef0a55ec38b",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"oilslick-monthly",
               "product":"OilSlick",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"oilslick-monthly-discount",
               "auditLogs":[]
            },
            {
               "eventId":"ae420517-05d4-4a5d-bbe9-0f81a433efd3",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"oilslick-monthly",
               "product":"OilSlick",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"oilslick-monthly-discount",
               "auditLogs":[]
            },
            {
               "eventId":"d783e243-2aa9-4463-a81b-030772d7945c",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"oilslick-monthly",
               "product":"OilSlick",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"oilslick-monthly-discount",
               "auditLogs":[]
            },
            {
               "eventId":"d2179af5-1deb-4e2a-a934-9bad8cac04bd",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"sports-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"d45754a1-eb41-4a87-9714-80e2975a9f9a",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-31",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            },
            {
               "eventId":"267a056b-85b9-4912-8231-597e9905519c",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-09-01",
               "plan":"oilslick-monthly",
               "product":"OilSlick",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"oilslick-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "auditLogs":[]
      },
      "auditLogs":[]
   }
]
```
```python
[{'account_id': '8992e146-bfa1-4126-a045-98b844a4adcb',
 'audit_logs': [],
 'bundle_id': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc',
 'external_key': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc',
 'subscriptions': [{'account_id': '8992e146-bfa1-4126-a045-98b844a4adcb',
                    'audit_logs': [],
                    'bill_cycle_day_local': 2,
                    'billing_end_date': None,
                    'billing_period': 'MONTHLY',
                    'billing_start_date': datetime.date(2018, 5, 3),
                    'bundle_id': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc',
                    'cancelled_date': None,
                    'charged_through_date': None,
                    'events': [{'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 3),
                                'event_id': 'efa8c4ae-a514-4950-b6f5-58f1e1d17846',
                                'event_type': 'START_ENTITLEMENT',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement-service',
                                'service_state_name': 'ENT_STARTED'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 3),
                                'event_id': '94470035-33c0-42bc-a041-58aa13bdae93',
                                'event_type': 'START_BILLING',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'billing-service',
                                'service_state_name': 'START_BILLING'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 6, 2),
                                'event_id': '9d369364-1a5d-4291-9ecd-4cb0617ef5b3',
                                'event_type': 'PHASE',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-evergreen',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement+billing-service',
                                'service_state_name': 'PHASE'}],
                    'external_key': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc',
                    'phase_type': 'TRIAL',
                    'plan_name': 'standard-monthly',
                    'price_list': 'DEFAULT',
                    'price_overrides': [{'fixed_price': 0.0,
                                         'phase_name': 'standard-monthly-trial',
                                         'phase_type': 'TRIAL',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': None,
                                         'usage_price_overrides': []},
                                        {'fixed_price': None,
                                         'phase_name': 'standard-monthly-evergreen',
                                         'phase_type': 'EVERGREEN',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': 100.0,
                                         'usage_price_overrides': []}],
                    'product_category': 'BASE',
                    'product_name': 'Standard',
                    'source_type': 'NATIVE',
                    'start_date': datetime.date(2018, 5, 3),
                    'state': 'ACTIVE',
                    'subscription_id': 'a0f6dcd9-4dbc-43d2-876a-9dcc7dfb7d3b'}],
 'timeline': {'account_id': '8992e146-bfa1-4126-a045-98b844a4adcb',
              'audit_logs': [],
              'bundle_id': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc',
              'events': [{'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 3),
                          'event_id': 'efa8c4ae-a514-4950-b6f5-58f1e1d17846',
                          'event_type': 'START_ENTITLEMENT',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement-service',
                          'service_state_name': 'ENT_STARTED'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 3),
                          'event_id': '94470035-33c0-42bc-a041-58aa13bdae93',
                          'event_type': 'START_BILLING',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'billing-service',
                          'service_state_name': 'START_BILLING'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 6, 2),
                          'event_id': '9d369364-1a5d-4291-9ecd-4cb0617ef5b3',
                          'event_type': 'PHASE',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-evergreen',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement+billing-service',
                          'service_state_name': 'PHASE'}],
              'external_key': 'd636e7e9-e1e3-43ff-94a6-01a868b064cc'}}]
```


**Query Parameters**

None.

**Returns**

Returns a list of account bundle objects.

## Rebalance account CBA

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/cbaRebalancing`

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

```python
accountApi = killbill.api.AccountApi()

accountApi.rebalance_existing_cba_on_account(account_id, 
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

**Response**

A `204` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'

accountApi.get_children_accounts(account_id, api_key, api_secret)
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
      "accountId":"e19c6ab3-1a21-42f2-8ea2-9859c082b093",
      "name":"John Doe",
      "externalKey":"1522172592-516014",
      "email":"John@example.com",
      "billCycleDayLocal":0,
      "currency":"USD",
      "parentAccountId":"01ab962b-3c66-4b17-b391-ffcc9fe51884",
      "isPaymentDelegatedToParent":true,
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
      "auditLogs":[

      ]
   }
]
```
```python
[
    {
     'account_balance': None,
     'account_cba': None,
     'account_id': '07c0cef4-41c5-4606-b2cd-661332cdd41c',
     'address1': None,
     'address2': None,
     'audit_logs': [],
     'bill_cycle_day_local': 0,
     'city': None,
     'company': None,
     'country': 'USA',
     'currency': 'USD',
     'email': None,
     'external_key': 'rpwtgr',
     'first_name_length': None,
     'is_migrated': False,
     'is_notified_for_invoices': False,
     'is_payment_delegated_to_parent': False,
     'locale': None,
     'name': 'John',
     'notes': None,
     'parent_account_id': None,
     'payment_method_id': None,
     'phone': None,
     'postal_code': None,
     'reference_time': datetime.datetime(2018, 5, 3, 15, 53, 44, tzinfo=tzutc()),
     'state': 'CA',
     'time_zone': 'UTC'
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
```python
accountApi = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'
body = CustomField(name='Test Custom Field', value='test_value')

account.create_account_custom_fields(account_id,
                                     [body],
                                     created_by,
                                     api_key,
                                     api_secret)
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
```python
no content
```
**Query Parameters**

None.

**Returns**

Returns a custom field object.

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
```python
accountApi = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'

accountApi.get_account_custom_fields(account_id, api_key, api_secret)
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
```python
[
 {
   'audit_logs': [],
   'custom_field_id': 'd7bb1afb-df19-4db2-ba7f-9a4f71e9b131',
   'name': 'Test Custom Field',
   'object_id': '89c45186-8ab0-44f8-8bc9-e670924830a2',
   'object_type': 'ACCOUNT',
   'value': 'test_value'
 }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to account

**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{accountId}/customFields`


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

account.modify_custom_field(custom_field,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
account = killbill.api.AccountApi()
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

account.modify_account_custom_fields(account_id, 
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

None.

**Returns**

A `204` http status without content.

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

account.remove_custom_field(custom_field_id, 
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
account = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'
custom_field_id = '9913e0f6-b5ef-498b-ac47-60e1626eba8f'
custom_field = [custom_field_id]

account.delete_account_custom_fields(account_id,
                                     created_by,
                                     api_key,
                                     api_secret,
                                     custom_field=custom_field)
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

**Response**

A `204` http status without content.

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
account_email_notifications.is_notified_for_invoices = true
      
account_email_notifications.update_email_notifications(user,
                                                       reason,
                                                       comment,
                                                       options)
```

```python
accountApi = killbill.api.AccountApi()
account_id = '8992e146-bfa1-4126-a045-98b844a4adcb'
body = InvoiceEmail(account_id=account_id, is_notified_for_invoices=True)

accountApi.set_email_notifications_for_account(account_id,
                                               body,
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

**Response**

A `204` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = 'c84de569-b654-4f7f-ab13-17616302d310'

accountApi.get_email_notifications_for_account(account_id, api_key, api_secret)
```

> Example Response:

```ruby
{
   "accountId":"58acec2f-1ae3-43db-9672-0c288a0eea9e",
   "isNotifiedForInvoices":true
}
```
```python
{
 'account_id': 'c84de569-b654-4f7f-ab13-17616302d310',
 'audit_logs': [],
 'is_notified_for_invoices': True
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

```python
accountApi = killbill.api.AccountApi()
account_id = 'c8f51346-562d-429b-8c89-27a0f72009b3'

accountApi.get_emails(account_id, api_key, api_secret)
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
```python
[
  {
    'account_id': 'c8f51346-562d-429b-8c89-27a0f72009b3',
    'audit_logs': [],
    'email': 'email@example.com'
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

```python
accountApi = killbill.api.AccountApi()
account_id = 'c84de569-b654-4f7f-ab13-17616302d310'
body = AccountEmail(account_id=account_id, email='email@example.com')

accountApi.add_email(account_id,
                     body,
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

**Response**

A `201` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = 'c84de569-b654-4f7f-ab13-17616302d310'
email = 'email@example.com'

accountApi.remove_email(account_id,
                        email,
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

**Response**

A `204` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = '110952d7-1b7e-482c-b6bb-103e46794927'

accountApi.get_invoice_payments(account_id, api_key, api_secret)
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
```python
[{'account_id': '110952d7-1b7e-482c-b6bb-103e46794927',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '00ac58a6-7f0e-4149-9682-7d2110a18fb7',
 'payment_id': '00ac58a6-7f0e-4149-9682-7d2110a18fb7',
 'payment_method_id': '4a2a793a-48b0-41f1-ab7e-eff4efda3747',
 'payment_number': '291',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'target_invoice_id': '9696fb14-6016-484d-b288-f57854d61193',
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 4, 16, 51, 1, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '00ac58a6-7f0e-4149-9682-7d2110a18fb7',
                   'payment_id': '00ac58a6-7f0e-4149-9682-7d2110a18fb7',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '1063f716-cf90-42fe-aa2c-888fa21cf4bb',
                   'transaction_id': '1063f716-cf90-42fe-aa2c-888fa21cf4bb',
                   'transaction_type': 'PURCHASE'}]}]
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

```python
accountApi = killbill.api.AccountApi()
account_id = '82ecbf80-ddd2-4208-92be-2d3b2b7fc266'

accountApi.pay_all_invoices(account_id, 
                            created_by,
                            api_key, 
                            api_secret, 
                            external_payment=True)
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
| **externalPayment** | boolean | true | Choose true if you use a external payment method. |
| **paymentAmount** | string | true | Total payment amount. |

**Response**

A `201` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = '82ecbf80-ddd2-4208-92be-2d3b2b7fc266'

accountApi.get_invoices_for_account(account_id, api_key, api_secret)
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
```python
[{'account_id': '82ecbf80-ddd2-4208-92be-2d3b2b7fc266',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 4),
 'invoice_id': 'da4a1c85-c18c-4d88-8005-e3c4039c218b',
 'invoice_number': '764',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 4)}, {'account_id': '82ecbf80-ddd2-4208-92be-2d3b2b7fc266',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 4),
 'invoice_id': '00b24709-160b-4472-8741-e0f271a67fe0',
 'invoice_number': '765',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 4)}, {'account_id': '82ecbf80-ddd2-4208-92be-2d3b2b7fc266',
 'amount': 50.0,
 'audit_logs': [],
 'balance': 50.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 4),
 'invoice_id': '6e2be596-f6f0-4453-9551-3638af9088d2',
 'invoice_number': '766',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 4)}]
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

```python
accountApi = killbill.api.AccountApi()
account_id = '82ecbf80-ddd2-4208-92be-2d3b2b7fc266'

accountApi.get_overdue_account(account_id, api_key, api_secret)
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
```python
{
 'days_between_payment_retries': [8, 8, 8],
 'external_message': '',
 'is_block_changes': False,
 'is_clear_state': True,
 'is_disable_entitlement_and_changes_blocked': False,
 'name': '__KILLBILL__CLEAR__OVERDUE_STATE__',
 'reevaluation_interval_days': None
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
```python
accountApi = killbill.api.AccountApi()
account_id = '88a5987a-1e1c-47c5-ba95-34ef14db3d46'

accountApi.get_payment_methods_for_account(account_id, api_key, api_secret)
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
```python
[{'account_id': '88a5987a-1e1c-47c5-ba95-34ef14db3d46',
 'audit_logs': [],
 'external_key': 'unknown',
 'is_default': False,
 'payment_method_id': 'f49b513b-f045-46d8-9886-7f28df87e2a6',
 'plugin_info': None,
 'plugin_name': '__EXTERNAL_PAYMENT__'}]
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

```python
accountApi = killbill.api.AccountApi()
account_id = '059ecfb8-6b4d-4a89-9537-63a687e6cf10'
body = PaymentMethod(plugin_name='__EXTERNAL_PAYMENT__', plugin_info=None)

accountApi.create_payment_method(account_id, 
                                 body, 
                                 created_by, 
                                 api_key, 
                                 api_secret)
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
```python
no content
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

```python
accountApi = killbill.api.AccountApi()
account_id = '88a5987a-1e1c-47c5-ba95-34ef14db3d46'
payment_method_id = '4f124c0d-cee7-49b1-a181-3b0738c685d7'

accountApi.set_default_payment_method(account_id, 
                                      payment_method_id, 
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
| **payAllUnpaidInvoices** | boolean | true | Choose true if you want to pay all unpaid invoices. |

**Response**

A `204` http status without content.

## Refresh account payment methods

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/paymentMethods/refresh`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = account.account_id

KillBillClient::Model::PaymentMethod.refresh(account_id, 
                                             user, 
                                             reason, 
                                             comment, 
                                             options)
```

```python
accountApi = killbill.api.AccountApi()
account_id = '88a5987a-1e1c-47c5-ba95-34ef14db3d46'

accountApi.refresh_payment_methods(account_id, 
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

**Response**

A `204` http status without content.

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

```python
accountApi = killbill.api.AccountApi()
account_id = 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61'

accountApi.get_payments_for_account(account_id, api_key, api_secret)
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
```python
[{'account_id': 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'cf34a5e5-b933-4efd-8e6d-502e8ae6be81',
 'payment_id': 'cf34a5e5-b933-4efd-8e6d-502e8ae6be81',
 'payment_method_id': '58065d90-6fb1-40ff-bbcb-aa21b45c76c0',
 'payment_number': '294',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 4, 18, 1, 15, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': 'cf34a5e5-b933-4efd-8e6d-502e8ae6be81',
                   'payment_id': 'cf34a5e5-b933-4efd-8e6d-502e8ae6be81',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': 'd1d52998-dc41-4f03-93e9-7f9a59445bb7',
                   'transaction_id': 'd1d52998-dc41-4f03-93e9-7f9a59445bb7',
                   'transaction_type': 'PURCHASE'}]}]
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
transaction.auth(account.account_id,
                 payment_method_id, 
                 user, 
                 reason, 
                 comment, 
                 options, 
                 refresh_options)

# Purchase
transaction.purchase(account.account_id,
                     payment_method_id, 
                     user, 
                     reason, 
                     comment, 
                     options, 
                     refresh_options)

# Credit
transaction.credit(account.account_id,
                   payment_method_id, 
                   user, 
                   reason, 
                   comment, 
                   options, 
                   refresh_options)
```

```python
accountApi = killbill.api.AccountApi()
account_id = 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61'
payment_method_id = '80c7b386-97b2-424c-bb4e-0017f92bc6eb'

# transaction_type could be 'AUTHORIZE', 'PURCHASE' or 'CREDIT'
body = PaymentTransaction(amount=50, transaction_type='AUTHORIZE')

accountApi.process_payment(account_id, 
                           body, 
                           created_by, 
                           api_key, 
                           api_secret, 
                           payment_method_id=payment_method_id)
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
```python
no content
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

```python
accountApi = killbill.api.AccountApi()
account_id = 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61'
tag = ["00000000-0000-0000-0000-000000000002"]

accountApi.create_account_tags(account_id, 
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
      "objectType":"ACCOUNT",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[

      ]
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

```python
accountApi = killbill.api.AccountApi()
account_id = 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61'

accountApi.get_account_tags(account_id, api_key, api_secret)
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
```python
[
  {
    'audit_logs': [],
    'object_id': '2501dd10-8244-4b4f-9356-8cf73f18fbf6',
    'object_type': 'ACCOUNT',
    'tag_definition_id': '00000000-0000-0000-0000-000000000002',
    'tag_definition_name': 'AUTO_INVOICING_OFF',
    'tag_id': '83df059f-7529-43d4-b77b-c91f39a60166'
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

## Remove tags from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/tags`

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

```python
accountApi = killbill.api.AccountApi()
account_id = 'b0da8392-49ba-43f2-8fac-3f9f85b8ff61'
tag = ["00000000-0000-0000-0000-000000000002"]

accountApi.delete_account_tags(account_id, 
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

```python
accountApi = killbill.api.AccountApi()
account_id = '43488882-1777-460c-bc32-e375e67d09cf'

accountApi.get_account_timeline(account_id, api_key, api_secret)
```

> Example Response:

```ruby
{
   "account":{
      "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
      "name":"KillBillClient",
      "externalKey":"1522173024-759445",
      "email":"kill@bill.com",
      "billCycleDayLocal":31,
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
      "auditLogs":[
         {
            "changeType":"INSERT",
            "changeDate":"2013-08-01T06:00:01.000Z",
            "changedBy":"test_change_default",
            "userToken":"07952a10-4283-456a-830d-0b2a1e353eec"
         }
      ]
   },
   "bundles":[
      {
         "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
         "bundleId":"043b06e0-7d61-4891-ab58-63b02eaf0fee",
         "externalKey":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69-478447",
         "subscriptions":[
            {
               "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
               "bundleId":"043b06e0-7d61-4891-ab58-63b02eaf0fee",
               "subscriptionId":"c1675495-e899-4e1e-8d81-8ef02b02e0a8",
               "externalKey":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69-478447",
               "startDate":"2013-08-01",
               "productName":"Super",
               "productCategory":"BASE",
               "billingPeriod":"MONTHLY",
               "phaseType":"TRIAL",
               "priceList":"DEFAULT",
               "planName":"super-monthly",
               "state":"ACTIVE",
               "sourceType":"NATIVE",
               "chargedThroughDate":"2013-08-02",
               "billingStartDate":"2013-08-01",
               "billCycleDayLocal":31,
               "events":[
                  {
                     "eventId":"97a0172a-cb88-467b-bbaf-28cf3a335570",
                     "billingPeriod":"MONTHLY",
                     "effectiveDate":"2013-08-01",
                     "plan":"sports-monthly",
                     "product":"Sports",
                     "priceList":"DEFAULT",
                     "eventType":"START_ENTITLEMENT",
                     "isBlockedBilling":false,
                     "isBlockedEntitlement":false,
                     "serviceName":"entitlement-service",
                     "serviceStateName":"ENT_STARTED",
                     "phase":"sports-monthly-trial",
                     "auditLogs":[
                        {
                           "changeType":"INSERT",
                           "changeDate":"2013-08-01T06:00:01.000Z",
                           "changedBy":"test_change_default",
                           "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
                        }
                     ]
                  },
                  {
                     "eventId":"b634594b-6680-4456-a083-521301416e31",
                     "billingPeriod":"MONTHLY",
                     "effectiveDate":"2013-08-01",
                     "plan":"sports-monthly",
                     "product":"Sports",
                     "priceList":"DEFAULT",
                     "eventType":"START_BILLING",
                     "isBlockedBilling":false,
                     "isBlockedEntitlement":false,
                     "serviceName":"billing-service",
                     "serviceStateName":"START_BILLING",
                     "phase":"sports-monthly-trial",
                     "auditLogs":[
                        {
                           "changeType":"INSERT",
                           "changeDate":"2013-08-01T06:00:01.000Z",
                           "changedBy":"test_change_default",
                           "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
                        }
                     ]
                  },
                  {
                     "eventId":"82953028-68c0-4c2e-9596-0248047d2452",
                     "billingPeriod":"MONTHLY",
                     "effectiveDate":"2013-08-02",
                     "plan":"super-monthly",
                     "product":"Super",
                     "priceList":"DEFAULT",
                     "eventType":"CHANGE",
                     "isBlockedBilling":false,
                     "isBlockedEntitlement":false,
                     "serviceName":"entitlement+billing-service",
                     "serviceStateName":"CHANGE",
                     "phase":"super-monthly-trial",
                     "auditLogs":[
                        {
                           "changeType":"INSERT",
                           "changeDate":"2013-08-02T06:00:03.000Z",
                           "changedBy":"test_change_default",
                           "userToken":"7e39f68b-c695-4d38-822b-5e4ad230f130"
                        }
                     ]
                  },
                  {
                     "eventId":"c2e120b7-af1a-42f4-b16d-2669be94c897",
                     "billingPeriod":"MONTHLY",
                     "effectiveDate":"2013-08-31",
                     "plan":"super-monthly",
                     "product":"Super",
                     "priceList":"DEFAULT",
                     "eventType":"PHASE",
                     "isBlockedBilling":false,
                     "isBlockedEntitlement":false,
                     "serviceName":"entitlement+billing-service",
                     "serviceStateName":"PHASE",
                     "phase":"super-monthly-evergreen",
                     "auditLogs":[
                        {
                           "changeType":"INSERT",
                           "changeDate":"2013-08-02T06:00:03.000Z",
                           "changedBy":"test_change_default",
                           "userToken":"7e39f68b-c695-4d38-822b-5e4ad230f130"
                        }
                     ]
                  }
               ],
               "priceOverrides":[
                  {
                     "planName":"sports-monthly",
                     "phaseName":"sports-monthly-trial",
                     "phaseType":"TRIAL",
                     "fixedPrice":0
                  },
                  {
                     "planName":"super-monthly",
                     "phaseName":"super-monthly-trial",
                     "phaseType":"TRIAL",
                     "fixedPrice":0
                  },
                  {
                     "planName":"super-monthly",
                     "phaseName":"super-monthly-evergreen",
                     "phaseType":"EVERGREEN",
                     "recurringPrice":1000.0
                  }
               ],
               "auditLogs":[
                  {
                     "changeType":"INSERT",
                     "changeDate":"2013-08-01T06:00:01.000Z",
                     "changedBy":"test_change_default",
                     "reasonCode":null,
                     "comments":null,
                     "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
                  }
               ]
            }
         ],
         "timeline":{
            "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
            "bundleId":"043b06e0-7d61-4891-ab58-63b02eaf0fee",
            "externalKey":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69-478447",
            "events":[
               {
                  "eventId":"97a0172a-cb88-467b-bbaf-28cf3a335570",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"sports-monthly",
                  "product":"Sports",
                  "priceList":"DEFAULT",
                  "eventType":"START_ENTITLEMENT",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement-service",
                  "serviceStateName":"ENT_STARTED",
                  "phase":"sports-monthly-trial",
                  "auditLogs":[
                     {
                        "changeType":"INSERT",
                        "changeDate":"2013-08-01T06:00:01.000Z",
                        "changedBy":"test_change_default",
                        "reasonCode":null,
                        "comments":null,
                        "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
                     }
                  ]
               },
               {
                  "eventId":"b634594b-6680-4456-a083-521301416e31",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-01",
                  "plan":"sports-monthly",
                  "product":"Sports",
                  "priceList":"DEFAULT",
                  "eventType":"START_BILLING",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"billing-service",
                  "serviceStateName":"START_BILLING",
                  "phase":"sports-monthly-trial",
                  "auditLogs":[
                     {
                        "changeType":"INSERT",
                        "changeDate":"2013-08-01T06:00:01.000Z",
                        "changedBy":"test_change_default",
                        "reasonCode":null,
                        "comments":null,
                        "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
                     }
                  ]
               },
               {
                  "eventId":"82953028-68c0-4c2e-9596-0248047d2452",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-02",
                  "plan":"super-monthly",
                  "product":"Super",
                  "priceList":"DEFAULT",
                  "eventType":"CHANGE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"CHANGE",
                  "phase":"super-monthly-trial",
                  "auditLogs":[
                     {
                        "changeType":"INSERT",
                        "changeDate":"2013-08-02T06:00:03.000Z",
                        "changedBy":"test_change_default",
                        "reasonCode":null,
                        "comments":null,
                        "userToken":"7e39f68b-c695-4d38-822b-5e4ad230f130"
                     }
                  ]
               },
               {
                  "eventId":"c2e120b7-af1a-42f4-b16d-2669be94c897",
                  "billingPeriod":"MONTHLY",
                  "effectiveDate":"2013-08-31",
                  "plan":"super-monthly",
                  "product":"Super",
                  "priceList":"DEFAULT",
                  "eventType":"PHASE",
                  "isBlockedBilling":false,
                  "isBlockedEntitlement":false,
                  "serviceName":"entitlement+billing-service",
                  "serviceStateName":"PHASE",
                  "phase":"super-monthly-evergreen",
                  "auditLogs":[
                     {
                        "changeType":"INSERT",
                        "changeDate":"2013-08-02T06:00:03.000Z",
                        "changedBy":"test_change_default",
                        "reasonCode":null,
                        "comments":null,
                        "userToken":"7e39f68b-c695-4d38-822b-5e4ad230f130"
                     }
                  ]
               }
            ],
            "auditLogs":[
               {
                  "changeType":"INSERT",
                  "changeDate":"2013-08-01T06:00:01.000Z",
                  "changedBy":"test_change_default",
                  "reasonCode":null,
                  "comments":null,
                  "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
               }
            ]
         },
         "auditLogs":[
            {
               "changeType":"INSERT",
               "changeDate":"2013-08-01T06:00:01.000Z",
               "changedBy":"test_change_default",
               "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
            }
         ]
      }
   ],
   "invoices":[
      {
         "amount":0.0,
         "currency":"USD",
         "status":"COMMITTED",
         "creditAdj":0.0,
         "refundAdj":0.0,
         "invoiceId":"5f7edbcd-5f38-410b-93e0-d6959c44ca25",
         "invoiceDate":"2013-08-01",
         "targetDate":"2013-08-01",
         "invoiceNumber":"1631",
         "balance":0.0,
         "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
         "bundleKeys":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69-478447",
         "credits":[],
         "isParentInvoice":false,
         "auditLogs":[
            {
               "changeType":"INSERT",
               "changeDate":"2013-08-01T06:00:02.000Z",
               "changedBy":"SubscriptionBaseTransition",
               "userToken":"cc3b9ec7-d55b-400b-803c-4a7f9413fe33"
            }
         ]
      },
      {
         "amount":0.0,
         "currency":"USD",
         "status":"COMMITTED",
         "creditAdj":0.0,
         "refundAdj":0.0,
         "invoiceId":"c68044ed-7f94-4766-b95b-a04d1484728b",
         "invoiceDate":"2013-08-02",
         "targetDate":"2013-08-02",
         "invoiceNumber":"1632",
         "balance":0.0,
         "accountId":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69",
         "bundleKeys":"f5ac6a12-7e24-4b5b-acf0-3f16436faf69-478447",
         "credits":[],
         "isParentInvoice":false,
         "auditLogs":[
            {
               "changeType":"INSERT",
               "changeDate":"2013-08-02T06:00:03.000Z",
               "changedBy":"SubscriptionBaseTransition",
               "userToken":"7e39f68b-c695-4d38-822b-5e4ad230f130"
            }
         ]
      }
   ],
   "payments":[]
}
```
```python
{'account': {'account_balance': None,
             'account_cba': None,
             'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
             'address1': None,
             'address2': None,
             'audit_logs': [],
             'bill_cycle_day_local': 3,
             'city': None,
             'company': None,
             'country': 'USA',
             'currency': 'USD',
             'email': None,
             'external_key': 'hmwgix',
             'first_name_length': None,
             'is_migrated': False,
             'is_notified_for_invoices': True,
             'is_payment_delegated_to_parent': False,
             'locale': None,
             'name': 'John',
             'notes': None,
             'parent_account_id': None,
             'payment_method_id': None,
             'phone': None,
             'postal_code': None,
             'reference_time': datetime.datetime(2018, 5, 4, 19, 28, 56, tzinfo=tzutc()),
             'state': 'CA',
             'time_zone': 'UTC'},
 'bundles': [{'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
              'audit_logs': [],
              'bundle_id': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
              'external_key': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
              'subscriptions': [{'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
                                 'audit_logs': [],
                                 'bill_cycle_day_local': 3,
                                 'billing_end_date': datetime.date(2018, 5, 4),
                                 'billing_period': 'MONTHLY',
                                 'billing_start_date': datetime.date(2018, 5, 4),
                                 'bundle_id': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
                                 'cancelled_date': datetime.date(2018, 5, 4),
                                 'charged_through_date': datetime.date(2018, 5, 4),
                                 'events': [{'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': 'e2ba3b83-d04a-4128-8dea-b71d0c2a5630',
                                             'event_type': 'START_ENTITLEMENT',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'standard-monthly-trial',
                                             'plan': 'standard-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Standard',
                                             'service_name': 'entitlement-service',
                                             'service_state_name': 'ENT_STARTED'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': 'b6f9c977-a34d-4399-bd7b-c53a16aa56b2',
                                             'event_type': 'START_BILLING',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'standard-monthly-trial',
                                             'plan': 'standard-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Standard',
                                             'service_name': 'billing-service',
                                             'service_state_name': 'START_BILLING'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': 'a870def0-b47f-4513-a8fb-585df3b6b4b8',
                                             'event_type': 'CHANGE',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'super-monthly-trial',
                                             'plan': 'super-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Super',
                                             'service_name': 'entitlement+billing-service',
                                             'service_state_name': 'CHANGE'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': '96a74b51-7d51-4ec7-9386-63a07d007281',
                                             'event_type': 'STOP_ENTITLEMENT',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': True,
                                             'phase': 'super-monthly-trial',
                                             'plan': 'super-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Super',
                                             'service_name': 'entitlement-service',
                                             'service_state_name': 'ENT_CANCELLED'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': '068821fe-165c-4f67-95c1-3f14e872a27c',
                                             'event_type': 'STOP_BILLING',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'super-monthly-trial',
                                             'plan': 'super-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Super',
                                             'service_name': 'billing-service',
                                             'service_state_name': 'STOP_BILLING'}],
                                 'external_key': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
                                 'phase_type': 'TRIAL',
                                 'plan_name': 'super-monthly',
                                 'price_list': 'DEFAULT',
                                 'price_overrides': [{'fixed_price': 0.0,
                                                      'phase_name': 'standard-monthly-trial',
                                                      'phase_type': 'TRIAL',
                                                      'plan_name': 'standard-monthly',
                                                      'recurring_price': None,
                                                      'usage_price_overrides': []},
                                                     {'fixed_price': 0.0,
                                                      'phase_name': 'super-monthly-trial',
                                                      'phase_type': 'TRIAL',
                                                      'plan_name': 'super-monthly',
                                                      'recurring_price': None,
                                                      'usage_price_overrides': []}],
                                 'product_category': 'BASE',
                                 'product_name': 'Super',
                                 'source_type': 'NATIVE',
                                 'start_date': datetime.date(2018, 5, 4),
                                 'state': 'CANCELLED',
                                 'subscription_id': 'dfd4af5d-a72e-420e-9e0a-ce600d108b3f'}],
              'timeline': {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
                           'audit_logs': [],
                           'bundle_id': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
                           'events': [{'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': 'e2ba3b83-d04a-4128-8dea-b71d0c2a5630',
                                       'event_type': 'START_ENTITLEMENT',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'standard-monthly-trial',
                                       'plan': 'standard-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Standard',
                                       'service_name': 'entitlement-service',
                                       'service_state_name': 'ENT_STARTED'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': 'b6f9c977-a34d-4399-bd7b-c53a16aa56b2',
                                       'event_type': 'START_BILLING',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'standard-monthly-trial',
                                       'plan': 'standard-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Standard',
                                       'service_name': 'billing-service',
                                       'service_state_name': 'START_BILLING'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': 'a870def0-b47f-4513-a8fb-585df3b6b4b8',
                                       'event_type': 'CHANGE',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'super-monthly-trial',
                                       'plan': 'super-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Super',
                                       'service_name': 'entitlement+billing-service',
                                       'service_state_name': 'CHANGE'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': '96a74b51-7d51-4ec7-9386-63a07d007281',
                                       'event_type': 'STOP_ENTITLEMENT',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': True,
                                       'phase': 'super-monthly-trial',
                                       'plan': 'super-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Super',
                                       'service_name': 'entitlement-service',
                                       'service_state_name': 'ENT_CANCELLED'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': '068821fe-165c-4f67-95c1-3f14e872a27c',
                                       'event_type': 'STOP_BILLING',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'super-monthly-trial',
                                       'plan': 'super-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Super',
                                       'service_name': 'billing-service',
                                       'service_state_name': 'STOP_BILLING'}],
                           'external_key': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158'}},
             {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
              'audit_logs': [],
              'bundle_id': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a',
              'external_key': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a',
              'subscriptions': [{'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
                                 'audit_logs': [],
                                 'bill_cycle_day_local': 3,
                                 'billing_end_date': None,
                                 'billing_period': 'MONTHLY',
                                 'billing_start_date': datetime.date(2018, 5, 4),
                                 'bundle_id': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a',
                                 'cancelled_date': None,
                                 'charged_through_date': datetime.date(2018, 5, 4),
                                 'events': [{'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': '4d4bde32-7bb9-448d-8066-aa67dea56658',
                                             'event_type': 'START_ENTITLEMENT',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'standard-monthly-trial',
                                             'plan': 'standard-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Standard',
                                             'service_name': 'entitlement-service',
                                             'service_state_name': 'ENT_STARTED'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 5, 4),
                                             'event_id': '4d8f7354-f4f7-43c5-bfae-353b6b8c2a0c',
                                             'event_type': 'START_BILLING',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'standard-monthly-trial',
                                             'plan': 'standard-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Standard',
                                             'service_name': 'billing-service',
                                             'service_state_name': 'START_BILLING'},
                                            {'audit_logs': [],
                                             'billing_period': 'MONTHLY',
                                             'effective_date': datetime.date(2018, 6, 3),
                                             'event_id': '7d22b380-8796-420c-b0c2-3f7b71b7a171',
                                             'event_type': 'PHASE',
                                             'is_blocked_billing': False,
                                             'is_blocked_entitlement': False,
                                             'phase': 'standard-monthly-evergreen',
                                             'plan': 'standard-monthly',
                                             'price_list': 'DEFAULT',
                                             'product': 'Standard',
                                             'service_name': 'entitlement+billing-service',
                                             'service_state_name': 'PHASE'}],
                                 'external_key': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a',
                                 'phase_type': 'TRIAL',
                                 'plan_name': 'standard-monthly',
                                 'price_list': 'DEFAULT',
                                 'price_overrides': [{'fixed_price': 0.0,
                                                      'phase_name': 'standard-monthly-trial',
                                                      'phase_type': 'TRIAL',
                                                      'plan_name': 'standard-monthly',
                                                      'recurring_price': None,
                                                      'usage_price_overrides': []},
                                                     {'fixed_price': None,
                                                      'phase_name': 'standard-monthly-evergreen',
                                                      'phase_type': 'EVERGREEN',
                                                      'plan_name': 'standard-monthly',
                                                      'recurring_price': 100.0,
                                                      'usage_price_overrides': []}],
                                 'product_category': 'BASE',
                                 'product_name': 'Standard',
                                 'source_type': 'NATIVE',
                                 'start_date': datetime.date(2018, 5, 4),
                                 'state': 'ACTIVE',
                                 'subscription_id': '1a1f9e33-7720-4655-a74e-0ecf0a8f231e'}],
              'timeline': {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
                           'audit_logs': [],
                           'bundle_id': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a',
                           'events': [{'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': '4d4bde32-7bb9-448d-8066-aa67dea56658',
                                       'event_type': 'START_ENTITLEMENT',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'standard-monthly-trial',
                                       'plan': 'standard-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Standard',
                                       'service_name': 'entitlement-service',
                                       'service_state_name': 'ENT_STARTED'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 5, 4),
                                       'event_id': '4d8f7354-f4f7-43c5-bfae-353b6b8c2a0c',
                                       'event_type': 'START_BILLING',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'standard-monthly-trial',
                                       'plan': 'standard-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Standard',
                                       'service_name': 'billing-service',
                                       'service_state_name': 'START_BILLING'},
                                      {'audit_logs': [],
                                       'billing_period': 'MONTHLY',
                                       'effective_date': datetime.date(2018, 6, 3),
                                       'event_id': '7d22b380-8796-420c-b0c2-3f7b71b7a171',
                                       'event_type': 'PHASE',
                                       'is_blocked_billing': False,
                                       'is_blocked_entitlement': False,
                                       'phase': 'standard-monthly-evergreen',
                                       'plan': 'standard-monthly',
                                       'price_list': 'DEFAULT',
                                       'product': 'Standard',
                                       'service_name': 'entitlement+billing-service',
                                       'service_state_name': 'PHASE'}],
                           'external_key': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a'}}],
 'invoices': [{'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
               'amount': 0.0,
               'audit_logs': [],
               'balance': 0.0,
               'bundle_keys': 'c3fbb8a6-f297-41e5-8aa5-8098256b624a,b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
               'credit_adj': 0.0,
               'credits': [],
               'currency': 'USD',
               'invoice_date': datetime.date(2018, 5, 4),
               'invoice_id': '0c047109-6fba-4910-af8d-a200abbba5fb',
               'invoice_number': '798',
               'is_parent_invoice': False,
               'items': None,
               'parent_account_id': None,
               'parent_invoice_id': None,
               'refund_adj': 0.0,
               'status': 'COMMITTED',
               'target_date': datetime.date(2018, 5, 4)},
              {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
               'amount': 0.0,
               'audit_logs': [],
               'balance': 0.0,
               'bundle_keys': 'b769c9ec-0a13-4a8a-b686-c5bf1e56c158',
               'credit_adj': 0.0,
               'credits': [],
               'currency': 'USD',
               'invoice_date': datetime.date(2018, 5, 4),
               'invoice_id': 'fa2f6484-530c-4209-884e-d09af0766663',
               'invoice_number': '799',
               'is_parent_invoice': False,
               'items': None,
               'parent_account_id': None,
               'parent_invoice_id': None,
               'refund_adj': 0.0,
               'status': 'COMMITTED',
               'target_date': datetime.date(2018, 5, 4)},
              {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
               'amount': 50.0,
               'audit_logs': [],
               'balance': 0.0,
               'bundle_keys': '',
               'credit_adj': 0.0,
               'credits': [],
               'currency': 'USD',
               'invoice_date': datetime.date(2018, 5, 4),
               'invoice_id': 'f12c98c1-782b-4d1a-bfb0-2e1233cf8cd7',
               'invoice_number': '800',
               'is_parent_invoice': False,
               'items': None,
               'parent_account_id': None,
               'parent_invoice_id': None,
               'refund_adj': 0.0,
               'status': 'COMMITTED',
               'target_date': datetime.date(2018, 5, 4)}],
 'payments': [{'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
               'audit_logs': [],
               'auth_amount': 0.0,
               'captured_amount': 0.0,
               'credited_amount': 0.0,
               'currency': 'USD',
               'payment_attempts': None,
               'payment_external_key': 'e9733c81-5d64-4d61-add2-90cb141ddf9d',
               'payment_id': 'e9733c81-5d64-4d61-add2-90cb141ddf9d',
               'payment_method_id': '53b35b7b-e254-4c4b-b526-202c51a6e650',
               'payment_number': '309',
               'purchased_amount': 50.0,
               'refunded_amount': 0.0,
               'target_invoice_id': 'f12c98c1-782b-4d1a-bfb0-2e1233cf8cd7',
               'transactions': [{'amount': 50.0,
                                 'audit_logs': [],
                                 'currency': 'USD',
                                 'effective_date': datetime.datetime(2018, 5, 4, 19, 29, 5, tzinfo=tzutc()),
                                 'first_payment_reference_id': None,
                                 'gateway_error_code': None,
                                 'gateway_error_msg': None,
                                 'payment_external_key': 'e9733c81-5d64-4d61-add2-90cb141ddf9d',
                                 'payment_id': 'e9733c81-5d64-4d61-add2-90cb141ddf9d',
                                 'processed_amount': 50.0,
                                 'processed_currency': 'USD',
                                 'properties': None,
                                 'second_payment_reference_id': None,
                                 'status': 'SUCCESS',
                                 'transaction_external_key': '74a7f569-8f0f-48c9-a927-a56e5c96f95b',
                                 'transaction_id': '74a7f569-8f0f-48c9-a927-a56e5c96f95b',
                                 'transaction_type': 'PURCHASE'}]},
              {'account_id': '43488882-1777-460c-bc32-e375e67d09cf',
               'audit_logs': [],
               'auth_amount': 50.0,
               'captured_amount': 0.0,
               'credited_amount': 0.0,
               'currency': 'USD',
               'payment_attempts': None,
               'payment_external_key': 'f2c8e79f-49cc-4893-98a5-38da61564949',
               'payment_id': 'f2c8e79f-49cc-4893-98a5-38da61564949',
               'payment_method_id': '53b35b7b-e254-4c4b-b526-202c51a6e650',
               'payment_number': '310',
               'purchased_amount': 0.0,
               'refunded_amount': 0.0,
               'target_invoice_id': None,
               'transactions': [{'amount': 50.0,
                                 'audit_logs': [],
                                 'currency': 'USD',
                                 'effective_date': datetime.datetime(2018, 5, 4, 19, 29, 5, tzinfo=tzutc()),
                                 'first_payment_reference_id': None,
                                 'gateway_error_code': None,
                                 'gateway_error_msg': None,
                                 'payment_external_key': 'f2c8e79f-49cc-4893-98a5-38da61564949',
                                 'payment_id': 'f2c8e79f-49cc-4893-98a5-38da61564949',
                                 'processed_amount': 50.0,
                                 'processed_currency': 'USD',
                                 'properties': None,
                                 'second_payment_reference_id': None,
                                 'status': 'SUCCESS',
                                 'transaction_external_key': '0b50c1a2-99df-48df-bd6b-38e30261c233',
                                 'transaction_id': '0b50c1a2-99df-48df-bd6b-38e30261c233',
                                 'transaction_type': 'AUTHORIZE'}]}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |
| **parallel** | boolean | false | parallel |

**Returns**

Returns a list of account tag objects.

## Transfer a given child credit to the parent level

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{childAccountId}/transferCredit`

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
```python
accountApi = killbill.api.AccountApi()
child_account_id = '88a5987a-1e1c-47c5-ba95-34ef14db3d46'

accountApi.transfer_child_credit_to_parent(child_account_id,
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
```python
accountApi = killbill.api.AccountApi()

accountApi.get_accounts(api_key, api_secret)
```
> Example Response:

```ruby
[
   {
      "accountId":"e19c6ab3-1a21-42f2-8ea2-9859c082b093",
      "name":"John Doe",
      "externalKey":"1522172592-516014",
      "email":"John@example.com",
      "billCycleDayLocal":0,
      "currency":"USD",
      "parentAccountId":"01ab962b-3c66-4b17-b391-ffcc9fe51884",
      "isPaymentDelegatedToParent":true,
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
]
```
```python
[{'account_balance': None,
 'account_cba': None,
 'account_id': '224a9677-735b-4902-a4a4-bf77469a0846',
 'address1': None,
 'address2': None,
 'audit_logs': [],
 'bill_cycle_day_local': 0,
 'city': None,
 'company': None,
 'country': 'USA',
 'currency': 'USD',
 'email': None,
 'external_key': 'fxelpb',
 'first_name_length': None,
 'is_migrated': False,
 'is_notified_for_invoices': False,
 'is_payment_delegated_to_parent': False,
 'locale': None,
 'name': 'John-0',
 'notes': None,
 'parent_account_id': None,
 'payment_method_id': None,
 'phone': None,
 'postal_code': None,
 'reference_time': datetime.datetime(2018, 5, 4, 19, 40, 35, tzinfo=tzutc()),
 'state': 'CA',
 'time_zone': 'UTC'}, {'account_balance': None,
 'account_cba': None,
 'account_id': '465f0295-e27e-4341-9eb7-072465e32ee5',
 'address1': None,
 'address2': None,
 'audit_logs': [],
 'bill_cycle_day_local': 0,
 'city': None,
 'company': None,
 'country': 'USA',
 'currency': 'USD',
 'email': None,
 'external_key': 'cpkwdl',
 'first_name_length': None,
 'is_migrated': False,
 'is_notified_for_invoices': False,
 'is_payment_delegated_to_parent': False,
 'locale': None,
 'name': 'John-1',
 'notes': None,
 'parent_account_id': None,
 'payment_method_id': None,
 'phone': None,
 'postal_code': None,
 'reference_time': datetime.datetime(2018, 5, 4, 19, 40, 36, tzinfo=tzutc()),
 'state': 'CA',
 'time_zone': 'UTC'}]
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

`GET http://example.com/1.0/kb/accounts/search/{searchKey}`

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

```python
accountApi = killbill.api.AccountApi()
search_key = 'John-1'

accountApi.search_accounts(search_key, api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "accountId":"e19c6ab3-1a21-42f2-8ea2-9859c082b093",
      "name":"John Doe",
      "externalKey":"1522172592-516014",
      "email":"John@example.com",
      "billCycleDayLocal":0,
      "currency":"USD",
      "parentAccountId":"01ab962b-3c66-4b17-b391-ffcc9fe51884",
      "isPaymentDelegatedToParent":true,
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
]
```
```python
[{'account_balance': None,
 'account_cba': None,
 'account_id': 'c41bf53b-c6a8-48de-8012-b755e51d5d3e',
 'address1': None,
 'address2': None,
 'audit_logs': [],
 'bill_cycle_day_local': 0,
 'city': None,
 'company': None,
 'country': 'USA',
 'currency': 'USD',
 'email': None,
 'external_key': 'njisdn',
 'first_name_length': None,
 'is_migrated': False,
 'is_notified_for_invoices': False,
 'is_payment_delegated_to_parent': False,
 'locale': None,
 'name': 'John-1',
 'notes': None,
 'parent_account_id': None,
 'payment_method_id': None,
 'phone': None,
 'postal_code': None,
 'reference_time': datetime.datetime(2018, 5, 4, 19, 44, 24, tzinfo=tzutc()),
 'state': 'CA',
 'time_zone': 'UTC'}]
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