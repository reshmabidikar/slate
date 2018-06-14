# Subscription

The `Subscription` resource represents the subscriptions associated with a given customer `Account`. Such subscriptions are created by specifying a well defined `Plan` from the catalog, and an effective date at which to start. Such attributes -- among others -- , are used by the system to drive the invoice
generation. Aside from the billing aspect -- invoice generation --, Kill Bill also offers a parallel view to track the entitlement, i.e the service associated with the subscription, bascially answering the two following questions:

* Given a date, how much should we invoice ?
* Given a date, is the service available to the customer? 

For most of the use cases, those 2 views are one and the same, i.e the customer gets invoiced for what she consumes.

Subscriptions can be in one of the following state:

* `PENDING`: The subscription was created in the future
* `ACTIVE`: The subscription is currently active, its start date is in the past, its cancellation date -- if it exists -- is in the future, and it has not been paused.
* `BLOCKED`: The subscription is currently paused.
* `CANCELLED`: The subscription has been cancelled -- end state.

Please refer to our [subscription manual](http://docs.killbill.io/latest/userguide_subscription.html) for more details.

## Subscription Resource

The `Subscription` resource represent the subscription created by the user.

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`subscriptionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated]*</span>: The (`Bundle`) external key provided from client.
* **`startDate`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The (entitlement) start date -- when the service starts.
* **`productName`** <span style="color:#32A9C7">*[User generated]*</span>: The name of the active product catalog.
* **`productCategory`** <span style="color:#32A9C7">*[User generated]*</span>: The product category, either `BASE`, `ADD_ON` or `STANDALONE`.
* **`billingPeriod`** <span style="color:#32A9C7">*[User generated]*</span>: The billing period -- e.g `MONTHLY`.
* **`phaseType`** <span style="color:#32A9C7">*[User generated]*</span>: The type of the plan phase, either `TRIAL`, `DISCOUNT`, `FIXEDTERM`, `EVERGREEN`.   
* **`priceList`** <span style="color:#32A9C7">*[User generated]*</span>: The name of the active price list from the catalog.
* **`planName`** <span style="color:#32A9C7">*[User generated]*</span>: The name of the active plan catalog.
* **`state`** <span style="color:#32A9C7">*[System generated]*</span>: The state of the subscription.
* **`sourceType`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The kind of subscription -- e.g `NATIVE`
* **`cancelledDate`** <span style="color:#32A9C7">*[User generated]**</span>: The (entitlement) cancellation date -- when the service stops.
* **`chargedThroughDate`** <span style="color:#32A9C7">*[System generated]*</span>: The date up to which this subscription was invoiced -- for `IN_ADVANCE` billing mode, this date will often be in the future and for `IN_ARREAR`, this date will often be in the past.
* **`billingStartDate`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The (billing) start date -- date at which the system starts invoicing.
* **`billingEndDate`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The (billing) end date -- date at which the system ends invoicing.
* **`billCycleDayLocal`** <span style="color:#32A9C7">*[User or system generated]*</span>: For billing period that are multiple of months -- e.g `MONHTLY` -- this represents the date during the month at which the system triggers invoicing.
* **`events`** <span style="color:#32A9C7">*[System generated]*</span>: List of subscription events tracking what happened -- e.g `CHANGE_PLAN`.
* **`priceOverrides`** <span style="color:#32A9C7">*[User generated]*</span>: Catalog price override section used when creating the subscription to adjust default catalog price.

## Create an subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID accountId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");

Subscription input = new Subscription();
input.setAccountId(accountJson.getAccountId());
input.setExternalKey("somethingSpecial");
input.setPlanName("shotgun-monthly");

LocalDate entitlementDate = null;
LocalDate billingDate = null;
Boolean renameKeyIfExistsAndUnused = null; 
Boolean migrated = null;
Integer bcd = null;
Boolean callCompletion true
long DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC = 10;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Subscription subscription = subscriptionApi.createSubscription(input, 
                                                               entitlementDate, 
                                                               billingDate, 
                                                               renameKeyIfExistsAndUnused, 
                                                               migrated, 
                                                               bcd, 
                                                               callCompletion, 
                                                               DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC, 
                                                               NULL_PLUGIN_PROPERTIES, 
                                                               requestOptions);
```

```ruby
subscription              = KillBillClient::Model::Subscription.new
subscription.account_id   = "e1826665-4524-4d57-81b5-a5eb11146f3f"
subscription.plan_name    = "basic-monthly-in-advance"

requested_date  = nil
call_completion = nil 

subscription.create(user, 
                    reason, 
                    comment, 
                    requested_date, 
                    call_completion, 
                    options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
account_id = 'e1826665-4524-4d57-81b5-a5eb11146f3f'
body = Subscription(account_id=account_id, plan_name='standard-monthly')

subscriptionApi.create_subscription(body,
                                    created_by,
                                    api_key,
                                    api_secret)
```

> Example Response:

```java
class Subscription {
    org.killbill.billing.client.model.gen.Subscription@49563466
    accountId: e8cd6795-0da1-4848-831f-51977eed42b1
    bundleId: eac6eecf-2060-434a-b472-170f80a7591c
    subscriptionId: a74081ee-d7bb-4387-a1df-34e962e37699
    externalKey: somethingSpecial
    startDate: 2012-04-25
    productName: Shotgun
    productCategory: BASE
    billingPeriod: MONTHLY
    phaseType: TRIAL
    priceList: DEFAULT
    planName: shotgun-monthly
    state: ACTIVE
    sourceType: NATIVE
    cancelledDate: null
    chargedThroughDate: null
    billingStartDate: 2012-04-25
    billingEndDate: null
    billCycleDayLocal: 25
    events: [class EventSubscription {
        org.killbill.billing.client.model.gen.EventSubscription@37b70727
        eventId: 9ef798a3-95f6-41ac-9b86-00c9385c155f
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
        org.killbill.billing.client.model.gen.EventSubscription@410923f5
        eventId: 65ec07fa-61c7-4f05-bd6f-82cea23cf06a
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
        org.killbill.billing.client.model.gen.EventSubscription@cac84db3
        eventId: 88f77a50-edca-4cc3-b234-5d70c457128c
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
}
```
```ruby
{
   "accountId":"e1826665-4524-4d57-81b5-a5eb11146f3f",
   "bundleId":"f3dea847-1567-467a-8373-838dfdcf6afc",
   "subscriptionId":"ee508b5b-46b8-42a7-8988-16c0470de4ae",
   "externalKey":"f3dea847-1567-467a-8373-838dfdcf6afc",
   "startDate":"2013-08-01",
   "productName":"Basic",
   "productCategory":"BASE",
   "billingPeriod":"MONTHLY",
   "phaseType":"EVERGREEN",
   "priceList":"DEFAULT",
   "planName":"basic-monthly-in-advance",
   "state":"ACTIVE",
   "sourceType":"NATIVE",
   "chargedThroughDate":"2013-09-01",
   "billingStartDate":"2013-08-01",
   "billCycleDayLocal":1,
   "events":[
      {
         "eventId":"341fc529-612b-4bb9-b8d7-ee4a9115f577",
         "billingPeriod":"MONTHLY",
         "effectiveDate":"2013-08-01",
         "plan":"basic-monthly-in-advance",
         "product":"Basic",
         "priceList":"DEFAULT",
         "eventType":"START_ENTITLEMENT",
         "isBlockedBilling":false,
         "isBlockedEntitlement":false,
         "serviceName":"entitlement-service",
         "serviceStateName":"ENT_STARTED",
         "phase":"basic-monthly-in-advance-evergreen",
         "auditLogs":[]
      },
      {
         "eventId":"caa54161-c001-44a0-9ff0-80be59989380",
         "billingPeriod":"MONTHLY",
         "effectiveDate":"2013-08-01",
         "plan":"basic-monthly-in-advance",
         "product":"Basic",
         "priceList":"DEFAULT",
         "eventType":"START_BILLING",
         "isBlockedBilling":false,
         "isBlockedEntitlement":false,
         "serviceName":"billing-service",
         "serviceStateName":"START_BILLING",
         "phase":"basic-monthly-in-advance-evergreen",
         "auditLogs":[]
      }
   ],
   "priceOverrides":[
      {
         "planName":"basic-monthly-in-advance",
         "phaseName":"basic-monthly-in-advance-evergreen",
         "phaseType":"EVERGREEN",
         "recurringPrice":1000.0
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
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **entitlementDate** | string | false | entitlement date |
| **billingDate** | string | true | billing date |
| **renameKeyIfExistsAndUnused** | boolean | true | rename key if exists and unused (default: true) |
| **migrated** | boolean | true | choose true if is migrated (default: false) |
| **bcd** | integer | true | bill cycle day |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec |

**Returns**

Returns a subscription object.

## Cancel an subscription plan

**HTTP Request** 

`DELETE http://example.com/1.0/kb/subscriptions/{subscriptionId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID accountId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");
LocalDate requestedDate = null;
EntitlementActionPolicy entitlementPolicy = null;
BillingActionPolicy billingPolicy = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

subscriptionApi.cancelSubscriptionPlan(accountId, 
                                       requestedDate, 
                                       entitlementPolicy, 
                                       billingPolicy, 
                                       NULL_PLUGIN_PROPERTIES, 
                                       requestOptions);
```

```ruby
requested_date = nil
entitlement_policy = nil
billing_policy = nil
use_requested_date_for_billing = nil

subscription.cancel(user, 
                    reason, 
                    comment, 
                    requested_date, 
                    entitlement_policy, 
                    billing_policy, 
                    use_requested_date_for_billing, 
                    options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = 'ee508b5b-46b8-42a7-8988-16c0470de4ae'

subscriptionApi.cancel_subscription_plan(subscription_id, 
                                         created_by,
                                         api_key,
                                         api_secret)
```

> Example Response:

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
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec | 
| **entitlementPolicy** | string | false | entitlement policy |
| **billingPolicy** | string | false | billing policy |
| **useRequestedDateForBilling** | boolean | true | use requested date for billing (default: false) |

**Returns**

A `204` http status without content.

## Retrieve a subscription by id

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");

Subscription objFromJson = subscriptionApi.getSubscription(subscriptionId, 
                                                           AuditLevel.NONE, 
                                                           requestOptions);
```

```ruby
subscription_id = "161692a4-c293-410c-a92f-939c5e3dcba7"

KillBillClient::Model::Subscription.find_by_id(subscription_id, options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '4aab9b96-c2e7-4641-a6d9-db984969201e'

subscriptionApi.get_subscription(subscription_id, api_key, api_secret)
```

> Example Response:

```java
class Subscription {
    org.killbill.billing.client.model.gen.Subscription@c620bf78
    accountId: e903d1d6-7423-40fe-8ab7-d9d449484cda
    bundleId: 603db1e6-299e-4b8b-9dfc-beecccca39b2
    subscriptionId: b0f8f527-78c6-4fef-8fb2-53c9ed60a714
    externalKey: 99999
    startDate: 2012-04-25
    productName: Shotgun
    productCategory: BASE
    billingPeriod: ANNUAL
    phaseType: TRIAL
    priceList: DEFAULT
    planName: shotgun-annual
    state: ACTIVE
    sourceType: NATIVE
    cancelledDate: null
    chargedThroughDate: 2012-04-25
    billingStartDate: 2012-04-25
    billingEndDate: null
    billCycleDayLocal: 25
    events: [class EventSubscription {
        org.killbill.billing.client.model.gen.EventSubscription@c8078c46
        eventId: 7227bab2-b394-42de-b40c-97cecfd1d9ae
        billingPeriod: ANNUAL
        effectiveDate: 2012-04-25
        plan: shotgun-annual
        product: Shotgun
        priceList: DEFAULT
        eventType: START_ENTITLEMENT
        isBlockedBilling: false
        isBlockedEntitlement: false
        serviceName: entitlement-service
        serviceStateName: ENT_STARTED
        phase: shotgun-annual-trial
        auditLogs: []
    }, class EventSubscription {
        org.killbill.billing.client.model.gen.EventSubscription@1be0ca21
        eventId: ce8578e7-553f-45d7-a4d1-2abb7e625f64
        billingPeriod: ANNUAL
        effectiveDate: 2012-04-25
        plan: shotgun-annual
        product: Shotgun
        priceList: DEFAULT
        eventType: START_BILLING
        isBlockedBilling: false
        isBlockedEntitlement: false
        serviceName: billing-service
        serviceStateName: START_BILLING
        phase: shotgun-annual-trial
        auditLogs: []
    }, class EventSubscription {
        org.killbill.billing.client.model.gen.EventSubscription@f0472744
        eventId: 26d5ea05-b91d-43e6-8aa2-ac0ac82f6a95
        billingPeriod: ANNUAL
        effectiveDate: 2012-05-25
        plan: shotgun-annual
        product: Shotgun
        priceList: DEFAULT
        eventType: PHASE
        isBlockedBilling: false
        isBlockedEntitlement: false
        serviceName: entitlement+billing-service
        serviceStateName: PHASE
        phase: shotgun-annual-evergreen
        auditLogs: []
    }]
    priceOverrides: [class PhasePriceOverride {
        planName: shotgun-annual
        phaseName: shotgun-annual-trial
        phaseType: TRIAL
        fixedPrice: 0
        recurringPrice: null
        usagePriceOverrides: []
    }, class PhasePriceOverride {
        planName: shotgun-annual
        phaseName: shotgun-annual-evergreen
        phaseType: EVERGREEN
        fixedPrice: null
        recurringPrice: 2399.95
        usagePriceOverrides: []
    }]
    auditLogs: []
}
```
```ruby
{
   "accountId":"0cdaeca7-4984-47dc-b245-7c32627f26cd",
   "bundleId":"d1f4ca8d-be47-4e64-84ce-f697b42d4182",
   "subscriptionId":"161692a4-c293-410c-a92f-939c5e3dcba7",
   "externalKey":"d1f4ca8d-be47-4e64-84ce-f697b42d4182",
   "startDate":"2013-08-01",
   "productName":"Basic",
   "productCategory":"BASE",
   "billingPeriod":"MONTHLY",
   "phaseType":"EVERGREEN",
   "priceList":"DEFAULT",
   "planName":"basic-monthly-in-advance",
   "state":"ACTIVE",
   "sourceType":"NATIVE",
   "chargedThroughDate":"2013-09-01",
   "billingStartDate":"2013-08-01",
   "billCycleDayLocal":1,
   "events":[
      {
         "eventId":"dda11bf3-f74a-4c42-83e1-0f43a41389af",
         "billingPeriod":"MONTHLY",
         "effectiveDate":"2013-08-01",
         "plan":"basic-monthly-in-advance",
         "product":"Basic",
         "priceList":"DEFAULT",
         "eventType":"START_ENTITLEMENT",
         "isBlockedBilling":false,
         "isBlockedEntitlement":false,
         "serviceName":"entitlement-service",
         "serviceStateName":"ENT_STARTED",
         "phase":"basic-monthly-in-advance-evergreen",
         "auditLogs":[]
      },
      {
         "eventId":"6901117c-4ce0-4eb6-8642-380823490fae",
         "billingPeriod":"MONTHLY",
         "effectiveDate":"2013-08-01",
         "plan":"basic-monthly-in-advance",
         "product":"Basic",
         "priceList":"DEFAULT",
         "eventType":"START_BILLING",
         "isBlockedBilling":false,
         "isBlockedEntitlement":false,
         "serviceName":"billing-service",
         "serviceStateName":"START_BILLING",
         "phase":"basic-monthly-in-advance-evergreen",
         "auditLogs":[]
      }
   ],
   "priceOverrides":[
      {
         "planName":"basic-monthly-in-advance",
         "phaseName":"basic-monthly-in-advance-evergreen",
         "phaseType":"EVERGREEN",
         "recurringPrice":1000.0
      }
   ],
   "auditLogs":[]
}
```

```python
{'account_id': '3b1a5a67-f0ac-475c-9aad-735d309f0c1f',
 'audit_logs': [],
 'bill_cycle_day_local': 13,
 'billing_end_date': None,
 'billing_period': 'MONTHLY',
 'billing_start_date': datetime.date(2018, 5, 14),
 'bundle_id': 'e5590623-ccd4-4a8a-be26-008ce7c02b3b',
 'cancelled_date': None,
 'charged_through_date': None,
 'events': [{'audit_logs': [],
             'billing_period': 'MONTHLY',
             'effective_date': datetime.date(2018, 5, 14),
             'event_id': '46335d3d-8234-49c3-af1a-dcf8cd354ef3',
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
             'effective_date': datetime.date(2018, 5, 14),
             'event_id': 'a14d6512-7479-46e0-b72b-81dff575d1d4',
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
             'effective_date': datetime.date(2018, 6, 13),
             'event_id': '27408c65-46b8-4bc9-a7ee-c80d6e5fb9b5',
             'event_type': 'PHASE',
             'is_blocked_billing': False,
             'is_blocked_entitlement': False,
             'phase': 'standard-monthly-evergreen',
             'plan': 'standard-monthly',
             'price_list': 'DEFAULT',
             'product': 'Standard',
             'service_name': 'entitlement+billing-service',
             'service_state_name': 'PHASE'}],
 'external_key': 'e5590623-ccd4-4a8a-be26-008ce7c02b3b',
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
 'start_date': datetime.date(2018, 5, 14),
 'state': 'ACTIVE',
 'subscription_id': '4aab9b96-c2e7-4641-a6d9-db984969201e'}
```
**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a subscription object.

## Change subscription plan

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");
UUID accountId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");

Subscription newInput = new Subscription();
newInput.setAccountId(accountId);
newInput.setSubscriptionId(subscriptionId);
newInput.setProductName("Shotgun");
newInput.setProductCategory(ProductCategory.BASE);
newInput.setBillingPeriod(BillingPeriod.MONTHLY);
newInput.setPriceList("DEFAULT");

LocalDate requestedDate = null;

subscriptionApi.changeSubscriptionPlan(subscriptionId, 
                                       newInput, 
                                       requestedDate, 
                                       BillingActionPolicy.IMMEDIATE, 
                                       NULL_PLUGIN_PROPERTIES, 
                                       requestOptions);
```

```ruby
input = {
           :productName => 'Super', 
           :billingPeriod => 'MONTHLY', 
           :priceList => 'DEFAULT'
         }
         
requested_date = nil
billing_policy = nil
call_completion = false
target_phase_type = nil

subscription.change_plan(input, 
                         user, 
                         reason, 
                         comment, 
                         requested_date, 
                         billing_policy,
                         target_phase_type, 
                         call_completion, 
                         options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '97278000-72fd-45d7-9b67-e44690bdb074'
body = Subscription(product_name='Super',
                    billing_period='MONTHLY',
                    price_list='DEFAULT')

subscriptionApi.change_subscription_plan(subscription_id,
                                         body,
                                         created_by,
                                         api_key,
                                         api_secret)
```

> Example Response:

```java
no content
```
```ruby
{
   "accountId":"986c5d4e-b322-4d71-ad24-e3bf6e38734a",
   "bundleId":"b0b9da5f-6844-417b-ac97-d7e8df07c26a",
   "subscriptionId":"97278000-72fd-45d7-9b67-e44690bdb074",
   "externalKey":"986c5d4e-b322-4d71-ad24-e3bf6e38734a-452347",
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
         "eventId":"b2c4195a-0888-44e4-91a7-537b20b08bd8",
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
         "eventId":"0c15d9ba-f0f3-40e6-83d7-2d84af703d06",
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
         "eventId":"b675c39f-eeef-4cc1-8ffc-e50f51e8a84a",
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
         "auditLogs":[]
      },
      {
         "eventId":"e411fe3e-6d38-4256-bd96-867f3a50c634",
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
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec |
| **billingPolicy** | string | false | billing policy |

**Returns**

A `204` http status without content.

## Update the BCD associated to a subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/bcd`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("905a0636-ab63-40c0-acd4-b461b6808b5d");

Subscription updatedSubscription = new Subscription();
updatedSubscription.setSubscriptionId(subscriptionId);
updatedSubscription.setBillCycleDayLocal(9);

LocalDate effectiveFromDate = null;

subscriptionApi.updateSubscriptionBCD(subscriptionId, 
                                      updatedSubscription, 
                                      effectiveFromDate, 
                                      requestOptions);
```

```ruby
subscription                      = KillBillClient::Model::Subscription.new
subscription.subscription_id      = "161692a4-c293-410c-a92f-939c5e3dcba7"
subscription.bill_cycle_day_local = 16

effective_from_date  = '2018-08-16'
force_past_effective_date = nil

subscription.update_bcd(user, 
                        reason, 
                        comment, 
                        effective_from_date, 
                        force_past_effective_date, 
                        options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '161692a4-c293-410c-a92f-939c5e3dcba7'
body = Subscription(subscription_id=subscription_id,
                    bill_cycle_day_local=26)

subscriptionApi.update_subscription_bcd(subscription_id,
                                        body,
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

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
| ---- | ---- | -------- | ----------- |
| **effectiveFromDate** | string | true | effective from date | 
| **forceNewBcdWithPastEffectiveDate** | boolean | true | force new bcd with past effective date (default: false)| 

**Returns**

A `204` http status without content.

## Block a subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/{subscriptionId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
subscription = KillBillClient::Model::Subscription.new
subscription.subscription_id = "161692a4-c293-410c-a92f-939c5e3dcba7"

state_name = 'STATE1'
service = 'ServiceStateService'
block_change = false
block_entitlement = false
block_billing = false
requested_date = nil

subscription.set_blocking_state(state_name, 
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
subscriptionApi = killbill.api.SubscriptionApi()
body = BlockingState(state_name='STATE1',
                     service='ServiceStateService',
                     is_block_change=False,
                     is_block_entitlement=False,
                     is_block_billing=False)

subscriptionApi.add_subscription_blocking_state(subscription_id,
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

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date | 

**Returns**

A `201` http status without content.

## Add custom fields to subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 subscriptionId, 
                                 ObjectType.SUBSCRIPTION, 
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

subscriptionApi.createSubscriptionCustomFields(subscriptionId, 
                                               customFields, 
                                               requestOptions);
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'SUBSCRIPTION'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

subscription.add_custom_field(custom_field, 
                              user,
                              reason,
                              comment,
                              options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
body = CustomField(name='Test Custom Field', value='test_value')

subscriptionApi.create_subscription_custom_fields(subscription_id,
                                                  [body],
                                                  created_by,
                                                  api_key,
                                                  api_secret)
```

> Example Response:

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    objectType: SUBSCRIPTION
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
      "objectType":"SUBSCRIPTION",
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

## Retrieve subscription custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

List<CustomField> customFields = subscriptionApi.getSubscriptionCustomFields(subscriptionId,
                                                                             AuditLevel.NONE,
                                                                             requestOptions);
```

```ruby
audit = 'NONE'

subscription.custom_fields(audit, options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '642ee0ac-972b-4cdf-b9ae-ab8f9bb9bc05'

subscriptionApi.get_subscription_custom_fields(subscription_id,
                                               api_key,
                                               api_secret)
```

> Example Response:

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    objectType: SUBSCRIPTION
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
      "objectType":"SUBSCRIPTION",
      "name":"Test Custom Field",
      "value":"test_value",
      "auditLogs":[]
   }
]
```

```python
[{'audit_logs': [],
 'custom_field_id': '31a21da4-1eae-4f83-b9e4-49c53217d33e',
 'name': 'Test Custom Field',
 'object_id': '642ee0ac-972b-4cdf-b9ae-ab8f9bb9bc05',
 'object_type': 'SUBSCRIPTION',
 'value': 'test_value'}]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

subscriptionApi.modifySubscriptionCustomFields(subscriptionId, 
                                               customFieldModified, 
                                               requestOptions);
```

```ruby
custom_field.custom_field_id = '7fb3dde7-0911-4477-99e3-69d142509bb9'
custom_field.name = 'Test Modify'
custom_field.value = 'test_modify_value'

subscription.modify_custom_field(custom_field,                                                                                            
                                 user, 
                                 reason,
                                 comment, 
                                 options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
custom_field_id = '7fb3dde7-0911-4477-99e3-69d142509bb9'
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

subscriptionApi.modify_subscription_custom_fields(subscription_id,
                                                  [body],
                                                  created_by,
                                                  api_key,
                                                  api_secret)
```

> Example Response:

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

## Remove custom fields from subscription

**HTTP Request** 

`DELETE http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

subscriptionApi.deleteSubscriptionCustomFields(subscriptionId, 
                                               customFieldsId, 
                                               requestOptions);
```

```ruby
custom_field_id = custom_field.id

subscription.remove_custom_field(custom_field_id,                                                                                            
                                 user, 
                                 reason,
                                 comment, 
                                 options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'

subscriptionApi.delete_subscription_custom_fields(subscription_id,
                                                  created_by,
                                                  api_key,
                                                  api_secret)
```

> Example Response:

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

## Add tags to subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("1bb4b638-3886-4f73-90a5-89eb6d1bcf7f");
UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

Tags result = subscriptionApi.createSubscriptionTags(subscriptionId, 
                                                     ImmutableList.<UUID>of(autoPayOffId), 
                                                     requestOptions);
```

```ruby
tag_name = 'TEST'

subscription.add_tag(tag_name,
                     user,
                     reason,
                     comment,
                     options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'
tag = ["00000000-0000-0000-0000-000000000002"]

subscriptionApi.create_subscription_tags(subscription_id,
                                         tag,
                                         created_by,
                                         api_key,
                                         api_secret)
```
> Example Response:

```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: SUBSCRIPTION
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
      "objectType":"SUBSCRIPTION",
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

## Retrieve subscription tags

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("1bb4b638-3886-4f73-90a5-89eb6d1bcf7f");

Boolean includedDeleted = false; // Will not include deleted tags

List<Tag> tags = subscriptionApi.getSubscriptionTags(subscriptionId, 
                                                     includedDeleted, 
                                                     AuditLevel.FULL, 
                                                     requestOptions);
```

```ruby
included_deleted = false
audit = 'NONE'

subscription.tags(included_deleted,
                  audit,
                  options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = 'f5bb14ed-c6e8-4895-8d4e-34422e12cdfa'

subscriptionApi.get_subscription_tags(subscription_id,
                                      api_key,
                                      api_secret)
```

> Example Response:

```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: SUBSCRIPTION
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
      "objectType":"SUBSCRIPTION",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
```
```python
[{'audit_logs': [],
 'object_id': 'f5bb14ed-c6e8-4895-8d4e-34422e12cdfa',
 'object_type': 'SUBSCRIPTION',
 'tag_definition_id': '00000000-0000-0000-0000-000000000002',
 'tag_definition_name': 'AUTO_INVOICING_OFF',
 'tag_id': 'a1fd0122-1ec8-4bc3-b71e-ab2a76ae5957'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

## Remove tags from subscription

**HTTP Request** 

`DELETE http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("1bb4b638-3886-4f73-90a5-89eb6d1bcf7f");

UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

subscriptionApi.deleteSubscriptionTags(subscriptionId, 
                                       ImmutableList.<UUID>of(autoPayOffId), 
                                       requestOptions);
```

```ruby
tag_name = 'TEST'

subscription.remove_tag(tag_name,
                        user,
                        reason,
                        comment,
                        options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = 'f5bb14ed-c6e8-4895-8d4e-34422e12cdfa'
tag = ["00000000-0000-0000-0000-000000000002"]

subscriptionApi.delete_subscription_tags(subscription_id,
                                         created_by,
                                         api_key,
                                         api_secret,
                                         tag_def=tag)
```

> Example Response:

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
| **tagList** | string | true |  list of tags that you want to remove it |

**Response**

A `204` http status without content.

## Un-cancel an subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/uncancel`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("1bb4b638-3886-4f73-90a5-89eb6d1bcf7f");
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

subscriptionApi.uncancelSubscriptionPlan(subscriptionId, 
                                         NULL_PLUGIN_PROPERTIES, 
                                         requestOptions);
```

```ruby
subscription.uncancel(user, 
                      reason, 
                      comment, 
                      options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = 'f5bb14ed-c6e8-4895-8d4e-34422e12cdfa'

subscriptionApi.uncancel_subscription_plan(subscription_id,
                                           created_by,
                                           api_key,
                                           api_secret)
```

> Example Response:

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

## Create multiple entitlements with addOn products

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/createSubscriptionsWithAddOns`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID accountId = UUID.fromString("abfba40d-d2dd-47f0-94f2-8ea3e6bc8794");

Subscription base = new Subscription();
base.setAccountId(accountId);
base.setExternalKey("base");
base.setProductName("Shotgun");
base.setProductCategory(ProductCategory.BASE);
base.setBillingPeriod(BillingPeriod.MONTHLY);
base.setPriceList("DEFAULT");

final Subscription addOn1 = new Subscription();
addOn1.setAccountId(accountId);
addOn1.setProductName("Telescopic-Scope");
addOn1.setProductCategory(ProductCategory.ADD_ON);
addOn1.setBillingPeriod(BillingPeriod.MONTHLY);
addOn1.setPriceList("DEFAULT");

final Subscription addOn2 = new Subscription();
addOn2.setAccountId(accountId);
addOn2.setProductName("Laser-Scope");
addOn2.setProductCategory(ProductCategory.ADD_ON);
addOn2.setBillingPeriod(BillingPeriod.MONTHLY);
addOn2.setPriceList("DEFAULT");

final Subscriptions subscriptions = new Subscriptions();
subscriptions.add(base);
subscriptions.add(addOn1);
subscriptions.add(addOn2);

LocalDate entitlementDate = null;
LocalDate billingDate = null;
Boolean migrated = null;
Boolean renameKeyIfExistsAndUnused = null;
Boolean callCompletion = true;
long DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC = 10;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

final Bundle bundle = subscriptionApi.createSubscriptionWithAddOns(subscriptions, 
                                                                   entitlementDate, 
                                                                   billingDate, 
                                                                   migrated, 
                                                                   renameKeyIfExistsAndUnused, 
                                                                   callCompletion, 
                                                                   DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC, 
                                                                   NULL_PLUGIN_PROPERTIES, 
                                                                   requestOptions);
```

```ruby
bulk_subscription_list = [
                            {
                               "baseEntitlementAndAddOns":[
                                  {
                                     "accountId":"16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836",
                                     "externalKey":"1-16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836-827963",
                                     "productCategory":"BASE",
                                     "planName":"sports-monthly"
                                  }
                               ]
                            },
                            {
                               "baseEntitlementAndAddOns":[
                                  {
                                     "accountId":"16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836",
                                     "externalKey":"2-16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836-717751",
                                     "productCategory":"ADD_ON",
                                     "planName":"super-monthly"
                                  }
                               ]
                            }
                         ]
entitlement_date = nil
billing_date = nil
call_completion_sec = nil

KillBillClient::Model::BulkSubscription.create_bulk_subscriptions(bulk_subscription_list, 
                                                                  user, 
                                                                  reason, 
                                                                  comment, 
                                                                  entitlement_date, 
                                                                  billing_date, 
                                                                  call_completion_sec, 
                                                                  options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
account_id = '16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836'
subscription_a = Subscription(account_id=account_id,
                              product_category='BASE',
                              plan_name='sports-monthly')

subscription_b = Subscription(account_id=account_id,
                              product_category='ADD_ON',
                              plan_name='super-monthly')

body = BulkSubscriptionsBundle([subscription_a, subscription_b])

subscriptionApi.create_subscriptions_with_add_ons([body],
                                                  created_by,
                                                  api_key,
                                                  api_secret)
```

> Example Response:

```java
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@ddd846f9
    accountId: abfba40d-d2dd-47f0-94f2-8ea3e6bc8794
    bundleId: 83f3a7b5-63c9-4b06-a1f5-7140fec67558
    externalKey: base
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@bb1bf160
        accountId: abfba40d-d2dd-47f0-94f2-8ea3e6bc8794
        bundleId: 83f3a7b5-63c9-4b06-a1f5-7140fec67558
        subscriptionId: 6fcf439b-4198-4963-8f0e-7e3054525a24
        externalKey: base
        startDate: 2012-04-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-04-25
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a6789138
            eventId: fb7d653a-cadb-46f6-a04f-dbe7043385ed
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
            org.killbill.billing.client.model.gen.EventSubscription@b4b456ed
            eventId: b5c00fdf-6ce4-46ad-b996-5513146d8acd
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
            org.killbill.billing.client.model.gen.EventSubscription@fb1cc392
            eventId: edd91628-323d-4a3a-b07e-bef09a2623a2
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
    }, class Subscription {
        org.killbill.billing.client.model.gen.Subscription@37a59f88
        accountId: abfba40d-d2dd-47f0-94f2-8ea3e6bc8794
        bundleId: 83f3a7b5-63c9-4b06-a1f5-7140fec67558
        subscriptionId: a490a1c8-ca78-4cbd-bb5a-1ce214cc2f23
        externalKey: base
        startDate: 2012-04-25
        productName: Telescopic-Scope
        productCategory: ADD_ON
        billingPeriod: MONTHLY
        phaseType: DISCOUNT
        priceList: DEFAULT
        planName: telescopic-scope-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-05-25
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@9c41861a
            eventId: 6be47e8c-0ff6-45ee-9b79-7a91c6867e6c
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: telescopic-scope-monthly
            product: Telescopic-Scope
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: telescopic-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a386d43d
            eventId: 0c6b12cb-9390-4d64-b98a-93a8c9a6b67b
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: telescopic-scope-monthly
            product: Telescopic-Scope
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: telescopic-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@429a9148
            eventId: 27ce7282-c84c-495a-a7fc-be393cfcf3a7
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: telescopic-scope-monthly
            product: Telescopic-Scope
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: telescopic-scope-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: telescopic-scope-monthly
            phaseName: telescopic-scope-monthly-discount
            phaseType: DISCOUNT
            fixedPrice: null
            recurringPrice: 399.95
            usagePriceOverrides: []
        }, class PhasePriceOverride {
            planName: telescopic-scope-monthly
            phaseName: telescopic-scope-monthly-evergreen
            phaseType: EVERGREEN
            fixedPrice: null
            recurringPrice: 999.95
            usagePriceOverrides: []
        }]
        auditLogs: []
    }, class Subscription {
        org.killbill.billing.client.model.gen.Subscription@10da5c43
        accountId: abfba40d-d2dd-47f0-94f2-8ea3e6bc8794
        bundleId: 83f3a7b5-63c9-4b06-a1f5-7140fec67558
        subscriptionId: 8f957bfa-61da-45ca-ae4c-ed34b045f18e
        externalKey: base
        startDate: 2012-04-25
        productName: Laser-Scope
        productCategory: ADD_ON
        billingPeriod: MONTHLY
        phaseType: DISCOUNT
        priceList: DEFAULT
        planName: laser-scope-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-05-25
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@6615c622
            eventId: eb05b9d5-a055-426c-8411-7fd9b4728d45
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@41ddb948
            eventId: 6fbe3e71-7e3b-4c3b-8bdd-27c8dc71e044
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@182c6fd0
            eventId: bec40e45-6ffb-49f3-831d-722f19d8ed09
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: laser-scope-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: laser-scope-monthly
            phaseName: laser-scope-monthly-discount
            phaseType: DISCOUNT
            fixedPrice: null
            recurringPrice: 999.95
            usagePriceOverrides: []
        }, class PhasePriceOverride {
            planName: laser-scope-monthly
            phaseName: laser-scope-monthly-evergreen
            phaseType: EVERGREEN
            fixedPrice: null
            recurringPrice: 1999.95
            usagePriceOverrides: []
        }]
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@8a202296
        accountId: abfba40d-d2dd-47f0-94f2-8ea3e6bc8794
        bundleId: 83f3a7b5-63c9-4b06-a1f5-7140fec67558
        externalKey: base
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@5aa4f7e9
            eventId: eb05b9d5-a055-426c-8411-7fd9b4728d45
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@1df149f3
            eventId: 6be47e8c-0ff6-45ee-9b79-7a91c6867e6c
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@68a2bc3b
            eventId: fb7d653a-cadb-46f6-a04f-dbe7043385ed
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@787b414d
            eventId: 6fbe3e71-7e3b-4c3b-8bdd-27c8dc71e044
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: laser-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@5ba02249
            eventId: 0c6b12cb-9390-4d64-b98a-93a8c9a6b67b
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: telescopic-scope-monthly
            product: Telescopic-Scope
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: telescopic-scope-monthly-discount
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@d45c4b96
            eventId: b5c00fdf-6ce4-46ad-b996-5513146d8acd
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
            org.killbill.billing.client.model.gen.EventSubscription@2360e010
            eventId: bec40e45-6ffb-49f3-831d-722f19d8ed09
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: laser-scope-monthly
            product: Laser-Scope
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: laser-scope-monthly-evergreen
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@49d428fe
            eventId: 27ce7282-c84c-495a-a7fc-be393cfcf3a7
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: telescopic-scope-monthly
            product: Telescopic-Scope
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: telescopic-scope-monthly-evergreen
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@aebff2be
            eventId: edd91628-323d-4a3a-b07e-bef09a2623a2
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
}
```
```ruby
no content
```
```python
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **entitlementDate** | string | false | entitlement date |
| **billingDate** | string | true | billing date |
| **renameKeyIfExistsAndUnused** | boolean | true | rename key if exists and unused (default: true) |
| **migrated** | boolean | true | choose true if is migrated (default: false) |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec | 

**Returns**

A `201` http status without content.

## Create an entitlement with addOn products

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/createSubscriptionWithAddOns`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID accountId = UUID.fromString("a3087bfb-eb81-466d-afeb-6501c30f8f85");

Subscription base = new Subscription();
base.setAccountId(accountId);
base.setExternalKey("base");
base.setProductName("Shotgun");
base.setProductCategory(ProductCategory.BASE);
base.setBillingPeriod(BillingPeriod.MONTHLY);
base.setPriceList("DEFAULT");

final Subscription addOn1 = new Subscription();
addOn1.setAccountId(accountId);
addOn1.setProductName("Telescopic-Scope");
addOn1.setProductCategory(ProductCategory.ADD_ON);
addOn1.setBillingPeriod(BillingPeriod.MONTHLY);
addOn1.setPriceList("DEFAULT");

final Subscription addOn2 = new Subscription();
addOn2.setAccountId(accountId);
addOn2.setProductName("Laser-Scope");
addOn2.setProductCategory(ProductCategory.ADD_ON);
addOn2.setBillingPeriod(BillingPeriod.MONTHLY);
addOn2.setPriceList("DEFAULT");

final Subscriptions subscriptions = new Subscriptions();
subscriptions.add(base);
subscriptions.add(addOn1);
subscriptions.add(addOn2);

BulkSubscriptionsBundles bulkSubscriptionsBundles = new BulkSubscriptionsBundles();

BulkSubscriptionsBundle bulkSubscriptionsBundle = new BulkSubscriptionsBundle();
bulkSubscriptionsBundle.setBaseEntitlementAndAddOns(subscriptions);
bulkSubscriptionsBundles.add(bulkSubscriptionsBundle);

LocalDate entitlementDate = null;
LocalDate billingDate = null;
Boolean renameKeyIfExistsAndUnused = false;
Boolean migrated = false;
Boolean callCompletion = true;
long DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC = 10;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Bundles bundles = subscriptionApi.createSubscriptionsWithAddOns(bulkSubscriptionsBundles, 
                                                                entitlementDate, 
                                                                billingDate, 
                                                                renameKeyIfExistsAndUnused, 
                                                                migrated, 
                                                                callCompletion, 
                                                                DEFAULT_WAIT_COMPLETION_TIMEOUT_SEC,
                                                                NULL_PLUGIN_PROPERTIES, 
                                                                requestOptions);
```

```ruby
entitlement = [
                 {
                    "baseEntitlementAndAddOns":[
                       {
                          "accountId":"16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836",
                          "externalKey":"1-16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836-827963",
                          "productCategory":"BASE",
                          "planName":"sports-monthly"
                       }
                    ]
                 }
              ]
requested_date = nil
entitlement_date = nil
billing_date = nil
migrated = false
call_completion_sec = 3

subscription = KillBillClient::Model::Subscription.new
subscription.create_entitlement_with_add_on(entitlement,
                                            requested_date,
                                            entitlement_date, 
                                            billing_date,
                                            migrated, 
                                            call_completion_sec,                                            
                                            user, 
                                            reason, 
                                            comment, 
                                            options)                                         
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
account_id = '16cd9eb8-bb5d-4183-b8e0-c1d6f78dc836'
subscription_a = Subscription(account_id=account_id,
                              product_category='BASE',
                              plan_name='sports-monthly')

subscription_b = Subscription(account_id=account_id,
                              product_category='ADD_ON',
                              plan_name='super-monthly')

body = [subscription_a, subscription_b]

subscriptionApi.create_subscription_with_add_ons(body,
                                                 created_by,
                                                 api_key,
                                                 api_secret)
```

> Example Response:

```java
class BulkSubscriptionsBundle {
    baseEntitlementAndAddOns: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@23b30120
        accountId: a3087bfb-eb81-466d-afeb-6501c30f8f85
        bundleId: 2df85b05-4a69-474b-9e10-02a836674cc8
        subscriptionId: null
        externalKey: null
        startDate: null
        productName: Telescopic-Scope
        productCategory: ADD_ON
        billingPeriod: MONTHLY
        phaseType: null
        priceList: DEFAULT
        planName: null
        state: null
        sourceType: null
        cancelledDate: null
        chargedThroughDate: null
        billingStartDate: null
        billingEndDate: null
        billCycleDayLocal: null
        events: null
        priceOverrides: null
        auditLogs: null
    }, class Subscription {
        org.killbill.billing.client.model.gen.Subscription@1b88c7d0
        accountId: a3087bfb-eb81-466d-afeb-6501c30f8f85
        bundleId: 2df85b05-4a69-474b-9e10-02a836674cc8
        subscriptionId: null
        externalKey: null
        startDate: null
        productName: Laser-Scope
        productCategory: ADD_ON
        billingPeriod: MONTHLY
        phaseType: null
        priceList: DEFAULT
        planName: null
        state: null
        sourceType: null
        cancelledDate: null
        chargedThroughDate: null
        billingStartDate: null
        billingEndDate: null
        billCycleDayLocal: null
        events: null
        priceOverrides: null
        auditLogs: null
    }]
}
```
```ruby
no content
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **entitlementDate** | string | false | entitlement date |
| **billingDate** | string | true | billing date |
| **renameKeyIfExistsAndUnused** | boolean | true | rename key if exists and unused (default: true) |
| **migrated** | boolean | true | choose true if is migrated (default: false) |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec | 

**Returns**

A `201` http status without content.

## Undo a pending change plan on an subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/undoChangePlan`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.SubscriptionApi;
protected SubscriptionApi subscriptionApi;

UUID subscriptionId = UUID.fromString("1bb4b638-3886-4f73-90a5-89eb6d1bcf7f");
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

subscriptionApi.undoChangeSubscriptionPlan(subscriptionId, 
                                           NULL_PLUGIN_PROPERTIES, 
                                           requestOptions);
```

```ruby
subscription.undo_change_plan(user, 
                              reason, 
                              comment, 
                              options)
```

```python
subscriptionApi = killbill.api.SubscriptionApi()
subscription_id = 'f5bb14ed-c6e8-4895-8d4e-34422e12cdfa'

subscriptionApi.undo_change_subscription_plan(subscription_id,
                                              created_by,
                                              api_key,
                                              api_secret)
```

> Example Response:

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

