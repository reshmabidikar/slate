# Payment Method

## Payment Method Resource

The `Payment Method` resource represent the invoice payments created by the user.

The attributes are the following:

* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`externalKey`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`isDefault`** <span style="color:#32A9C7">*[User generated]*</span>
* **`pluginName`** <span style="color:#32A9C7">*TODO*</span>
* **`pluginInfo`** <span style="color:#32A9C7">*TODO*</span>
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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

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
TODO
```

> Example Response:

```ruby
TODO
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.
