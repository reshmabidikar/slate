# Invoice Payment

## Invoice Payment Resource

The `Invoice Payment` resource represent the invoice payments created by the user.

The attributes are the following:

* **`targetInvoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>
* **`authAmount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`capturedAmount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`purchasedAmount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`refundedAmount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`creditedAmount`** <span style="color:#32A9C7">"*[User or system generated]*</span>
* **`currency`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`paymentMethodId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`transactions`** <span style="color:#32A9C7">*[See `PaymentTransaction` bellow]*</span>
* **`paymentAttempts`** <span style="color:#32A9C7">*[`PaymentAttemptJson`]*</span>
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

## Retrieve a payment by id

**HTTP Request** 

`GET http://example.com/1.0/kb/invoicePayments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_id = '28aef37a-7655-4351-985a-02b961ae4ac7'
with_plugin_info = false
with_attempts = false

KillBillClient::Model::InvoicePayment.find_by_id(payment_id, 
                                                 with_plugin_info, 
                                                 with_attempts, 
                                                 @options)
```

> Example Response:

```ruby
{
   "targetInvoiceId":"375f1ade-b4eb-4344-bb64-e44fe7a5dea1",
   "accountId":"db0d9182-c7cf-4bb7-aa3e-73a9f7105606",
   "paymentId":"28aef37a-7655-4351-985a-02b961ae4ac7",
   "paymentNumber":"595",
   "paymentExternalKey":"28aef37a-7655-4351-985a-02b961ae4ac7",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"0e47ceb2-8cfc-4005-86ac-5fe88ecce8ce",
   "transactions":[
      {
         "transactionId":"37c0189d-737c-435c-bfbd-944aabe27d1b",
         "transactionExternalKey":"37c0189d-737c-435c-bfbd-944aabe27d1b",
         "paymentId":"28aef37a-7655-4351-985a-02b961ae4ac7",
         "paymentExternalKey":"28aef37a-7655-4351-985a-02b961ae4ac7",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a invoice payment object.

## Complete an existing transaction

**HTTP Request** 

`PUT /1.0/kb/invoicePayments/{paymentId}`

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

## Record a chargeback

**HTTP Request** 

`POST http://example.com/1.0/kb/invoicePayments/{paymentId}/chargebacks`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_id = '2276b3c9-4e51-41b2-b5bf-9ddc11582ee4'
amount = '50.0'
currency = 'USD'
effective_date = "2013-08-01"

KillBillClient::Model::InvoicePayment.chargeback(payment_id, 
                                                 amount,
                                                 currency,
                                                 effective_date,
                                                 user, 
                                                 reason,
                                                 comment, 
                                                 options)
```

> Example Response:

```ruby
{
   "targetInvoiceId":"dd185d1c-a4c5-4420-b06a-df42af446975",
   "accountId":"bb43a670-c644-4121-a981-ba5f5dac3b94",
   "paymentId":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
   "paymentNumber":"339",
   "paymentExternalKey":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":0.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"a9e97ad3-ef17-4475-8464-25d09e3b5290",
   "transactions":[
      {
         "transactionId":"49eff7ec-2982-428a-b4f0-ed99dcbfbb82",
         "transactionExternalKey":"49eff7ec-2982-428a-b4f0-ed99dcbfbb82",
         "paymentId":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
         "paymentExternalKey":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"16d55de4-5dd8-4306-87c3-d05db796d90f",
         "transactionExternalKey":"d18943b1-96b7-49fd-9f11-78d55f361b18",
         "paymentId":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
         "paymentExternalKey":"2276b3c9-4e51-41b2-b5bf-9ddc11582ee4",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

## Record a chargeback reversal

**HTTP Request** 

`POST http://example.com/1.0/kb/invoicePayments/{paymentId}/chargebackReversals`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_id = '7a5d4997-5d44-4a82-8371-a410ea5615f4'
chargeback_transaction_external_key = '99c45d07-abe4-4bc7-a207-0524548c1b08'
effective_date = "2013-08-01"

KillBillClient::Model::InvoicePayment.chargeback_reversal(payment_id,
                                                          chargeback_transaction_external_key, 
                                                          effective_date, 
                                                          user, 
                                                          reason, 
                                                          comment, 
                                                          options)
```

> Example Response:

```ruby
{
   "targetInvoiceId":"dee84f4e-5781-442c-845e-423a6bcb6b2b",
   "accountId":"93182158-c000-4c8d-893e-1e758e975a2a",
   "paymentId":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
   "paymentNumber":"338",
   "paymentExternalKey":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"5d32f8f4-24b1-4519-85e4-356b5c087f76",
   "transactions":[
      {
         "transactionId":"ef824f7f-30f6-4b08-82d4-5add7e7a773f",
         "transactionExternalKey":"ef824f7f-30f6-4b08-82d4-5add7e7a773f",
         "paymentId":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "paymentExternalKey":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"90fef451-10d6-4ebd-a126-43c3ab4315c2",
         "transactionExternalKey":"99c45d07-abe4-4bc7-a207-0524548c1b08",
         "paymentId":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "paymentExternalKey":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"a1c3648c-f3c0-4c0f-9eb0-e56c7ab9c798",
         "transactionExternalKey":"99c45d07-abe4-4bc7-a207-0524548c1b08",
         "paymentId":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "paymentExternalKey":"7a5d4997-5d44-4a82-8371-a410ea5615f4",
         "transactionType":"CHARGEBACK",
         "effectiveDate":"2013-08-01T06:00:05.000Z",
         "processedAmount":0.0,
         "status":"PAYMENT_FAILURE",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```


**Query Parameters**

None.

**Returns**

Returns a invoice payment object.

## Remove custom fields from payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/invoicePayments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

invoice_payment.remove_custom_field(custom_field_id,                                                                                            
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

## Retrieve payment custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/invoicePayments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

invoice_payment.custom_fields(audit, options)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"INVOICE_PAYMENT",
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

## Add custom fields to payment

**HTTP Request** 

`POST http://example.com/1.0/kb/invoicePayments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'INVOICE_PAYMENT'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

invoice_payment.add_custom_field(custom_field, 
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
      "objectType":"INVOICE_PAYMENT",
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

## Modify custom fields to payment

**HTTP Request** 

`PUT http://example.com/1.0/kb/invoicePayments/{paymentId}/customFields`

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

invoice_payment.modify_custom_field(custom_field,                                                                                            
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
      "objectType":"INVOICE_PAYMENT",
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

## Refund a payment, and adjust the invoice if needed

**HTTP Request** 

`POST http://example.com/1.0/kb/invoicePayments/{paymentId}/refunds`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment_id = '8d85a8e8-c94b-438f-aac1-e8cb436b2c05'
amount ='50.0'
adjustments = nil
KillBillClient::Model::InvoicePayment.refund(payment_id, 
                                             amount, 
                                             adjustments, 
                                             user, 
                                             reason, 
                                             comment, 
                                             options)
```

> Example Response:

```ruby
{
   "targetInvoiceId":"045900ff-5b2a-4709-b7bd-d70501998dd5",
   "accountId":"dc7d2b03-d989-4cfa-96db-f02b6475950e",
   "paymentId":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
   "paymentNumber":"347",
   "paymentExternalKey":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":20.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"4103cf10-08b4-4685-b3c2-1c2c88b0f32f",
   "transactions":[
      {
         "transactionId":"1cd767ed-b3c1-4369-a447-09308f3bebf4",
         "transactionExternalKey":"1cd767ed-b3c1-4369-a447-09308f3bebf4",
         "paymentId":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
         "paymentExternalKey":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:02.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"69f72535-dd5d-4784-b0a6-05d6f64359cf",
         "transactionExternalKey":"d7118799-0268-45c9-a0e0-455fa2731a8b",
         "paymentId":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
         "paymentExternalKey":"8d85a8e8-c94b-438f-aac1-e8cb436b2c05",
         "transactionType":"REFUND",
         "amount":20.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":20.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **externalPayment** | boolean | false | choose true if the payment method is external |
| **paymentMethodId** | string | false | payment method id |

**Returns**

Returns a invoice payment object.

## Remove tags from payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/invoicePayments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

invoice_payment.remove_tag(tag_name,
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

**Returns**

A `200` http status without content.

## Retrieve payment tags

**HTTP Request** 

`GET http://example.com/1.0/kb/invoicePayments/{paymentId}/tags`

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

invoice_payment.tags(included_deleted,
                     audit,
                     options)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"INVOICE_PAYMENT",
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

Returns a list of invoice payment tag objects.

## Add tags to payment

**HTTP Request** 

`POST http://example.com/1.0/kb/invoicePayments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

invoice_payment.add_tag(tag_name,
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
      "objectType":"INVOICE_PAYMENT",
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

Returns a invoice payment tag object.