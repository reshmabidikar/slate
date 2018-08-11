# Payment Method

## Payment Method Resource

The `Payment Method` resource represents the payment methods associated to a customer `Account`. There are often two parts to this resource:

* The core Kill Bill attributes shown below, which are fairly minimalistic and mostly track the associated payment plugin that is used to interract with the payment gateway.
* The plugin attributes, which are plugin specific and payment method specific -- credit card, ACH, bitcoin, ... In the case of a credit card for instance, the plugin would keep track of things like `name`, `address`, `last4`, `token`, ... Not only such attributes are dependent on the payment method, but they are also dependent on the third party payment gateway, and also on the tokenization model.


Note that Kill Bill also supports a more advanced used case for payment routing, where the choice of the payment gateway is decided at run time
based on custom business rules. Additional information can be found in our [Payment Manual](http://docs.killbill.io/latest/userguide_payment.html) for more details.


The attributes are the following:

* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default `paymentMethodId`, immutable]*</span>: The external key provided from client.
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`isDefault`** <span style="color:#32A9C7">*[User generated]*</span>: Whether this payment method is used for automatic payments in the case of recurring billing.
* **`pluginName`** <span style="color:#32A9C7">*[User generated]*</span>: The plugin identifier. All payments operation associated with this payment method will be delegated to the payment plugin associated with this identifier.
* **`pluginInfo`** <span style="color:#32A9C7">*[User generated]*</span>:  Plugin specific section.

## Payment Methods

### Retrieve a payment method by id

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");
Boolean includedDeleted = false; // Will not include deleted
Boolean withPluginInfo = true; // Will not reflect plugin info
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

PaymentMethod paymentMethodJson = paymentMethodApi.getPaymentMethod(paymentMethodId, 
                                                                    includedDeleted, 
                                                                    withPluginInfo, 
                                                                    NULL_PLUGIN_PROPERTIES, 
                                                                    AuditLevel.NONE, 
                                                                    requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
{
    "paymentMethodId":"916619a4-02bb-4d3d-b3da-2584ac897b19",
    "externalKey":"coolPaymentMethod",
    "accountId":"84c7e0d4-a5ed-405f-a655-3ed16ae19997",
    "isDefault":false,
    "pluginName":"__EXTERNAL_PAYMENT__",
    "pluginInfo":null,
    "auditLogs":[]
}
```

```java
class PaymentMethod {
    org.killbill.billing.client.model.gen.PaymentMethod@c789046
    paymentMethodId: 3c449da6-7ec4-4c74-813f-f5055739a0b9
    externalKey: 7c13b1fb-5fa5-49cb-bbb6-50b0fa78a988
    accountId: 2b995dde-ce30-451f-8bbf-5bb9ed312505
    isDefault: true
    pluginName: noop
    pluginInfo: class PaymentMethodPluginDetail {
        externalPaymentMethodId: afcdfd42-1bad-4caf-86be-93a27da51c55
        isDefaultPaymentMethod: false
        properties: [class PluginProperty {
            key: CC_NAME
            value: Bozo
            isUpdatable: false
        }, class PluginProperty {
            key: CC_CITY
            value: SF
            isUpdatable: false
        }, class PluginProperty {
            key: CC_LAST_4
            value: 4365
            isUpdatable: false
        }, class PluginProperty {
            key: CC_STATE
            value: CA
            isUpdatable: false
        }, class PluginProperty {
            key: CC_COUNTRY
            value: Zimbawe
            isUpdatable: false
        }]
    }
    auditLogs: []
}
```
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
| **includedDeleted** | boolean | false | choose true to include deleted payment methods |
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |

**Returns**

Returns a payment method object.

### Retrieve a payment method by external key

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19?externalKey=coolPaymentMethod' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

String externalKey = "foo";
Boolean includedDeleted = false; // Will not include deleted
Boolean withPluginInfo = false; // Will not reflect plugin info
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

PaymentMethod paymentMethod = paymentMethodApi.getPaymentMethodByKey(externalKey, 
                                                                     includedDeleted,
                                                                     withPluginInfo,
                                                                     NULL_PLUGIN_PROPERTIES, 
                                                                     AuditLevel.NONE
                                                                     equestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
{
    "paymentMethodId":"916619a4-02bb-4d3d-b3da-2584ac897b19",
    "externalKey":"coolPaymentMethod",
    "accountId":"84c7e0d4-a5ed-405f-a655-3ed16ae19997",
    "isDefault":false,
    "pluginName":"__EXTERNAL_PAYMENT__",
    "pluginInfo":null,
    "auditLogs":[]
}
```

```java
class PaymentMethod {
    org.killbill.billing.client.model.gen.PaymentMethod@360d34cd
    paymentMethodId: c46dbe85-a14b-4d5b-8b0d-e6a07b7ff111
    externalKey: foo
    accountId: dae298f7-62b0-4774-a213-92f968693cdc
    isDefault: true
    pluginName: noop
    pluginInfo: null
    auditLogs: []
}
```
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
| **includedDeleted** | boolean | false | choose true to include deleted payment methods |
| **audit** | enum | false | level of audit logs returned |
| **withPluginInfo** | boolean | false | choose true if you want plugin info |

**Returns**

Returns a payment method object.

### Delete a payment method

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'X-Killbill-CreatedBy: demo' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19' 	
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");
Boolean deleteDefaultPmWithAutoPayOff = true; // Will delete default payment method with auto pay off
Boolean forceDefaultPmDeletion = true; // Will force default payment method deletion
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

paymentMethodApi.deletePaymentMethod(paymentMethodId, 
                                     deleteDefaultPmWithAutoPayOff, 
                                     forceDefaultPmDeletion, 
                                     NULL_PLUGIN_PROPERTIES, 
                                     requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
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

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **deleteDefaultPmWithAutoPayOff** | boolean | false | choose true to delete default payment method with auto pay off|
| **forceDefaultPmDeletion** | boolean | false | choose true to force default payment method deletion |

**Returns**

A `204` http status without content.


## Custom Fields

Custom fields are `{key, value}` attributes that can be attached to any customer resources, and in particularly on the `PaymentMethod` objects.

### Add custom fields to payment method

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Content-Type: application/json' \
    -H 'X-Killbill-CreatedBy: demo' \
    -d '[{ 
            "objectId": "916619a4-02bb-4d3d-b3da-2584ac897b19",
            "objectType": "PAYMENT_METHOD",
            "name": "Test Custom Field",
            "value": "test_value"
    }]' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19/customFields' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");

final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 paymentMethodId, 
                                 ObjectType.PAYMENT_METHOD, 
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

paymentMethodApi.createPaymentMethodCustomFields(paymentMethodId, 
                                                 customFields, 
                                                 requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19/customFields
< Content-Type: application/json
< Content-Length: 0
```

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: 3c449da6-7ec4-4c74-813f-f5055739a0b9
    objectType: PAYMENT_METHOD
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

###  Retrieve payment method custom fields

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19/customFields' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");

List<CustomField> customFields = paymentMethodApi.getPaymentMethodCustomFields(paymentMethodId,
                                                                               AuditLevel.NONE,
                                                                               requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
[
  {
    "customFieldId": "6d4c073b-fd89-4e39-9802-eba65f42492f",
    "objectId": "916619a4-02bb-4d3d-b3da-2584ac897b19",
    "objectType": "PAYMENT_METHOD",
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
    objectId: 3c449da6-7ec4-4c74-813f-f5055739a0b9
    objectType: PAYMENT_METHOD
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

###  Modify custom fields to payment method

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Content-Type: application/json' \
    -H 'X-Killbill-CreatedBy: demo' \
    -d '[{ 
            "customFieldId": "6d4c073b-fd89-4e39-9802-eba65f42492f",
            "value": "NewValue"
    }]' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19/customFields' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");

UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

paymentMethodApi.modifyPaymentMethodCustomFields(paymentMethodId, 
                                                 customFieldModified, 
                                                 requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
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

**Returns**

A `204` http status without content.

###  Remove custom fields from payment method

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}/customFields`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'X-Killbill-CreatedBy: demo' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/77e23878-8b9d-403b-bf31-93003e125712/customFields?customField=439ed0f8-9b37-4688-bace-e2595b1d3801' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("3c449da6-7ec4-4c74-813f-f5055739a0b9");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

paymentMethodApi.deletePaymentMethodCustomFields(paymentMethodId, 
                                                 customFieldsId, 
                                                 requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
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

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **customField** | string | true | the list of custom field object IDs that should be deleted. |

**Returns**

A `204` http status without content.


## Audit Logs

### Retrieve payment method audit logs with history by id

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods/{paymentMethodId}/auditLogsWithHistory`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/916619a4-02bb-4d3d-b3da-2584ac897b19/auditLogsWithHistory' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

UUID paymentMethodId = UUID.fromString("e9d95f16-a426-46d0-b76b-90814792fb36");

List<AuditLog> result = paymentMethodApi.getPaymentMethodAuditLogsWithHistory(paymentMethodId, requestOptions);
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
<
[
  {
    "changeType": "INSERT",
    "changeDate": "2018-07-19T14:56:07.000Z",
    "objectType": "PAYMENT_METHOD",
    "objectId": "916619a4-02bb-4d3d-b3da-2584ac897b19",
    "changedBy": "admin",
    "reasonCode": null,
    "comments": null,
    "userToken": "f77892e9-32bd-4d59-8039-5e12798b53fe",
    "history": 
    {
      "id": null,
      "createdDate": "2018-07-19T14:56:07.000Z",
      "updatedDate": "2018-07-19T14:56:07.000Z",
      "recordId": 10,
      "accountRecordId": 35,
      "tenantRecordId": 1,
      "externalKey": "unknown",
      "accountId": "84c7e0d4-a5ed-405f-a655-3ed16ae19997",
      "pluginName": "__EXTERNAL_PAYMENT__",
      "isActive": true,
      "active": true,
      "tableName": "PAYMENT_METHODS",
      "historyTableName": "PAYMENT_METHOD_HISTORY"
    }
  }
]
```

```java
//First element of the list
class AuditLog {
    changeType: INSERT
    changeDate: 2012-08-25T00:00:03.000Z
    objectType: PAYMENT_METHOD
    objectId: e9d95f16-a426-46d0-b76b-90814792fb36
    changedBy: Toto
    reasonCode: i am god
    comments: no comment
    userToken: 081ae8a2-b267-4808-8ae9-eb60f4e5a2d5
    history: {id=null, 
              createdDate=2012-08-25T00:00:03.000Z, 
              updatedDate=2012-08-25T00:00:03.000Z, 
              recordId=1, 
              accountRecordId=1, 
              tenantRecordId=1, 
              externalKey=85905d6e-64d6-4ac9-85d5-0ce45d37a426, 
              accountId=58780aff-a193-4544-9f82-6b3d91b040ac, 
              pluginName=noop, 
              isActive=true, 
              active=true, 
              tableName=PAYMENT_METHODS, 
              historyTableName=PAYMENT_METHOD_HISTORY}
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
         "email":"email@laposte.com",
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

## Pagination/Search

###  List payment methods

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods/pagination`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/pagination' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

Long offset = 0L;
Long limit = 1L;
String pluginName = null;
Boolean withPluginInfo = false;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;


PaymentMethods allPaymentMethods = paymentMethodApi.getPaymentMethods(offset,
                                                                      limit,
                                                                      pluginName,
                                                                      withPluginInfo
                                                                      NULL_PLUGIN_PROPERTIES,
                                                                      AuditLevel.NONE,
                                                                      requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
[
  {
    "paymentMethodId": "916619a4-02bb-4d3d-b3da-2584ac897b19",
    "externalKey": "coolPaymentMethod",
    "accountId": "84c7e0d4-a5ed-405f-a655-3ed16ae19997",
    "isDefault": false,
    "pluginName": "__EXTERNAL_PAYMENT__",
    "pluginInfo": null,
    "auditLogs": []
  },
  {
    "paymentMethodId": "dc89832d-18a3-42fd-b3be-cac074fddb36",
    "externalKey": "paypal",
    "accountId": "ca15adc4-1061-4e54-a9a0-15e773b3b154",
    "isDefault": false,
    "pluginName": "killbill-paypal-express",
    "pluginInfo": null,
    "auditLogs": []
  }
]
```

```java
//First element of the list
class PaymentMethod {
    org.killbill.billing.client.model.gen.PaymentMethod@3b058e2d
    paymentMethodId: 98420efb-142f-4437-9a93-817ded413313
    externalKey: e78ae144-8727-46f4-8cf2-63636813f232
    accountId: 73f59eee-abec-4d3f-ab62-21dba663bd25
    isDefault: true
    pluginName: noop
    pluginInfo: null
    auditLogs: []
}
```
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
| **offset** | long | false | offset |
| **limit** | long | false | limit search items |

**Returns**

Returns a list with all payment methods.

###  Search payment methods

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/paymentMethods/search/{searchKey}`

> Example Request:

```shell
curl \
    -u admin:password \
    -H 'X-Killbill-ApiKey: bob' \
    -H 'X-Killbill-ApiSecret: lazar' \
    -H 'Accept: application/json' \
    'http://127.0.0.1:8080/1.0/kb/paymentMethods/search/coolPaymentMethod' 
```

```java
import org.killbill.billing.client.api.gen.PaymentMethodApi;
protected PaymentMethodApi paymentMethodApi;

String searchKey = "4365";
Long offset = 0L;
Long limit = 100L;
String pluginName = null;
Boolean withPluginInfo = true;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

List<PaymentMethod> results = paymentMethodApi.searchPaymentMethods(searchKey, 
                                                                    offset, 
                                                                    limit, 
                                                                    pluginName, 
                                                                    withPluginInfo, 
                                                                    NULL_PLUGIN_PROPERTIES,  
                                                                    AuditLevel.NONE,  
                                                                    requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
<
[
  {
    "paymentMethodId": "916619a4-02bb-4d3d-b3da-2584ac897b19",
    "externalKey": "coolPaymentMethod",
    "accountId": "84c7e0d4-a5ed-405f-a655-3ed16ae19997",
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
    org.killbill.billing.client.model.gen.PaymentMethod@6b40b41a
    paymentMethodId: 62c434f7-41fe-497d-8fb0-c35bb6706180
    externalKey: 4ac4162a-ae9c-48ca-bb43-8a4bcd6c2717
    accountId: a6941a79-8b7b-4da7-99e0-bffc3d549f87
    isDefault: true
    pluginName: noop
    pluginInfo: class PaymentMethodPluginDetail {
        externalPaymentMethodId: 9ddcce2d-b65f-4e08-8006-1395e47ba97a
        isDefaultPaymentMethod: false
        properties: [class PluginProperty {
            key: CC_NAME
            value: Bozo
            isUpdatable: false
        }, class PluginProperty {
            key: CC_CITY
            value: SF
            isUpdatable: false
        }, class PluginProperty {
            key: CC_LAST_4
            value: 4365
            isUpdatable: false
        }, class PluginProperty {
            key: CC_STATE
            value: CA
            isUpdatable: false
        }, class PluginProperty {
            key: CC_COUNTRY
            value: Zimbawe
            isUpdatable: false
        }]
    }
    auditLogs: []
}
```
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
| **offset** | long | false | offset |
| **limit** | long | false | limit search items |

**Returns**

Return a list with payment methods matched with the search key entered.
