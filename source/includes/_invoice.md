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
* **`credits`** <span style="color:#32A9C7">*[CreditJson]*</span>
* **`items`** <span style="color:#32A9C7">*[InvoiceItemJson]*</span>
* **`isParentInvoice`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`parentInvoiceId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`parentAccountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>
* **`auditLogs`** <span style="color:#32A9C7">*[AuditLogJson]*</span>

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
invoice.invoice_id = "bd192838-34b3-4286-9a12-6a6f015bda13"

with_plugin_info = false
with_attempts = false
audit = 'NONE'

invoice.payments(with_plugin_info, with_attempts, audit, @options)
```

> Example Response:

```ruby
[
   {
      "targetInvoiceId":"bd192838-34b3-4286-9a12-6a6f015bda13",
      "accountId":"d83a7d29-f40e-4462-97f0-55994cadf69b",
      "paymentId":"5004baeb-9663-4814-acae-4c5936a92188",
      "paymentNumber":"478",
      "paymentExternalKey":"5004baeb-9663-4814-acae-4c5936a92188",
      "authAmount":0,
      "capturedAmount":0,
      "purchasedAmount":50.0,
      "refundedAmount":0,
      "creditedAmount":0,
      "currency":"USD",
      "paymentMethodId":"be18d2e4-9e49-4bc7-861e-fb9eaa711675",
      "transactions":[
         {
            "transactionId":"bd138306-63a7-41e5-8afb-837f922f3697",
            "transactionExternalKey":"bd138306-63a7-41e5-8afb-837f922f3697",
            "paymentId":"5004baeb-9663-4814-acae-4c5936a92188",
            "paymentExternalKey":"5004baeb-9663-4814-acae-4c5936a92188",
            "transactionType":"PURCHASE",
            "amount":50.0,
            "currency":"USD",
            "effectiveDate":"2013-08-01T06:00:02.000Z",
            "processedAmount":50.0,
            "processedCurrency":"USD",
            "status":"SUCCESS"
         }
      ]
   }
]
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **withPluginInfo** | boolean | false | Choose true if you want plugin info. |
| **withAttempts** | boolean | false | Choose true if you want payment attempts. |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a invoice object.

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of invoice tag objects.

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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true | tag list to add |

**Returns**

Returns a invoice tag object.

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

> Example Response:

```ruby
no content
```


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **tagList** | string | true |  list of tags that you want to remove it |

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
catalog_translation = 'locale_example'
locale = "en_GB"
delete_if_exists = false
KillBillClient::Model::Invoice.upload_catalog_translation(catalog_translation, 
                                                          locale, 
                                                          delete_if_exists, 
                                                          user, 
                                                          reason, 
                                                          comment, 
                                                          options)
```

> Example Response:

```ruby
"locale_example"
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
locale = "en_GB"
KillBillClient::Model::Invoice.get_catalog_translation(locale, 
                                                       options)
```

> Example Response:

```ruby
"locale_example"
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
account_id = "5527abbc-d83d-447f-bf3d-ab9542ea631e"
target_date = nil
upcoming_invoice_target_date = true

KillBillClient::Model::Invoice.trigger_invoice_dry_run(account_id, 
                                                       target_date, 
                                                       upcoming_invoice_target_date, 
                                                       options)

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

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">
\n
<html>
   \n    
   <head>
      \n        
      <style type=\"text/css\">\n th {align=left; width=225px; border-bottom: solid 2px black;}\n </style>
      \n    
   </head>
   \n    
   <body>
      \n        
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
      \n        
      <table>
         \n            
         <tr>
            \n                
            <td rowspan=3 width=350px>Insert image here</td>
            \n                
            <td width=100px/>\n                
            <td width=225px/>\n                
            <td width=225px/>\n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceDate}}</td>
            \n                
            <td>{{invoice.formattedInvoiceDate}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceNumber}}</td>
            \n                
            <td>{{invoice.invoiceNumber}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyName}}</td>
            \n                
            <td></td>
            \n                
            <td align=right>{{text.accountOwnerName}}</td>
            \n                
            <td>{{account.name}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyAddress}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.email}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCityProvincePostalCode}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.phone}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCountry}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td><{{text.companyUrl}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n        
      </table>
      \n        <br />\n        <br />\n        <br />\n        
      <table>
         \n            
         <tr>
            \n                
            <th>{{text.invoiceItemBundleName}}</td>\n                
            <th>{{text.invoiceItemDescription}}</td>\n                
            <th>{{text.invoiceItemServicePeriod}}</td>\n                
            <th>{{text.invoiceItemAmount}}</td>\n            
         </tr>
         \n            {{#invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td>{{description}}</td>
            \n                
            <td>{{planName}}</td>
            \n                
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
            \n                
            <td>{{invoice.currency}} {{amount}}</td>
            \n            
         </tr>
         \n            {{/invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td colspan=4 />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.balance}}</strong></td>
            \n            
         </tr>
         \n        
      </table>
      \n    
   </body>
   \n
</html>
\n\n"
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

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">
\n
<html>
   \n    
   <head>
      \n        
      <style type=\"text/css\">\n th {align=left; width=225px; border-bottom: solid 2px black;}\n </style>
      \n    
   </head>
   \n    
   <body>
      \n        
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
      \n        
      <table>
         \n            
         <tr>
            \n                
            <td rowspan=3 width=350px>Insert image here</td>
            \n                
            <td width=100px/>\n                
            <td width=225px/>\n                
            <td width=225px/>\n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceDate}}</td>
            \n                
            <td>{{invoice.formattedInvoiceDate}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceNumber}}</td>
            \n                
            <td>{{invoice.invoiceNumber}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyName}}</td>
            \n                
            <td></td>
            \n                
            <td align=right>{{text.accountOwnerName}}</td>
            \n                
            <td>{{account.name}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyAddress}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.email}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCityProvincePostalCode}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.phone}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCountry}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td><{{text.companyUrl}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n        
      </table>
      \n        <br />\n        <br />\n        <br />\n        
      <table>
         \n            
         <tr>
            \n                
            <th>{{text.invoiceItemBundleName}}</td>\n                
            <th>{{text.invoiceItemDescription}}</td>\n                
            <th>{{text.invoiceItemServicePeriod}}</td>\n                
            <th>{{text.invoiceItemAmount}}</td>\n            
         </tr>
         \n            {{#invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td>{{description}}</td>
            \n                
            <td>{{planName}}</td>
            \n                
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
            \n                
            <td>{{invoice.currency}} {{amount}}</td>
            \n            
         </tr>
         \n            {{/invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td colspan=4 />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.balance}}</strong></td>
            \n            
         </tr>
         \n        
      </table>
      \n    
   </body>
   \n
</html>
\n\n"
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

> Example Response:

```ruby
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

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">
\n
<html>
   \n    
   <head>
      \n        
      <style type=\"text/css\">\n th {align=left; width=225px; border-bottom: solid 2px black;}\n </style>
      \n    
   </head>
   \n    
   <body>
      \n        
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
      \n        
      <table>
         \n            
         <tr>
            \n                
            <td rowspan=3 width=350px>Insert image here</td>
            \n                
            <td width=100px/>\n                
            <td width=225px/>\n                
            <td width=225px/>\n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceDate}}</td>
            \n                
            <td>{{invoice.formattedInvoiceDate}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceNumber}}</td>
            \n                
            <td>{{invoice.invoiceNumber}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyName}}</td>
            \n                
            <td></td>
            \n                
            <td align=right>{{text.accountOwnerName}}</td>
            \n                
            <td>{{account.name}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyAddress}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.email}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCityProvincePostalCode}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.phone}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCountry}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td><{{text.companyUrl}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n        
      </table>
      \n        <br />\n        <br />\n        <br />\n        
      <table>
         \n            
         <tr>
            \n                
            <th>{{text.invoiceItemBundleName}}</td>\n                
            <th>{{text.invoiceItemDescription}}</td>\n                
            <th>{{text.invoiceItemServicePeriod}}</td>\n                
            <th>{{text.invoiceItemAmount}}</td>\n            
         </tr>
         \n            {{#invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td>{{description}}</td>
            \n                
            <td>{{planName}}</td>
            \n                
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
            \n                
            <td>{{invoice.currency}} {{amount}}</td>
            \n            
         </tr>
         \n            {{/invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td colspan=4 />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.balance}}</strong></td>
            \n            
         </tr>
         \n        
      </table>
      \n    
   </body>
   \n
</html>
\n\n"
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

> Example Response:

```ruby
"
<meta charset=\"UTF-8\">
\n
<html>
   \n    
   <head>
      \n        
      <style type=\"text/css\">\n th {align=left; width=225px; border-bottom: solid 2px black;}\n </style>
      \n    
   </head>
   \n    
   <body>
      \n        
      <h1>Tenant template: {{text.invoiceTitle}}</h1>
      \n        
      <table>
         \n            
         <tr>
            \n                
            <td rowspan=3 width=350px>Insert image here</td>
            \n                
            <td width=100px/>\n                
            <td width=225px/>\n                
            <td width=225px/>\n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceDate}}</td>
            \n                
            <td>{{invoice.formattedInvoiceDate}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td />\n                
            <td align=right>{{text.invoiceNumber}}</td>
            \n                
            <td>{{invoice.invoiceNumber}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyName}}</td>
            \n                
            <td></td>
            \n                
            <td align=right>{{text.accountOwnerName}}</td>
            \n                
            <td>{{account.name}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyAddress}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.email}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCityProvincePostalCode}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td>{{account.phone}}</td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td>{{text.companyCountry}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td><{{text.companyUrl}}</td>
            \n                
            <td />\n                
            <td />\n                
            <td />\n            
         </tr>
         \n        
      </table>
      \n        <br />\n        <br />\n        <br />\n        
      <table>
         \n            
         <tr>
            \n                
            <th>{{text.invoiceItemBundleName}}</td>\n                
            <th>{{text.invoiceItemDescription}}</td>\n                
            <th>{{text.invoiceItemServicePeriod}}</td>\n                
            <th>{{text.invoiceItemAmount}}</td>\n            
         </tr>
         \n            {{#invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td>{{description}}</td>
            \n                
            <td>{{planName}}</td>
            \n                
            <td>{{formattedStartDate}}{{#formattedEndDate}} - {{formattedEndDate}}{{/formattedEndDate}}</td>
            \n                
            <td>{{invoice.currency}} {{amount}}</td>
            \n            
         </tr>
         \n            {{/invoice.invoiceItems}}\n            
         <tr>
            \n                
            <td colspan=4 />\n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmount}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.chargedAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceAmountPaid}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.paidAmount}}</strong></td>
            \n            
         </tr>
         \n            
         <tr>
            \n                
            <td colspan=2 />\n                
            <td align=right><strong>{{text.invoiceBalance}}</strong></td>
            \n                
            <td align=right><strong>{{invoice.balance}}</strong></td>
            \n            
         </tr>
         \n        
      </table>
      \n    
   </body>
   \n
</html>
\n\n"
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
locale = "en_GB"
delete_if_exists = false
KillBillClient::Model::Invoice.upload_invoice_translation(invoice_translation,
                                                          locale,
                                                          delete_if_exists, 
                                                          options)
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
locale = "en_GB"
KillBillClient::Model::Invoice.get_catalog_translation(locale,
                                                       options)
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


**Query Parameters**

None. 

**Response**

A `200` http status without content.