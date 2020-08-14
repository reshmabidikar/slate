# Credit

## Credit Resource

The `Credit` resource represents the credits created on behalf of the customer `Account`. Credits are tracked inside invoices, as a specical kind of
invoice item. The credits are visible at the level of the `Account`, i.e account credit, and those will automatically be consumed by the system on
subsequent invoices to bring the balance to zero -- or reduce the balance if there is not enough credit to pay the full amount.

See section [Invoice Resource](#invoice) for the description of the `InvoiceItem` attributes.


## Credit

Basic endpoints to create and retrieve a credit invoice item

### Create credits

Create one or more credits for a specified account. These credits will appear as `invoiceItem`s. They may be added to an existing DRAFT invoice, or they may result in the creation of a new invoice. 

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/credits`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d '[{"amount": 50.0, "currency": "USD", "accountId": "1f979085-1765-471b-878a-5f640db4d831", "description": "example"}]' \
    "http://localhost:8080/1.0/kb/credits?autoCommit=true"
```

```java
import org.killbill.billing.client.api.gen.CreditApi;
protected CreditApi creditApi;

UUID accountId = UUID.fromString("864c1418-e768-4cd5-a0db-67537144b685");

Credit credit = new InvoiceItem();
credit.setAccountId(accountId);
credit.setAmount(BigDecimal.ONE);
credit.setDescription("description");

Boolean autoCommit = true;
Map<String, String> pluginProperty = null;

final InvoiceItems credits = new InvoiceItems();
credits.add(credit);
InvoiceItems createdCredits = creditApi.createCredits(credits, false, NULL_PLUGIN_PROPERTIES, requestOptions);
```

```ruby
credit_item                 = KillBillClient::Model::Credit.new()
credit_item.account_id      = 'da3769a8-58c4-4dc0-b4e8-7b534e349624'
credit_item.amount          = 50.0
credit_item.currency        = 'USD'
credit_item.description     = 'description'

auto_commit = true

credit_item.create(auto_commit, 
                   user,
                   reason,
                   comment,
                   options)
```

```python
creditApi = killbill.api.CreditApi()
body = Credit(account_id=account_id, 
              amount=50.0, 
              currency='USD', 
              description='example')

creditApi.create_credits([body], created_by, api_key, api_secret)
```

> Example Response:

```shell
    < HTTP/1.1 200 OK
[
  {
    "invoiceItemId": "2a7746a3-abad-42d9-9f54-fe50c0b18802",
    "invoiceId": "e3caf986-8909-4677-afd4-ba03deeae8f0",
    "linkedInvoiceItemId": null,
    "accountId": "1f979085-1765-471b-878a-5f640db4d831",
    "childAccountId": null,
    "bundleId": null,
    "subscriptionId": null,
    "productName": null,
    "planName": null,
    "phaseName": null,
    "usageName": null,
    "prettyProductName": null,
    "prettyPlanName": null,
    "prettyPhaseName": null,
    "prettyUsageName": null,
    "itemType": "CREDIT_ADJ",
    "description": "example",
    "startDate": "2020-01-17",
    "endDate": "2020-01-17",
    "amount": 50,
    "rate": null,
    "currency": "USD",
    "quantity": null,
    "itemDetails": null,
    "catalogEffectiveDate": null,
    "childItems": null,
    "auditLogs": []
  }
]
```
```java
class Credit {
    org.killbill.billing.client.model.gen.Credit@a32400a5
    creditId: d2edf4c0-9929-4e2f-b3a9-feb9bd9d60ba
    creditAmount: 1.00
    currency: USD
    invoiceId: 41c87837-ec1d-4095-8d20-a56e6237cb0c
    invoiceNumber: 3
    effectiveDate: 2012-09-26
    accountId: 7cf30d01-84f1-4d9d-94c2-3a3277374960
    description: description
    itemDetails: itemDetails
    auditLogs: []
}
```
```ruby
{
   "creditId":"fd5669a8-68c1-8dl0-m4e8-8y535e349324"
   "amount":50.0,
   "currency":"USD",
   "invoiceId":"c57e1a2b-1a6b-4053-be2c-cc5fad2b5cbf",
   "invoiceNumber":"1285",
   "effectiveDate":"2013-08-01",
   "accountId":"da3769a8-58c4-4dc0-b4e8-7b534e349624",
   "description":"description"
}
```
```python
no content
```

**Request Body**

An invoiceItem object, or a list of such objects. Each object requires at least the following attributes: accountId, amount, and description. If an invoiceId is given, the item will be added to the specified invoice. This invoice must be in DRAFT status or an error will occur.

**Query Parameters**

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **autoCommit** | boolean | no | false | if true, the resulting invoice will be `COMMITTED`.|

**Returns**

If successful, returns a status code of 200 and an invoiceItem resource object or a list of objects representing the credit(s).

### Retrieve a credit by id

Retrieve an invoiceItem representing a credit given the invoiceItemId.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/credits/{invoiceItemId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/credits/c8bfa9d1-76e5-4a42-92d0-b106c0902c16"	
```

```java
import org.killbill.billing.client.api.gen.CreditApi;
protected CreditApi creditApi;

UUID creditId = UUID.fromString("d2edf4c0-9929-4e2f-b3a9-feb9bd9d60ba");

Credit result = creditApi.getCredit(creditId, requestOptions)
```

```ruby
credit_id = 'fd5669a8-68c1-8dl0-m4e8-8y535e349324'

KillBillClient::Model::Credit.find_by_id(credit_id , options)
```

```python
creditApi = killbill.api.CreditApi()
        
creditApi.get_credit(credit_id, api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json

{
  "invoiceItemId": "c8bfa9d1-76e5-4a42-92d0-b106c0902c16",
  "amount": 50,
  "currency": "USD",
  "invoiceId": "903e55d3-8072-47f1-80fc-32857dbdbcc5",
  "invoiceNumber": "310",
  "effectiveDate": "2018-07-20",
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "description": "example",
  "itemDetails": null,
  "auditLogs": []
}
```
```java
class Credit {
    org.killbill.billing.client.model.gen.InvoiceItem@a32400a5
    invoiceItemId: d2edf4c0-9929-4e2f-b3a9-feb9bd9d60ba
    amount: 1.00
    currency: USD
    invoiceId: 41c87837-ec1d-4095-8d20-a56e6237cb0c
    invoiceNumber: 3
    effectiveDate: 2012-09-26
    accountId: 7cf30d01-84f1-4d9d-94c2-3a3277374960
    description: description
    itemDetails: itemDetails
    auditLogs: []
}
```
```ruby
{
   "invoiceItemId":"fd5669a8-68c1-8dl0-m4e8-8y535e349324"
   "amount":50.0,
   "currency":"USD",
   "invoiceId":"c57e1a2b-1a6b-4053-be2c-cc5fad2b5cbf",
   "invoiceNumber":"1285",
   "effectiveDate":"2013-08-01",
   "accountId":"da3769a8-58c4-4dc0-b4e8-7b534e349624",
   "description":"description"
}
```
```python
{'invoice_item_id' : 'fd5669a8-68c1-8dl0-m4e8-8y535e349328'
 'account_id': 'da3769a8-58c4-4dc0-b4e8-7b534e349624',
 'amount': 50.0,
 'currency': 'USD',
 'description': 'example',
 'effective_date': datetime.datetime(2018, 5, 3, 15, 53, 44, tzinfo=tzutc()),,
 'invoice_id': 'c57e1a2b-1a6b-4053-be2c-cc5fad2b5cbf',
 'invoice_number': '1285'
}
```

**Query Parameters**

None.

**Returns**

If successful, returns a status code of 200 and an invoiceItem resource object with itemType CREDIT_ADJ representing a credit.
