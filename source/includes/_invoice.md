#Invoice

## Invoice Resource

The `Invoice` resource represent the invoice created by the user.

The attributes are the following:

* **`amount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`currency`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`status`** <span style="color:#32A9C7">*[System generated]*</span>
* **`creditAdj`** <span style="color:#32A9C7">*TODO*</span>
* **`refundAdj`** <span style="color:#32A9C7">*TODO*</span>
* **`invoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`invoiceDate`** <span style="color:#32A9C7">*[System generated]*<</span>
* **`targetDate`** <span style="color:#32A9C7">*[User generated]*</span>
* **`invoiceNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`balance`** <span style="color:#32A9C7">*[System generated]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`bundleKeys`** <span style="color:#32A9C7">*TODO*</span>
* **`credits`** <span style="color:#32A9C7">*[See `Credit` below]*</span>
* **`items`** <span style="color:#32A9C7">*[See `InvoiceItem` below]*</span>
* **`isParentInvoice`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`parentInvoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`parentAccountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[AuditLog]*</span>

### Credit

* **`creditAmount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`currency`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`invoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`invoiceNumber`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`effectiveDate`** <span style="color:#32A9C7">*[User generated]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`description`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`itemDetails`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[AuditLog]*</span>

### InvoiceItem

* **`invoiceItemId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`invoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`linkedInvoiceItemId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`childAccountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`subscriptionId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`planName`** <span style="color:#32A9C7">*TODO*</span>
* **`phaseName`** <span style="color:#32A9C7">*TODO*</span>
* **`usageName`** <span style="color:#32A9C7">*TODO*</span>
* **`prettyPlanName`** <span style="color:#32A9C7">*TODO*</span>
* **`prettyPhaseName`** <span style="color:#32A9C7">*TODO*</span>
* **`prettyUsageName`** <span style="color:#32A9C7">*TODO*</span>
* **`itemType`** <span style="color:#32A9C7">*TODO*</span>
* **`description`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`startDate`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`endDate`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`amount`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`rate`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`quantity`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`currency`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`itemDetails`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`childItems`** <span style="color:#32A9C7">*[User or system generated]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[AuditLog]*</span>

## Trigger an invoice generation

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = "3ee3aa82-1d45-4bbc-b36b-74d628e095d0"
target_date = nil

KillBillClient::Model::Invoice.trigger_invoice(account_id, 
                                               target_date, 
                                               user, 
                                               reason, 
                                               comment, 
                                               options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
target_date = datetime.date(2018, 6, 11)

invoiceApi.create_future_invoice(account_id, 
                                 created_by, 
                                 api_key, 
                                 api_secret, 
                                 target_date=target_date)
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
| **accountId** | string | true | account id |
| **targetDate** | string | true | target date |


**Returns**

A `200` http status without content.

## Adjust an invoice item

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/{invoiceId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_item                 = KillBillClient::Model::InvoiceItem.new
invoice_item.account_id      = "3ee3aa82-1d45-4bbc-b36b-74d628e095d0"
invoice_item.invoice_id      = "2c98cfa2-7929-4cc2-9397-1624fb72c6d5"
invoice_item.invoice_item_id = "b311f709-ad51-4f67-8722-18ce04334c31"
invoice_item.amount          = 100.00
invoice_item.currency        = 'USD'
invoice_item.description     = 'Free adjustment: good customer'

invoice_item.update(user, 
                    reason, 
                    comment, 
                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = InvoiceItem(account_id='3ee3aa82-1d45-4bbc-b36b-74d628e095d0',
                   invoice_id='2c98cfa2-7929-4cc2-9397-1624fb72c6d5',
                   invoice_item_id='b311f709-ad51-4f67-8722-18ce04334c31',
                   amount=100,
                   currency='USD',
                   description='Free adjustment: good customer')

invoiceApi.adjust_invoice_item(invoice_id,
                               body,
                               created_by,
                               api_key,
                               api_secret)
```

> Example Response:

```ruby
{
   "amount":400.0,
   "currency":"USD",
   "status":"COMMITTED",
   "creditAdj":0.0,
   "refundAdj":0.0,
   "invoiceId":"2c98cfa2-7929-4cc2-9397-1624fb72c6d5",
   "invoiceDate":"2013-08-31",
   "targetDate":"2013-08-31",
   "invoiceNumber":"1884",
   "balance":0,
   "accountId":"3ee3aa82-1d45-4bbc-b36b-74d628e095d0",
   "items":[],
   "isParentInvoice":false,
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a invoice object.

## Retrieve an invoice by id

**HTTP Request**

`GET http://example.com/1.0/kb/invoices/{invoiceId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
id_or_number = "31db9f9a-91ff-49f4-b5a1-5e4fce59a197"
with_items = true
audit = 'NONE'

KillBillClient::Model::Invoice.find_by_id_or_number(id_or_number, 
                                                    with_items, 
                                                    audit, 
                                                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '43da4e9c-03c6-4f15-8943-b9a3af3ecacb'
        
invoiceApi.get_invoice(invoice_id, api_key, api_secret)
```
> Example Response:

```ruby
{
   "amount":7.0,
   "currency":"USD",
   "status":"COMMITTED",
   "creditAdj":0.0,
   "refundAdj":0.0,
   "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
   "invoiceDate":"2013-08-01",
   "targetDate":"2013-08-01",
   "invoiceNumber":"1913",
   "balance":0.0,
   "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
   "items":[
      {
         "invoiceItemId":"f641ce8a-a874-4e98-ada5-2bd8fdb74945",
         "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
         "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
         "itemType":"EXTERNAL_CHARGE",
         "description":"My first charge",
         "startDate":"2013-08-01",
         "amount":7.0,
         "currency":"USD",
         "auditLogs":[]
      }
   ],
   "isParentInvoice":false,
   "auditLogs":[]
}
```
```python
{'account_id': '78bd2ed3-2dc8-4d7c-92da-2a319fd40881',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': '43da4e9c-03c6-4f15-8943-b9a3af3ecacb',
 'invoice_number': '972',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withItems** | boolean | false | choose true if you want to include items |
| **withChildrenItems** | boolean | false | choose true if you want to include children items date |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a invoice object.

## Retrieve an invoice by number

**HTTP Request**

`GET http://example.com/1.0/kb/invoices/byNumber/{invoiceNumber`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
id_or_number = "31db9f9a-91ff-49f4-b5a1-5e4fce59a197"
with_items = true
audit = 'NONE'

KillBillClient::Model::Invoice.find_by_id_or_number(id_or_number, 
                                                    with_items, 
                                                    audit, 
                                                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_number = '972'

invoiceApi.get_invoice_by_number(invoice_number, api_key, api_secret)
```
> Example Response:

```ruby
{
   "amount":7.0,
   "currency":"USD",
   "status":"COMMITTED",
   "creditAdj":0.0,
   "refundAdj":0.0,
   "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
   "invoiceDate":"2013-08-01",
   "targetDate":"2013-08-01",
   "invoiceNumber":"1913",
   "balance":0.0,
   "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
   "items":[
      {
         "invoiceItemId":"f641ce8a-a874-4e98-ada5-2bd8fdb74945",
         "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
         "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
         "itemType":"EXTERNAL_CHARGE",
         "description":"My first charge",
         "startDate":"2013-08-01",
         "amount":7.0,
         "currency":"USD",
         "auditLogs":[]
      }
   ],
   "isParentInvoice":false,
   "auditLogs":[]
}
```
```python
{'account_id': '78bd2ed3-2dc8-4d7c-92da-2a319fd40881',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': '43da4e9c-03c6-4f15-8943-b9a3af3ecacb',
 'invoice_number': '972',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withItems** | boolean | false | choose true if you want to include items |
| **withChildrenItems** | boolean | false | choose true if you want to include children items date |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a invoice object.

## Delete a CBA item

**HTTP Request**

`DELETE http://example.com/1.0/kb/invoices/{invoiceId}/{invoiceItemId}/cba`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_item                 = KillBillClient::Model::InvoiceItem.new
invoice_item.account_id      = "3ee3aa82-1d45-4bbc-b36b-74d628e095d0"
invoice_item.invoice_id      = "2c98cfa2-7929-4cc2-9397-1624fb72c6d5"
invoice_item.invoice_item_id = "b311f709-ad51-4f67-8722-18ce04334c31"

invoice_item.delete(user, 
                    reason, 
                    comment, 
                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id='2c98cfa2-7929-4cc2-9397-1624fb72c6d5',
invoice_item_id='b311f709-ad51-4f67-8722-18ce04334c31'
account_id = '3ee3aa82-1d45-4bbc-b36b-74d628e095d0',

invoiceApi.delete_cba(invoice_id,
                      invoice_item_id,
                      account_id,
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
| **accountId** | string | true | account id |

**Returns**

A `200` http status without content.

## Add custom fields to invoice

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/{invoiceId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'INVOICE'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

invoice.add_custom_field(custom_field, 
                         user,
                         reason,
                         comment,
                         options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
body = CustomField(name='Test Custom Field', value='test_value')

invoiceApi.create_invoice_custom_fields(invoice_id,
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
      "objectType":"INVOICE",
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

## Retrieve invoice custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/{invoiceId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

invoice.custom_fields(audit, options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'

invoiceApi.get_invoice_custom_fields(invoice_id, api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"INVOICE",
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
 'object_type': 'INVOICE',
 'value': 'test_value'}]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to invoice

**HTTP Request** 

`PUT http://example.com/1.0/kb/invoices/{invoiceId}/customFields`


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

invoice.modify_custom_field(custom_field,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac'
custom_field_id = '7fb3dde7-0911-4477-99e3-69d142509bb9'
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

invoiceApi.modify_invoice_custom_fields(invoice_id, 
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
      "objectType":"INVOICE",
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

None.

**Returns**

Returns a custom field object.

## Remove custom fields from invoice

**HTTP Request** 

`DELETE http://example.com/1.0/kb/invoices/{invoiceId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

invoice.remove_custom_field(custom_field_id,                                                                                            
                            user, 
                            reason,
                            comment, 
                            options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '4927c1a2-3959-4f71-98e7-ce3ba19c92ac' 

invoiceApi.delete_invoice_custom_fields(invoice_id, 
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
| **customField** | string | true | a list of custom field objects that you want to remove it |

**Returns**

A `200` http status without content.

## Render an invoice as HTML

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/{invoiceId}/html`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_id = invoice.invoice_id
KillBillClient::Model::Invoice.as_html(invoice_id, @options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '2c98cfa2-7929-4cc2-9397-1624fb72c6d5'

invoiceApi.get_invoice_as_html(invoice_id, api_key, api_secret)
```

> Example Response:

```ruby
<html>
    <head>
        <style type="text/css">
            th {align=left; width=225px; border-bottom: solid 2px black;}
        </style>
    </head>
    <body>
        <h1>invoiceTitle</h1>
        <table>
            <tr>
                <td rowspan=3 width=350px>Insert image here</td>
                <td width=100px/>
                <td width=225px/>
                <td width=225px/>
            </tr>
            <tr>
                <td />
                <td align=right>invoiceDate</td>
                <td>1 août 2013</td>
            </tr>
            <tr>
                <td />
                <td align=right>invoiceNumber</td>
                <td>2038</td>
            </tr>
            <tr>
                <td>companyName</td>
                <td></td>
                <td align=right>accountOwnerName</td>
                <td>KillBillClient</td>
            </tr>
            <tr>
                <td>companyAddress</td>
                <td />
                <td />
                <td>kill@bill.com</td>
            </tr>
            <tr>
                <td>companyCityProvincePostalCode</td>
                <td />
                <td />
                <td></td>
            </tr>
            <tr>
                <td>companyCountry</td>
                <td />
                <td />
                <td />
            </tr>
            <tr>
                <td><companyUrl</td>
                <td />
                <td />
                <td />
            </tr>
        </table>
        <br />
        <br />
        <br />
        <table>
            <tr>
                <th>invoiceItemBundleName</td>
                <th>invoiceItemDescription</td>
                <th>invoiceItemServicePeriod</td>
                <th>invoiceItemAmount</td>
            </tr>
            
            <tr>
                <td>My charge</td>
                <td></td>
                <td>1 août 2013</td>
                <td>USD 50.00</td>
            </tr>
            
            <tr>
                <td colspan=4 />
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceAmount</strong></td>
                <td align=right><strong>50.00</strong></td>
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceAmountPaid</strong></td>
                <td align=right><strong>50.00</strong></td>
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceBalance</strong></td>
                <td align=right><strong>0.00</strong></td>
            </tr>
        </table>
    </body>
</html>
```
```python
<html>
    <head>
        <style type="text/css">
            th {align=left; width=225px; border-bottom: solid 2px black;}
        </style>
    </head>
    <body>
        <h1>invoiceTitle</h1>
        <table>
            <tr>
                <td rowspan=3 width=350px>Insert image here</td>
                <td width=100px/>
                <td width=225px/>
                <td width=225px/>
            </tr>
            <tr>
                <td />
                <td align=right>invoiceDate</td>
                <td>May 10, 2018</td>
            </tr>
            <tr>
                <td />
                <td align=right>invoiceNumber</td>
                <td>974</td>
            </tr>
            <tr>
                <td>companyName</td>
                <td></td>
                <td align=right>accountOwnerName</td>
                <td>John</td>
            </tr>
            <tr>
                <td>companyAddress</td>
                <td />
                <td />
                <td></td>
            </tr>
            <tr>
                <td>companyCityProvincePostalCode</td>
                <td />
                <td />
                <td></td>
            </tr>
            <tr>
                <td>companyCountry</td>
                <td />
                <td />
                <td />
            </tr>
            <tr>
                <td><companyUrl</td>
                <td />
                <td />
                <td />
            </tr>
        </table>
        <br />
        <br />
        <br />
        <table>
            <tr>
                <th>invoiceItemBundleName</td>
                <th>invoiceItemDescription</td>
                <th>invoiceItemServicePeriod</td>
                <th>invoiceItemAmount</td>
            </tr>
            
            <tr>
                <td>standard-monthly-trial</td>
                <td>standard-monthly</td>
                <td>May 10, 2018</td>
                <td>USD 0.00</td>
            </tr>
            
            <tr>
                <td colspan=4 />
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceAmount</strong></td>
                <td align=right><strong>0.00</strong></td>
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceAmountPaid</strong></td>
                <td align=right><strong>0.00</strong></td>
            </tr>
            <tr>
                <td colspan=2 />
                <td align=right><strong>invoiceBalance</strong></td>
                <td align=right><strong>0.00</strong></td>
            </tr>
        </table>
    </body>
</html>
```

**Query Parameters**

None. 

**Returns**

Returns a invoice rendered as HTML.

## Trigger a payment for invoice

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/{invoiceId}/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
payment                  = KillBillClient::Model::InvoicePayment.new
payment.account_id       = "3ee3aa82-1d45-4bbc-b36b-74d628e095d0"
payment.purchased_amount = '50.0'

external_payment = true

payment.create(external_payment, 
               user, 
               reason, 
               comment, 
               options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = InvoicePayment(account_id=account_id,
                      purchased_amount=50.0,
                      target_invoice_id=invoice_id)

invoiceApi.create_instant_payment(invoice_id,
                                  body,
                                  created_by,
                                  api_key,
                                  api_secret,
                                  external_payment=True)
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
| **externalPayment** | boolean | true | choose true if the payment method is external |

**Returns**

A `200` http status without content.

## Retrieve payments associated with an invoice

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/{invoiceId}/payments`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
**TODO**
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '8291871e-b16e-45e6-a971-577d44727327'

invoiceApi.get_payments_for_invoice(invoice_id, api_key, api_secret)
```
> Example Response:

```ruby
**TODO**
```
```python
{'account_id': '8a758318-25fb-46e1-a385-a8f8354ec903',
 'audit_logs': [],
 'auth_amount': 0.0,
 'captured_amount': 0.0,
 'credited_amount': 0.0,
 'currency': 'USD',
 'payment_attempts': None,
 'payment_external_key': '5e9d8b82-2664-4a36-85a1-37471a0b618a',
 'payment_id': '5e9d8b82-2664-4a36-85a1-37471a0b618a',
 'payment_method_id': 'eb737a51-d230-46fe-ad95-8ddf0b8effe3',
 'payment_number': '337',
 'purchased_amount': 50.0,
 'refunded_amount': 0.0,
 'target_invoice_id': '8291871e-b16e-45e6-a971-577d44727327',
 'transactions': [{'amount': 50.0,
                   'audit_logs': [],
                   'currency': 'USD',
                   'effective_date': datetime.datetime(2018, 5, 9, 14, 27, 9, tzinfo=tzutc()),
                   'first_payment_reference_id': None,
                   'gateway_error_code': None,
                   'gateway_error_msg': None,
                   'payment_external_key': '5e9d8b82-2664-4a36-85a1-37471a0b618a',
                   'payment_id': '5e9d8b82-2664-4a36-85a1-37471a0b618a',
                   'processed_amount': 50.0,
                   'processed_currency': 'USD',
                   'properties': None,
                   'second_payment_reference_id': None,
                   'status': 'SUCCESS',
                   'transaction_external_key': '70a36a47-878e-4fd8-8401-1ab2f4403d41',
                   'transaction_id': '70a36a47-878e-4fd8-8401-1ab2f4403d41',
                   'transaction_type': 'PURCHASE'}]}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | 
| **withPluginInfo** | boolean | true | choose true if you want plugin info |
| **withAttempts** | boolean | true | choose true if you want payment attempts |
| **audit** | enum | false | level of audit logs returned |

**Returns**

A `200` http status without content.

## Perform the invoice status transition from DRAFT to COMMITTED

**HTTP Request** 

`PUT http://example.com/1.0/kb/invoices/{invoiceId}/commitInvoice`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice = KillBillClient::Model::Invoice.new
invoice.invoice_id = "2c98cfa2-7929-4cc2-9397-1624fb72c6d5"

invoice.commit(user, 
               reason, 
               comment, 
               options)
```

```python
invoiceApi = killbill.api.InvoiceApi()

invoiceApi.commit_invoice(invoice_id, 
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

A `200` http status without content.

## Add tags to invoice

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/{invoiceId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

invoice.add_tag(tag_name,
               user,
               reason,
               comment,
               options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'
tag = ["00000000-0000-0000-0000-000000000002"]

invoiceApi.create_invoice_tags(invoice_id, 
                               tag, 
                               created_by, 
                               api_key, 
                               api_secret)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"INVOICE",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[

      ]
   }
]
```

```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true | tag list to add |

**Returns**

Returns a invoice tag object.

## Retrieve invoice tags

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/{invoiceId}/tags`

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

invoice.tags(included_deleted,
             audit,
             options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '3e94fccf-0f37-40aa-90a4-122a4f381ebc'

invoiceApi.get_invoice_tags(invoice_id, api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"INVOICE",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[]
   }
]
```
```python
[{'audit_logs': [],
 'object_id': '3e94fccf-0f37-40aa-90a4-122a4f381ebc',
 'object_type': 'INVOICE',
 'tag_definition_id': '00000000-0000-0000-0000-000000000002',
 'tag_definition_name': 'AUTO_INVOICING_OFF',
 'tag_id': 'fc7fab6e-751c-4dd3-b7fa-e93a66e42822'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of invoice tag objects.

## Remove tags from invoice

**HTTP Request** 

`DELETE http://example.com/1.0/kb/invoices/{invoiceId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

invoice.remove_tag(tag_name,
                  user,
                  reason,
                  comment,
                  options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

invoiceApi.delete_invoice_tags(invoice_id, 
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
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true |  list of tags that you want to remove it |

**Response**

A `200` http status without content.

## Perform the action of voiding an invoice

**HTTP Request** 

`PUT http://example.com/1.0/kb/invoices/{invoiceId}/voidInvoice`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
**TODO**
```

```python
invoiceApi = killbill.api.InvoiceApi()
invoice_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

invoiceApi.void_invoice(invoice_id, 
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

**Response**

A `200` http status without content.

## Upload the catalog translation for the tenant

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/catalogTranslation/{locale}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
catalog_translation = 'sports-monthly = Voiture Sport'
locale = "fr_FR"
delete_if_exists = false

KillBillClient::Model::Invoice.upload_catalog_translation(catalog_translation, 
                                                          locale, 
                                                          delete_if_exists, 
                                                          user, 
                                                          reason, 
                                                          comment, 
                                                          options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
locale = 'fr_FR'
body = "sports-monthly = Voiture Sport"

invoiceApi.upload_catalog_translation(locale,
                                      body,
                                      created_by,
                                      api_key,
                                      api_secret)
```

> Example Response:

```ruby
"sports-monthly = Voiture Sport"
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **deleteIfExists** | boolean | false |  delete translation if exists |

**Response**

A `200` http status without content.

## Retrieves the catalog translation for the tenant

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/catalogTranslation/{locale}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
locale = "fr_FR"
KillBillClient::Model::Invoice.get_catalog_translation(locale, 
                                                       options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
locale = 'fr_FR'

invoiceApi.get_catalog_translation(locale, api_key, api_secret)
```

> Example Response:

```ruby
"sports-monthly = Voiture Sport"
```
```python
sports-monthly = Voiture Sport
```


**Query Parameters**

None.

**Response**

A `200` http status without content.

## Create external charge(s)

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/charges/{accountId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_item             = KillBillClient::Model::InvoiceItem.new()
invoice_item.account_id  = "83e5e82d-fe72-4873-9b8b-946f4d250b0d"
invoice_item.amount      = '50.0'
invoice_item.currency    = 'USD'
invoice_item.description = 'My charge'

auto_commit = true

invoice_item.create(auto_commit, 
                    user, 
                    reason, 
                    comment, 
                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = InvoiceItem(account_id=account_id,
                   amount=50.0,
                   currency='USD',
                   description='My charge')

invoiceApi.create_external_charges(account_id,
                                   [body],
                                   created_by,
                                   api_key,
                                   api_secret,
                                   auto_commit=True)
```

> Example Response:

```ruby
{
   "invoiceItemId":"4661b7a9-f19f-431e-80ed-547932527fbe",
   "invoiceId":"d27bca74-7e08-4eff-9479-51e8009fe3d0",
   "accountId":"83e5e82d-fe72-4873-9b8b-946f4d250b0d",
   "itemType":"EXTERNAL_CHARGE",
   "description":"My charge",
   "startDate":"2013-08-01",
   "amount":50.0,
   "currency":"USD"
}
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |
| **autoCommit** | boolean | false | auto commit |
| **payInvoice** | boolean | false | pay invoice |
| **paymentExternalKey** | string | false | payment external key |
| **transactionExternalKey** | boolean | false | transaction external key |


**Response**

Returns a invoice object.

## Generate a dryRun invoice

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/dryRun`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
#
# This case is when you create a dry-run invoice with UPCOMING_INVOICE, 
# to see what is the next invoice that the system will generate for this account 
# 
account_id = "5527abbc-d83d-447f-bf3d-ab9542ea631e"
target_date = nil
upcoming_invoice_target_date = true

KillBillClient::Model::Invoice.trigger_invoice_dry_run(account_id, 
                                                       target_date, 
                                                       upcoming_invoice_target_date, 
                                                       options)
```

```python
#
# This case is when you create a dry-run invoice with UPCOMING_INVOICE, 
# to see what is the next invoice that the system will generate for this account 
# 
invoiceApi = killbill.api.InvoiceApi()
body = InvoiceDryRun(dry_run_type='UPCOMING_INVOICE')
account_id = '00e87495-92dc-4640-8490-e2c794748151'

invoiceApi.generate_dry_run_invoice(body,
                                    account_id,
                                    created_by,
                                    api_key,
                                    api_secret)
```

> Example Response:

```ruby
{
   "amount":500.0,
   "currency":"USD",
   "status":"COMMITTED",
   "creditAdj":0.0,
   "refundAdj":0.0,
   "invoiceId":"8c62095e-898d-444e-a05b-a498f8bd9d1b",
   "invoiceDate":"2013-08-01",
   "targetDate":"2013-08-31",
   "balance":500.0,
   "accountId":"5527abbc-d83d-447f-bf3d-ab9542ea631e",
   "items":[
      {
         "invoiceItemId":"a45f76a2-7775-4053-bd7c-50a7542e52d3",
         "invoiceId":"8c62095e-898d-444e-a05b-a498f8bd9d1b",
         "accountId":"5527abbc-d83d-447f-bf3d-ab9542ea631e",
         "bundleId":"8e26532b-e5c0-4d4a-b2f0-2eeec8668ada",
         "subscriptionId":"466e26d9-6e44-4afb-9c2f-2b93a4f52329",
         "planName":"sports-monthly",
         "phaseName":"sports-monthly-evergreen",
         "itemType":"RECURRING",
         "description":"sports-monthly-evergreen",
         "startDate":"2013-08-31",
         "endDate":"2013-09-30",
         "amount":500.0,
         "currency":"USD"
      }
   ],
   "isParentInvoice":false
}
```
```python
{'account_id': '00e87495-92dc-4640-8490-e2c794748151',
 'amount': 100.0,
 'audit_logs': [],
 'balance': 100.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': 'a1c2ab02-d5d8-450d-bb7c-e8f169018570',
 'invoice_number': None,
 'is_parent_invoice': False,
 'items': [{'account_id': '00e87495-92dc-4640-8490-e2c794748151',
            'amount': 100.0,
            'audit_logs': [],
            'bundle_id': '3c02be83-3c2d-4f5a-827e-edfe85266d54',
            'child_account_id': None,
            'child_items': None,
            'currency': 'USD',
            'description': 'standard-monthly-evergreen',
            'end_date': datetime.date(2018, 8, 9),
            'invoice_id': 'a1c2ab02-d5d8-450d-bb7c-e8f169018570',
            'invoice_item_id': 'fe1ec859-dbb9-4851-a030-709a32672bca',
            'item_details': None,
            'item_type': 'RECURRING',
            'linked_invoice_item_id': None,
            'phase_name': 'standard-monthly-evergreen',
            'plan_name': 'standard-monthly',
            'pretty_phase_name': None,
            'pretty_plan_name': None,
            'pretty_usage_name': None,
            'quantity': None,
            'rate': 100.0,
            'start_date': datetime.date(2018, 7, 9),
            'subscription_id': '99e4caa5-d5da-4243-8c91-a38c5cd29632',
            'usage_name': None}],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 7, 9)}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **accountId** | string | true | account id |
| **targetDate** | string | true | target date |


**Response**

Returns a invoice object.

## Upload the manualPay invoice template for the tenant

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/manualPayTemplate`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_template = "Some_HTML_String"
is_manual_pay = true
delete_if_exists = false
KillBillClient::Model::Invoice.upload_invoice_template(invoice_template, 
                                                       is_manual_pay, 
                                                       delete_if_exists, 
                                                       user, 
                                                       reason, 
                                                       comment, 
                                                       options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = 'Some_HTML_String'

invoiceApi.upload_invoice_mp_template(body,
                                      created_by,
                                      api_key,
                                      api_secret)
```

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">

<html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **deleteIfExists** | boolean | false | delete if exists |


**Response**

Returns a invoice template.

## Retrieves the manualPay invoice template for the tenant

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/manualPayTemplate`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
is_manual_pay = true

KillBillClient::Model::Invoice.get_invoice_template(is_manual_pay,
                                                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()

invoiceApi.get_invoice_mp_template(api_key, api_secret)
```

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">

<html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```
```python
"<meta charset=\"UTF-8\">

 <html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```

**Query Parameters**

None.


**Response**

Returns a invoice template.

## Create a migration invoice

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/migration/{accountId}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
account_id = "be19b229-c076-47aa-aa4d-f53bec505dc7"
invoices = "external_invoice_list"
target_date = "2018-03-15"
KillBillClient::Model::Invoice.create_migration_invoice(account_id, 
                                                        invoices, 
                                                        target_date, 
                                                        user, 
                                                        reason, 
                                                        comment, 
                                                        options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = 'external_invoice_list'
target_date = datetime.date(2018, 6, 11)

invoiceApi.create_migration_invoice(account_id,
                                    [body],
                                    created_by,
                                    api_key,
                                    api_secret,
                                    target_date)
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
| **accountId** | string | true | account id |
| **targetDate** | string | true | target date |


**Response**

A `200` http status without content.

## List invoices

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/pagination`

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

invoice.find_in_batches(offset,
                        limit,
                        options)
```

```python
invoiceApi = killbill.api.InvoiceApi()

invoiceApi.get_invoices(api_key, api_secret)
```

> Example Response:

```ruby
[
    {
       "amount":7.0,
       "currency":"USD",
       "status":"COMMITTED",
       "creditAdj":0.0,
       "refundAdj":0.0,
       "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
       "invoiceDate":"2013-08-01",
       "targetDate":"2013-08-01",
       "invoiceNumber":"1913",
       "balance":0.0,
       "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
       "items":[
          {
             "invoiceItemId":"f641ce8a-a874-4e98-ada5-2bd8fdb74945",
             "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
             "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
             "itemType":"EXTERNAL_CHARGE",
             "description":"My first charge",
             "startDate":"2013-08-01",
             "amount":7.0,
             "currency":"USD",
             "auditLogs":[]
          }
       ],
       "isParentInvoice":false,
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '40d6c91b-13f4-4689-8acc-b3455ab956ac',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': '14f2bbf3-bd2d-4e32-86eb-b9d32ce4be74',
 'invoice_number': '1015',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}, {'account_id': '7f6894df-d1d6-499b-8cd0-a09da4d3beaf',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': 'cd98fb3b-25a4-4e1c-8426-0c1080531ad9',
 'invoice_number': '1016',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **withItems** | boolean | false | choose true if you want to include items |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list with all invoices.

## Search invoices

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/search/{searchKey}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
search_key = 'COMMITTED'
offset = 0
limit = 100

invoice.find_in_batches_by_search_key(search_key,
                                      offset,
                                      limit,
                                      options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
search_key = 'USD'

invoiceApi.search_invoices(search_key, api_key, api_secret)
```

> Example Response:

```ruby
[
    {
       "amount":7.0,
       "currency":"USD",
       "status":"COMMITTED",
       "creditAdj":0.0,
       "refundAdj":0.0,
       "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
       "invoiceDate":"2013-08-01",
       "targetDate":"2013-08-01",
       "invoiceNumber":"1913",
       "balance":0.0,
       "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
       "items":[
          {
             "invoiceItemId":"f641ce8a-a874-4e98-ada5-2bd8fdb74945",
             "invoiceId":"31db9f9a-91ff-49f4-b5a1-5e4fce59a197",
             "accountId":"be19b229-c076-47aa-aa4d-f53bec505dc7",
             "itemType":"EXTERNAL_CHARGE",
             "description":"My first charge",
             "startDate":"2013-08-01",
             "amount":7.0,
             "currency":"USD",
             "auditLogs":[]
          }
       ],
       "isParentInvoice":false,
       "auditLogs":[]
    }
]
```
```python
[{'account_id': '554f89d7-c9bd-4e48-a28d-5d2d88f0ea19',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': '5ffe67ba-322a-407c-8051-0a5839774a1c',
 'invoice_number': '1017',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}, {'account_id': '58e8ffe1-d01e-4716-bf46-c76b881b6574',
 'amount': 0.0,
 'audit_logs': [],
 'balance': 0.0,
 'bundle_keys': None,
 'credit_adj': 0.0,
 'credits': None,
 'currency': 'USD',
 'invoice_date': datetime.date(2018, 5, 10),
 'invoice_id': '4a836b76-447c-4d5c-9dc7-96f1c9b0cf9c',
 'invoice_number': '1018',
 'is_parent_invoice': False,
 'items': [],
 'parent_account_id': None,
 'parent_invoice_id': None,
 'refund_adj': 0.0,
 'status': 'COMMITTED',
 'target_date': datetime.date(2018, 5, 10)}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |
| **withItems** | boolean | false | choose true if you want to include items |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Return a list with invoices matched with the search key entered.

## Upload the invoice template for the tenant

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/template`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_template = "Some_HTML_String"
is_manual_pay = false
delete_if_exists = false
KillBillClient::Model::Invoice.upload_invoice_template(invoice_template, 
                                                       is_manual_pay, 
                                                       delete_if_exists, 
                                                       user, 
                                                       reason, 
                                                       comment, 
                                                       options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
body = 'Some_HTML_String'

invoiceApi.upload_invoice_template(body,
                                   created_by,
                                   api_key,
                                   api_secret)
```

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">

<html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **deleteIfExists** | boolean | false | delete if exists |


**Response**

Returns a invoice template.

## Retrieves the invoice template for the tenant

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/template`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
is_manual_pay = false

KillBillClient::Model::Invoice.get_invoice_template(is_manual_pay,
                                                    options)
```

```python
invoiceApi = killbill.api.InvoiceApi()

invoiceApi.get_invoice_template(api_key, api_secret)
```

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">

<html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```
```python
"<meta charset=\"UTF-8\">

 <html>
       
   <head>
              
      <style type=\"text/css\"> th {align=left; width=225px; border-bottom: solid 2px black;} </style>
          
   </head>
       
   <body>
              
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
              
      <table>
                     
         <tr>
                            
            <td rowspan=3 width=350px>Insert image here</td>
                            
            <td width=100px/>                
            <td width=225px/>                
            <td width=225px/>            
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceDate}}</td>
                            
            <td>{{invoice.formattedInvoiceDate}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td />                
            <td align=right>{{text.invoiceNumber}}</td>
                            
            <td>{{invoice.invoiceNumber}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyName}}</td>
                            
            <td></td>
                            
            <td align=right>{{text.accountOwnerName}}</td>
                            
            <td>{{account.name}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyAddress}}</td>
                            
            <td />                
            <td />                
            <td>{{account.email}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCityProvincePostalCode}}</td>
                            
            <td />                
            <td />                
            <td>{{account.phone}}</td>
                        
         </tr>
                     
         <tr>
                            
            <td>{{text.companyCountry}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                     
         <tr>
                            
            <td><{{text.companyUrl}}</td>
                            
            <td />                
            <td />                
            <td />            
         </tr>
                 
      </table>
              <br />        <br />        <br />        
      <table>
                     
         <tr>
                            
            <th>{{text.invoiceItemBundleName}}</td>                
            <th>{{text.invoiceItemDescription}}</td>                
            <th>{{text.invoiceItemServicePeriod}}</td>                
            <th>{{text.invoiceItemAmount}}</td>            
         </tr>
                     {{#invoice.invoiceItems}}            
         <tr>
                            
            <td>{{description}}</td>
                            
            <td>{{planName}}</td>
                            
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
                            
            <td>{{invoice.currency}} {{amount}}</td>
                        
         </tr>
                     {{/invoice.invoiceItems}}            
         <tr>
                            
            <td colspan=4 />            
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
                            
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
                            
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
                        
         </tr>
                     
         <tr>
                            
            <td colspan=2 />                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
                            
            <td align=right><strong>{{invoice.balance}}</strong></td>
                        
         </tr>
                 
      </table>
          
   </body>
   
</html>
"
```

**Query Parameters**

None.


**Response**

Returns a invoice template.

## Upload the invoice translation for the tenant

**HTTP Request** 

`POST http://example.com/1.0/kb/invoices/translation/{locale}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
invoice_translation = get_resource_as_string("InvoiceTranslation_fr_FR.properties")
locale = "fr_FR"
delete_if_exists = false
KillBillClient::Model::Invoice.upload_invoice_translation(invoice_translation,
                                                          locale,
                                                          delete_if_exists, 
                                                          options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
locale = 'fr_FR'
body = "sports-monthly = Voiture Sport"

invoiceApi.upload_invoice_translation(locale,
                                      body,
                                      created_by,
                                      api_key,
                                      api_secret)
```

> Example Response:

```ruby
invoiceTitle=FACTURE
invoiceDate=Date:
invoiceNumber=Facture #
invoiceAmount=XXXMontant à payer
invoiceAmountPaid=XXXMontant payé
invoiceBalance=Nouveau montant

accountOwnerName=Chauffeur

companyName=Killbill, Inc.
companyAddress=P.O. Box 1234
companyCityProvincePostalCode=Springfield
companyCountry=USA
companyUrl=http://killbilling.org

invoiceItemBundleName=Armes
invoiceItemDescription=Description
invoiceItemServicePeriod=Periode de facturation
invoiceItemAmount=Montant

processedPaymentCurrency=(*) Le payment à été payé en
processedPaymentRate=Le taux de conversion est
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **deleteIfExists** | boolean | false |  delete translation if exists |

**Response**

A `200` http status without content.

## Retrieves the invoice translation for the tenant

**HTTP Request** 

`GET http://example.com/1.0/kb/invoices/translation/{locale}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
locale = "fr_FR"
KillBillClient::Model::Invoice.get_invoice_translation(locale,
                                                       options)
```

```python
invoiceApi = killbill.api.InvoiceApi()
locale = 'fr_FR'

invoiceApi.get_invoice_translation(locale, api_key, api_secret)
```

> Example Response:

```ruby
invoiceTitle=FACTURE
invoiceDate=Date:
invoiceNumber=Facture #
invoiceAmount=XXXMontant à payer
invoiceAmountPaid=XXXMontant payé
invoiceBalance=Nouveau montant

accountOwnerName=Chauffeur

companyName=Killbill, Inc.
companyAddress=P.O. Box 1234
companyCityProvincePostalCode=Springfield
companyCountry=USA
companyUrl=http://killbilling.org

invoiceItemBundleName=Armes
invoiceItemDescription=Description
invoiceItemServicePeriod=Periode de facturation
invoiceItemAmount=Montant

processedPaymentCurrency=(*) Le payment à été payé en
processedPaymentRate=Le taux de conversion est
```
```python
sports-monthly = Voiture Sport
```

**Query Parameters**

None. 

**Response**

A `200` http status without content.