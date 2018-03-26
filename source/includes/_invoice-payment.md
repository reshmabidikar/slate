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
payment_id = 'payment_id'
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
| **withPluginInfo** | boolean | true | withPluginInfo |
| **withAttempts** | boolean | true | withAttempts |

**Returns**

Returns a invoice payment object.