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

## Account

### Create an Account 

Create a new customer `Account`.

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts` 

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
    -d "{ \"name\": \"John Doe\", \"email\": \"john@example.com\", \"currency\": \"USD\"}" \
    "http://localhost:8080/1.0/kb/accounts" 
```
```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

Account body = new Account();
body.setName("John Doe");
body.setEmail("john@example.com");
body.setCurrency(Currency.USD);

Account result = accountApi.createAccount(body, requestOptions);
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
< Location: http://localhost:8080/1.0/kb/accounts/a8984103-b8e1-47cc-9914-4b1c4f9dbeab
< Content-Type: application/json
< Content-Length: 0
```
```java
class Account {
    org.killbill.billing.client.model.gen.Account@3f77a367
    accountId: e1342e5c-db2a-4439-b52c-8597fde4390f
    name: John Doe
    firstNameLength: null
    externalKey: e1342e5c-db2a-4439-b52c-8597fde4390f
    email: john@example.com
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: null
    isPaymentDelegatedToParent: false
    paymentMethodId: null
    referenceTime: 2012-08-25T00:02:47.000Z
    timeZone: UTC
    address1: null
    address2: null
    postalCode: null
    company: null
    city: null
    state: null
    country: null
    locale: null
    phone: null
    notes: null
    isMigrated: false
    accountBalance: null
    accountCBA: null
    auditLogs: []
}
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

### Retrieve an Account by its ID

Retrieves the details information for the `Account` using its `accountId`.


**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d" 
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");
Boolean accountWithBalance = false; // Will not include account balance
Boolean accountWithBalanceAndCBA = false; // Will not include account balance and CBA info

Account result = accountApi.getAccount(accountId, 
                                       accountWithBalance, 
                                       accountWithBalanceAndCBA, 
                                       AuditLevel.NONE, 
                                       requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "email": "john@example.com",
  "billCycleDayLocal": 0,
  "currency": "USD",
  "parentAccountId": null,
  "isPaymentDelegatedToParent": false,
  "paymentMethodId": null,
  "referenceTime": "2018-07-17T15:02:45.000Z",
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
  "accountBalance": null,
  "accountCBA": null,
  "auditLogs": []
}

```
```java
class Account {
    org.killbill.billing.client.model.gen.Account@4be0cf3a
    accountId: 864c1418-e768-4cd5-a0db-67537144b685
    name: John Doe
    firstNameLength: null
    externalKey: 864c1418-e768-4cd5-a0db-67537144b685
    email: john@example.com
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: null
    isPaymentDelegatedToParent: false
    paymentMethodId: null
    referenceTime: 2012-08-25T00:00:25.000Z
    timeZone: UTC
    address1: null
    address2: null
    postalCode: null
    company: null
    city: null
    state: null
    country: null
    locale: null
    phone: null
    notes: null
    isMigrated: false
    accountBalance: null
    accountCBA: null
    auditLogs: []
}
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

### Retrieve an Account by its external key

Retrieves the details information for the `Account` using its `externalKey`.


**HTTP Request** 

`GET http://example.com/1.0/kb/accounts`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts?externalKey=2ad52f53-85ae-408a-9879-32a7e59dd03d"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

String externalKey = "example_external_key";
Boolean accountWithBalance = false; // Will not include account balance
Boolean accountWithBalanceAndCBA = false; // Will not include account balance and CBA info

Account result = accountApi.getAccountByKey(externalKey, 
                                            accountWithBalance, 
                                            accountWithBalanceAndCBA, 
                                            AuditLevel.NONE, 
                                            requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "name": "John Doe",
  "firstNameLength": null,
  "externalKey": "example_external_key",
  "email": "john@example.com",
  "billCycleDayLocal": 0,
  "currency": "USD",
  "parentAccountId": null,
  "isPaymentDelegatedToParent": false,
  "paymentMethodId": null,
  "referenceTime": "2018-07-17T15:02:45.000Z",
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
  "accountBalance": null,
  "accountCBA": null,
  "auditLogs": []
}
```
```java
class Account {
    org.killbill.billing.client.model.gen.Account@4be0cf3a
    accountId: 864c1418-e768-4cd5-a0db-67537144b685
    name: John Doe
    firstNameLength: null
    externalKey: example_external_key
    email: john@example.com
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: null
    isPaymentDelegatedToParent: false
    paymentMethodId: null
    referenceTime: 2012-08-25T00:00:25.000Z
    timeZone: UTC
    address1: null
    address2: null
    postalCode: null
    company: null
    city: null
    state: null
    country: null
    locale: null
    phone: null
    notes: null
    isMigrated: false
    accountBalance: null
    accountCBA: null
    auditLogs: []
}
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

### Update an Account

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d "{ \"name\": \"Another Name\"}" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");

Account body = new Account();
body.setAccountId(accountId);
body.setName("Another Name");

Boolean treatNullAsReset = true; // Any null value will be set to null

accountApi.updateAccount(accountId, 
                         body, 
                         treatNullAsReset,
                         requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json

```
```java
no content
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
   "auditLogs":[]
}
```
```python
no content
```

Note that the following fields are not updatable, they can only be set once when creating the original `Account`:  `externalKey`, `currency`, timeZone`, `referenceTime`. In addition the `billCycleDayLocal` can be updated but only **once**, that is one can create an `Account` without specifying the `billCycleDayLocal` and later update its value; this, in particular allows the system to update its value to a good default, that is one that will avoid leading pro-rations, when creating the first subscription.



**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **treatNullAsReset** | boolean | false | If set to true, any null value will be set to `null`. If set to false, any null value will be ignored.|

**Returns**

A `204` http status without content.

### Close account

This endpoint can be used when no other state change will occur on this `Account` to bring it to a stable state. Depending on the value of the query parameters it will potentially cancel all active subscriptions, write-off unpaid invoices, ... This endpoint is not about account deletion - we provide no support to remove state through apis; such deletion operations if really needed would have to happen at the database level and are not encouraged  -- and can be tricky to get right.



**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/8785164f-b5d7-4da1-9495-33f5105e8d80"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");
Boolean cancelAllSubscriptions = true; // Will cancel all subscriptions
Boolean writeOffUnpaidInvoices = true; // Will write off unpaid invoices
Boolean itemAdjustUnpaidInvoices = false // Will not adjust unpaid invoices
Boolean removeFutureNotifications = true; // Will remove future notifications 

accountApi.closeAccount(accountId, 
                        cancelAllSubscriptions, 
                        writeOffUnpaidInvoices, 
                        itemAdjustUnpaidInvoices, 
                        removeFutureNotifications, 
                        requestOptions);
```

```ruby
cancel_subscriptions = false
writeoff_unpaid_invoices = false
item_adjust_unpaid_invoices = false

account.close(cancel_subscriptions, 
              writeoff_unpaid_invoices, 
              item_adjust_unpaid_invoices,
              user,
              reason,
              comment, 
              options)
```

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'

accountApi.close_account(account_id,
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

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **cancelAllSubscriptions** | boolean | false | Choose true if you want to cancel all subscriptions (default: false) |
| **writeOffUnpaidInvoices** | boolean | false | Choose true if you want to write off unpaid invoices (default: false) |
| **itemAdjustUnpaidInvoices** | boolean | false | Choose true if you want to adjust unpaid invoices (default: false) |
| **removeFutureNotifications** | boolean | false | Choose true if you want to remove future notifications (default: true) |

**Returns**

A `204` http status without content.


## Bundle

### Retrieve bundles for account

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/bundles`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/bundles" 
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("15434b45-54c1-4a44-851c-b1f2f7a52f03");
String externalKey = "123467";
String bundlesFilter = null;

List<Bundle> accountBundles = accountApi.getAccountBundles(accountId, 
                                                           externalKey, 
                                                           bundlesFilter,
                                                           AuditLevel.NONE,
                                                           requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "subscriptions": [
      {
        "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
        "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "subscriptionId": "8ab101b6-15e8-433b-b4f7-f99eeaa56a77",
        "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "startDate": "2018-07-18",
        "productName": "Standard",
        "productCategory": "BASE",
        "billingPeriod": "MONTHLY",
        "phaseType": "TRIAL",
        "priceList": "DEFAULT",
        "planName": "standard-monthly",
        "state": "ACTIVE",
        "sourceType": "NATIVE",
        "cancelledDate": null,
        "chargedThroughDate": null,
        "billingStartDate": "2018-07-18",
        "billingEndDate": null,
        "billCycleDayLocal": 17,
        "events": [
          {
            "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_STARTED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "START_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-08-17",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "PHASE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement+billing-service",
            "serviceStateName": "PHASE",
            "phase": "standard-monthly-evergreen",
            "auditLogs": []
          }
        ],
        "priceOverrides": null,
        "prices": [
          {
            "planName": "standard-monthly",
            "phaseName": "standard-monthly-trial",
            "phaseType": "TRIAL",
            "fixedPrice": 0,
            "recurringPrice": null,
            "usagePrices": []
          },
          {
            "planName": "standard-monthly",
            "phaseName": "standard-monthly-evergreen",
            "phaseType": "EVERGREEN",
            "fixedPrice": null,
            "recurringPrice": 100,
            "usagePrices": []
          }
        ],
        "auditLogs": []
      }
    ],
    "timeline": {
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "events": [
        {
          "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-08-17",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "PHASE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement+billing-service",
          "serviceStateName": "PHASE",
          "phase": "standard-monthly-evergreen",
          "auditLogs": []
        }
      ],
      "auditLogs": []
    },
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@53060d66
    accountId: 15434b45-54c1-4a44-851c-b1f2f7a52f03
    bundleId: e17a7805-42cf-4464-aea7-963cf0078651
    externalKey: 123467
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@e1d5debf
        accountId: 15434b45-54c1-4a44-851c-b1f2f7a52f03
        bundleId: e17a7805-42cf-4464-aea7-963cf0078651
        subscriptionId: 7b9de82a-319c-4334-b676-f1644591077e
        externalKey: 123467
        startDate: 2012-08-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-08-25
        billingStartDate: 2012-08-25
        billingEndDate: null
        billCycleDayLocal: 24
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@6ea5e183
            eventId: a6e0c854-16b7-4729-bc6c-cb019b3441ce
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@3635a9d5
            eventId: 2cb255be-0008-44b0-9161-47760a5e2828
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a561e242
            eventId: a34e0990-80bb-42e1-a593-0a0bc952ef2c
            billingPeriod: MONTHLY
            effectiveDate: 2012-09-24
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-trial
            phaseType: TRIAL
            fixedPrice: 0
            recurringPrice: null
            usagePriceOverrides: []
        }, class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-evergreen
            phaseType: EVERGREEN
            fixedPrice: null
            recurringPrice: 249.95
            usagePriceOverrides: []
        }]
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@e70542
        accountId: 15434b45-54c1-4a44-851c-b1f2f7a52f03
        bundleId: e17a7805-42cf-4464-aea7-963cf0078651
        externalKey: 123467
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@1852601c
            eventId: a6e0c854-16b7-4729-bc6c-cb019b3441ce
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@1d0ca762
            eventId: 2cb255be-0008-44b0-9161-47760a5e2828
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a8ba9854
            eventId: a34e0990-80bb-42e1-a593-0a0bc952ef2c
            billingPeriod: MONTHLY
            effectiveDate: 2012-09-24
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
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

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **externalKey** | string | false | bundle external key |
| **bundlesFilter** | string | false | bundles filter |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of account bundle objects.

## Invoice

### Retrieve account invoices

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/invoices`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/invoices"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("d3a82897-ae72-4a2e-9bca-e3c1fe087f84");
LocalDate startDate = null;
Boolean withItems = true; // Will fetch invoice items as well
Boolean withMigrationInvoices = false; // Will not fetch migrated invoice - if any
Boolean unpaidInvoicesOnly = false; // Will not restrict to unpaid invoices
Boolean includeVoidedInvoices = false; // Will not include void invoices

Invoices invoices = accountApi.getInvoicesForAccount(accountId,
                                                     startDate, 
                                                     withItems, 
                                                     withMigrationInvoices, 
                                                     unpaidInvoicesOnly, 
                                                     includeVoidedInvoices, 
                                                     AuditLevel.FULL, 
                                                     requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

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
      "accountId":"2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "items":[
         {
            "invoiceItemId":"5f3b4e9c-66bd-4c5c-b84a-4ae951cc2f1d",
            "invoiceId":"d981abbb-3622-487a-9564-d594c9d04f83",
            "accountId":"2ad52f53-85ae-408a-9879-32a7e59dd03d",
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
```java
//First element of the list
class Invoice {
    org.killbill.billing.client.model.gen.Invoice@df84aad8
    amount: 0.00
    currency: USD
    status: COMMITTED
    creditAdj: 0.00
    refundAdj: 0.00
    invoiceId: 66448454-4ff2-4a4c-9817-167c062fcde9
    invoiceDate: 2012-04-25
    targetDate: 2012-04-25
    invoiceNumber: 1
    balance: 0.00
    accountId: d3a82897-ae72-4a2e-9bca-e3c1fe087f84
    bundleKeys: null
    credits: null
    items: [class InvoiceItem {
        org.killbill.billing.client.model.gen.InvoiceItem@7e405309
        invoiceItemId: 898d4b59-9e85-48cc-b05e-33d2059b6250
        invoiceId: 66448454-4ff2-4a4c-9817-167c062fcde9
        linkedInvoiceItemId: null
        accountId: d3a82897-ae72-4a2e-9bca-e3c1fe087f84
        childAccountId: null
        bundleId: 823db38d-864f-4123-96e1-86218663e1bd
        subscriptionId: 8c0b5800-c892-4898-9295-837ecadad2f0
        productName: Shotgun
        planName: shotgun-monthly
        phaseName: shotgun-monthly-trial
        usageName: null
        prettyProductName: Shotgun
        prettyPlanName: Shotgun Monthly
        prettyPhaseName: shotgun-monthly-trial
        prettyUsageName: null
        itemType: FIXED
        description: shotgun-monthly-trial
        startDate: 2012-04-25
        endDate: null
        amount: 0.00
        rate: null
        currency: USD
        quantity: null
        itemDetails: null
        childItems: null
        auditLogs: [class AuditLog {
            changeType: INSERT
            changeDate: 2012-04-25T00:03:43.000Z
            objectType: INVOICE_ITEM
            objectId: 898d4b59-9e85-48cc-b05e-33d2059b6250
            changedBy: SubscriptionBaseTransition
            reasonCode: null
            comments: null
            userToken: fc3e7a8d-7e8c-4b9d-a6ac-557cd2e74ccd
            history: null
        }]
    }]
    isParentInvoice: false
    parentInvoiceId: null
    parentAccountId: null
    auditLogs: [class AuditLog {
        changeType: INSERT
        changeDate: 2012-04-25T00:03:43.000Z
        objectType: INVOICE
        objectId: 66448454-4ff2-4a4c-9817-167c062fcde9
        changedBy: SubscriptionBaseTransition
        reasonCode: null
        comments: null
        userToken: fc3e7a8d-7e8c-4b9d-a6ac-557cd2e74ccd
        history: null
    }]
}
```
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
| **startDate** | date | false |  Filter invoices using a start date. |
| **withItems** | boolean | true | Choose true if you want items info. |
| **withMigrationInvoices** | boolean | true | Choose true if you want migration invoices |
| **unpaidInvoicesOnly** | boolean | true | Choose true if you want unpaid invoices only |
| **includeVoidedInvoices** | boolean | true | Choose true if you want to include voided invoices |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Return a list with invoice objects.

## Payment 

### Trigger a payment for all unpaid invoices

This call allows to make a series of payment calls, one against each unpaid invoice using a specific payment method.

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/invoicePayments`

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
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/invoicePayments?paymentMethodId=f835c556-0694-4883-b4c1-d1b6e308409b"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e011caa5-ba35-4ac6-81cb-63b4f08122dc");
UUID paymentMethodId = null;
Boolean externalPayment = true; // Will use a external payment method
BigDecimal paymentAmount = null;
LocalDate targetDate = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

accountApi.payAllInvoices(accountId, 
                          paymentMethodId, 
                          externalPayment, 
                          paymentAmount, 
                          targetDate,
                          NULL_PLUGIN_PROPERTIES, 
                          requestOptions);
```

```ruby
invoice_payment                  = KillBillClient::Model::InvoicePayment.new
invoice_payment.account_id       = account.account_id
invoice_payment.purchased_amount = '50.0'

external_payment  = true
payment_method_id = nil
target_date       = nil

invoice_payment.bulk_create(external_payment,
                            payment_method_id,
                            target_date,
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
                            external_payment=True,
                            payment_method_id=None,
                            target_date=None)
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
| **paymentMethodId** | string | false | Payment method id. |
| **externalPayment** | boolean | true | Choose true if you use a external payment method. |
| **paymentAmount** | string | false | Total payment amount. |
| **targetDate** | string | false | Total payment amount. |

**Response**

A `204` http status without content.

### Retrieve account invoice payments

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/invoicePayments`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/invoicePayments"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e011caa5-ba35-4ac6-81cb-63b4f08122dc");
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

InvoicePayments result = accountApi.getInvoicePayments(accountId, 
                                                       NULL_PLUGIN_PROPERTIES, 
                                                       requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
   {
      "targetInvoiceId":"d1d6e8d8-c476-4b53-badf-c23f78c02c09",
      "accountId":"2ad52f53-85ae-408a-9879-32a7e59dd03d",
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
```java
//First element of the list
class InvoicePayment {
    org.killbill.billing.client.model.gen.InvoicePayment@40d72f3f
    targetInvoiceId: a84bb73f-bafc-48cc-880f-3b2fa7d80d58
    accountId: e011caa5-ba35-4ac6-81cb-63b4f08122dc
    paymentId: 66d4954d-f8f3-4611-903e-371a6e6d076c
    paymentNumber: 1
    paymentExternalKey: 66d4954d-f8f3-4611-903e-371a6e6d076c
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 249.95
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 9934bcc5-3ea5-4eb9-85fb-bef74225e1de
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@5ad9bcb6
        transactionId: 5a7b1d87-98a1-4cbb-8967-f53733d032be
        transactionExternalKey: 5a7b1d87-98a1-4cbb-8967-f53733d032be
        paymentId: 66d4954d-f8f3-4611-903e-371a6e6d076c
        paymentExternalKey: 66d4954d-f8f3-4611-903e-371a6e6d076c
        transactionType: PURCHASE
        amount: 249.95
        currency: USD
        effectiveDate: 2012-09-26T00:00:04.000Z
        processedAmount: 249.95
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
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

### Retrieve account payments

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/payments`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/payments"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e0fe95af-7d59-4b70-8252-165e1840410c");
Boolean withAttempts = false; // Will not reflect payment attempts
Boolean withPluginInfo = false; // Will not reflect payment attempts
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payments payments = accountApi.getPaymentsForAccount(accountId,
                                                     withAttempts,
                                                     withPluginInfo
                                                     NULL_PLUGIN_PROPERTIES, 
                                                     AuditLevel.NONE,
                                                     requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
   {
      "accountId":"2ad52f53-85ae-408a-9879-32a7e59dd03d",
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
      "auditLogs":[]
   }
]
```
```java
//First element of the list
class Payment {
    org.killbill.billing.client.model.gen.Payment@1445c8b6
    accountId: e0fe95af-7d59-4b70-8252-165e1840410c
    paymentId: aef920ce-6887-4a00-8d0a-52cd6120517a
    paymentNumber: 1
    paymentExternalKey: aef920ce-6887-4a00-8d0a-52cd6120517a
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 249.95
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 9782b80d-6a0d-4051-9d05-b3fcd81c19e7
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@40873e28
        transactionId: d04e8592-8638-4768-9ac0-87b62a3cd516
        transactionExternalKey: d04e8592-8638-4768-9ac0-87b62a3cd516
        paymentId: aef920ce-6887-4a00-8d0a-52cd6120517a
        paymentExternalKey: aef920ce-6887-4a00-8d0a-52cd6120517a
        transactionType: PURCHASE
        amount: 249.95
        currency: USD
        effectiveDate: 2012-09-26T00:00:04.000Z
        processedAmount: 249.95
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
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

### Trigger a payment (authorization, purchase or credit)

This api is part of the raw payment apis, unreleated to subscriptions and invoices. It simply allows
to make a trigger a payment transaction against a particular payment gateway through Kill Bill core and the plugin
communicating with the payment gateway.


**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/payments`

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
    -d "{ \"transactionType\": \"AUTHORIZE\", \"amount\": 0}" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/payments?paymentMethodId=c02fa9b0-ae95-42ae-9010-bc11cb160947"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("f4087a76-9f8a-4893-abbf-c5bb69975d1b");

PaymentTransaction authTransaction = new PaymentTransaction();
authTransaction.setAmount(BigDecimal.ONE);
authTransaction.setCurrency(account.getCurrency());

// TransactionType could be 'AUTHORIZE', 'PURCHASE' or 'CREDIT'
authTransaction.setTransactionType(TransactionType.AUTHORIZE);

UUID paymentMethodId = UUID.fromString("1d55ed5f-deea-4109-98b0-beb13a242f7c");
ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payment payment = accountApi.processPayment(accountId, 
                                            authTransaction, 
                                            paymentMethodId, 
                                            NULL_PLUGIN_NAMES,
                                            NULL_PLUGIN_PROPERTIES, 
                                            requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/payments/7c01a554-7b39-42dc-959f-3111724733d0
< Content-Type: application/json
< Content-Length: 0
```
```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@6816b5c8
    accountId: f4087a76-9f8a-4893-abbf-c5bb69975d1b
    paymentId: 0ecd1fdc-6c3e-4e06-b36f-9833f24ca607
    paymentNumber: 1
    paymentExternalKey: 0ecd1fdc-6c3e-4e06-b36f-9833f24ca607
    authAmount: 1.00
    capturedAmount: 0
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 1d55ed5f-deea-4109-98b0-beb13a242f7c
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@29ef3d69
        transactionId: 3d40bc43-72ef-4aa6-8b3c-c8f1225a0971
        transactionExternalKey: 3d40bc43-72ef-4aa6-8b3c-c8f1225a0971
        paymentId: 0ecd1fdc-6c3e-4e06-b36f-9833f24ca607
        paymentExternalKey: 0ecd1fdc-6c3e-4e06-b36f-9833f24ca607
        transactionType: AUTHORIZE
        amount: 1.00
        currency: USD
        effectiveDate: 2018-09-04T03:05:35.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
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

### Trigger a payment using the account external key (authorization, purchase or credit)

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/payments`

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
    -d "{ \"transactionType\": \"AUTHORIZE\", \"amount\": 0}" \
    "http://localhost:8080/1.0/kb/accounts/payments?externalKey=2ad52f53-85ae-408a-9879-32a7e59dd03d&paymentMethodId=c02fa9b0-ae95-42ae-9010-bc11cb160947"
```

```java
TODO
```

```ruby
transaction = KillBillClient::Model::Transaction.new
transaction.amount = '50.0'

payment_method_id = '132d59c0-8c28-4115-947d-f57d430bc458'
refresh_options = nil

# Authorization
transaction.auth_by_external_key(account.external_key,
                                 payment_method_id, 
                                 user, 
                                 reason, 
                                 comment, 
                                 options, 
                                 refresh_options)

# Purchase
transaction.purchase_by_external_key(account.external_key,
                                     payment_method_id, 
                                     user, 
                                     reason, 
                                     comment, 
                                     options, 
                                     refresh_options)

# Credit
transaction.credit_by_external_key(account.external_key,
                                   payment_method_id, 
                                   user, 
                                   reason, 
                                   comment, 
                                   options, 
                                   refresh_options)
```

```python
accountApi = killbill.api.AccountApi()
account_external_key = 'sample_external_key'
payment_method_id = '80c7b386-97b2-424c-bb4e-0017f92bc6eb'

# transaction_type could be 'AUTHORIZE', 'PURCHASE' or 'CREDIT'
body = PaymentTransaction(amount=50, transaction_type='AUTHORIZE')

accountApi.process_payment_by_external_key(body,
                                           external_key,
                                           created_by,
                                           api_key,
                                           api_secret)
                                           payment_method_id=payment_method_id)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/payments/b4c5b34f-cd3e-4269-9f71-55daf8edde60
< Content-Type: application/json
< Content-Length: 0
```
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

## Payment Method

### Add a payment method


Add a [Payment method](http://docs.killbill.io/0.20/userguide_subscription.html#_payment_methods) for a gives `Account`.

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/paymentMethods`

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
    -d "{ \"accountId\": \"2ad52f53-85ae-408a-9879-32a7e59dd03d\", \"isDefault\": false, \"pluginName\": \"__EXTERNAL_PAYMENT__\"}" \
    "http://localhost:8080/1.0/kb/accounts/8785164f-b5d7-4da1-9495-33f5105e8d80/paymentMethods"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("d751dd57-7644-469a-9e69-f98d36d86f67");

UUID paymentMethodId = null;
String externalKey = UUID.randomUUID().toString();
Boolean isDefault = true; // Will set this new payment method as default
String pluginName = "__EXTERNAL_PAYMENT__"; 
PaymentMethodPluginDetail info = new PaymentMethodPluginDetail();
ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

PaymentMethod paymentMethod = new PaymentMethod(paymentMethodId, 
                                                externalKey, 
                                                accountId, 
                                                isDefault, 
                                                pluginName, 
                                                info, 
                                                EMPTY_AUDIT_LOGS);
ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

PaymentMethod paymentMethodPP = accountApi.createPaymentMethod(accountId, 
                                                               paymentMethod, 
                                                               NULL_PLUGIN_NAMES, 
                                                               NULL_PLUGIN_PROPERTIES, 
                                                               requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/paymentMethods/064cd61b-557d-48ba-8605-8d22912c7dfb
< Content-Type: application/json
< Content-Length: 0
```
```java
class PaymentMethod {
    org.killbill.billing.client.model.gen.PaymentMethod@a820eeea
    paymentMethodId: 538c5a98-879b-4735-88df-e58f7a4bf874
    externalKey: a85a3fbe-30e8-457d-8a5a-55e16bcd730b
    accountId: d751dd57-7644-469a-9e69-f98d36d86f67
    isDefault: false
    pluginName: __EXTERNAL_PAYMENT__
    pluginInfo: null
    auditLogs: []
}
```
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

### Retrieve account payment methods

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/paymentMethods`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/paymentMethods"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("faf239a5-456a-4eb9-aef9-8d2254ef57dc");
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

List<PaymentMethod> paymentMethods = accountApi.getPaymentMethodsForAccount(accountId, 
                                                                            NULL_PLUGIN_PROPERTIES, 
                                                                            requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "paymentMethodId": "f835c556-0694-4883-b4c1-d1b6e308409b",
    "externalKey": "unknown",
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "isDefault": false,
    "pluginName": "__EXTERNAL_PAYMENT__",
    "pluginInfo": null,
    "auditLogs": []
  }
]
```
```java
//First element of the list
class PaymentMethod {
    org.killbill.billing.client.model.gen.PaymentMethod@5528b1ed
    paymentMethodId: 1a4e5b9a-5280-4624-b2fc-2ea6d047d7fa
    externalKey: eed36074-d493-4335-839e-2adca4cb4187
    accountId: faf239a5-456a-4eb9-aef9-8d2254ef57dc
    isDefault: true
    pluginName: __EXTERNAL_PAYMENT__
    pluginInfo: null
    auditLogs: []
}
```
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

### Set the default payment method

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/paymentMethods/{paymentMethodId}/setDefault`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/paymentMethods/f835c556-0694-4883-b4c1-d1b6e308409b/setDefault"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("faf239a5-456a-4eb9-aef9-8d2254ef57dc");
UUID paymentMethodId = UUID.fromString("faf239a5-456a-4eb9-aef9-8d2254ef57dc");
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

accountApi.setDefaultPaymentMethod(accountId, 
                                   paymentMethodId, 
                                   NULL_PLUGIN_PROPERTIES, 
                                   requestOptions);
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
| **payAllUnpaidInvoices** | boolean | true | Choose true if you want to pay all unpaid invoices. |

**Response**

A `204` http status without content.

### Refresh account payment methods

This endpoint is for a rare use cases where information for a particular payment method is stored inside the third party gateway, and both Kill Bill core and its payment plugin need to have their view updated.

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/paymentMethods/refresh`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/paymentMethods/refresh"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("faf239a5-456a-4eb9-aef9-8d2254ef57dc");
String pluginName = "__EXTERNAL_PAYMENT__";
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

accountApi.refreshPaymentMethods(accountId, 
                                 pluginName, 
                                 NULL_PLUGIN_PROPERTIES, 
                                 requestOptions);
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

A `204` http status without content.


## Overdue

### Retrieve overdue state for account

The system can be configured to move `Account` through various [overdue](http://docs.killbill.io/0.20/userguide_subscription.html#components-overdue) , a.k.a. dunning state, when invoices are left unpaid. This allows to retrieve the current state for an `Account`.


**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/overdue`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/overdue"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("d3a82897-ae72-4a2e-9bca-e3c1fe087f84");

OverdueState result = accountApi.getOverdueAccount(accountId, requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "name": "__KILLBILL__CLEAR__OVERDUE_STATE__",
  "externalMessage": "",
  "daysBetweenPaymentRetries": [
    8,
    8,
    8
  ],
  "isDisableEntitlementAndChangesBlocked": false,
  "isBlockChanges": false,
  "isClearState": true,
  "reevaluationIntervalDays": null
}
```
```java
class OverdueState {
    name: OD3
    externalMessage: Reached OD3
    daysBetweenPaymentRetries: [8, 8, 8]
    isDisableEntitlementAndChangesBlocked: true
    isBlockChanges: true
    isClearState: false
    reevaluationIntervalDays: 5
}
```
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


## Blocking State

### Block an account

As part of the entitlement features, Kill Bill provides an abstraction to include `BlockingState` events into the per `Account` event stream. The main idea is to allow to modify billing -- e.g pause a specific subscription, all subscriptions, ... -- or the entitlement state -- disable service associated with a given subscription. The [entitlement internal documentation](http://docs.killbill.io/latest/entitlement_subsystem.html) provides some overview of the mechanism. Blocking states are mostly manipulated from inside Kill Bill core, but the functionality is exposed through the API, with the caveat that it is an advanced feature and can lead to unintented behavior if not used properly.



**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/block`

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
    -d "{ \"stateName\": \"STATE1\", \"service\": \"ServiceStateService\", \"isBlockChange\": false, \"isBlockEntitlement\": false, \"isBlockBilling\": false, \"effectiveDate\": \"2018-07-17T21:17:28.842Z\", \"type\": \"ACCOUNT\" }" \
    "http://localhost:8080/1.0/kb/accounts/10483c3a-3394-4667-8519-0d849e9a8ec2/block"
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/accounts/10483c3a-3394-4667-8519-0d849e9a8ec2/block?blockingStateTypes=ACCOUNT
< Content-Length: 0
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

### Retrieve blocking states for account

Retrieves the `BlockingState` assocaited to a given resource.
`BlockingState` can be set at the `Account`, `Bundle` or `Subscription`.

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/block`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/10483c3a-3394-4667-8519-0d849e9a8ec2/block?blockingStateTypes=ACCOUNT"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("ee6835f0-8347-42d3-958c-9a939383ba28");

List<BlockingStateType> blockingStateTypes = ImmutableList.<BlockingStateType>of(BlockingStateType.SUBSCRIPTION_BUNDLE);
List<String> blockingStateSvcs = ImmutableList.<String>of("service");

BlockingStates blockingStates = accountApi.getBlockingStates(accountId, 
                                                             blockingStateTypes, 
                                                             blockingStateSvcs, 
                                                             AuditLevel.FULL, 
                                                             requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "blockedId": "10483c3a-3394-4667-8519-0d849e9a8ec2",
    "stateName": "STATE1",
    "service": "ServiceStateService",
    "isBlockChange": false,
    "isBlockEntitlement": false,
    "isBlockBilling": false,
    "effectiveDate": "2018-07-18T14:45:37.000Z",
    "type": "ACCOUNT",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class BlockingState {
    org.killbill.billing.client.model.gen.BlockingState@95047f38
    blockedId: e3d9aa57-1c1e-4206-a44a-d87e69d5bf2a
    stateName: block
    service: service
    isBlockChange: false
    isBlockEntitlement: true
    isBlockBilling: true
    effectiveDate: 2012-04-25T00:03:42.000Z
    type: SUBSCRIPTION_BUNDLE
    auditLogs: [class AuditLog {
        changeType: INSERT
        changeDate: 2012-04-25T00:03:45.000Z
        objectType: BLOCKING_STATES
        objectId: 8fc09849-bd98-417f-a0ab-943f9ce8e15d
        changedBy: Toto
        reasonCode: i am god
        comments: no comment
        userToken: 46d56616-1545-424a-882b-b158442534ff
        history: null
    }]
}
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

## Email

### Add account email

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/emails`

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
    -d "{ \"accountId\": \"2ad52f53-85ae-408a-9879-32a7e59dd03d\", \"email\": \"email@example.com\"}" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/emails"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("873c26ef-a3fa-4942-b2f5-549b51f20b1a");
String email = "email@example.com";

AccountEmail accountEmail = new AccountEmail(accountId, 
                                             email, 
                                             AuditLevel.NONE);

accountApi.addEmail(accountId, 
                    accountEmail, 
                    requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/emails
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

**Response**

A `201` http status without content.

### Retrieve an account emails

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/emails`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/emails"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("cd026587-c93b-471c-a98d-224c21636fbc");

List<AccountEmail> emails = accountApi.getEmails(accountId, requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
   {
      "accountId":"e4ca38b3-934d-42e8-a292-ffb0af5549f2",
      "email":"email@example.com"
   }
]
```
```java
//First element of the list
class AccountEmail {
    org.killbill.billing.client.model.gen.AccountEmail@bdc0f8ad
    accountId: cd026587-c93b-471c-a98d-224c21636fbc
    email: email@example.com
    auditLogs: []
}
```
```ruby
[
   {
      "accountId":"2ad52f53-85ae-408a-9879-32a7e59dd03d",
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

### Delete email from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/emails/{email}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/emails/email%40example.com"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("873c26ef-a3fa-4942-b2f5-549b51f20b1a");
String email = "email@example.com";

accountApi.removeEmail(accountId, 
                       email, 
                       requestOptions);
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

A `204` http status without content.

## HA

### List children accounts

When using the [hierarchical account](http://docs.killbill.io/latest/ha.html) feature, this api allows to retrieve
all children `Account` for a given parent `Account`.

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/children`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/children"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID parentAccountId = UUID.fromString("ee6835f0-8347-42d3-958c-9a939383ba28");
Boolean accountWithBalance = true; // Will include account balance
Boolean accountWithBalanceAndCBA = true; // Will include account balance and CBA info

Accounts childrenAccounts = accountApi.getChildrenAccounts(parentAccountId, 
                                                           accountWithBalance, 
                                                           accountWithBalanceAndCBA, 
                                                           AuditLevel.NONE, 
                                                           requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

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
      "auditLogs":[]
   }
]
```
```java
//First element of the list
class Account {
    org.killbill.billing.client.model.gen.Account@cfbf4058
    accountId: b58e1b76-461c-4681-9ecf-3a3e5e95fc27
    name: 01f814b3-b4c2-41e9-9d6c-4a010916424c
    firstNameLength: 4
    externalKey: 3bf9144f-11a3-4a0b-9923-03a1c667ba93
    email: 8c0f9@f059d
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: e72357f9-76ff-4533-b846-b61f39973b70
    isPaymentDelegatedToParent: true
    paymentMethodId: null
    referenceTime: 2012-08-25T00:00:02.000Z
    timeZone: UTC
    address1: 12 rue des ecoles
    address2: Poitier
    postalCode: 44 567
    company: Renault
    city: Quelque part
    state: Poitou
    country: France
    locale: fr
    phone: 81 53 26 56
    notes: notes
    isMigrated: false
    accountBalance: 0
    accountCBA: 0E-9
    auditLogs: []
}
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

Returns a list of children account objects.

### Transfer a given child credit to the parent level

In the context of the Hierarchical Account feature, this allows to move the potential child credit at the parent level.


**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{childAccountId}/transferCredit`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/transferCredit"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID childAccountId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");

accountApi.transferChildCreditToParent(childAccountId, requestOptions);
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

A `204` http status without content.

## Custom Fields

### Add custom fields to account

Allow to add custom fields for a given `Account`.

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/customFields`

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
    -d "[ { \"objectType\": \"ACCOUNT\", \"name\": \"Test Custom Field\", \"value\": \"demo_test_value\" }]" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/customFields"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("15434b45-54c1-4a44-851c-b1f2f7a52f03");
final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 accountId,
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

accountApi.createAccountCustomFields(accountId, 
                                     customFields, 
                                     requestOptions);
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

accountApi.create_account_custom_fields(account_id,
                                        [body],
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/customFields
< Content-Type: application/json
< Content-Length: 0
```
```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: 59860a0d-c032-456d-a35e-3a48fe8579e5
    objectType: ACCOUNT
    name: Test Custom Field
    value: test_value
    auditLogs: []
}
```
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

Note that none of these fields are mantatory when creating the `Account`. This allows to create shell accounts, simply for the purpose of having a valid `accountId` and create state around it -- e.g payments, .. 

**Query Parameters**

None.

**Returns**

Returns a custom field object.

### Retrieve all custom fields

Retrieves the custom fields attached to various resources owned by the `Account`.
Assuming there were custom fields attached to various subscriptions, invoices, payments, ... for this specific account, this endpoint would allow to retrieve them all or potentially filter them by type -- e.g `Subscription`.

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/allCustomFields`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/allCustomFields"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("b38de59f-7dd0-447a-a508-9b022b808250");

CustomFields allAccountCustomFields = accountApi.getAllCustomFields(accountId, 
                                                                    ObjectType.ACCOUNT, 
                                                                    AuditLevel.FULL, 
                                                                    requestOptions);
```

```python
accountApi = killbill.api.AccountApi()
account_id = '07c0cef4-41c5-4606-b2cd-661332cdd41c'

accountApi.get_all_custom_fields(account_id, 
                                 api_key, 
                                 api_secret, 
                                 object_type='ACCOUNT')
```

```ruby
object_type = 'ACCOUNT'
audit = 'NONE'

account.all_custom_fields(object_type,
                          audit, 
                          options)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "customFieldId": "48e24ca0-1cfe-41c3-85e7-0ff0d51679fe",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "objectType": "ACCOUNT",
    "name": "Test Custom Field",
    "value": "test_value",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@238cc919
    customFieldId: dba8ec60-ee02-4231-9fa0-6613773b4e9e
    objectId: b38de59f-7dd0-447a-a508-9b022b808250
    objectType: ACCOUNT
    name: 385af
    value: 8296f
    auditLogs: [class AuditLog {
        changeType: INSERT
        changeDate: 2012-08-25T00:00:01.000Z
        objectType: CUSTOM_FIELD
        objectId: dba8ec60-ee02-4231-9fa0-6613773b4e9e
        changedBy: Toto
        reasonCode: i am god
        comments: no comment
        userToken: 10e278f1-61b8-4885-b1f6-d6f4db19c998
        history: null
    }]
}
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
| **audit** | enum | false | level of audit logs returned |

**Returns**
    
Returns a list of custom fields objects

### Retrieve account custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/customFields`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/customFields"	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");

List<CustomField> accountCustomFields = accountApi.getAccountCustomFields(accountId,
                                                                          AuditLevel.NONE, 
                                                                          requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "customFieldId": "48e24ca0-1cfe-41c3-85e7-0ff0d51679fe",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "objectType": "ACCOUNT",
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
    objectId: 59860a0d-c032-456d-a35e-3a48fe8579e5
    objectType: ACCOUNT
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

### Modify custom fields to account

**HTTP Request** 

`PUT http://example.com/1.0/kb/accounts/{accountId}/customFields`


> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d "[ { \"customFieldId\": \"48e24ca0-1cfe-41c3-85e7-0ff0d51679fe\", \"objectId\": \"2ad52f53-85ae-408a-9879-32a7e59dd03d\", \"objectType\": \"ACCOUNT\", \"name\": \"Test Custom Field\", \"value\": \"test_modify_value\", \"auditLogs\": [] }]" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/customFields"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

accountApi.modifyAccountCustomFields(accountId, 
                                     customFieldModified, 
                                     requestOptions);
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

A `204` http status without content.

### Remove custom fields from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/customField`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/customFields"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

accountApi.deleteAccountCustomFields(accountId, 
                                     customFieldsId, 
                                     requestOptions);
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
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Response**

A `204` http status without content.


## Tags

### Add tags to account

**HTTP Request** 

`POST http://example.com/1.0/kb/accounts/{accountId}/tags`

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
    -d "[ \"00000000-0000-0000-0000-000000000002\"]" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/tags"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("f4087a76-9f8a-4893-abbf-c5bb69975d1b");

UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

Tags result = accountApi.createAccountTags(accountId, 
                                           ImmutableList.<UUID>of(autoPayOffId), 
                                           requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/tags
< Content-Type: application/json
< Content-Length: 0
```
```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: ACCOUNT
    objectId: 917992d3-5f1f-4828-9fff-799cc4211aa9
    tagDefinitionId: 00000000-0000-0000-0000-000000000001
    tagDefinitionName: AUTO_PAY_OFF
    auditLogs: []
}
```
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


### Retrieve all account tags


Retrieves the tags attached to various resources owned by the `Account`.
Assuming there were tagged subscriptions, invoices, payments, ... for this specific account, this endpoint would allow to retrieve them all or potentially filter them by type -- e.g `Subscription`.


**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/allTags`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/allTags"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("ee6835f0-8347-42d3-958c-9a939383ba28");

Tags allAccountTags = accountApi.getAllTags(accountId,
                                            ObjectType.ACCOUNT,
                                            AuditLevel.NONE,
                                            requestOptions);
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
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "tagId": "0f7c5837-1ed9-41ab-b391-9ef7ea4ab049",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "tagDefinitionId": "00000000-0000-0000-0000-000000000002",
    "tagDefinitionName": "AUTO_INVOICING_OFF",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@45e9c8ec
    tagId: 659b37ed-59d7-4b46-b4e4-37d11cdc0bce
    objectType: ACCOUNT
    objectId: ee6835f0-8347-42d3-958c-9a939383ba28
    tagDefinitionId: 00000000-0000-0000-0000-000000000001
    tagDefinitionName: AUTO_PAY_OFF
    auditLogs: []
}
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

### Retrieve account tags

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/tags`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/tags"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");
Boolean includedDeleted = false; // Will not include deleted tags

List<Tag> tags1 = accountApi.getAccountTags(accountId, 
                                            includedDeleted, 
                                            AuditLevel.FULL, 
                                            requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "tagId": "0f7c5837-1ed9-41ab-b391-9ef7ea4ab049",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "tagDefinitionId": "00000000-0000-0000-0000-000000000002",
    "tagDefinitionName": "AUTO_INVOICING_OFF",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@cae768d7
    tagId: d724f79d-fad1-4758-b35e-d62708450d90
    objectType: ACCOUNT
    objectId: e659f0f3-745c-46d5-953c-28fe9282fc7d
    tagDefinitionId: 00000000-0000-0000-0000-000000000001
    tagDefinitionName: AUTO_PAY_OFF
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

### Remove tags from account

**HTTP Request** 

`DELETE http://example.com/1.0/kb/accounts/{accountId}/tags`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/tags"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");
UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

accountApi.deleteAccountTags(accountId, 
                             ImmutableList.<UUID>of(autoPayOffId), 
                             requestOptions);
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
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true |  list with tag definition id's that you want to remove it |

**Response**

A `204` http status without content.

## Audit Logs

### Retrieve audit logs by account id

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/auditLogs`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/auditLogs"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("e9432491-6558-4007-85ef-cdae171d240c");

AuditLogs auditLogsJson = accountApi.getAccountAuditLogs(accountId, 
                                                         requestOptions);
```

```python
accountApi = killbill.api.AccountApi()
account_id = '4e4d8acd-c97d-447a-814b-28f995a9106c'

accountApi.get_account_audit_logs(account_id, api_key, api_secret)
```

```ruby
account.audit(options)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-17T15:02:45.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "bca75b40-ffa3-41f8-9fde-06f83ee303e8",
    "history": null
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-17T18:46:47.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "9a61a1e6-78f3-43d3-addf-e7ada180b23d",
    "history": null
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-17T18:48:37.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "0c41a04d-4037-4fa9-af71-dfe54af4d3ae",
    "history": null
  },
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-17T19:07:25.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "48e24ca0-1cfe-41c3-85e7-0ff0d51679fe",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "c9b9ab11-14b1-41b5-8371-1c425f273336",
    "history": null
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-17T19:26:46.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "48e24ca0-1cfe-41c3-85e7-0ff0d51679fe",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "fd26b216-deb2-43d4-b748-dec8e9917ada",
    "history": null
  },
  {
    "changeType": "DELETE",
    "changeDate": "2018-07-17T20:02:01.000Z",
    "objectType": "CUSTOM_FIELD",
    "objectId": "48e24ca0-1cfe-41c3-85e7-0ff0d51679fe",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "0d5c8db7-974f-47e0-9332-5d9625f72155",
    "history": null
  }
]
```
```java
//First element of the list
class AuditLog {
    changeType: INSERT
    changeDate: 2012-08-25T00:00:01.000Z
    objectType: ACCOUNT
    objectId: e9432491-6558-4007-85ef-cdae171d240c
    changedBy: Toto
    reasonCode: i am god
    comments: no comment
    userToken: 6cd7a8ec-0678-436f-a2cb-a58f9ee3668b
    history: null
}
```
```ruby
[
   {
      "changeType":"INSERT",
      "changeDate":"2013-08-01T06:00:00.000Z",
      "objectType":"ACCOUNT",
      "objectId":"ccaf0822-a58b-4f1d-82d2-907439b68054",
      "changedBy":"test_account_tags",
      "userToken":"17d7807c-5c44-4e57-adc5-d0323c779b1f"
   }
]
```
```python
[{'change_date': datetime.datetime(2018, 5, 23, 14, 30, 5, tzinfo=tzutc()),
 'change_type': 'INSERT',
 'changed_by': 'test',
 'comments': None,
 'object_id': '4e4d8acd-c97d-447a-814b-28f995a9106c',
 'object_type': 'ACCOUNT',
 'reason_code': None,
 'user_token': '89ef6e86-4869-4974-abb9-0d870e8578b2'}]
```

**Query Parameters**

None.

**Returns**
    
Returns a list of account audit logs.

### Retrieve account audit logs with history by account id

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/auditLogsWithHistory`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/auditLogsWithHistory"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("ecbff3be-3cbf-4e1d-ae05-d323d4597877");

List<AuditLog> auditLogWithHistories = accountApi.getAccountAuditLogsWithHistory(accountId, 
                                                                                 requestOptions);
```

```python
accountApi = killbill.api.AccountApi()
account_id = 'c62d5f6d-0b57-444d-bf9b-dd23e781fbda'

accountApi.get_account_audit_logs_with_history(account_id, api_key, api_secret)
```

```ruby
account.audit_logs_with_history(options)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-17T15:02:45.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "bca75b40-ffa3-41f8-9fde-06f83ee303e8",
    "history": {
      "id": null,
      "createdDate": "2018-07-17T15:02:45.000Z",
      "updatedDate": "2018-07-17T15:02:45.000Z",
      "recordId": 120,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "email": "john@example.com",
      "name": "John Doe",
      "firstNameLength": null,
      "currency": "USD",
      "parentAccountId": null,
      "isPaymentDelegatedToParent": null,
      "billingCycleDayLocal": 0,
      "paymentMethodId": null,
      "referenceTime": "2018-07-17T15:02:45.000Z",
      "timeZone": "UTC",
      "locale": null,
      "address1": null,
      "address2": null,
      "companyName": null,
      "city": null,
      "stateOrProvince": null,
      "country": null,
      "postalCode": null,
      "phone": null,
      "notes": null,
      "migrated": null,
      "tableName": "ACCOUNT",
      "historyTableName": "ACCOUNT_HISTORY"
    }
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-17T18:46:47.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "9a61a1e6-78f3-43d3-addf-e7ada180b23d",
    "history": {
      "id": null,
      "createdDate": "2018-07-17T18:46:47.000Z",
      "updatedDate": "2018-07-17T18:46:47.000Z",
      "recordId": 120,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "email": "john@example.com",
      "name": "Another Name",
      "firstNameLength": null,
      "currency": "USD",
      "parentAccountId": null,
      "isPaymentDelegatedToParent": false,
      "billingCycleDayLocal": 0,
      "paymentMethodId": null,
      "referenceTime": "2018-07-17T15:02:45.000Z",
      "timeZone": "UTC",
      "locale": null,
      "address1": null,
      "address2": null,
      "companyName": null,
      "city": null,
      "stateOrProvince": null,
      "country": null,
      "postalCode": null,
      "phone": null,
      "notes": null,
      "migrated": null,
      "tableName": "ACCOUNT",
      "historyTableName": "ACCOUNT_HISTORY"
    }
  },
  {
    "changeType": "UPDATE",
    "changeDate": "2018-07-17T18:48:37.000Z",
    "objectType": "ACCOUNT",
    "objectId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "0c41a04d-4037-4fa9-af71-dfe54af4d3ae",
    "history": {
      "id": null,
      "createdDate": "2018-07-17T18:48:37.000Z",
      "updatedDate": "2018-07-17T18:48:37.000Z",
      "recordId": 120,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "email": "john@example.com",
      "name": "John Doe",
      "firstNameLength": null,
      "currency": "USD",
      "parentAccountId": null,
      "isPaymentDelegatedToParent": false,
      "billingCycleDayLocal": 0,
      "paymentMethodId": null,
      "referenceTime": "2018-07-17T15:02:45.000Z",
      "timeZone": "UTC",
      "locale": null,
      "address1": null,
      "address2": null,
      "companyName": null,
      "city": null,
      "stateOrProvince": null,
      "country": null,
      "postalCode": null,
      "phone": null,
      "notes": null,
      "migrated": null,
      "tableName": "ACCOUNT",
      "historyTableName": "ACCOUNT_HISTORY"
    }
  }
]
```
```java
//First element of the list
class AuditLog {
    changeType: INSERT
    changeDate: 2012-08-25T00:00:01.000Z
    objectType: ACCOUNT
    objectId: ecbff3be-3cbf-4e1d-ae05-d323d4597877
    changedBy: Toto
    reasonCode: i am god
    comments: no comment
    userToken: d698ba59-cacd-4739-9e40-68506ec046ca
    history: {id=null, 
              createdDate=2012-08-25T00:00:01.000Z, 
              updatedDate=2012-08-25T00:00:01.000Z, 
              recordId=1, accountRecordId=1, 
              tenantRecordId=1, 
              externalKey=5bb29c30-c83a-4237-b886-6605319baf8f, 
              email=a946d@6a7f4, 
              name=40f79b31-64eb-429b-96b5-89c05a21883f, 
              firstNameLength=4, 
              currency=USD, 
              parentAccountId=null, 
              isPaymentDelegatedToParent=false, 
              billingCycleDayLocal=0, 
              paymentMethodId=null, 
              referenceTime=2012-08-25T00:00:01.000Z, 
              timeZone=UTC, 
              locale=fr, 
              address1=12 rue des ecoles, 
              address2=Poitier, 
              companyName=Renault, 
              city=Quelque part, 
              stateOrProvince=Poitou, 
              country=France, 
              postalCode=44 567, 
              phone=81 53 26 56, 
              notes=notes, 
              migrated=false, 
              tableName=ACCOUNT, 
              historyTableName=ACCOUNT_HISTORY}
}
```
```ruby
[
   {
      "changeType":"INSERT",
      "changeDate":"2013-08-01T06:00:00.000Z",
      "objectType":"ACCOUNT",
      "objectId":"08a1c2e4-687f-48ca-9c38-888108a2ce0a",
      "changedBy":"test_account_tags",
      "userToken":"5c0632c3-6567-4b0b-8e37-e2a9bb9ab6b2",
      "history":{
         "id":null,
         "createdDate":"2013-08-01T06:00:00.000Z",
         "updatedDate":"2013-08-01T06:00:00.000Z",
         "recordId":505,
         "accountRecordId":505,
         "tenantRecordId":822,
         "externalKey":"1527086785-621747",
         "email":"kill@bill.com",
         "name":"KillBillClient",
         "firstNameLength":null,
         "currency":"USD",
         "parentAccountId":null,
         "isPaymentDelegatedToParent":null,
         "billingCycleDayLocal":0,
         "paymentMethodId":null,
         "referenceTime":"2013-08-01T06:00:00.000Z",
         "timeZone":"UTC",
         "locale":"fr_FR",
         "address1":"7, yoyo road",
         "address2":"Apt 5",
         "companyName":"Unemployed",
         "city":"San Francisco",
         "stateOrProvince":"California",
         "country":"US",
         "postalCode":"94105",
         "phone":null,
         "notes":null,
         "migrated":null,
         "tableName":"ACCOUNT",
         "historyTableName":"ACCOUNT_HISTORY"
      }
   }
]
```
```python
[{'change_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc()),
 'change_type': 'INSERT',
 'changed_by': 'test',
 'comments': None,
 'history': {'created_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc()),
             'id': None,
             'updated_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc())},
 'object_id': 'c62d5f6d-0b57-444d-bf9b-dd23e781fbda',
 'object_type': 'ACCOUNT',
 'reason_code': None,
 'user_token': '40e771bf-160e-4ff6-82be-463f2d9e634d'}]
```

**Query Parameters**

None.

**Returns**
    
Returns a list of account audit logs with history.





### Retrieve account email audit logs with history by id

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/emails/{accountEmailId}/auditLogsWithHistory`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/emails/aa2a5614-88d9-4ec3-a042-a4771bd66670/auditLogsWithHistory"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("873c26ef-a3fa-4942-b2f5-549b51f20b1a");
UUID accountEmailId = UUID.fromString("f637441d-855e-4bf5-bac1-6426bdb116d6");

List<AuditLog> result = accountApi.getAccountEmailAuditLogsWithHistory(accountId, 
                                                                       accountEmailId, 
                                                                       requestOptions);
```

```python
accountApi = killbill.api.AccountApi()
account_id = 'c62d5f6d-0b57-444d-bf9b-dd23e781fbda'
account_email_id = 'bb390282-6757-4f4f-8dd5-456abd9f30b2'

accountApi.get_account_email_audit_logs_with_history(account_id,
                                                     account_email_id,
                                                     api_key,
                                                     api_secret)
```

```ruby
account_email_id = 'a4627e89-a73b-4167-a7ba-92a2881eb3c4'

account.email_audit_logs_with_history(account_email_id, options)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-18T15:13:22.000Z",
    "objectType": "ACCOUNT_EMAIL",
    "objectId": "aa2a5614-88d9-4ec3-a042-a4771bd66670",
    "changedBy": "demo",
    "reasonCode": "demo",
    "comments": "demo",
    "userToken": "927546eb-3431-4bcf-8fcc-1787d2130772",
    "history": {
      "id": null,
      "createdDate": "2018-07-18T15:13:22.000Z",
      "updatedDate": "2018-07-18T15:13:22.000Z",
      "recordId": 1,
      "accountRecordId": 120,
      "tenantRecordId": 101,
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "email": "email@example.com",
      "isActive": true,
      "tableName": "ACCOUNT_EMAIL",
      "historyTableName": "ACCOUNT_EMAIL_HISTORY"
    }
  }
]
```
```java
//First element of the list
class AuditLog {
    changeType: INSERT
    changeDate: 2012-08-25T00:00:02.000Z
    objectType: ACCOUNT_EMAIL
    objectId: f637441d-855e-4bf5-bac1-6426bdb116d6
    changedBy: Toto
    reasonCode: i am god
    comments: no comment
    userToken: 317c943b-f137-4866-9798-33c5818339f9
    history: {id=null, 
              createdDate=2012-08-25T00:00:02.000Z, 
              updatedDate=2012-08-25T00:00:02.000Z, 
              recordId=1, 
              accountRecordId=1, 
              tenantRecordId=1, 
              accountId=9f86c177-addd-48da-b734-da219b33f655, 
              email=af6c8ec2-bed8-4a86-aa23-535276aad7ca, 
              isActive=true, 
              tableName=ACCOUNT_EMAIL, 
              historyTableName=ACCOUNT_EMAIL_HISTORY}
}
```
```ruby
[
   {
      "changeType":"INSERT",
      "changeDate":"2013-08-01T06:00:00.000Z",
      "objectType":"ACCOUNT_EMAIL",
      "objectId":"a4627e89-a73b-4167-a7ba-92a2881eb3c4",
      "changedBy":"test_account_tags",
      "userToken":"79005abf-a8cf-44e1-84fc-945381d35bd5",
      "history":{
         "id":null,
         "createdDate":"2013-08-01T06:00:00.000Z",
         "updatedDate":"2013-08-01T06:00:00.000Z",
         "recordId":18,
         "accountRecordId":525,
         "tenantRecordId":842,
         "accountId":"1ced5fc2-b032-4969-a38b-d4db9ab5368f",
         "email":"email@example.com",
         "isActive":true,
         "tableName":"ACCOUNT_EMAIL",
         "historyTableName":"ACCOUNT_EMAIL_HISTORY"
      }
   }
]
```
```python
[{'change_date': datetime.datetime(2018, 5, 23, 16, 7, 1, tzinfo=tzutc()),
 'change_type': 'INSERT',
 'changed_by': 'Me',
 'comments': None,
 'history': {'created_date': datetime.datetime(2018, 5, 23, 16, 7, 1, tzinfo=tzutc()),
             'id': None,
             'updated_date': datetime.datetime(2018, 5, 23, 16, 7, 1, tzinfo=tzutc())},
 'object_id': 'bb390282-6757-4f4f-8dd5-456abd9f30b2',
 'object_type': 'ACCOUNT_EMAIL',
 'reason_code': None,
 'user_token': '548055b7-2c5e-4315-9293-d76c00bd9737'}]
```

**Query Parameters**

None.

**Returns**
    
Returns a list of account email audit logs with history.



### Retrieve account timeline


This api allows to retrieve the chronological set of things that occurred on a given `Account`.

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/{accountId}/timeline `

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/timeline"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

UUID accountId = UUID.fromString("16364ac4-2a77-4444-b2d8-e980c37a8954");
Boolean parallel = false;

AccountTimeline timeline = getAccountTimeline(accountId,
                                              parallel,
                                              AuditLevel.NONE,
                                              requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "account": {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "name": "John Doe",
    "firstNameLength": null,
    "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "email": "john@example.com",
    "billCycleDayLocal": 0,
    "currency": "USD",
    "parentAccountId": null,
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": null,
    "referenceTime": "2018-07-17T15:02:45.000Z",
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
    "accountBalance": null,
    "accountCBA": null,
    "auditLogs": []
  },
  "bundles": [],
  "invoices": [],
  "payments": []
}

```
```java
class AccountTimeline {
    account: class Account {
        org.killbill.billing.client.model.gen.Account@15d03da
        accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
        name: 6d3aec15-0f95-4445-a4b2-03ba6f312d9f
        firstNameLength: 4
        externalKey: bf50b936-8909-442c-95d9-53302ac53a73
        email: 86aa8@349d7
        billCycleDayLocal: 25
        currency: USD
        parentAccountId: null
        isPaymentDelegatedToParent: false
        paymentMethodId: ef4e6d42-1472-4027-a991-d611701a6001
        referenceTime: 2012-04-25T00:03:42.000Z
        timeZone: UTC
        address1: 12 rue des ecoles
        address2: Poitier
        postalCode: 44 567
        company: Renault
        city: Quelque part
        state: Poitou
        country: France
        locale: fr
        phone: 81 53 26 56
        notes: notes
        isMigrated: false
        accountBalance: null
        accountCBA: null
        auditLogs: []
    }
    bundles: [class Bundle {
        org.killbill.billing.client.model.gen.Bundle@b1f3cdff
        accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
        bundleId: a077e897-3f75-47e0-af54-eb799c9ed234
        externalKey: 19149cd6-60fb-414f-a720-1b0c5d41f62a
        subscriptions: [class Subscription {
            org.killbill.billing.client.model.gen.Subscription@be14321
            accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
            bundleId: a077e897-3f75-47e0-af54-eb799c9ed234
            subscriptionId: 510470b8-4495-4215-b4ff-9dd3fb952fb6
            externalKey: 19149cd6-60fb-414f-a720-1b0c5d41f62a
            startDate: 2012-04-25
            productName: Shotgun
            productCategory: BASE
            billingPeriod: MONTHLY
            phaseType: EVERGREEN
            priceList: DEFAULT
            planName: shotgun-monthly
            state: ACTIVE
            sourceType: NATIVE
            cancelledDate: null
            chargedThroughDate: 2012-06-25
            billingStartDate: 2012-04-25
            billingEndDate: null
            billCycleDayLocal: 25
            events: [class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@c5424137
                eventId: b7220076-fe42-4fc5-9843-7296044e7f17
                billingPeriod: MONTHLY
                effectiveDate: 2012-04-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: START_ENTITLEMENT
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: entitlement-service
                serviceStateName: ENT_STARTED
                phase: shotgun-monthly-trial
                auditLogs: []
            }, class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@90c31d8f
                eventId: 8b74b94e-a41e-4018-9f84-e86870de337b
                billingPeriod: MONTHLY
                effectiveDate: 2012-04-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: START_BILLING
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: billing-service
                serviceStateName: START_BILLING
                phase: shotgun-monthly-trial
                auditLogs: []
            }, class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@a5e22a9b
                eventId: e0d9367c-a94d-4f9c-a068-4b21870d8919
                billingPeriod: MONTHLY
                effectiveDate: 2012-05-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: PHASE
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: entitlement+billing-service
                serviceStateName: PHASE
                phase: shotgun-monthly-evergreen
                auditLogs: []
            }]
            priceOverrides: [class PhasePriceOverride {
                planName: shotgun-monthly
                phaseName: shotgun-monthly-trial
                phaseType: TRIAL
                fixedPrice: 0
                recurringPrice: null
                usagePriceOverrides: []
            }, class PhasePriceOverride {
                planName: shotgun-monthly
                phaseName: shotgun-monthly-evergreen
                phaseType: EVERGREEN
                fixedPrice: null
                recurringPrice: 249.95
                usagePriceOverrides: []
            }]
            auditLogs: []
        }]
        timeline: class BundleTimeline {
            org.killbill.billing.client.model.gen.BundleTimeline@8354e44a
            accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
            bundleId: a077e897-3f75-47e0-af54-eb799c9ed234
            externalKey: 19149cd6-60fb-414f-a720-1b0c5d41f62a
            events: [class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@aaf34cbe
                eventId: b7220076-fe42-4fc5-9843-7296044e7f17
                billingPeriod: MONTHLY
                effectiveDate: 2012-04-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: START_ENTITLEMENT
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: entitlement-service
                serviceStateName: ENT_STARTED
                phase: shotgun-monthly-trial
                auditLogs: []
            }, class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@719050e7
                eventId: 8b74b94e-a41e-4018-9f84-e86870de337b
                billingPeriod: MONTHLY
                effectiveDate: 2012-04-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: START_BILLING
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: billing-service
                serviceStateName: START_BILLING
                phase: shotgun-monthly-trial
                auditLogs: []
            }, class EventSubscription {
                org.killbill.billing.client.model.gen.EventSubscription@a23e5a2c
                eventId: e0d9367c-a94d-4f9c-a068-4b21870d8919
                billingPeriod: MONTHLY
                effectiveDate: 2012-05-25
                plan: shotgun-monthly
                product: Shotgun
                priceList: DEFAULT
                eventType: PHASE
                isBlockedBilling: false
                isBlockedEntitlement: false
                serviceName: entitlement+billing-service
                serviceStateName: PHASE
                phase: shotgun-monthly-evergreen
                auditLogs: []
            }]
            auditLogs: []
        }
        auditLogs: []
    }]
    invoices: [class Invoice {
        org.killbill.billing.client.model.gen.Invoice@be958014
        amount: 0.00
        currency: USD
        status: COMMITTED
        creditAdj: 0.00
        refundAdj: 0.00
        invoiceId: 94e03bc3-ef0a-4db8-9e01-e87cabcf7dfc
        invoiceDate: 2012-04-25
        targetDate: 2012-04-25
        invoiceNumber: 1
        balance: 0.00
        accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
        bundleKeys: 19149cd6-60fb-414f-a720-1b0c5d41f62a
        credits: []
        items: null
        isParentInvoice: false
        parentInvoiceId: null
        parentAccountId: null
        auditLogs: []
    }, class Invoice {
        org.killbill.billing.client.model.gen.Invoice@54f97871
        amount: 249.95
        currency: USD
        status: COMMITTED
        creditAdj: 0.00
        refundAdj: 0.00
        invoiceId: 1b547802-6d4a-41d8-ae67-fdb209c8fd8a
        invoiceDate: 2012-05-27
        targetDate: 2012-05-25
        invoiceNumber: 2
        balance: 0.00
        accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
        bundleKeys: 19149cd6-60fb-414f-a720-1b0c5d41f62a
        credits: []
        items: null
        isParentInvoice: false
        parentInvoiceId: null
        parentAccountId: null
        auditLogs: []
    }]
    payments: [class InvoicePayment {
        org.killbill.billing.client.model.gen.InvoicePayment@e8067ccf
        targetInvoiceId: 1b547802-6d4a-41d8-ae67-fdb209c8fd8a
        accountId: 16364ac4-2a77-4444-b2d8-e980c37a8954
        paymentId: ff4f3e17-708c-4f83-a648-1c45a0b9fdf0
        paymentNumber: 1
        paymentExternalKey: ff4f3e17-708c-4f83-a648-1c45a0b9fdf0
        authAmount: 0
        capturedAmount: 0
        purchasedAmount: 249.95
        refundedAmount: 0
        creditedAmount: 0
        currency: USD
        paymentMethodId: ef4e6d42-1472-4027-a991-d611701a6001
        transactions: [class PaymentTransaction {
            org.killbill.billing.client.model.gen.PaymentTransaction@868031c1
            transactionId: 50b13522-6853-4aa5-85ba-aa12bbd643cc
            transactionExternalKey: 50b13522-6853-4aa5-85ba-aa12bbd643cc
            paymentId: ff4f3e17-708c-4f83-a648-1c45a0b9fdf0
            paymentExternalKey: ff4f3e17-708c-4f83-a648-1c45a0b9fdf0
            transactionType: PURCHASE
            amount: 249.95
            currency: USD
            effectiveDate: 2012-05-27T00:03:45.000Z
            processedAmount: 249.95
            processedCurrency: USD
            status: SUCCESS
            gatewayErrorCode: 
            gatewayErrorMsg: 
            firstPaymentReferenceId: null
            secondPaymentReferenceId: null
            properties: null
            auditLogs: []
        }]
        paymentAttempts: null
        auditLogs: []
    }]
}
```
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


## Pagination/Search

### List accounts

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/pagination`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/pagination"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

Long offset = 0L;
Long limit = 1L;
Boolean accountWithBalance = false; // Will not include account balance
Boolean accountWithBalanceAndCBA = false; // Will not include account balance and CBA info

Accounts allAccounts = accountApi.getAccounts(offset,
                                              limit,
                                              accountWithBalance,
                                              accountWithBalanceAndCBA,
                                              AuditLevel.NONE,
                                              requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "name": "John Doe",
    "firstNameLength": null,
    "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "email": "john@example.com",
    "billCycleDayLocal": 0,
    "currency": "USD",
    "parentAccountId": null,
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": null,
    "referenceTime": "2018-07-17T15:02:45.000Z",
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
    "accountBalance": null,
    "accountCBA": null,
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Account {
    org.killbill.billing.client.model.gen.Account@f0247489
    accountId: 80e54c79-ca2b-4c82-920b-07822683e605
    name: 34bd86b6-ebc8-49ea-9a6e-6bbbd61ac745
    firstNameLength: 4
    externalKey: 23338712-3409-4ad3-8c6d-1c95241efef6
    email: f1a3a@44a80
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: null
    isPaymentDelegatedToParent: false
    paymentMethodId: null
    referenceTime: 2012-08-25T00:00:01.000Z
    timeZone: UTC
    address1: 12 rue des ecoles
    address2: Poitier
    postalCode: 44 567
    company: Renault
    city: Quelque part
    state: Poitou
    country: France
    locale: fr
    phone: 81 53 26 56
    notes: notes
    isMigrated: false
    accountBalance: null
    accountCBA: null
    auditLogs: []
}
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

### Search accounts

**HTTP Request** 

`GET http://example.com/1.0/kb/accounts/search/{searchKey}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/accounts/search/John%20Doe"
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
protected AccountApi accountApi;

String searchKey = "John-1"
Long offset = 0L;
Long limit = 1L;
Boolean accountWithBalance = false; // Will not include account balance
Boolean accountWithBalanceAndCBA = false; // Will not include account balance and CBA info

List<Account> accountsByKey = accountApi.searchAccounts(searchKey, 
                                                        offset,
                                                        limit,
                                                        accountWithBalance,
                                                        accountWithBalanceAndCBA,
                                                        requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "name": "John Doe",
    "firstNameLength": null,
    "externalKey": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "email": "john@example.com",
    "billCycleDayLocal": 0,
    "currency": "USD",
    "parentAccountId": null,
    "isPaymentDelegatedToParent": false,
    "paymentMethodId": null,
    "referenceTime": "2018-07-17T15:02:45.000Z",
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
    "accountBalance": null,
    "accountCBA": null,
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Account {
    org.killbill.billing.client.model.gen.Account@24e22684
    accountId: 80a454f3-182f-4621-812e-533d23e54cb9
    name: John-1
    firstNameLength: 4
    externalKey: 94a664a3-eea5-43fb-8788-9d3129a2c95c
    email: 33b2e@cc77b
    billCycleDayLocal: 0
    currency: USD
    parentAccountId: null
    isPaymentDelegatedToParent: false
    paymentMethodId: null
    referenceTime: 2012-08-25T00:00:02.000Z
    timeZone: UTC
    address1: 12 rue des ecoles
    address2: Poitier
    postalCode: 44 567
    company: Renault
    city: Quelque part
    state: Poitou
    country: France
    locale: fr
    phone: 81 53 26 56
    notes: notes
    isMigrated: false
    accountBalance: null
    accountCBA: null
    auditLogs: []
}
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