# Invoice Payment

## Invoice Payment Resource

The `Invoice Payment` resource represent the invoice payments created by the user.

The attributes are the following:

* **`targetInvoiceId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`accountId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`paymentId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`paymentNumber`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`paymentExternalKey`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`authAmount`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`capturedAmount`** <span style="color:#32A9C7">*(number, optional, read only*</span>
* **`purchasedAmount`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`refundedAmount`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`creditedAmount`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`currency`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`paymentMethodId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`transactions`** <span style="color:#32A9C7">*(Array[PaymentTransactionJson], optional, read only)*</span>
* **`paymentAttempts`** <span style="color:#32A9C7">*(Array[PaymentAttemptJson], optional, read only)*</span>
* **`auditLogs`** <span style="color:#32A9C7">*(Array[AuditLogJson], optional, read only)*</span>

## Retrieve a payment by id

**HTTP Request** 

`GET /1.0/kb/invoicePayments/{paymentId}`

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

## Record a chargeback

**HTTP Request** 

`POST /1.0/kb/invoicePayments/{paymentId}/chargebacks`

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

`POST /1.0/kb/invoicePayments/{paymentId}/chargebackReversals`

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