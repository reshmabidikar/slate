#Invoice

## Invoice Resource

The `Invoice` resource represent the invoice created by the user.

The attributes are the following:

* **`amount`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`currency`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`status`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`creditAdj`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`refundAdj`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`invoiceId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`invoiceDate`** <span style="color:#32A9C7">*(string, optional, read only*</span>
* **`targetDate`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`invoiceNumber`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`balance`** <span style="color:#32A9C7">*(number, optional, read only)*</span>
* **`accountId`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`bundleKeys`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`credits`** <span style="color:#32A9C7">*(Array[CreditJson], optional, read only)*</span>
* **`items`** <span style="color:#32A9C7">*(Array[InvoiceItemJson], optional, read only)*</span>
* **`is_parent_invoice`** <span style="color:#32A9C7">*(boolean, optional, read only)*</span>
* **`isParentInvoice`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`parent_account_id`** <span style="color:#32A9C7">*(string, optional, read only)*</span>
* **`audit_logs`** <span style="color:#32A9C7">*(Array[AuditLogJson], optional, read only)*</span>

## Trigger an invoice generation

**HTTP Request** 

`POST /1.0/kb/invoices`

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

> Example Response:

```ruby
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

`POST /1.0/kb/invoices/{invoiceId}`

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a invoice object.

## Retrieve an invoice by id or number

**HTTP Request**

`GET /1.0/kb/invoices/{invoiceId}`

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withItems** | boolean | false | choose true if you want to include items date |
| **withChildrenItems** | boolean | false | choose true if you want to include children items date |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a invoice object.

## Delete a CBA item

**HTTP Request**

`DELETE /1.0/kb/invoices/{invoiceId}/{invoiceItemId}/cba`

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

> Example Response:

```ruby
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

`POST /1.0/kb/invoices/{invoiceId}/customFields`

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


**Query Parameters**

None.

**Returns**

Returns a custom field object.

## Remove custom fields from invoice

**HTTP Request** 

`DELETE /1.0/kb/invoices/{invoiceId}/customFields`

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

## Retrieve invoice custom fields

**HTTP Request** 

`GET /1.0/kb/invoices/{invoiceId}/customFields`

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Render an invoice as HTML

**HTTP Request** 

`GET /1.0/kb/invoices/{invoiceId}/html`

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


**Query Parameters**

None. 

**Returns**

Returns a invoice rendered as HTML.

## Trigger a payment for invoice

**HTTP Request** 

`POST /1.0/kb/invoices/{invoiceId}/payments`

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

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **externalPayment** | boolean | false | choose true if the payment method is external |

**Returns**

A `200` http status without content.