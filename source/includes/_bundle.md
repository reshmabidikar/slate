# Bundle

## Bundle Resource

The `Bundle` resource represents a collection of subscriptions that are associated with a particular instance of a product. 

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>: The external key provided from client.
* **`subscriptions`** <span style="color:#32A9C7">*(Array[SubscriptionJson], optional, read only)*</span>: Subscriptions list.
* **`timeline`** <span style="color:#32A9C7">*(BundleTimelineJson, optional, read only)*</span>: Event list.

## Retrieve a bundle by external key

**HTTP Request** 

Retrieves the details information for the `Bundle` using its `externalKey`.

`GET http://example.com/1.0/kb/bundles`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
external_key = '4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135'
included_deleted = false

bundle = KillBillClient::Model::Bundle.new
bundle.find_by_external_key(external_key, 
                            included_deleted, 
                            options)
```

> Example Response:

```ruby
{
   "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
   "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
   "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
   "subscriptions":[
      {
         "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
         "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
         "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
         "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
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
               "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
               "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
               "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
      }
   ],
   "timeline":{
      "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
      "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
      "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
      "events":[
         {
            "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
            "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
            "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
      "auditLogs":[]
   },
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **includedDeleted** | boolean | true | choose true to include deleted bundles |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid external key was provided.

## Retrieve a bundle by id

Retrieves the details information for the `Bundle` using its `bundleId`.


**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}`

> Example Request:

```ruby
bundle_id = "5b7a5f2d-4054-412f-b354-b722c2cff4ec"

bundle = KillBillClient::Model::Bundle.new
bundle.find_by_id(bundle_id, options)
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
   "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
   "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
   "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
   "subscriptions":[
      {
         "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
         "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
         "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
         "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
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
               "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
               "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
               "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
      }
   ],
   "timeline":{
      "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
      "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
      "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
      "events":[
         {
            "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
            "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
            "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
      "auditLogs":[]
   },
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid identifier was provided.

## Transfer a bundle to another account

The new account_id should be set in this object


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}`

> Example Request:

```ruby
requested_date = "2013-08-01"
billing_policy = "END_OF_TERM"

bundle = KillBillClient::Model::Bundle.new
bundle.account_id = new_account_id
bundle.bundle_id = bundle_id

bundle.transfer(requested_date, 
                billing_policy, 
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
   "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
   "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
   "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
   "subscriptions":[
      {
         "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
         "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
         "subscriptionId":"46e6fcdc-9f63-4ffc-a091-0cde70f964f0",
         "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
         "startDate":"2013-09-01",
         "productName":"Sports",
         "productCategory":"BASE",
         "billingPeriod":"MONTHLY",
         "phaseType":"EVERGREEN",
         "priceList":"DEFAULT",
         "planName":"sports-monthly",
         "state":"ACTIVE",
         "sourceType":"TRANSFERRED",
         "billingStartDate":"2013-09-01",
         "billCycleDayLocal":1,
         "events":[
            {
               "eventId":"605c5696-4046-4597-8a67-7e50d26856cd",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-09-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            },
            {
               "eventId":"fbc53e69-0683-4904-bc77-5d244b9ad1c9",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-09-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "priceOverrides":[
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-evergreen",
               "phaseType":"EVERGREEN",
               "recurringPrice":500.0
            }
         ],
         "auditLogs":[]
      }
   ],
   "timeline":{
      "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
      "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
      "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
      "events":[
         {
            "eventId":"605c5696-4046-4597-8a67-7e50d26856cd",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-09-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_ENTITLEMENT",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement-service",
            "serviceStateName":"ENT_STARTED",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         },
         {
            "eventId":"fbc53e69-0683-4904-bc77-5d244b9ad1c9",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-09-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_BILLING",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"billing-service",
            "serviceStateName":"START_BILLING",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         }
      ],
      "auditLogs":[]
   },
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for transfer a bundle |

**Returns**

Returns a bundle object if a valid account and bundle id's was provided.

## Block a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/block`

> Example Request:

```ruby
state_name = "STATE1"
service = "ServiceStateService"
block_change = false
block_entitlement = false
block_billing = false
requested_date = "2013-08-01"

bundle.set_blocking_state(state_name,
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
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for block a bundle |

**Returns**

A `200` http status without content.

## Add custom fields to bundle

**HTTP Request** 

`POST http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'BUNDLE'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

bundle.add_custom_field(custom_field, 
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
      "objectType":"BUNDLE",
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

## Retrieve bundle custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

bundle.custom_fields(audit, options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"BUNDLE",
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

## Remove custom fields from bundle

**HTTP Request** 

`DELETE http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

bundle.remove_custom_field(custom_field_id                                                                                           eld_id, 
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

## Pause a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/pause`

> Example Request:

```ruby
bundle = KillBillClient::Model::Bundle.new
bundle.bundle_id = bundle_id
requested_date = "2013-08-01"

bundle.pause(requested_date, 
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
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for pause a bundle |

**Returns**

A `200` http status without content.

## Resume a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/resume`

> Example Request:

```ruby
bundle = KillBillClient::Model::Bundle.new
bundle.bundle_id = bundle_id
requested_date = "2013-08-01"

bundle.resume(requested_date, 
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
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for resume a bundle |

**Returns**

A `200` http status without content.

## Remove tags from bundle

**HTTP Request** 

`DELETE http://example.com/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

bundle.remove_tag(tag_name,
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

## Retrieve bundle tags

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}/tags`

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

bundle.tags(included_deleted,
            audit,
            options)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"BUNDLE",
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
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

## Add tags to bundle

**HTTP Request** 

`POST http://example.com/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

bundle.add_tag(tag_name,
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
      "objectType":"BUNDLE",
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

Returns a bundle tag object.

## List bundles

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/pagination`

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

bundle.find_in_batches(offset,
                       limit,
                       options)
```

> Example Response:

```ruby
[
  {
     "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
     "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
     "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
     "subscriptions":[
        {
           "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
           "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
           "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
           "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
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
                 "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
                 "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
                 "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
        }
     ],
     "timeline":{
        "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
        "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
        "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
        "events":[
           {
              "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
              "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
              "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
        "auditLogs":[]
     },
     "auditLogs":[]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |

**Returns**

Returns a list with all bundles.

## Search bundles

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/search/{searchKey}`

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

bundle.find_in_batches_by_search_key(search_key,
                                     offset,
                                     limit,
                                     options)
```

> Example Response:

```ruby
[
  {
     "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
     "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
     "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
     "subscriptions":[
        {
           "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
           "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
           "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
           "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
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
                 "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
                 "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
                 "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
        }
     ],
     "timeline":{
        "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
        "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
        "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
        "events":[
           {
              "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
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
              "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
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
              "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
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
        "auditLogs":[]
     },
     "auditLogs":[]
  }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **searchKey** | string | true | What you want to find? |
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |

**Returns**

Return a list with bundles matched with the search key entered.