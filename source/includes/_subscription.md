# Subscription

## Subscription Resource

The `Subscription` resource represent the subscription created by the user.

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`subscriptionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`externalKey`** <span style="color:#32A9C7">*[User generated]*</span>
* **`startDate`** <span style="color:#32A9C7">*TODO*</span>
* **`productName`** <span style="color:#32A9C7">*TODO*</span>
* **`productCategory`** <span style="color:#32A9C7">*TODO*</span>
* **`billingPeriod`** <span style="color:#32A9C7">*TODO*</span>
* **`phaseType`** <span style="color:#32A9C7">*TODO*</span>
* **`priceList`** <span style="color:#32A9C7">*TODO*</span>
* **`planName`** <span style="color:#32A9C7">*TODO*</span>
* **`state`** <span style="color:#32A9C7">*TODO*</span>
* **`sourceType`** <span style="color:#32A9C7">*TODO*</span>
* **`cancelledDate`** <span style="color:#32A9C7">*TODO*</span>
* **`chargedThroughDate`** <span style="color:#32A9C7">*TODO*</span>
* **`billingStartDate`** <span style="color:#32A9C7">*TODO*</span>
* **`billingEndDate`** <span style="color:#32A9C7">*TODO*</span>
* **`billCycleDayLocal`** <span style="color:#32A9C7">*TODO*</span>
* **`events`** <span style="color:#32A9C7">*[`EventSubscription`]*</span>
* **`priceOverrides`** <span style="color:#32A9C7">*[`PhasePriceOverride`]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

## Create an subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions`

> Example Request:

```shell
TODO	
```

```java
TODO
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

> Example Response:

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
TODO
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

> Example Response:

```ruby
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

A `200` http status without content.

## Retrieve a subscription by id

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
subscription_id = "161692a4-c293-410c-a92f-939c5e3dcba7"

KillBillClient::Model::Subscription.find_by_id(subscription_id, options)
```

> Example Response:

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
TODO
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

subscription.change_plan(input, 
                         user, 
                         reason, 
                         comment, 
                         requested_date, 
                         billing_policy, 
                         call_completion, 
                         options)
```

> Example Response:

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **callCompletion** | boolean | true | call completion (default: false)|
| **callTimeoutSec** | long | false | call timeout sec |
| **billingPolicy** | string | false | billing policy |

**Returns**

Returns a subscription object.

## Update the BCD associated to a subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/bcd`

> Example Request:

```shell
TODO	
```

```java
TODO
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

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **effectiveFromDate** | string | true | effective from date | 
| **forceNewBcdWithPastEffectiveDate** | boolean | true | force new bcd with past effective date (default: false)| 

**Returns**

A `200` http status without content.

## Block a subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/block`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
subscription = KillBillClient::Model::Subscription.new
result.subscription_id = "161692a4-c293-410c-a92f-939c5e3dcba7"

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

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **requestedDate** | string | false | requested date | 

**Returns**

A `200` http status without content.

## Remove custom fields from subscription

**HTTP Request** 

`DELETE http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

subscription.remove_custom_field(custom_field_id,                                                                                            
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

**Returns**

A `200` http status without content.

## Retrieve subscription custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

subscription.custom_fields(audit, options)
```

> Example Response:

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Add custom fields to subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
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

> Example Response:

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


**Query Parameters**

None.

**Returns**

Returns a custom field object.

## Modify custom fields to subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/customFields`

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

subscription.modify_custom_field(custom_field,                                                                                            
                                 user, 
                                 reason,
                                 comment, 
                                 options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"SUBSCRIPTION",
      "name":"Test Modify",
      "value":"test_modify_value",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customFieldList** | string | true | a list of custom field objects that you want to modify |

**Returns**

Returns a custom field object.

## Remove tags from subscription

**HTTP Request** 

`DELETE http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

subscription.remove_tag(tag_name,
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

## Retrieve subscription tags

**HTTP Request** 

`GET http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

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

subscription.tags(included_deleted,
             audit,
             options)
```

> Example Response:

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

## Add tags to subscription

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/{subscriptionId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

subscription.add_tag(tag_name,
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
      "objectType":"SUBSCRIPTION",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true | tag list to add |

**Returns**

Returns a bundle tag object.

## Un-cancel an subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/uncancel`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
subscription.uncancel(user, 
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

## Create multiple entitlements with addOn products

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/createEntitlementsWithAddOns`

> Example Request:

```shell
TODO	
```

```java
TODO
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
                                     "productCategory":"BASE",
                                     "planName":"standard-monthly"
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

> Example Response:

```ruby
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

A `200` http status without content.

## Create an entitlement with addOn products

**HTTP Request** 

`POST http://example.com/1.0/kb/subscriptions/createEntitlementWithAddOns`

> Example Request:

```shell
TODO	
```

```java
TODO
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

> Example Response:

```ruby
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

A `200` http status without content.

## Undo a pending change plan on an subscription

**HTTP Request** 

`PUT http://example.com/1.0/kb/subscriptions/{subscriptionId}/undoChangePlan`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
subscription.undo_change_plan(user, 
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

