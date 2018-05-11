# Payment Method

## Payment Method Resource

The `Payment Method` resource represent the payment methods associated to a account.

The attributes are the following:

* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`externalKey`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`isDefault`** <span style="color:#32A9C7">*[User generated]*</span>
* **`pluginName`** <span style="color:#32A9C7">*[User generated]*</span>
* **`pluginInfo`** <span style="color:#32A9C7">*[User generated]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[`AuditLog`]*</span>

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '0052cddd-0f61-4f68-b653-ca49b5d7f915'

paymentMethodApi.get_payment_method(payment_method_id, api_key, api_secret)
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

```python
{'account_id': '9f2f95b9-7021-4645-9863-30feac25841a',
 'audit_logs': [],
 'external_key': 'unknown',
 'is_default': False,
 'payment_method_id': '0052cddd-0f61-4f68-b653-ca49b5d7f915',
 'plugin_info': None,
 'plugin_name': '__EXTERNAL_PAYMENT__'}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **includedDeleted** | boolean | true | choose true to include deleted payment methods |
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |

**Returns**

Returns a payment method object.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
external_key = 'sample_external_key'

paymentMethodApi.get_payment_method_by_key(external_key, api_key, api_secret)
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
```python
{'account_id': '1d1c63ae-fd71-4e0c-87d4-24a334335c49',
 'audit_logs': [],
 'external_key': 'sample_external_key',
 'is_default': False,
 'payment_method_id': '882b2fa0-5946-487a-933c-b2572ea4383c',
 'plugin_info': None,
 'plugin_name': '__EXTERNAL_PAYMENT__'}
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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '0052cddd-0f61-4f68-b653-ca49b5d7f915'

paymentMethodApi.delete_payment_method(payment_method_id, 
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
| **deleteDefaultPmWithAutoPayOff** | boolean | true | choose true to delete default payment method with auto pay off|
| **forceDefaultPmDeletion** | boolean | true | choose true to force default payment method deletion |

**Returns**

A `200` http status without content.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
body = CustomField(name='Test Custom Field', value='test_value')

paymentMethodApi.create_payment_method_custom_fields(payment_method_id,
                                                     [body],
                                                     created_by,
                                                     api_key,
                                                     api_secret)
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
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a custom field object.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'

paymentMethodApi.get_payment_method_custom_fields(payment_method_id, 
                                                  api_key, 
                                                  api_secret)
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
```python
[{'audit_logs': [],
 'custom_field_id': '5670b594-9317-4aeb-bfef-2c2342ec172a',
 'name': 'Test Custom Field',
 'object_id': '4927c1a2-3959-4f71-98e7-ce3ba19c92ac',
 'object_type': 'PAYMENT_METHOD',
 'value': 'test_value'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
custom_field_id = '7fb3dde7-0911-4477-99e3-69d142509bb9'
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

paymentMethodApi.modify_payment_method_custom_fields(payment_method_id, 
                                                     [body], 
                                                     created_by, 
                                                     api_key, 
                                                     api_secret)
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
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customFieldList** | string | true | a list of custom field objects that you want to modify |

**Returns**

Returns a custom field object.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
payment_method_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'

paymentMethodApi.delete_payment_method_custom_fields(payment_method_id,
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
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Returns**

A `200` http status without content.

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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()

paymentMethodApi.get_payment_methods(api_key, api_secret)
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
```python
[{'account_id': '5d82791d-c47f-4c4b-be11-b68233656b96',
 'audit_logs': [],
 'external_key': 'unknown',
 'is_default': False,
 'payment_method_id': '06955087-e191-4da5-99c9-e712b21f6aa6',
 'plugin_info': None,
 'plugin_name': '__EXTERNAL_PAYMENT__'}]
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

```python
paymentMethodApi = killbill.api.PaymentMethodApi()
search_key = '__EXTERNAL_PAYMENT__'

paymentMethodApi.search_payment_methods(search_key, api_key, api_secret)
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
```python
[{'account_id': '81d8b04d-dee1-49bf-bc73-48219df21af9',
 'audit_logs': [],
 'external_key': 'unknown',
 'is_default': False,
 'payment_method_id': 'bcecaf3f-16c7-4d65-aed0-b08cc5e34a6b',
 'plugin_info': None,
 'plugin_name': '__EXTERNAL_PAYMENT__'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **searchKey** | string | true | What you want to find? |
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |

**Returns**

Return a list with payment methods matched with the search key entered.
