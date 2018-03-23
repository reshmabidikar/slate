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
external_key = 'example_key'
included_deleted = false

budnle = KillBillClient::Model::Bundle.new
bundle.find_by_external_key(external_key, 
                            included_deleted, 
                            options)
```

> Example Response:

```ruby
{
  "accountId": "string",
  "bundleId": "string",
  "externalKey": "example_key",
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
              "changeDate": "2018-03-20T17:16:31.150Z",
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
          "changeDate": "2018-03-20T17:16:31.151Z",
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
            "changeDate": "2018-03-20T17:16:31.151Z",
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
        "changeDate": "2018-03-20T17:16:31.151Z",
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
      "changeDate": "2018-03-20T17:16:31.151Z",
      "changedBy": "string",
      "reasonCode": "string",
      "comments": "string",
      "userToken": "string"
    }
  ]
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
bundle_id = "e8877928-0226-488d-9272-07a5e66d897f"

budnle = KillBillClient::Model::Bundle.new
budnle.find_by_id(bundle_id, options)
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
  "accountId": "string",
  "bundleId": "e8877928-0226-488d-9272-07a5e66d897f",
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
              "changeDate": "2018-03-20T17:16:31.158Z",
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
          "changeDate": "2018-03-20T17:16:31.159Z",
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
            "changeDate": "2018-03-20T17:16:31.159Z",
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
        "changeDate": "2018-03-20T17:16:31.159Z",
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
      "changeDate": "2018-03-20T17:16:31.159Z",
      "changedBy": "string",
      "reasonCode": "string",
      "comments": "string",
      "userToken": "string"
    }
  ]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid identifier was provided.

## Transfer a bundle to another account


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}`

> Example Request:

```ruby
requested_date = "2013-08-01"
billing_policy = "END_OF_TERM"

budnle = KillBillClient::Model::Bundle.new
budnle.transfer(requested_date, 
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
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for transfer a bundle |

**Returns**

TODO

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
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for block a bundle |

**Returns**

Returns a blocking state object.

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
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for pause a bundle |

**Returns**

TODO

## Resume a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/resume`

> Example Request:

```ruby
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
TODO
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for resume a bundle |

**Returns**

TODO

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
    "tagId": "string",
    "objectType": "BUNDLE",
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
                "changeDate": "2018-03-20T17:16:31.236Z",
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
            "changeDate": "2018-03-20T17:16:31.236Z",
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
              "changeDate": "2018-03-20T17:16:31.237Z",
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
          "changeDate": "2018-03-20T17:16:31.237Z",
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
        "changeDate": "2018-03-20T17:16:31.237Z",
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

**Returns**

Return a list with bundles matched with the search key entered.