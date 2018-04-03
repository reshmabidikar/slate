# Payment Method

## Payment Method Resource

The `Payment Method` resource represent the invoice payments created by the user.

The attributes are the following:

* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`externalKey`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`isDefault`** <span style="color:#32A9C7">*[User generated]*</span>
* **`pluginName`** <span style="color:#32A9C7">*[User generated]*</span>
* **`pluginInfo`** <span style="color:#32A9C7">*[User generated]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

## Retrieve a payment method by external key

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentMethods`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_method_ek = "sample_external_key"
included_deleted = false
with_plugin_info = false
audit = 'NONE'

KillBillClient::Model::PaymentMethod.find_by_external_key(payment_method_ek,
                                                          included_deleted,
                                                          with_plugin_info,
                                                          audit,
                                                          options)
```

> Example Response:

```ruby
{
   "paymentMethodId":"4307ac7c-04a7-41e1-9cb0-8a4d4420104c",
   "externalKey":"sample_external_key",
   "accountId":"aba041a0-52f3-4d0d-b8e0-dec442dbc51e",
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
| **externalKey** | string | true | external key from payment method |
| **includedDeleted** | boolean | true | choose true to include deleted payment methods |
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |

**Returns**

Returns a payment method object.

## Delete a payment method

**HTTP Request** 

`DELETE http://example.com/1.0/kb/paymentMethods/{paymentMethodId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_method_id = "4307ac7c-04a7-41e1-9cb0-8a4d4420104c"
set_auto_pay_off = false
force_default_deletion = false
KillBillClient::Model::PaymentMethod.destroy(payment_method_id,
                                             set_auto_pay_off,
                                             force_default_deletion,
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
| **deleteDefaultPmWithAutoPayOff** | boolean | true | choose true to delete default payment method with auto pay off|
| **forceDefaultPmDeletion** | boolean | true | choose true to force default payment method deletion |

**Returns**

A `200` http status without content.

##  Retrieve a payment method by id

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentMethods/{paymentMethodId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_method_id = "6a0bf13e-d57f-4f79-84bd-3690135f1923"
with_plugin_info = false

KillBillClient::Model::PaymentMethod.find_by_id(payment_method_id, 
                                                with_plugin_info, 
                                                options)
```

> Example Response:

```ruby
{
   "paymentMethodId":"6a0bf13e-d57f-4f79-84bd-3690135f1923",
   "externalKey":"unknown",
   "accountId":"f9c4801f-0daa-4c46-bea0-59490d07fc5e",
   "isDefault":false,
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
| **includedDeleted** | boolean | true | choose true to include deleted payment methods |
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |

**Returns**

Returns a payment method object.

##  Remove custom fields from payment method

**HTTP Request** 

`DELETE http://example.com/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

payment_method.remove_custom_field(custom_field_id,                                                                                            
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

##  Retrieve payment method custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

payment_method.custom_fields(audit, options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"PAYMENT_METHOD",
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

##  Add custom fields to payment method

**HTTP Request** 

`POST http://example.com/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'PAYMENT_METHOD'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

payment_method.add_custom_field(custom_field, 
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
      "objectType":"PAYMENT_METHOD",
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

##  Modify custom fields to payment method

**HTTP Request** 

`PUT http://example.com/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

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

payment_method.modify_custom_field(custom_field,                                                                                            
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
      "objectType":"PAYMENT_METHOD",
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

##  List payment methods

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentMethods/pagination`

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

payment_method.find_in_batches(offset,
                               limit,
                               options)
```

> Example Response:

```ruby
[
  {
     "paymentMethodId":"6a0bf13e-d57f-4f79-84bd-3690135f1923",
     "externalKey":"unknown",
     "accountId":"f9c4801f-0daa-4c46-bea0-59490d07fc5e",
     "isDefault":false,
     "pluginName":"__EXTERNAL_PAYMENT__",
     "pluginInfo":{
        "properties":[]
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

Returns a list with all payment methods.

##  Search payment methods

**HTTP Request** 

`GET http://example.com/1.0/kb/paymentMethods/search/{searchKey}`

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

payment_method.find_in_batches_by_search_key(search_key,
                                             offset,
                                             limit,
                                             options)
```

> Example Response:

```ruby
[
  {
     "paymentMethodId":"6a0bf13e-d57f-4f79-84bd-3690135f1923",
     "externalKey":"unknown",
     "accountId":"f9c4801f-0daa-4c46-bea0-59490d07fc5e",
     "isDefault":false,
     "pluginName":"__EXTERNAL_PAYMENT__",
     "pluginInfo":{
        "properties":[]
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

Return a list with payment methods matched with the search key entered.
