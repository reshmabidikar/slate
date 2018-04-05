# Payment

## Payment Resource

The `Payment` resource represent the payments created by the user.

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated]*</span>
* **`authAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`capturedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`purchasedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`refundedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`creditedAmount`** <span style="color:#32A9C7">*TODO*</span>
* **`currency`** <span style="color:#32A9C7">*TODO*</span>
* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`transactions`** <span style="color:#32A9C7">*[See `PaymentTransaction` bellow]*</span>
* **`paymentAttempts`** <span style="color:#32A9C7">*[`PaymentAttempt`]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

### PaymentTransaction

* **`transactionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`transactionExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span> 
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span> 
* **`amount`** <span style="color:#32A9C7">*TODO*</span> 
* **`currency`** <span style="color:#32A9C7">*TODO*</span> 
* **`effectiveDate`** <span style="color:#32A9C7">*TODO*</span> 
* **`processedAmount`** <span style="color:#32A9C7">*TODO*</span> 
* **`processedCurrency`** <span style="color:#32A9C7">*TODO*</span> 
* **`status`** <span style="color:#32A9C7">*TODO*</span> 
* **`gatewayErrorCode`** <span style="color:#32A9C7">*TODO*</span> 
* **`gatewayErrorMsg`** <span style="color:#32A9C7">*TODO*</span> 
* **`firstPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`secondPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span> 
* **`properties`** <span style="color:#32A9C7">*[`PluginProperty`]*</span> 
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

## Void an existing payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Capture an existing authorization

**HTTP Request** 

`POST http://example.com/1.0/kb/payments`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Complete an existing transaction [using external key]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Retrieve a payment by external key

**HTTP Request** 

`GET http://example.com/1.0/kb/payments`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Complete an existing transaction [using payment id]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Capture an existing authorization

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Retrieve a payment by id [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Void an existing payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Record a chargeback reversal [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/chargebackReversals`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Record a chargeback [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/chargebacks`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Add custom fields to payment [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'PAYMENT'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

payment.add_custom_field(custom_field, 
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
      "objectType":"PAYMENT",
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

## Retrieve payment custom fields [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

payment.custom_fields(audit, options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"PAYMENT",
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

## Remove custom fields from payment [payment]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

payment.remove_custom_field(custom_field_id,                                                                                            
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

## Modify custom fields to payment [payment]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}/customFields`

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

payment.modify_custom_field(custom_field,                                                                                            
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
      "objectType":"PAYMENT",
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

## Refund an existing payment

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/refunds`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Add tags to payment [payment]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

payment.add_tag(tag_name,
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
      "objectType":"PAYMENT",
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

## Retrieve payment tags [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/tags`

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
      "objectType":"PAYMENT",
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

## Remove tags from payment [payment]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

payment.remove_tag(tag_name,
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

## Cancels a scheduled payment attempt retry

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentTransactionId}/cancelScheduledPaymentTransaction`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Record a chargeback reversal with external key

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/chargebackReversals`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Record a chargeback with external key

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/chargebacks`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Combo api to create a new payment transaction on a existing (or not) account

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/combo`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Get payments

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/pagination`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Refund an existing payment with external key

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/refunds`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.

## Search payments

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/search/{searchKey}`

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
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |

**Returns**

Returns a payment object.
