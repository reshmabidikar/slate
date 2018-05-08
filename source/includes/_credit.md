# Credit

## Credit Resource

The `Credit` resource represent credits created by the user.

The attributes are the following:

* **`creditAmount`** <span style="color:#32A9C7">*(number, read only)*</span>
* **`currency`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`invoiceId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`invoiceNumber`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`accountId`** <span style="color:#32A9C7">*(string, read only)*</span>
* **`description`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`auditLogs`** <span style="color:#32A9C7">*(Array[AuditLogJson], optional, read only)*</span>

## Create a credit

**HTTP Request** 

`POST http://example.com/1.0/kb/credits`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
credit_item                 = KillBillClient::Model::Credit.new()
credit_item.account_id      = 'account_id'
credit_item.credit_amount   = 50.0
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
credit = killbill.api.CreditApi()
body = Credit(account_id=account_id, 
              credit_amount=50.0, 
              currency='USD', 
              description='example')

credit.create_credit(body, created_by, api_key, api_secret)
```

> Example Response:

```ruby
{
   "creditId":"fd5669a8-68c1-8dl0-m4e8-8y535e349324"
   "creditAmount":50.0,
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

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **autoCommit** | boolean | true | auto commit |

**Returns**

Returns a credit object.

## Retrieve a credit by id

**HTTP Request** 

`GET http://example.com/1.0/kb/credits/{creditId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
credit = KillBillClient::Model::Credit.new
credit_id = 'fd5669a8-68c1-8dl0-m4e8-8y535e349324'

credit.find_by_id(credit_id, 
                  options) 
```

```python
credit = killbill.api.CreditApi()
        
credit.get_credit(credit_id, api_key, api_secret)
```
> Example Response:

```ruby
{
   "creditId":"fd5669a8-68c1-8dl0-m4e8-8y535e349324"
   "creditAmount":50.0,
   "currency":"USD",
   "invoiceId":"c57e1a2b-1a6b-4053-be2c-cc5fad2b5cbf",
   "invoiceNumber":"1285",
   "effectiveDate":"2013-08-01",
   "accountId":"da3769a8-58c4-4dc0-b4e8-7b534e349624",
   "description":"description"
}
```
```python
{'credit_id' : 'fd5669a8-68c1-8dl0-m4e8-8y535e349328'
 'account_id': 'da3769a8-58c4-4dc0-b4e8-7b534e349624',
 'credit_amount': 50.0,
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

Returns a credit object.