# Payment

## Payment Resource

The `Payment` resource represents the payments associated to a given customer `Account`. Payments can be associated to a specific invoice, or they can be
standalone, unrelated to any invoice operations. In the former case, the relationship between a given invoice and potentially a series of payments is kept
through the `InvoicePayment` relashionship.

Each payment operation, such as authorization, refund, ... is represented as a `PaymentTransaction`. A `Payment` can therefore have N `PaymentTransaction`, each of which tracking a different call with the third party gateway. Payment transactions have a status indicating their success or failure. Please refer to the [payment state section of our payment manual](http://docs.killbill.io/latest/userguide_payment.html#_payment_states) for more details.

 

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`paymentNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default `paymentId`, immutable]*</span>: The external key provided from client.
* **`authAmount`** <span style="color:#32A9C7">*[User generated, immutable]</span>: The total authorization amount on this payment -- often there is one associated authorization `PaymentTransaction`, and this amount will match the `amount` of that transaction.
* **`capturedAmount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The total capture amount on this payment.
* **`purchasedAmount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The total purchase amount on this payment -- a `PURCHASE` operation is an auto-capture transaction.
* **`refundedAmount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The total refund amount on this payment.
* **`creditedAmount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The total credit amount on this payment.
* **`currency`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: The currency associated with this payment.
* **`paymentMethodId`** <span style="color:#32A9C7">*[User generated, immutable]</span>: The `ID` of the payment method used for the payment.
* **`transactions`** <span style="color:#32A9C7">*[See `PaymentTransaction` bellow]*</span>: The list of `PaymentTransaction` associated wtih this payment.
* **`paymentAttempts`** <span style="color:#32A9C7">*[`PaymentAttempt`]*</span>: The list of payment retries -- only effective when the system has been configured to retry failed transactions.

### PaymentTransaction

* **`transactionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`transactionExternalKey`** <span style="color:#32A9C7">*[User generated, default transactionId, immutable]*</span>: The external key provided from client.
* **`paymentId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`paymentExternalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>: The (`Payment`) external key provided from client.
* **`amount`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Amount for this transaction.
* **`currency`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Currency for this transaction.
* **`effectiveDate`** <span style="color:#32A9C7">*[User generated, immutable]*</span>  TODO
* **`processedAmount`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The amount processed by the gateway -- will often match the `amount`, but could be different - e.g currency conversion
* **`processedCurrency`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The currency processed by the gateway -- will often match the `currency`, but could be different - e.g currency conversion
* **`status`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Transaction status 
* **`gatewayErrorCode`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Error code returned by the payment gateway.
* **`gatewayErrorMsg`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Error message returned by the payment gateway.
* **`firstPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: Payment gateway reference.
* **`secondPaymentReferenceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: This is typically the `ID` from the actual payment processor, when the gateway is a PSP.
* **`properties`** <span style="color:#32A9C7">*[User generated, immutable]*</span>: Properties passed during payment operation to be interpreted by the plugin - those are plugin specific.


## Capture an existing authorization

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("33eae7eb-0ad4-45d6-a12a-940e0b460be4");

PaymentTransaction captureTransaction = new PaymentTransaction();
captureTransaction.setPaymentId(paymentId);
captureTransaction.setAmount(BigDecimal.ONE);
captureTransaction.setCurrency(Currency.USD);
captureTransaction.setPaymentExternalKey("d86ecaaa-10ad-4b00-afa8-e469dd3d4bb3");
captureTransaction.setTransactionExternalKey("9cc6ebab-9a92-44f1-a0dc-e111aa7c368d");

ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payment capturedPayment = paymentApi.captureAuthorization(paymentId, 
                                                          captureTransaction, 
                                                          NULL_PLUGIN_NAMES, 
                                                          NULL_PLUGIN_PROPERTIES, 
                                                          requestOptions);
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "b2a187b8-0028-4de8-b349-0ebe4e714a5a"
transaction.amount     = "483.22"
transaction.currency   = "BTC"

transaction.capture(user, 
                    reason, 
                    comment, 
                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'b2a187b8-0028-4de8-b349-0ebe4e714a5a'
body = PaymentTransaction(payment_id=payment_id, 
                          amount=50.0, 
                          currency='USD')

paymentApi.capture_authorization(payment_id,
                                 body,
                                 created_by,
                                 api_key,
                                 api_secret)
```

> Example Response:

```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@e53497ae
    accountId: c810059c-e90d-4cad-ba19-74acefd783b8
    paymentId: 33eae7eb-0ad4-45d6-a12a-940e0b460be4
    paymentNumber: 1
    paymentExternalKey: d86ecaaa-10ad-4b00-afa8-e469dd3d4bb3
    authAmount: 10.00
    capturedAmount: 1.00
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 30456139-9a6f-4abc-aa21-08ce115a150f
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@70dc2d6
        transactionId: 6c723fdd-1cd8-4515-8228-6b990af63c5d
        transactionExternalKey: 9cc6ebab-9a92-44f1-a0dc-e111aa7c368d
        paymentId: 33eae7eb-0ad4-45d6-a12a-940e0b460be4
        paymentExternalKey: d86ecaaa-10ad-4b00-afa8-e469dd3d4bb3
        transactionType: AUTHORIZE
        amount: 10.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:09.000Z
        processedAmount: 10.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@af3af9a3
        transactionId: 518c64b6-e863-494b-ad74-ba4fd2c0e768
        transactionExternalKey: cdfd3aa2-362e-4cd1-927e-c4ca517a432a
        paymentId: 33eae7eb-0ad4-45d6-a12a-940e0b460be4
        paymentExternalKey: d86ecaaa-10ad-4b00-afa8-e469dd3d4bb3
        transactionType: CAPTURE
        amount: 1.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:26.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
```ruby
{
   "accountId":"fc82dba5-69e0-492c-be50-bc7e1642f987",
   "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
   "paymentNumber":"63",
   "paymentExternalKey":"payment1-323475",
   "authAmount":240922.1504832,
   "capturedAmount":483.22,
   "purchasedAmount":0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"BTC",
   "paymentMethodId":"395cfcd1-7a7d-40a6-bc5d-f722833072d2",
   "transactions":[
      {
         "transactionId":"41c95fbc-c9a2-4981-a7ef-7f16f20055ae",
         "transactionExternalKey":"payment1-323475-auth1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"AUTHORIZE",
         "amount":240922.1504832,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":240922.1504832,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"a6afaec2-4e6f-4e4c-af94-9a03c39c6032",
         "transactionExternalKey":"payment1-323475-capture1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"CAPTURE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Capture an existing authorization [using external key]

**HTTP Request** 

`POST http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

PaymentTransaction captureTransaction = new PaymentTransaction();
captureTransaction.setAmount(BigDecimal.ONE);
captureTransaction.setCurrency(Currency.USD);
captureTransaction.setPaymentExternalKey("8e0c507a-05f9-4572-a57d-3f742cdc040d");
captureTransaction.setTransactionExternalKey("9b4dbbe7-749d-4c96-a2e7-57b8bff3bf05");

ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payment capturedPayment2 = paymentApi.captureAuthorizationByExternalKey(captureTransaction, 
                                                                        NULL_PLUGIN_NAMES, 
                                                                        NULL_PLUGIN_PROPERTIES, 
                                                                        requestOptions);
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.amount                   = "483.22"
transaction.currency                 = "BTC"
transaction.transaction_external_key = "payment1-323475"

transaction.capture(user, 
                    reason, 
                    comment, 
                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0,
                          currency='USD')

paymentApi.capture_authorization_by_external_key(body, 
                                                 created_by, 
                                                 api_key, 
                                                 api_secret)
```

> Example Response:

```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@1fcfe41c
    accountId: 01792680-3c3c-4d4f-9ac4-51b82c1f76e8
    paymentId: f0f6129d-f236-4d6c-93b6-63c8fcf7b7a5
    paymentNumber: 1
    paymentExternalKey: 8e0c507a-05f9-4572-a57d-3f742cdc040d
    authAmount: 10.00
    capturedAmount: 2.00
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: bd24759f-b403-443a-bc5b-1fe6a18fa2f3
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@e42a70ce
        transactionId: fddec163-6fb7-42f5-9b8f-20ae7b63dbf4
        transactionExternalKey: 27427503-7be2-4e61-b188-08480f72565f
        paymentId: f0f6129d-f236-4d6c-93b6-63c8fcf7b7a5
        paymentExternalKey: 8e0c507a-05f9-4572-a57d-3f742cdc040d
        transactionType: AUTHORIZE
        amount: 10.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:07.000Z
        processedAmount: 10.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@2dacb8e7
        transactionId: 702f6edf-fb9e-4f91-9b6d-0b851a05ea6d
        transactionExternalKey: 9b4dbbe7-749d-4c96-a2e7-57b8bff3bf05
        paymentId: f0f6129d-f236-4d6c-93b6-63c8fcf7b7a5
        paymentExternalKey: 8e0c507a-05f9-4572-a57d-3f742cdc040d
        transactionType: CAPTURE
        amount: 1.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:08.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@867e1b5f
        transactionId: f1b753c7-76aa-4584-8a91-6c2990dd9bda
        transactionExternalKey: 5c2dc6ae-ae71-4882-ab57-b29d47a54cc0
        paymentId: f0f6129d-f236-4d6c-93b6-63c8fcf7b7a5
        paymentExternalKey: 8e0c507a-05f9-4572-a57d-3f742cdc040d
        transactionType: CAPTURE
        amount: 1.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:17.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
```ruby
{
   "accountId":"fc82dba5-69e0-492c-be50-bc7e1642f987",
   "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
   "paymentNumber":"63",
   "paymentExternalKey":"payment1-323475",
   "authAmount":483.22,
   "capturedAmount":483.22,
   "purchasedAmount":0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"BTC",
   "paymentMethodId":"395cfcd1-7a7d-40a6-bc5d-f722833072d2",
   "transactions":[
      {
         "transactionId":"41c95fbc-c9a2-4981-a7ef-7f16f20055ae",
         "transactionExternalKey":"payment1-323475-auth1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"AUTHORIZE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"a6afaec2-4e6f-4e4c-af94-9a03c39c6032",
         "transactionExternalKey":"payment1-323475-capture1",
         "paymentId":"b2a187b8-0028-4de8-b349-0ebe4e714a5a",
         "paymentExternalKey":"payment1-323475",
         "transactionType":"CAPTURE",
         "amount":483.22,
         "currency":"BTC",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":483.22,
         "processedCurrency":"BTC",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
Boolean withPluginInfo = false; // Will not reflect plugin info
Boolean withAttempts = true; // Will reflect payment attempts
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payment payment = paymentApi.getPayment(paymentId, 
                                        withPluginInfo, 
                                        withAttempts, 
                                        NULL_PLUGIN_PROPERTIES, 
                                        AuditLevel.NONE, 
                                        requestOptions);
```

```ruby
payment_id = "12c70604-cede-4df3-a321-38be4d176e9a"
with_plugin_info = false
with_attempts = false

KillBillClient::Model::Payment.find_by_id(payment_id, 
                                          with_plugin_info, 
                                          with_attempts, 
                                          options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e'

paymentApi.get_payment(payment_id, api_key, api_secret)
```

> Example Response:

```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@b45dd4ce
    accountId: c468fd02-8c07-4dad-b11a-a0daf927a4b9
    paymentId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    paymentNumber: 1
    paymentExternalKey: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 0ccbb24b-6279-43ab-9322-bdf07f18b601
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@d7a9d32e
        transactionId: 03be8f74-0ca9-479a-993d-e6fbb35af281
        transactionExternalKey: 03be8f74-0ca9-479a-993d-e6fbb35af281
        paymentId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
        paymentExternalKey: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
        transactionType: PURCHASE
        amount: 249.95
        currency: USD
        effectiveDate: 2012-09-26T00:00:04.000Z
        processedAmount: 0.00
        processedCurrency: USD
        status: PAYMENT_FAILURE
        gatewayErrorCode: gatewayErrorCode
        gatewayErrorMsg: gatewayError
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: [class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@da337892
        accountId: c468fd02-8c07-4dad-b11a-a0daf927a4b9
        paymentMethodId: 0ccbb24b-6279-43ab-9322-bdf07f18b601
        paymentExternalKey: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
        transactionId: 03be8f74-0ca9-479a-993d-e6fbb35af281
        transactionExternalKey: 03be8f74-0ca9-479a-993d-e6fbb35af281
        transactionType: PURCHASE
        effectiveDate: 2012-09-26T00:00:04.000Z
        stateName: RETRIED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: 052a9fae-2bc5-44e0-81da-181aae56d869
            isUpdatable: false
        }]
        auditLogs: []
    }, class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@c492f721
        accountId: c468fd02-8c07-4dad-b11a-a0daf927a4b9
        paymentMethodId: 0ccbb24b-6279-43ab-9322-bdf07f18b601
        paymentExternalKey: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
        transactionId: null
        transactionExternalKey: 03be8f74-0ca9-479a-993d-e6fbb35af281
        transactionType: PURCHASE
        effectiveDate: 2012-10-04T00:00:05.000Z
        stateName: SCHEDULED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: 052a9fae-2bc5-44e0-81da-181aae56d869
            isUpdatable: false
        }]
        auditLogs: []
    }]
    auditLogs: []
}
```
```ruby
{
   "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
   "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
   "paymentNumber":"65",
   "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
   "transactions":[
      {
         "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"dff69d54-9593-4d19-893e-287720272175",
         "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:06.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
{'account_id': '1686f19d-bc3a-4a4b-987f-837b0547df50',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
 'payment_id': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
 'payment_method_id': '54c9a68e-155d-44ec-b5a0-694f9a4e0962',
 'payment_number': '428',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 15, 58, 4, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
                   'payment_id': 'ce88ae5b-7ec0-4e14-9ea1-fffe4411278e',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '0eff43b1-133e-4a8b-ab75-061d72a1879c',
                   'transaction_id': '0eff43b1-133e-4a8b-ab75-061d72a1879c',
                   'transaction_type': 'AUTHORIZE'}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

String externalPaymentKey = "11b28b2e-a377-4b95-b712-d71cbcb28f80";
Boolean withPluginInfo = false; // Will not reflect plugin info
Boolean withAttempts = false; // Will not reflect payment attempts
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payment payment = paymentApi.getPaymentByExternalKey(externalPaymentKey,
                                                     withPluginInfo, 
                                                     withAttempts, 
                                                     NULL_PLUGIN_PROPERTIES, 
                                                     AuditLevel.NONE, 
                                                     requestOptions);` `
```
```ruby
external_key = "example_payment_external_key"
with_plugin_info = false
with_attempts = false

KillBillClient::Model::Payment.find_by_external_key(external_key, 
                                                    with_plugin_info, 
                                                    with_attempts, 
                                                    options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key' 

paymentApi.get_payment_by_external_key(payment_external_key,
                                       api_key,
                                       api_secret)
```

> Example Response:

```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@d49bf96c
    accountId: e13ed77c-79a8-4cb5-9fbf-66d053920d14
    paymentId: 48f8bc99-43a7-4d79-980c-24cfa8d0c2f4
    paymentNumber: 1
    paymentExternalKey: 11b28b2e-a377-4b95-b712-d71cbcb28f80
    authAmount: 10.00
    capturedAmount: 2.00
    purchasedAmount: 0
    refundedAmount: 2.00
    creditedAmount: 0
    currency: USD
    paymentMethodId: 14b727a5-794b-4ea8-82da-5942f54f6432
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@cf9f2f67
        transactionId: 39b27abc-a657-4b10-838d-7c69dba49853
        transactionExternalKey: 9bf756e6-e758-4092-a2b5-faa1c4e74038
        paymentId: 48f8bc99-43a7-4d79-980c-24cfa8d0c2f4
        paymentExternalKey: 11b28b2e-a377-4b95-b712-d71cbcb28f80
        transactionType: AUTHORIZE
        amount: 10.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:04.000Z
        processedAmount: 10.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@11a2380d
        transactionId: d67d8daf-1bb3-495a-9d9f-020f51a152a2
        transactionExternalKey: f1895ba0-3b53-45b4-8ae1-64c9e9618dea
        paymentId: 48f8bc99-43a7-4d79-980c-24cfa8d0c2f4
        paymentExternalKey: 11b28b2e-a377-4b95-b712-d71cbcb28f80
        transactionType: CAPTURE
        amount: 1.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:05.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@7a6b1a43
        transactionId: 2ead1581-22c1-4a69-a576-8df55e765071
        transactionExternalKey: 1e968315-f363-42fb-b9e8-3ea3cbf0fc84
        paymentId: 48f8bc99-43a7-4d79-980c-24cfa8d0c2f4
        paymentExternalKey: 11b28b2e-a377-4b95-b712-d71cbcb28f80
        transactionType: CAPTURE
        amount: 1.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:05.000Z
        processedAmount: 1.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@1606355a
        transactionId: 8a50cc62-9063-4581-a9ab-320dc1b8f0c9
        transactionExternalKey: 0942d27a-0d38-498e-a58d-0733b70454c7
        paymentId: 48f8bc99-43a7-4d79-980c-24cfa8d0c2f4
        paymentExternalKey: 11b28b2e-a377-4b95-b712-d71cbcb28f80
        transactionType: REFUND
        amount: 2.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:06.000Z
        processedAmount: 2.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
```ruby
{
   "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
   "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
   "paymentNumber":"65",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
   "transactions":[
      {
         "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"dff69d54-9593-4d19-893e-287720272175",
         "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
         "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
         "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
         "transactionType":"REFUND",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:06.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
{'account_id': '35e08817-3fcd-46a2-aa35-148bbe47c2d9',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'sample_external_key',
 'payment_id': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
 'payment_method_id': '41cc673a-2030-4ad1-ad91-0a2a22b8732b',
 'payment_number': '430',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 17, 14, 32, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
                   'payment_id': '14002a0b-3b78-4c94-9297-6b79fe805d0c',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '8c0bfe29-44b2-4aaf-937a-e368c233dccf',
                   'transaction_id': '8c0bfe29-44b2-4aaf-937a-e368c233dccf',
                   'transaction_type': 'AUTHORIZE'}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a payment object.

## Complete an existing transaction [payment]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
PaymentTransaction body = new PaymentTransaction();
body.setPaymentId(paymentId);

ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

paymentApi.completeTransaction(paymentId, 
                               body, 
                               NULL_PLUGIN_NAMES, 
                               NULL_PLUGIN_PROPERTIES, 
                               requestOptions);
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "7dcda896-808b-414c-aad4-74ddc98e3dcb"
refresh_options        = nil

transaction.complete_initial_transaction(user, 
                                         reason, 
                                         comment, 
                                         options, 
                                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '7dcda896-808b-414c-aad4-74ddc98e3dcb'
body = PaymentTransaction(payment_id=payment_id)

paymentApi.complete_transaction(payment_id,
                                body,
                                created_by,
                                api_key,
                                api_secret)
```

> Example Response:

```java
no content
```
```ruby
{
   "accountId":"f25f5fe5-63ab-4478-89f1-cc868982f19a",
   "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
   "paymentNumber":"84",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"0c6f5c90-3b90-4a35-b378-c22a2bea598b",
   "transactions":[
      {
         "transactionId":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "transactionExternalKey":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "paymentExternalKey":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "transactionType":"PURCHASE",
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
```python
no content
```

**Query Parameters**

None.

**Returns**

A `204` http status without content.

## Complete an existing transaction [using external key]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

String externalPaymentKey = "11b28b2e-a377-4b95-b712-d71cbcb28f80";
ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

PaymentTransaction body = new PaymentTransaction();
body.setPaymentExternalKey(externalPaymentKey);

paymentApi.completeTransactionByExternalKey(body, 
                                            NULL_PLUGIN_NAMES, 
                                            NULL_PLUGIN_PROPERTIES, 
                                            requestOptions);
```

```ruby
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
refresh_options                  = nil

transaction.complete_initial_transaction(user, 
                                         reason, 
                                         comment, 
                                         options, 
                                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key)

paymentApi.complete_transaction_by_external_key(body,
                                                created_by,
                                                api_key,
                                                api_secret)
```

> Example Response:

```java
no content
```
```ruby
{
   "accountId":"f25f5fe5-63ab-4478-89f1-cc868982f19a",
   "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
   "paymentNumber":"84",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"0c6f5c90-3b90-4a35-b378-c22a2bea598b",
   "transactions":[
      {
         "transactionId":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "transactionExternalKey":"bfc95df3-fbaa-427d-a398-fe66c319a55b",
         "paymentId":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "paymentExternalKey":"7dcda896-808b-414c-aad4-74ddc98e3dcb",
         "transactionType":"PURCHASE",
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
```python
no content
```

**Query Parameters**

None.

**Returns**

A `204` http status without content.

## Void an existing payment

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
PaymentTransaction body = new PaymentTransaction();
body.setPaymentId(paymentId);

ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

paymentApi.voidPayment(paymentId, 
                       body, 
                       NULL_PLUGIN_NAMES, 
                       NULL_PLUGIN_PROPERTIES, 
                       requestOptions);
```

```ruby
transaction             = KillBillClient::Model::Transaction.new
transaction.payment_id  = "29b34a3d-d301-4e57-8fc2-2c0a201c4fd0"

transaction.void(user, 
                 reason, 
                 comment, 
                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '29b34a3d-d301-4e57-8fc2-2c0a201c4fd0'
body = PaymentTransaction(payment_id=payment_id)

paymentApi.void_payment(payment_id,
                        body,
                        created_by,
                        api_key,
                        api_secret)
```
> Example Response:

```java
no content
```
```ruby
{
   "transactionId":"29b34a3d-d301-4e57-8fc2-2c0a201c4fd0",
   "transactionExternalKey":"payment2-121268-void",
   "paymentId":"275889ca-60aa-4801-9b53-8b2e0b9844ca",
   "paymentExternalKey":"payment2-121268",
   "transactionType":"VOID",
   "effectiveDate":"2013-08-01T06:00:07.000Z",
   "processedAmount":0.0,
   "status":"SUCCESS",
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment transaction object.

## Void an existing payment [using external key]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

String paymentExternalKey = "cca08349-8b26-41c7-bfcc-2e3cf70a0f28";
PaymentTransaction body = new PaymentTransaction();
body.setPaymentExternalKey(paymentExternalKey);

ImmutableList<String> NULL_PLUGIN_NAMES = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

paymentApi.voidPaymentByExternalKey(body, 
                                    NULL_PLUGIN_NAMES, 
                                    NULL_PLUGIN_PROPERTIES, 
                                    requestOptions);
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "payment2-121268-void"

transaction.void(user, 
                 reason, 
                 comment, 
                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key)

paymentApi.void_payment_by_external_key(body,
                                        created_by,
                                        api_key,
                                        api_secret)
```
> Example Response:

```java
no content
```
```ruby
{
   "transactionId":"29b34a3d-d301-4e57-8fc2-2c0a201c4fd0",
   "transactionExternalKey":"payment2-121268-void",
   "paymentId":"275889ca-60aa-4801-9b53-8b2e0b9844ca",
   "paymentExternalKey":"payment2-121268",
   "transactionType":"VOID",
   "effectiveDate":"2013-08-01T06:00:07.000Z",
   "processedAmount":0.0,
   "status":"SUCCESS",
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

A `204` http status without content.

## Retrieve payment audit logs with history by id

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/auditLogsWithHistory`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

List<AuditLog> paymentAuditLogWithHistory = paymentApi.getPaymentAuditLogsWithHistory(paymentId, 
                                                                                      requestOptions);
```

```python
accountApi = killbill.api.AccountApi()
account_id = 'c62d5f6d-0b57-444d-bf9b-dd23e781fbda'

accountApi.get_account_audit_logs_with_history(account_id, api_key, api_secret)
```

```ruby
account.audit_logs_with_history(options)
```

> Example Response:

```shell
**TODO**
```
```java
//First element of the list
class AuditLog {
    changeType: INSERT
    changeDate: 2012-08-25T00:00:02.000Z
    objectType: PAYMENT
    objectId: 5f8d8211-973b-40c2-b996-eb64c545a651
    changedBy: Toto
    reasonCode: i am god
    comments: no comment
    userToken: 2529c9c2-9916-4306-9270-d2bfa8bfb44b
    history: {id=null, 
              createdDate=2012-08-25T00:00:02.000Z, 
              updatedDate=2012-08-25T00:00:02.000Z, 
              recordId=1, 
              accountRecordId=1, 
              tenantRecordId=1, 
              accountId=d6bf4cff-9e13-460f-b375-f71f7daaaa83, 
              paymentNumber=null, 
              paymentMethodId=abd4eb92-5518-4aff-8568-dac97fe81586, 
              externalKey=fa5bb343-ad44-41d3-b6f0-21a61efcbb5b, 
              stateName=null, 
              lastSuccessStateName=null, 
              tableName=PAYMENTS, 
              historyTableName=PAYMENT_HISTORY}
}
```
```ruby
[
   {
      "changeType":"INSERT",
      "changeDate":"2013-08-01T06:00:00.000Z",
      "objectType":"ACCOUNT",
      "objectId":"08a1c2e4-687f-48ca-9c38-888108a2ce0a",
      "changedBy":"test_account_tags",
      "userToken":"5c0632c3-6567-4b0b-8e37-e2a9bb9ab6b2",
      "history":{
         "id":null,
         "createdDate":"2013-08-01T06:00:00.000Z",
         "updatedDate":"2013-08-01T06:00:00.000Z",
         "recordId":505,
         "accountRecordId":505,
         "tenantRecordId":822,
         "externalKey":"1527086785-621747",
         "email":"kill@bill.com",
         "name":"KillBillClient",
         "firstNameLength":null,
         "currency":"USD",
         "parentAccountId":null,
         "isPaymentDelegatedToParent":null,
         "billingCycleDayLocal":0,
         "paymentMethodId":null,
         "referenceTime":"2013-08-01T06:00:00.000Z",
         "timeZone":"UTC",
         "locale":"fr_FR",
         "address1":"7, yoyo road",
         "address2":"Apt 5",
         "companyName":"Unemployed",
         "city":"San Francisco",
         "stateOrProvince":"California",
         "country":"US",
         "postalCode":"94105",
         "phone":null,
         "notes":null,
         "migrated":null,
         "tableName":"ACCOUNT",
         "historyTableName":"ACCOUNT_HISTORY"
      }
   }
]
```
```python
[{'change_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc()),
 'change_type': 'INSERT',
 'changed_by': 'test',
 'comments': None,
 'history': {'created_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc()),
             'id': None,
             'updated_date': datetime.datetime(2018, 5, 23, 14, 43, 41, tzinfo=tzutc())},
 'object_id': 'c62d5f6d-0b57-444d-bf9b-dd23e781fbda',
 'object_type': 'ACCOUNT',
 'reason_code': None,
 'user_token': '40e771bf-160e-4ff6-82be-463f2d9e634d'}]
```

**Query Parameters**

None.

**Returns**
    
Returns a list of account audit logs with history.

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
transaction                = KillBillClient::Model::Transaction.new
transaction.payment_id     = "42ab1653-051f-416c-8c70-bf5d4061d4fa"
transaction.amount         = '50.0'
transaction.currency       = 'USD'
transaction.effective_date = nil
refresh_options            = nil

transaction.chargeback(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '42ab1653-051f-416c-8c70-bf5d4061d4fa'
body = PaymentTransaction(payment_id=payment_id,
                          amount=50.0,
                          currency='USD',
                          effective_date=None)

paymentApi.chargeback_payment(payment_id,
                              body,
                              created_by,
                              api_key,
                              api_secret)
```

> Example Response:

```ruby
{
   "accountId":"82d3625e-65f0-403e-a3aa-8077accb4295",
   "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "paymentNumber":"67",
   "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":0.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"bde4c67d-4069-4d1c-bd46-029ddda0532f",
   "transactions":[
      {
         "transactionId":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "transactionExternalKey":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
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
         "transactionId":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "transactionExternalKey":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
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
```python
no content
```

**Query Parameters**

None. 

**Returns**

Returns a payment object.

## Record a chargeback [using external key]

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
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
transaction.amount               = '50.0'
transaction.currency             = 'USD'
transaction.effective_date       = nil
refresh_options                  = nil

transaction.chargeback(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'sample_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0,
                          currency='USD',
                          effective_date=None)

paymentApi.chargeback_payment_by_external_key(body,
                                              created_by,
                                              api_key,
                                              api_secret)
```

> Example Response:

```ruby
{
   "accountId":"82d3625e-65f0-403e-a3aa-8077accb4295",
   "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
   "paymentNumber":"67",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":0.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"bde4c67d-4069-4d1c-bd46-029ddda0532f",
   "transactions":[
      {
         "transactionId":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "transactionExternalKey":"78591b50-a828-456b-a6c2-fefe89a356f3",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
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
         "transactionId":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "transactionExternalKey":"59d9f016-a63a-4dac-bf9a-0464658d99e1",
         "paymentId":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
         "paymentExternalKey":"42ab1653-051f-416c-8c70-bf5d4061d4fa",
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
```python
no content
```

**Query Parameters**

None. 

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
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "9ceb96a2-5407-482b-8847-7b08cc64213f"
transaction.payment_id               = "74a82e25-120a-4a39-a7f7-7b5c2b4ac05d"

transaction.chargeback_reversals(user, 
                                 reason, 
                                 comment, 
                                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '74a82e25-120a-4a39-a7f7-7b5c2b4ac05d'
transaction_external_key = '9ceb96a2-5407-482b-8847-7b08cc64213f'
body = PaymentTransaction(payment_id=payment_id,
                          transaction_external_key=transaction_external_key)

paymentApi.chargeback_reversal_payment(payment_id,
                                       body,
                                       created_by,
                                       api_key,
                                       api_secret)
```

> Example Response:

```ruby
{
   "accountId":"d513c084-2ee4-4e65-aea5-b47dde03d2d4",
   "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
   "paymentNumber":"66",
   "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"c5676241-85dd-47ba-be4c-5dec75fade33",
   "transactions":[
      {
         "transactionId":"9ceb96a2-5407-482b-8847-7b08cc64213f",
         "transactionExternalKey":"9ceb96a2-5407-482b-8847-7b08cc64213f",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
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
         "transactionId":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "transactionExternalKey":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"112ad9f1-5a36-447c-aadc-ac20c6e56feb",
         "transactionExternalKey":"597efe9b-b713-41fb-9ea1-4b2faf80f49c",
         "paymentId":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "paymentExternalKey":"74a82e25-120a-4a39-a7f7-7b5c2b4ac05d",
         "transactionType":"CHARGEBACK",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":0.0,
         "status":"PAYMENT_FAILURE",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

Returns a payment object.

## Record a chargeback reversal [using external key]

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
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"

transaction.chargeback_reversals(user, 
                                 reason, 
                                 comment, 
                                 options)
```

```python
paymentApi = killbill.api.PaymentApi()
body = PaymentTransaction(payment_external_key=payment_external_key,
                          transaction_external_key=transaction_external_key)

paymentApi.chargeback_reversal_payment_by_external_key(body,
                                                       created_by,
                                                       api_key,
                                                       api_secret)
```

> Example Response:

```ruby
{
   "accountId":"58f01daa-df0f-424e-b430-ad54c3653d70",
   "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
   "paymentNumber":"71",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"29b3f923-5985-496e-835a-c26f3742c13d",
   "transactions":[
      {
         "transactionId":"231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c",
         "transactionExternalKey":"231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
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
         "transactionId":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "transactionExternalKey":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "transactionType":"CHARGEBACK",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:03.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      },
      {
         "transactionId":"b193f299-9788-4dc9-abc8-b1971bee68e1",
         "transactionExternalKey":"5c9be310-6508-40ff-9553-2b88d1707eef",
         "paymentId":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "paymentExternalKey":"82a8a5eb-7953-4654-b3ff-f3d935ed0c37",
         "transactionType":"CHARGEBACK",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":0.0,
         "status":"PAYMENT_FAILURE",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None.

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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 paymentId, 
                                 ObjectType.PAYMENT, 
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

paymentApi.createPaymentCustomFields(paymentId, 
                                     customFields, 
                                     requestOptions);
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

```python
paymentApi = killbill.api.PaymentApi()
body = CustomField(name='Test Custom Field', value='test_value')

paymentApi.create_payment_custom_fields(payment_id,
                                        [body],
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    objectType: PAYMENT
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
      "objectType":"PAYMENT",
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

## Retrieve payment custom fields [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");

List<CustomField> customFields = paymentApi.getPaymentCustomFields(paymentId,
                                                                   AuditLevel.NONE,
                                                                   requestOptions);
```

```ruby
audit = 'NONE'

payment.custom_fields(audit, options)
```

```python
paymentApi = killbill.api.PaymentApi()

paymentApi.get_payment_custom_fields(payment_id, api_key, api_secret)
```

> Example Response:

```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: cca08349-8b26-41c7-bfcc-2e3cf70a0f28
    objectType: PAYMENT
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
      "objectType":"PAYMENT",
      "name":"Test Custom Field",
      "value":"test_value",
      "auditLogs":[]
   }
]
```
```python
[{'audit_logs': [],
 'custom_field_id': '893e0286-2b48-493b-99af-aac9b172dc75',
 'name': 'Test Custom Field',
 'object_id': '924bebe7-58e7-40e8-a5ed-192efb59d8ee',
 'object_type': 'PAYMENT',
 'value': 'test_value'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to payment [payment]

**HTTP Request** 

`PUT http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

paymentApi.modifyPaymentCustomFields(paymentId, 
                                     customFieldModified, 
                                     requestOptions);
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
```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'f33e0adc-78df-438a-b920-aaacd7f8597a'
custom_field_id = '9913e0f6-b5ef-498b-ac47-60e1626eba8f'
body = CustomField(custom_field_id=custom_field_id, name='Test Modify', value='test_modify_value')

paymentApi.modify_payment_custom_fields(payment_id,
                                        [body],
                                        created_by,
                                        api_key,
                                        api_secret)
```
> Example Response:

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
| **customFieldList** | string | true | a list of custom field objects that you want to modify |

**Returns**

A `204` http status without content.

## Remove custom fields from payment [payment]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/{paymentId}/customFields`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("cca08349-8b26-41c7-bfcc-2e3cf70a0f28");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

paymentApi.deletePaymentCustomFields(paymentId, 
                                     customFieldsId, 
                                     requestOptions);
```

```ruby
custom_field_id = custom_field.id

payment.remove_custom_field(custom_field_id,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'f33e0adc-78df-438a-b920-aaacd7f8597a'

paymentApi.delete_payment_custom_fields(payment_id,
                                        created_by,
                                        api_key,
                                        api_secret)
```

> Example Response:

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
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Returns**

A `204` http status without content.

## Refund an existing payment

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/{paymentId}/refunds`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("89614849-9bd6-43ba-93d0-e9deb1acf575");

PaymentTransaction body = new PaymentTransaction();
body.setPaymentId(paymentId);
body.setAmount(BigDecimal.TEN);
body.setCurrency(Currency.USD);
body.setPaymentExternalKey("de924e98-2c76-4e90-b9d6-2ced262bc251");
body.setTransactionExternalKey("c4de33be-1c2b-4cf8-be75-6371f08738de");

Payment refundPayment = paymentApi.refundPayment(paymentId, 
                                                 body, 
                                                 NULL_PLUGIN_NAMES, 
                                                 pluginProperties, 
                                                 requestOptions);
```

```ruby
transaction            = KillBillClient::Model::Transaction.new
transaction.payment_id = "dce5b2a0-0f0f-430b-9427-545ba4be5c7f"
transaction.amount     = '50.0'
refresh_options        = nil

transaction.refund(user, 
                   reason, 
                   comment, 
                   options, 
                   refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'dce5b2a0-0f0f-430b-9427-545ba4be5c7f' 
body = PaymentTransaction(payment_id=payment_id,
                          amount=50.0)

paymentApi.refund_payment(payment_id,
                          body,
                          created_by,
                          api_key,
                          api_secret)
```

> Example Response:

```java
class Payment {
    org.killbill.billing.client.model.gen.Payment@deaa66b1
    accountId: 73a443d6-e145-4db3-9c86-f0d53374846c
    paymentId: 89614849-9bd6-43ba-93d0-e9deb1acf575
    paymentNumber: 1
    paymentExternalKey: de924e98-2c76-4e90-b9d6-2ced262bc251
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 10.00
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 92b3c0bf-f5f0-4be0-aad0-c2fd419561cf
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@f6a5a1e2
        transactionId: 1848bd1f-dbb8-4e7b-bd48-d6763ef86932
        transactionExternalKey: c4de33be-1c2b-4cf8-be75-6371f08738de
        paymentId: 89614849-9bd6-43ba-93d0-e9deb1acf575
        paymentExternalKey: de924e98-2c76-4e90-b9d6-2ced262bc251
        transactionType: PURCHASE
        amount: 10.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:02.000Z
        processedAmount: 10.00
        processedCurrency: USD
        status: SUCCESS
        gatewayErrorCode: 
        gatewayErrorMsg: 
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }, class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@cd051079
        transactionId: ec26f9bf-8b32-493c-9dfe-15188c0f24c7
        transactionExternalKey: c81aa30a-48e3-4150-9789-d4585e95353f
        paymentId: 89614849-9bd6-43ba-93d0-e9deb1acf575
        paymentExternalKey: de924e98-2c76-4e90-b9d6-2ced262bc251
        transactionType: REFUND
        amount: 10.00
        currency: USD
        effectiveDate: 2012-08-25T00:00:32.000Z
        processedAmount: 10.00
        processedCurrency: USD
        status: PENDING
        gatewayErrorCode: gatewayErrorCode
        gatewayErrorMsg: gatewayError
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: null
    auditLogs: []
}
```
```ruby
{
   "accountId":"6c297750-3a6d-42a4-9d75-c900fbc75ddf",
   "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "paymentNumber":"69",
   "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"ba2b0bd4-43f2-4b4a-839c-5a2fa40ea0de",
   "transactions":[
      {
         "transactionId":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "transactionExternalKey":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
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
         "transactionId":"28740a66-834a-4005-81d5-55a4550751b9",
         "transactionExternalKey":"28740a66-834a-4005-81d5-55a4550751b9",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"REFUND",
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
```python
no content
```

**Query Parameters**

None. 

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
transaction                      = KillBillClient::Model::Transaction.new
transaction.payment_external_key = "example_payment_external_key"
transaction.amount               = '50.0'
refresh_options                  = nil

transaction.refund_by_external_key(user, 
                                   reason, 
                                   comment, 
                                   options, 
                                   refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_external_key = 'example_payment_external_key'
body = PaymentTransaction(payment_external_key=payment_external_key,
                          amount=50.0)

paymentApi.refund_payment_by_external_key(body,
                                          created_by,
                                          api_key,
                                          api_secret)
```
> Example Response:

```ruby
{
   "accountId":"6c297750-3a6d-42a4-9d75-c900fbc75ddf",
   "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
   "paymentNumber":"69",
   "paymentExternalKey":"example_payment_external_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":50.0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"ba2b0bd4-43f2-4b4a-839c-5a2fa40ea0de",
   "transactions":[
      {
         "transactionId":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "transactionExternalKey":"d58f9801-e0e6-4b8d-99fb-e19f5b29a313",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
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
         "transactionId":"28740a66-834a-4005-81d5-55a4550751b9",
         "transactionExternalKey":"28740a66-834a-4005-81d5-55a4550751b9",
         "paymentId":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "paymentExternalKey":"dce5b2a0-0f0f-430b-9427-545ba4be5c7f",
         "transactionType":"REFUND",
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
```python
no content
```

**Query Parameters**

None. 

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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("917992d3-5f1f-4828-9fff-799cc4211aa9");

UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

Tags result = paymentApi.createPaymentTags(paymentId, 
                                           ImmutableList.<UUID>of(autoPayOffId), 
                                           requestOptions);
```

```ruby
tag_name = 'TEST'

payment.add_tag(tag_name,
                user,
                reason,
                comment,
                options)
```

```python
paymentApi = killbill.api.PaymentApi()
tag = ["00000000-0000-0000-0000-000000000002"]

paymentApi.create_payment_tags(payment_id,
                               tag,
                               created_by,
                               api_key,
                               api_secret)
```

> Example Response:

```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: PAYMENT
    objectId: 917992d3-5f1f-4828-9fff-799cc4211aa9
    tagDefinitionId: 00000000-0000-0000-0000-000000000001
    tagDefinitionName: AUTO_PAY_OFF
    auditLogs: []
}
```
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
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true | list with tag definition id's to add |

**Returns**

A `201` http status without content.

## Retrieve payment tags [payment]

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/{paymentId}/tags`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");

Boolean includedDeleted = false; // Will not include deleted tags

List<Tag> tags = paymentApi.getPaymentTags(paymentId, 
                                           includedDeleted, 
                                           AuditLevel.FULL, 
                                           requestOptions);
```

```ruby
included_deleted = false
audit = 'NONE'

payment.tags(included_deleted,
             audit,
             options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

paymentApi.get_payment_tags(payment_id, api_key, api_secret)
```

> Example Response:

```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@cae768d7
    tagId: d724f79d-fad1-4758-b35e-d62708450d90
    objectType: PAYMENT
    objectId: e659f0f3-745c-46d5-953c-28fe9282fc7d
    tagDefinitionId: 00000000-0000-0000-0000-000000000001
    tagDefinitionName: AUTO_PAY_OFF
    auditLogs: [class AuditLog {
        changeType: INSERT
        changeDate: 2012-08-25T00:00:02.000Z
        objectType: TAG
        objectId: d724f79d-fad1-4758-b35e-d62708450d90
        changedBy: Toto
        reasonCode: i am god
        comments: no comment
        userToken: e36f7ba5-fb5b-41c0-b47c-77c48ab37dd9
        history: null
    }]
}
```
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
```python
[{'audit_logs': [],
 'object_id': '41b6b214-c3f7-40ea-89cd-6a4ecbd9083b',
 'object_type': 'PAYMENT',
 'tag_definition_id': '00000000-0000-0000-0000-000000000002',
 'tag_definition_name': 'AUTO_INVOICING_OFF',
 'tag_id': '865e0c77-def7-4880-ac80-11c21a5e571d'}]
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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

UUID paymentId = UUID.fromString("e659f0f3-745c-46d5-953c-28fe9282fc7d");

UUID autoPayOffId = UUID.fromString("00000000-0000-0000-0000-000000000001");

paymentApi.deletePaymentTags(paymentId, 
                             ImmutableList.<UUID>of(autoPayOffId), 
                             requestOptions);
```

```ruby
tag_name = 'TEST'

payment.remove_tag(tag_name,
                   user,
                   reason,
                   comment,
                   options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_id = 'dce5b2a0-0f0f-430b-9427-545ba4be5c7f'
tag = ["00000000-0000-0000-0000-000000000002"] 

paymentApi.delete_payment_tags(payment_id,
                               created_by,
                               api_key,
                               api_secret,
                               tag_def=tag)
```

> Example Response:

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
| ---- | -----| -------- | ---- | ------------
| **tagDef** | string | true |  list with tag definition id's that you want to remove it |

**Response**

A `204` http status without content.

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
transaction                = KillBillClient::Model::Transaction.new
transaction.transaction_id = "231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c"

transaction.cancel_scheduled_payment(user, 
                                     reason, 
                                     comment, 
                                     options)
```

```python
paymentApi = killbill.api.PaymentApi()
payment_transaction_id = '231d2bbc-7ce3-4946-b6d9-f24f9a25ff6c'

paymentApi.cancel_scheduled_payment_transaction_by_id(payment_transaction_id,
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

None.

**Returns**

A `204` http status without content.

## Cancels a scheduled payment attempt retry [using external key]

**HTTP Request** 

`DELETE http://example.com/1.0/kb/payments/cancelScheduledPaymentTransaction`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

String transactionExternalKey = "example_payment_external_key"

paymentApi.cancelScheduledPaymentTransactionByExternalKey(transactionExternalKey, inputOptions);
```

```ruby
transaction                          = KillBillClient::Model::Transaction.new
transaction.transaction_external_key = "example_payment_external_key"

transaction.cancel_scheduled_payment(user, 
                                     reason, 
                                     comment, 
                                     options)
```

```python
paymentApi = killbill.api.PaymentApi()
transaction_external_key = 'example_payment_external_key'

paymentApi.cancel_scheduled_payment_transaction_by_external_key(transaction_external_key,
                                                                created_by,
                                                                api_key,
                                                                api_secret)
```
> Example Response:

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

## Combo api to create a new payment transaction on a existing (or not) account

New payment transaction type can be: authorization, purchase or credit

**HTTP Request** 

`POST http://example.com/1.0/kb/payments/combo`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.AccountApi;
import org.killbill.billing.client.api.gen.PaymentApi;
protected AccountApi accountApi;
protected PaymentApi paymentApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");
Boolean accountWithBalance = false; // Will not include account balance
Boolean accountWithBalanceAndCBA = false; // Will not include account balance and CBA info

Account account = accountApi.getAccount(accountId, 
                                        accountWithBalance, 
                                        accountWithBalanceAndCBA, 
                                        AuditLevel.NONE, 
                                        requestOptions);

String paymentExternalKey = "5f216d82-dcc4-4e7b-9110-f3896bf6f49a";

ComboPaymentTransaction result = createComboPaymentTransaction(account, paymentExternalKey);
```

```ruby
combo_transaction = KillBillClient::Model::ComboTransaction.new
combo_transaction.account = account_obj
combo_transaction.payment_method = payment_method_obj
combo_transaction.transaction = transaction_obj

refresh_options = nil

# Authorization
combo_transaction.auth(user, 
                       reason, 
                       comment, 
                       options, 
                       refresh_options)

# Purchase
combo_transaction.purchase(user, 
                           reason, 
                           comment, 
                           options, 
                           refresh_options)

# Credit
combo_transaction.credit(user, 
                         reason, 
                         comment, 
                         options, 
                         refresh_options)
```

```python
paymentApi = killbill.api.PaymentApi()
body = ComboPaymentTransaction(account_obj, payment_method_obj, payment_transaction_obj)

paymentApi.create_combo_payment(body,
                                created_by,
                                api_key,
                                api_secret)
```

> Example Response:

```java
class ComboPaymentTransaction {
    org.killbill.billing.client.model.gen.ComboPaymentTransaction@631731cc
    account: class Account {
        org.killbill.billing.client.model.gen.Account@9507aa91
        accountId: 864c1418-e768-4cd5-a0db-67537144b685
        name: 1af27661-dec0-4903-ae76-1783ae8f7d11
        firstNameLength: 4
        externalKey: 7cf53480-de54-4428-b72e-789b1c91e13a
        email: aa2c2@da6c8
        billCycleDayLocal: null
        currency: USD
        parentAccountId: null
        isPaymentDelegatedToParent: false
        paymentMethodId: null
        referenceTime: null
        timeZone: UTC
        address1: 12 rue des ecoles
        address2: Poitier
        postalCode: 44 567
        company: Renault
        city: Quelque part
        state: Poitou
        country: France
        locale: fr
        phone: 81 53 26 56
        notes: notes
        isMigrated: false
        accountBalance: null
        accountCBA: null
        auditLogs: []
    }
    paymentMethod: class PaymentMethod {
        org.killbill.billing.client.model.gen.PaymentMethod@1619f5f6
        paymentMethodId: null
        externalKey: 5f216d82-dcc4-4e7b-9110-f3896bf6f49a
        accountId: null
        isDefault: false
        pluginName: noop
        pluginInfo: class PaymentMethodPluginDetail {
            externalPaymentMethodId: null
            isDefaultPaymentMethod: false
            properties: null
        }
        auditLogs: null
    }
    transaction: class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@c4d46526
        transactionId: null
        transactionExternalKey: 2eea894a-2e1e-44e1-942a-eed5a40d3ee0
        paymentId: null
        paymentExternalKey: 2f5fbec7-7f32-493c-a203-d9281f422e72
        transactionType: AUTHORIZE
        amount: 10
        currency: USD
        effectiveDate: null
        processedAmount: null
        processedCurrency: null
        status: null
        gatewayErrorCode: null
        gatewayErrorMsg: null
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: null
    }
    paymentMethodPluginProperties: []
    transactionPluginProperties: []
    auditLogs: null
}
```
```ruby
{
   "accountId":"86bb6cbc-1324-47fe-99f6-f0f2bf47f3da",
   "paymentId":"125de719-c4db-4c8c-be98-2a75f0d09011",
   "paymentNumber":"83",
   "paymentExternalKey":"test_key",
   "authAmount":0,
   "capturedAmount":0,
   "purchasedAmount":50.0,
   "refundedAmount":0,
   "creditedAmount":0,
   "currency":"USD",
   "paymentMethodId":"3a61344c-c9b5-4ef6-92cc-581bcb8b20de",
   "transactions":[
      {
         "transactionId":"a93d034b-ef54-4664-88c4-5be20272b330",
         "transactionExternalKey":"a93d034b-ef54-4664-88c4-5be20272b330",
         "paymentId":"125de719-c4db-4c8c-be98-2a75f0d09011",
         "paymentExternalKey":"test_key",
         "transactionType":"PURCHASE",
         "amount":50.0,
         "currency":"USD",
         "effectiveDate":"2013-08-01T06:00:04.000Z",
         "processedAmount":50.0,
         "processedCurrency":"USD",
         "status":"SUCCESS",
         "auditLogs":[]
      }
   ],
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

None. 

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
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

Long offset = 0L;
Long limit = 100L;
String pluginName = null;
Boolean withPluginInfo = false; // Will not fetch plugin info
Boolean withAttempts = true; // Will reflect payment attempts
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payments payments = paymentApi.getPayments(offset, 
                                           limit, 
                                           pluginName, 
                                           withPluginInfo, 
                                           withAttempts, 
                                           NULL_PLUGIN_PROPERTIES, 
                                           AuditLevel.NONE, 
                                           requestOptions);
```

```ruby
offset = 0
limit = 100
payment.find_in_batches(offset, 
                        limit, 
                        options)
```

```python
paymentApi = killbill.api.PaymentApi()

paymentApi.get_payments(api_key, api_secret)
```

> Example Response:

```java
//First element of the list
class Payment {
    org.killbill.billing.client.model.gen.Payment@1f07a0c4
    accountId: 7f13319c-0beb-4c6d-9ef3-d26c20b1c183
    paymentId: 2933e208-4bbb-4898-981d-dc487fdc6e1f
    paymentNumber: 1
    paymentExternalKey: 2933e208-4bbb-4898-981d-dc487fdc6e1f
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: 8cd62a90-48a7-428d-b360-9804bb85edff
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@50cedfc2
        transactionId: 135100a0-b192-45a0-b8b6-961d31d0b492
        transactionExternalKey: 135100a0-b192-45a0-b8b6-961d31d0b492
        paymentId: 2933e208-4bbb-4898-981d-dc487fdc6e1f
        paymentExternalKey: 2933e208-4bbb-4898-981d-dc487fdc6e1f
        transactionType: PURCHASE
        amount: 249.95
        currency: USD
        effectiveDate: 2012-09-26T00:00:05.000Z
        processedAmount: 0.00
        processedCurrency: USD
        status: PAYMENT_FAILURE
        gatewayErrorCode: gatewayErrorCode
        gatewayErrorMsg: gatewayError
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: [class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@d3d09824
        accountId: 7f13319c-0beb-4c6d-9ef3-d26c20b1c183
        paymentMethodId: 8cd62a90-48a7-428d-b360-9804bb85edff
        paymentExternalKey: 2933e208-4bbb-4898-981d-dc487fdc6e1f
        transactionId: 135100a0-b192-45a0-b8b6-961d31d0b492
        transactionExternalKey: 135100a0-b192-45a0-b8b6-961d31d0b492
        transactionType: PURCHASE
        effectiveDate: 2012-09-26T00:00:05.000Z
        stateName: RETRIED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: dd27083e-6150-41e8-a503-f35f971dc347
            isUpdatable: false
        }]
        auditLogs: []
    }, class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@733e1442
        accountId: 7f13319c-0beb-4c6d-9ef3-d26c20b1c183
        paymentMethodId: 8cd62a90-48a7-428d-b360-9804bb85edff
        paymentExternalKey: 2933e208-4bbb-4898-981d-dc487fdc6e1f
        transactionId: null
        transactionExternalKey: 135100a0-b192-45a0-b8b6-961d31d0b492
        transactionType: PURCHASE
        effectiveDate: 2012-10-04T00:00:05.000Z
        stateName: SCHEDULED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: dd27083e-6150-41e8-a503-f35f971dc347
            isUpdatable: false
        }]
        auditLogs: []
    }]
    auditLogs: []
}
```
```ruby
[
    {
       "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
       "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
       "paymentNumber":"65",
       "paymentExternalKey":"example_payment_external_key",
       "authAmount":0,
       "capturedAmount":0,
       "purchasedAmount":50.0,
       "refundedAmount":50.0,
       "creditedAmount":0,
       "currency":"USD",
       "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
       "transactions":[
          {
             "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"PURCHASE",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:04.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          },
          {
             "transactionId":"dff69d54-9593-4d19-893e-287720272175",
             "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"REFUND",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:06.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          }
       ],
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '5b23cc61-4afc-48bd-9fe8-0fafda02a00f',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '9e283f36-269b-4d51-8341-1ff354b8c631',
 'payment_id': '9e283f36-269b-4d51-8341-1ff354b8c631',
 'payment_method_id': '4acc1167-22f9-4c89-a8e7-051814ba78f0',
 'payment_number': '533',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 8, 45, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '9e283f36-269b-4d51-8341-1ff354b8c631',
                   'payment_id': '9e283f36-269b-4d51-8341-1ff354b8c631',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': 'b144e485-7570-4748-b5d2-7c25d720b264',
                   'transaction_id': 'b144e485-7570-4748-b5d2-7c25d720b264',
                   'transaction_type': 'PURCHASE'}]}, {'account_id': '5b23cc61-4afc-48bd-9fe8-0fafda02a00f',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '078b62a4-1197-44b1-801d-3a0c01a53702',
 'payment_id': '078b62a4-1197-44b1-801d-3a0c01a53702',
 'payment_method_id': '4acc1167-22f9-4c89-a8e7-051814ba78f0',
 'payment_number': '534',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 8, 46, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '078b62a4-1197-44b1-801d-3a0c01a53702',
                   'payment_id': '078b62a4-1197-44b1-801d-3a0c01a53702',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '9c184ba0-723b-4d5b-ad57-be26fb15fd40',
                   'transaction_id': '9c184ba0-723b-4d5b-ad57-be26fb15fd40',
                   'transaction_type': 'AUTHORIZE'}]}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **audit** | enum | false | level of audit logs returned | 
| **pluginName** | string | false | plugin name |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Returns a list with all payments.

## Search payments

**HTTP Request** 

`GET http://example.com/1.0/kb/payments/search/{searchKey}`

> Example Request:

```shell
TODO	
```

```java
import org.killbill.billing.client.api.gen.PaymentApi;
protected PaymentApi paymentApi;

String searchKey = "ccbc67f5-91cb-4b9a-9648-fa6aedaf0890";
Long offset = 0L;
Long limit = 100L;
Boolean withPluginInfo = false; // Will not reflect plugin info
Boolean withAttempts = true;  // Will reflect payment attempts
String pluginName = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;

Payments payments = paymentApi.searchPayments(searchKey, 
                                              offset, 
                                              limit, 
                                              withPluginInfo, 
                                              withAttempts, 
                                              pluginName, 
                                              NULL_PLUGIN_PROPERTIES, 
                                              AuditLevel.NONE, 
                                              requestOptions);
```

```ruby
search_key = 'PURCHASE'
offset = 0
limit = 100

payment.find_in_batches_by_search_key(search_key,
                                      offset,
                                      limit,
                                      options)
```

```python
paymentApi = killbill.api.PaymentApi()
search_key = 'SUCCESS'

paymentApi.search_payments(search_key, api_key, api_secret)
```

> Example Response:

```java
//First element of the list
class Payment {
    org.killbill.billing.client.model.gen.Payment@9e017939
    accountId: ccbc67f5-91cb-4b9a-9648-fa6aedaf0890
    paymentId: 0f8ecfc9-48f4-48da-a01a-929f5d466351
    paymentNumber: 1
    paymentExternalKey: 0f8ecfc9-48f4-48da-a01a-929f5d466351
    authAmount: 0
    capturedAmount: 0
    purchasedAmount: 0
    refundedAmount: 0
    creditedAmount: 0
    currency: USD
    paymentMethodId: ac1c90d5-30d4-484e-9da0-918a8fff5f7d
    transactions: [class PaymentTransaction {
        org.killbill.billing.client.model.gen.PaymentTransaction@dd504973
        transactionId: d4bde19e-299e-402f-8105-3f241cc21db0
        transactionExternalKey: d4bde19e-299e-402f-8105-3f241cc21db0
        paymentId: 0f8ecfc9-48f4-48da-a01a-929f5d466351
        paymentExternalKey: 0f8ecfc9-48f4-48da-a01a-929f5d466351
        transactionType: PURCHASE
        amount: 249.95
        currency: USD
        effectiveDate: 2012-09-26T00:00:05.000Z
        processedAmount: 0.00
        processedCurrency: USD
        status: PAYMENT_FAILURE
        gatewayErrorCode: gatewayErrorCode
        gatewayErrorMsg: gatewayError
        firstPaymentReferenceId: null
        secondPaymentReferenceId: null
        properties: null
        auditLogs: []
    }]
    paymentAttempts: [class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@a9c18de
        accountId: ccbc67f5-91cb-4b9a-9648-fa6aedaf0890
        paymentMethodId: ac1c90d5-30d4-484e-9da0-918a8fff5f7d
        paymentExternalKey: 0f8ecfc9-48f4-48da-a01a-929f5d466351
        transactionId: d4bde19e-299e-402f-8105-3f241cc21db0
        transactionExternalKey: d4bde19e-299e-402f-8105-3f241cc21db0
        transactionType: PURCHASE
        effectiveDate: 2012-09-26T00:00:05.000Z
        stateName: RETRIED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: 4aafe2fe-0bd0-47d6-b58a-7a12a15ccdea
            isUpdatable: false
        }]
        auditLogs: []
    }, class PaymentAttempt {
        org.killbill.billing.client.model.gen.PaymentAttempt@4d117a78
        accountId: ccbc67f5-91cb-4b9a-9648-fa6aedaf0890
        paymentMethodId: ac1c90d5-30d4-484e-9da0-918a8fff5f7d
        paymentExternalKey: 0f8ecfc9-48f4-48da-a01a-929f5d466351
        transactionId: null
        transactionExternalKey: d4bde19e-299e-402f-8105-3f241cc21db0
        transactionType: PURCHASE
        effectiveDate: 2012-10-04T00:00:05.000Z
        stateName: SCHEDULED
        amount: null
        currency: USD
        pluginName: __INVOICE_PAYMENT_CONTROL_PLUGIN__
        pluginProperties: [class PluginProperty {
            key: IPCD_INVOICE_ID
            value: 4aafe2fe-0bd0-47d6-b58a-7a12a15ccdea
            isUpdatable: false
        }]
        auditLogs: []
    }]
    auditLogs: []
}
```
```ruby
[
    {
       "accountId":"7fd39735-87a2-4190-84a0-d28a53347bd4",
       "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
       "paymentNumber":"65",
       "paymentExternalKey":"example_payment_external_key",
       "authAmount":0,
       "capturedAmount":0,
       "purchasedAmount":50.0,
       "refundedAmount":50.0,
       "creditedAmount":0,
       "currency":"USD",
       "paymentMethodId":"c8d9199f-c62d-46d3-b94e-1544bbe2a5c9",
       "transactions":[
          {
             "transactionId":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "transactionExternalKey":"a48855a4-bbe5-43d0-9e81-016ca719abeb",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"PURCHASE",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:04.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          },
          {
             "transactionId":"dff69d54-9593-4d19-893e-287720272175",
             "transactionExternalKey":"dff69d54-9593-4d19-893e-287720272175",
             "paymentId":"12c70604-cede-4df3-a321-38be4d176e9a",
             "paymentExternalKey":"12c70604-cede-4df3-a321-38be4d176e9a",
             "transactionType":"REFUND",
             "amount":50.0,
             "currency":"USD",
             "effectiveDate":"2013-08-01T06:00:06.000Z",
             "processedAmount":50.0,
             "processedCurrency":"USD",
             "status":"SUCCESS",
             "auditLogs":[]
          }
       ],
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '494df5a9-d8da-4e56-852a-459fdaca85d1',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
 'payment_id': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
 'payment_method_id': 'b7c26570-3515-4055-a8a8-4d6d4b45dc28',
 'payment_number': '537',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 12, 8, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
                   'payment_id': '9988364a-3f86-4fcf-8a49-35ba6d1c1a93',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '0fa4d97d-086b-43b3-a9f2-085c9cc382c2',
                   'transaction_id': '0fa4d97d-086b-43b3-a9f2-085c9cc382c2',
                   'transaction_type': 'PURCHASE'}]}, {'account_id': '494df5a9-d8da-4e56-852a-459fdaca85d1',
 'audit_logs': [],
 'auth_amount': 50.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': 'b937a96e-36b4-46fa-a609-64d568403551',
 'payment_id': 'b937a96e-36b4-46fa-a609-64d568403551',
 'payment_method_id': 'b7c26570-3515-4055-a8a8-4d6d4b45dc28',
 'payment_number': '538',
 'purchased_amount': 0.0,
 'refunded_amount': 0.0,
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 11, 20, 12, 9, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': 'b937a96e-36b4-46fa-a609-64d568403551',
                   'payment_id': 'b937a96e-36b4-46fa-a609-64d568403551',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '49884122-aa64-4518-b2de-55fe4fbde856',
                   'transaction_id': '49884122-aa64-4518-b2de-55fe4fbde856',
                   'transaction_type': 'AUTHORIZE'}]}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **audit** | enum | false | level of audit logs returned | 
| **pluginName** | string | false | plugin name |
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |

**Returns**

Return a list with payments matched with the search key entered.
