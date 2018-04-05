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

## Create an entitlement

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

## Cancel an entitlement plan

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

## Change entitlement plan

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

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

payment.tags(included_deleted,
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

## Un-cancel an entitlement

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

## Undo a pending change plan on an entitlement

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info | 

**Returns**

Returns a subscription object.

