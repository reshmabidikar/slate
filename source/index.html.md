--- 

title: Kill Bill 

language_tabs: 
   - shell 

toc_footers: 
   - <a href='#'>Sign Up for a Developer Key</a> 
   - <a href='https://github.com/lavkumarv'>Documentation Powered by lav</a> 

includes: 
   - errors 

search: true 

--- 

# Introduction 

Kill Bill is an open-source billing and payments platform 

# /1.0/KB/ACCOUNTS
## ***GET*** 

**Summary:** Retrieve an account by external key

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts` 

```shell
curl -v \
-u admin:password \
-H "X-Killbill-ApiKey: bob" \
-H "X-Killbill-ApiSecret: lazar" \
-H "Content-Type: application/json" \
-H "X-Killbill-CreatedBy: demo" \
"http://127.0.0.1:8080/1.0/kb/accounts/268983f2-5443-47e4-a967-b8962fc699c5"	
```
> This is a code annotation. It will appear in the area to the right, next to the code samples.

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| externalKey | query |  | No | string |
| accountWithBalance | query |  | No | boolean |
| accountWithBalanceAndCBA | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Account not found XXX |


## ***POST*** 

**Summary:** Create account

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account data supplied |

# /1.0/KB/ACCOUNTS/PAGINATION
## ***GET*** 

**Summary:** List accounts

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| accountWithBalance | query |  | No | boolean |
| accountWithBalanceAndCBA | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/ACCOUNTS/PAYMENTS
## ***POST*** 

**Summary:** Trigger a payment using the account external key (authorization, purchase or credit)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| externalKey | query |  | No | string |
| paymentMethodId | query |  | No | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid account external key supplied |
| 402 | Transaction declined by gateway |
| 404 | Account not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/ACCOUNTS/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search accounts

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| accountWithBalance | query |  | No | boolean |
| accountWithBalanceAndCBA | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}
## ***GET*** 

**Summary:** Retrieve an account by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| accountWithBalance | query |  | No | boolean |
| accountWithBalanceAndCBA | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

## ***PUT*** 

**Summary:** Update account

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/accounts/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| treatNullAsReset | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account data supplied |

## ***DELETE*** 

**Summary:** Close account

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/accounts/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| cancelAllSubscriptions | query |  | No | boolean |
| writeOffUnpaidInvoices | query |  | No | boolean |
| itemAdjustUnpaidInvoices | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/ALLCUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve account customFields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/allCustomFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| objectType | query |  | No | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/ALLTAGS
## ***GET*** 

**Summary:** Retrieve account tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/allTags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| objectType | query |  | No | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/BLOCK
## ***GET*** 

**Summary:** Retrieve blocking states for account

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/block` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| blockingStateTypes | query |  | No | array |
| blockingStateSvcs | query |  | No | array |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |

## ***PUT*** 

**Summary:** Block an account

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/accounts/{accountId}/block` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/BUNDLES
## ***GET*** 

**Summary:** Retrieve bundles for account

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/bundles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| externalKey | query |  | No | string |
| bundlesFilter | query |  | No | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/CBAREBALANCING
## ***POST*** 

**Summary:** Rebalance account CBA

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/cbaRebalancing` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/CHILDREN
## ***GET*** 

**Summary:** List children accounts

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/children` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| accountWithBalance | query |  | No | boolean |
| accountWithBalanceAndCBA | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid parent account id supplied |
| 404 | Parent Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve account custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |

## ***POST*** 

**Summary:** Add custom fields to account

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to account

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/accounts/{accountId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from account

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/accounts/{accountId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/EMAILNOTIFICATIONS
## ***GET*** 

**Summary:** Retrieve account email notification

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/emailNotifications` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

## ***PUT*** 

**Summary:** Set account email notification

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/accounts/{accountId}/emailNotifications` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/EMAILS
## ***GET*** 

**Summary:** Retrieve an account emails

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/emails` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |

## ***POST*** 

**Summary:** Add account email

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/emails` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/EMAILS/{EMAIL}
## ***DELETE*** 

**Summary:** Delete email from account

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/accounts/{accountId}/emails/{email}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| email | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/INVOICEPAYMENTS
## ***GET*** 

**Summary:** Retrieve account invoice payments

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/invoicePayments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |
| pluginProperty | query |  | No | array |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

## ***POST*** 

**Summary:** Trigger a payment for all unpaid invoices

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/invoicePayments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| externalPayment | query |  | No | boolean |
| paymentAmount | query |  | No | number |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/INVOICES
## ***GET*** 

**Summary:** Retrieve account invoices

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/invoices` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| withItems | query |  | No | boolean |
| withMigrationInvoices | query |  | No | boolean |
| unpaidInvoicesOnly | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/OVERDUE
## ***GET*** 

**Summary:** Retrieve overdue state for account

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/overdue` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/PAYMENTMETHODS
## ***GET*** 

**Summary:** Retrieve account payment methods

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/paymentMethods` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| withPluginInfo | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| includedDeleted | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

## ***POST*** 

**Summary:** Add a payment method

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/paymentMethods` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| isDefault | query |  | No | boolean |
| payAllUnpaidInvoices | query |  | No | boolean |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/PAYMENTMETHODS/REFRESH
## ***POST*** 

**Summary:** Refresh account payment methods

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/paymentMethods/refresh` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| pluginName | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/PAYMENTMETHODS/{PAYMENTMETHODID}/SETDEFAULT
## ***PUT*** 

**Summary:** Set the default payment method

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/accounts/{accountId}/paymentMethods/{paymentMethodId}/setDefault` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| paymentMethodId | path |  | Yes | string |
| payAllUnpaidInvoices | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id or payment method id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/PAYMENTS
## ***GET*** 

**Summary:** Retrieve account payments

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| audit | query |  | No | string |
| pluginProperty | query |  | No | array |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |

## ***POST*** 

**Summary:** Trigger a payment (authorization, purchase or credit)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| paymentMethodId | query |  | No | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid account id supplied |
| 402 | Transaction declined by gateway |
| 404 | Account not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/TAGS
## ***GET*** 

**Summary:** Retrieve account tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

## ***POST*** 

**Summary:** Add tags to account

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{accountId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |

## ***DELETE*** 

**Summary:** Remove tags from account

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/accounts/{accountId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied or account does not have a default payment method (AUTO_PAY_OFF tag only) |

# /1.0/KB/ACCOUNTS/{ACCOUNTID}/TIMELINE
## ***GET*** 

**Summary:** Retrieve account timeline

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/accounts/{accountId}/timeline` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| audit | query |  | No | string |
| parallel | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/ACCOUNTS/{CHILDACCOUNTID}/TRANSFERCREDIT
## ***POST*** 

**Summary:** Move a given child credit to the parent level

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/accounts/{childAccountId}/transferCredit` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| childAccountId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Account does not have credit |
| 404 | Account not found |

# /1.0/KB/ADMIN/CACHE
## ***DELETE*** 

**Summary:** Invalidates the given Cache if specified, otherwise invalidates all caches

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/admin/cache` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| cacheName | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Cache name does not exist or is not alive |

# /1.0/KB/ADMIN/CACHE/ACCOUNTS/{ACCOUNTID}
## ***DELETE*** 

**Summary:** Invalidates Caches per account level

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/admin/cache/accounts/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/ADMIN/CACHE/TENANTS
## ***DELETE*** 

**Summary:** Invalidates Caches per tenant level

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/admin/cache/tenants` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| tenantApiKey | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/ADMIN/HEALTHCHECK
## ***POST*** 

**Summary:** Put the host out of rotation

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/admin/healthcheck` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

## ***DELETE*** 

**Summary:** Put the host out of rotation

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/admin/healthcheck` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/ADMIN/INVOICES
## ***POST*** 

**Summary:** Trigger an invoice generation for all parked accounts

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/admin/invoices` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/ADMIN/PAYMENTS/{PAYMENTID}/TRANSACTIONS/{PAYMENTTRANSACTIONID}
## ***PUT*** 

**Summary:** Update existing paymentTransaction and associated payment state

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/admin/payments/{paymentId}/transactions/{paymentTransactionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| paymentTransactionId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account data supplied |

# /1.0/KB/ADMIN/QUEUES
## ***GET*** 

**Summary:** Get queues entries

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/admin/queues` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | query |  | No | string |
| queueName | query |  | No | string |
| serviceName | query |  | No | string |
| withHistory | query |  | No | boolean |
| minDate | query |  | No | string |
| maxDate | query |  | No | string |
| withInProcessing | query |  | No | boolean |
| withBusEvents | query |  | No | boolean |
| withNotifications | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/BUNDLES
## ***GET*** 

**Summary:** Retrieve a bundle by external key

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| externalKey | query |  | No | string |
| includedDeleted | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/PAGINATION
## ***GET*** 

**Summary:** List bundles

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/BUNDLES/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search bundles

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/BUNDLES/{BUNDLEID}
## ***GET*** 

**Summary:** Retrieve a bundle by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles/{bundleId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid bundle id supplied |
| 404 | Bundle not found |

## ***PUT*** 

**Summary:** Transfer a bundle to another account

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| bundleId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| billingPolicy | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id, requested date or policy supplied |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/{BUNDLEID}/BLOCK
## ***PUT*** 

**Summary:** Block a bundle

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}/block` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| bundleId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/{BUNDLEID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve bundle custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles/{bundleId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid bundle id supplied |

## ***POST*** 

**Summary:** Add custom fields to bundle

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/bundles/{bundleId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to bundle

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from bundle

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/bundles/{bundleId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |

# /1.0/KB/BUNDLES/{BUNDLEID}/PAUSE
## ***PUT*** 

**Summary:** Pause a bundle

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}/pause` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/{BUNDLEID}/RENAMEKEY
## ***PUT*** 

**Summary:** Update a bundle externalKey

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}/renameKey` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| bundleId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid argumnent supplied |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/{BUNDLEID}/RESUME
## ***PUT*** 

**Summary:** Resume a bundle

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/bundles/{bundleId}/resume` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |
| 404 | Bundle not found |

# /1.0/KB/BUNDLES/{BUNDLEID}/TAGS
## ***GET*** 

**Summary:** Retrieve bundle tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/bundles/{bundleId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid bundle id supplied |
| 404 | Bundle not found |

## ***POST*** 

**Summary:** Add tags to bundle

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/bundles/{bundleId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |

## ***DELETE*** 

**Summary:** Remove tags from bundle

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/bundles/{bundleId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| bundleId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid bundle id supplied |

# /1.0/KB/CATALOG
## ***GET*** 

**Summary:** Retrieve the catalog as JSON

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/catalog` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| requestedDate | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

## ***POST*** 

**Summary:** Upload the full catalog as XML

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/catalog` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

## ***DELETE*** 

**Summary:** Delete all versions for a per tenant catalog

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/catalog` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/CATALOG/AVAILABLEADDONS
## ***GET*** 

**Summary:** Retrieve available add-ons for a given product

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/catalog/availableAddons` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| baseProductName | query |  | No | string |
| priceListName | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/CATALOG/AVAILABLEBASEPLANS
## ***GET*** 

**Summary:** Retrieve available base plans

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/catalog/availableBasePlans` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/CATALOG/SIMPLEPLAN
## ***POST*** 

**Summary:** Upload the full catalog as XML

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/catalog/simplePlan` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/CREDITS
## ***POST*** 

**Summary:** Create a credit

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/credits` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| autoCommit | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/CREDITS/{CREDITID}
## ***GET*** 

**Summary:** Retrieve a credit by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/credits/{creditId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| creditId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid credit id supplied |
| 404 | Credit not found |

# /1.0/KB/CUSTOMFIELDS/PAGINATION
## ***GET*** 

**Summary:** List custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/customFields/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/CUSTOMFIELDS/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/customFields/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/EXPORT/{ACCOUNTID}
## ***GET*** 

**Summary:** Export account data

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/export/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}
## ***GET*** 

**Summary:** Retrieve a payment by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoicePayments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment id supplied |
| 404 | Payment not found |

## ***PUT*** 

**Summary:** Complete an existing transaction

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/invoicePayments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}/CHARGEBACKREVERSALS
## ***POST*** 

**Summary:** Record a chargebackReversal

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoicePayments/{paymentId}/chargebackReversals` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |
| 404 | Account or payment not found |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}/CHARGEBACKS
## ***POST*** 

**Summary:** Record a chargeback

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoicePayments/{paymentId}/chargebacks` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |
| 404 | Account or payment not found |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve payment custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoicePayments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment id supplied |

## ***POST*** 

**Summary:** Add custom fields to payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoicePayments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to payment

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/invoicePayments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/invoicePayments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}/REFUNDS
## ***POST*** 

**Summary:** Refund a payment, and adjust the invoice if needed

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoicePayments/{paymentId}/refunds` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| externalPayment | query |  | No | boolean |
| paymentMethodId | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |
| 404 | Account or payment not found |

# /1.0/KB/INVOICEPAYMENTS/{PAYMENTID}/TAGS
## ***GET*** 

**Summary:** Retrieve payment tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoicePayments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment id supplied |
| 404 | Payment not found |

## ***POST*** 

**Summary:** Add tags to payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoicePayments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***DELETE*** 

**Summary:** Remove tags from payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/invoicePayments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

# /1.0/KB/INVOICES
## ***POST*** 

**Summary:** Trigger an invoice generation

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | query |  | No | string |
| targetDate | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id or target datetime supplied |

# /1.0/KB/INVOICES/CATALOGTRANSLATION/{LOCALE}
## ***POST*** 

**Summary:** Upload the catalog translation for the tenant

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/catalogTranslation/{locale}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| locale | path |  | Yes | string |
| deleteIfExists | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/INVOICES/CHARGES/{ACCOUNTID}
## ***POST*** 

**Summary:** Create external charge(s)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/charges/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| payInvoice | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| autoCommit | query |  | No | boolean |
| paymentExternalKey | query |  | No | string |
| transactionExternalKey | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id supplied |
| 404 | Account not found |

# /1.0/KB/INVOICES/DRYRUN
## ***POST*** 

**Summary:** Generate a dryRun invoice

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/dryRun` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | query |  | No | string |
| targetDate | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id or target datetime supplied |

# /1.0/KB/INVOICES/MANUALPAYTEMPLATE
## ***POST*** 

**Summary:** Upload the manualPay invoice template for the tenant

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/manualPayTemplate` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| deleteIfExists | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/INVOICES/MIGRATION/{ACCOUNTID}
## ***POST*** 

**Summary:** Create a migration invoice

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/migration/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| targetDate | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid account id or target datetime supplied |

# /1.0/KB/INVOICES/PAGINATION
## ***GET*** 

**Summary:** List invoices

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| withItems | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/INVOICES/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search invoices

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| withItems | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/INVOICES/TEMPLATE
## ***POST*** 

**Summary:** Upload the invoice template for the tenant

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/template` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| deleteIfExists | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/INVOICES/TRANSLATION/{LOCALE}
## ***POST*** 

**Summary:** Upload the invoice translation for the tenant

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/translation/{locale}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| locale | path |  | Yes | string |
| deleteIfExists | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/INVOICES/{INVOICEID}
## ***GET*** 

**Summary:** Retrieve an invoice by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| withItems | query |  | No | boolean |
| withChildrenItems | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid invoice id supplied |
| 404 | Invoice not found |

## ***POST*** 

**Summary:** Adjust an invoice item

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/{invoiceId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| invoiceId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id, invoice id or invoice item id supplied |
| 404 | Invoice not found |

# /1.0/KB/INVOICES/{INVOICEID}/COMMITINVOICE
## ***PUT*** 

**Summary:** Perform the invoice status transition from DRAFT to COMMITTED

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/invoices/{invoiceId}/commitInvoice` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 404 | Invoice not found |

# /1.0/KB/INVOICES/{INVOICEID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve invoice custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid invoice id supplied |

## ***POST*** 

**Summary:** Add custom fields to invoice

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/{invoiceId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid invoice id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to invoice

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/invoices/{invoiceId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid invoice id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from invoice

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/invoices/{invoiceId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid invoice id supplied |

# /1.0/KB/INVOICES/{INVOICEID}/HTML
## ***GET*** 

**Summary:** Render an invoice as HTML

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceId}/html` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Invoice not found |

# /1.0/KB/INVOICES/{INVOICEID}/PAYMENTS
## ***GET*** 

**Summary:** Retrieve payments associated with an invoice

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceId}/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid invoice id supplied |
| 404 | Invoice not found |

## ***POST*** 

**Summary:** Trigger a payment for invoice

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/{invoiceId}/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| invoiceId | path |  | Yes | string |
| externalPayment | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id or invoice id supplied |
| 404 | Account not found |

# /1.0/KB/INVOICES/{INVOICEID}/TAGS
## ***GET*** 

**Summary:** Retrieve invoice tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid invoice id supplied |
| 404 | Invoice not found |

## ***POST*** 

**Summary:** Add tags to invoice

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/invoices/{invoiceId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid invoice id supplied |

## ***DELETE*** 

**Summary:** Remove tags from invoice

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/invoices/{invoiceId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid invoice id supplied |

# /1.0/KB/INVOICES/{INVOICEID}/{INVOICEITEMID}/CBA
## ***DELETE*** 

**Summary:** Delete a CBA item

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/invoices/{invoiceId}/{invoiceItemId}/cba` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceId | path |  | Yes | string |
| invoiceItemId | path |  | Yes | string |
| accountId | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid account id, invoice id or invoice item id supplied |
| 404 | Account or invoice not found |

# /1.0/KB/INVOICES/{INVOICENUMBER}
## ***GET*** 

**Summary:** Retrieve an invoice by number

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/invoices/{invoiceNumber}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| invoiceNumber | path |  | Yes | integer |
| withItems | query |  | No | boolean |
| withChildrenItems | query |  | No | boolean |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Invoice not found |

# /1.0/KB/NODESINFO
## ***GET*** 

**Summary:** Retrieve all the nodes infos

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/nodesInfo` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

## ***POST*** 

**Summary:** Trigger a node command

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/nodesInfo` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| localNodeOnly | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid node command supplied |

# /1.0/KB/OVERDUE
## ***GET*** 

**Summary:** Retrieve the overdue config as JSON

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/overdue` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

## ***POST*** 

**Summary:** Upload the full overdue config as JSON

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/overdue` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/PAYMENTGATEWAYS/HOSTED/FORM
## ***POST*** 

**Summary:** Combo API to generate form data to redirect the customer to the gateway

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentGateways/hosted/form` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid data for Account or PaymentMethod |

# /1.0/KB/PAYMENTGATEWAYS/HOSTED/FORM/{ACCOUNTID}
## ***POST*** 

**Summary:** Generate form data to redirect the customer to the gateway

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentGateways/hosted/form/{accountId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| accountId | path |  | Yes | string |
| paymentMethodId | query |  | No | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid accountId supplied |
| 404 | Account not found |

# /1.0/KB/PAYMENTGATEWAYS/NOTIFICATION/{PLUGINNAME}
## ***POST*** 

**Summary:** Process a gateway notification

**Description:** The response is built by the appropriate plugin

### HTTP Request 
`***POST*** /1.0/kb/paymentGateways/notification/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| pluginName | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/PAYMENTMETHODS
## ***GET*** 

**Summary:** Retrieve a payment method by external key

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentMethods` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| externalKey | query |  | No | string |
| pluginProperty | query |  | No | array |
| includedDeleted | query |  | No | boolean |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Account or payment method not found |

# /1.0/KB/PAYMENTMETHODS/PAGINATION
## ***GET*** 

**Summary:** List payment methods

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentMethods/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| pluginName | query |  | No | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/PAYMENTMETHODS/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search payment methods

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentMethods/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| pluginName | query |  | No | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/PAYMENTMETHODS/{PAYMENTMETHODID}
## ***GET*** 

**Summary:** Retrieve a payment method by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentMethods/{paymentMethodId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| pluginProperty | query |  | No | array |
| includedDeleted | query |  | No | boolean |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid paymentMethodId supplied |
| 404 | Account or payment method not found |

## ***DELETE*** 

**Summary:** Delete a payment method

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/paymentMethods/{paymentMethodId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| deleteDefaultPmWithAutoPayOff | query |  | No | boolean |
| forceDefaultPmDeletion | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid paymentMethodId supplied |
| 404 | Account or payment method not found |

# /1.0/KB/PAYMENTMETHODS/{PAYMENTMETHODID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve payment method custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentMethods/{paymentMethodId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment method id supplied |

## ***POST*** 

**Summary:** Add custom fields to payment method

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentMethods/{paymentMethodId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment method id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to payment method

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/paymentMethods/{paymentMethodId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment method id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from payment method

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/paymentMethods/{paymentMethodId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentMethodId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment method id supplied |

# /1.0/KB/PAYMENTTRANSACTIONS/{TRANSACTIONID}
## ***GET*** 

**Summary:** Retrieve a payment by transaction id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentTransactions/{transactionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Payment not found |

## ***POST*** 

**Summary:** Mark a pending payment transaction as succeeded or failed

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentTransactions/{transactionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| transactionId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid paymentId supplied |
| 404 | Account or Payment not found |

# /1.0/KB/PAYMENTTRANSACTIONS/{TRANSACTIONID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve payment transaction custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentTransactions/{transactionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid transaction id supplied |

## ***POST*** 

**Summary:** Add custom fields to payment transaction

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentTransactions/{transactionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid transaction id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to payment transaction

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/paymentTransactions/{transactionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid transaction id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from payment transaction

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/paymentTransactions/{transactionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid transaction id supplied |

# /1.0/KB/PAYMENTTRANSACTIONS/{TRANSACTIONID}/TAGS
## ***GET*** 

**Summary:** Retrieve payment transaction tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/paymentTransactions/{transactionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid transaction id supplied |
| 404 | Invoice not found |

## ***POST*** 

**Summary:** Add tags to payment transaction

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/paymentTransactions/{transactionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid transaction id supplied |

## ***DELETE*** 

**Summary:** Remove tags from payment transaction

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/paymentTransactions/{transactionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid transaction id supplied |

# /1.0/KB/PAYMENTS
## ***GET*** 

**Summary:** Retrieve a payment by external key

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |
| externalKey | query |  | No | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Payment not found |

## ***POST*** 

**Summary:** Capture an existing authorization

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

## ***PUT*** 

**Summary:** Complete an existing transaction

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

## ***DELETE*** 

**Summary:** Void an existing payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/CANCELSCHEDULEDPAYMENTTRANSACTION
## ***DELETE*** 

**Summary:** Cancels a scheduled payment attempt retry

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments/cancelScheduledPaymentTransaction` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| transactionExternalKey | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid paymentTransactionExternalKey supplied |

# /1.0/KB/PAYMENTS/CHARGEBACKREVERSALS
## ***POST*** 

**Summary:** Record a chargeback reversal

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/chargebackReversals` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/CHARGEBACKS
## ***POST*** 

**Summary:** Record a chargeback

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/chargebacks` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/COMBO
## ***POST*** 

**Summary:** Combo api to create a new payment transaction on a existing (or not) account 

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/combo` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid data for Account or PaymentMethod |
| 402 | Transaction declined by gateway |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/PAGINATION
## ***GET*** 

**Summary:** Get payments

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| pluginName | query |  | No | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/PAYMENTS/REFUNDS
## ***POST*** 

**Summary:** Refund an existing payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/refunds` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search payments

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| pluginName | query |  | No | string |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/PAYMENTS/{PAYMENTID}
## ***GET*** 

**Summary:** Retrieve a payment by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| withPluginInfo | query |  | No | boolean |
| withAttempts | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid paymentId supplied |
| 404 | Payment not found |

## ***POST*** 

**Summary:** Capture an existing authorization

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

## ***PUT*** 

**Summary:** Complete an existing transaction

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/payments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

## ***DELETE*** 

**Summary:** Void an existing payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments/{paymentId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/{PAYMENTID}/CHARGEBACKREVERSALS
## ***POST*** 

**Summary:** Record a chargeback reversal

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}/chargebackReversals` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/{PAYMENTID}/CHARGEBACKS
## ***POST*** 

**Summary:** Record a chargeback

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}/chargebacks` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/{PAYMENTID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve payment custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment id supplied |

## ***POST*** 

**Summary:** Add custom fields to payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to payment

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/payments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from payment payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments/{paymentId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

# /1.0/KB/PAYMENTS/{PAYMENTID}/REFUNDS
## ***POST*** 

**Summary:** Refund an existing payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}/refunds` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| paymentId | path |  | Yes | string |
| controlPluginName | query |  | No | array |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Payment transaction created successfully |
| 400 | Invalid paymentId supplied |
| 402 | Transaction declined by gateway |
| 404 | Account or payment not found |
| 422 | Payment is aborted by a control plugin |
| 502 | Failed to submit payment transaction |
| 503 | Payment in unknown status, failed to receive gateway response |
| 504 | Payment operation timeout |

# /1.0/KB/PAYMENTS/{PAYMENTID}/TAGS
## ***GET*** 

**Summary:** Retrieve payment payment tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/payments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid payment id supplied |
| 404 | Invoice not found |

## ***POST*** 

**Summary:** Add tags to payment payment

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/payments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

## ***DELETE*** 

**Summary:** Remove tags from payment payment

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments/{paymentId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid payment id supplied |

# /1.0/KB/PAYMENTS/{PAYMENTTRANSACTIONID}/CANCELSCHEDULEDPAYMENTTRANSACTION
## ***DELETE*** 

**Summary:** Cancels a scheduled payment attempt retry

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/payments/{paymentTransactionId}/cancelScheduledPaymentTransaction` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| paymentTransactionId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid paymentTransactionId supplied |

# /1.0/KB/PLUGINSINFO
## ***GET*** 

**Summary:** Retrieve the list of registered plugins

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/pluginsInfo` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/SECURITY/PERMISSIONS
## ***GET*** 

**Summary:** List user permissions

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/security/permissions` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/SECURITY/ROLES
## ***POST*** 

**Summary:** Add a new role definition)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/security/roles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

## ***PUT*** 

**Summary:** Update a new role definition)

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/security/roles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/SECURITY/SUBJECT
## ***GET*** 

**Summary:** Get user information

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/security/subject` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/SECURITY/USERS
## ***POST*** 

**Summary:** Add a new user with roles (to make api requests)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/security/users` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/SECURITY/USERS/{USERNAME}
## ***DELETE*** 

**Summary:** Invalidate an existing user

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/security/users/{username}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/SECURITY/USERS/{USERNAME}/PASSWORD
## ***PUT*** 

**Summary:** Update a user password

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/security/users/{username}/password` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| username | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/SECURITY/USERS/{USERNAME}/ROLES
## ***GET*** 

**Summary:** Get roles associated to a user

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/security/users/{username}/roles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

## ***PUT*** 

**Summary:** Update roles associated to a user

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/security/users/{username}/roles` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| username | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

# /1.0/KB/SUBSCRIPTIONS
## ***POST*** 

**Summary:** Create an entitlement

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/subscriptions` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| requestedDate | query |  | No | string |
| entitlementDate | query |  | No | string |
| billingDate | query |  | No | string |
| renameKeyIfExistsAndUnused | query |  | No | boolean |
| migrated | query |  | No | boolean |
| bcd | query |  | No | integer |
| callCompletion | query |  | No | boolean |
| callTimeoutSec | query |  | No | long |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid entitlement supplied |

# /1.0/KB/SUBSCRIPTIONS/CREATEENTITLEMENTWITHADDONS
## ***POST*** 

**Summary:** Create an entitlement with addOn products

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/subscriptions/createEntitlementWithAddOns` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| requestedDate | query |  | No | string |
| entitlementDate | query |  | No | string |
| billingDate | query |  | No | string |
| migrated | query |  | No | boolean |
| renameKeyIfExistsAndUnused | query |  | No | boolean |
| callCompletion | query |  | No | boolean |
| callTimeoutSec | query |  | No | long |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid entitlement supplied |

# /1.0/KB/SUBSCRIPTIONS/CREATEENTITLEMENTSWITHADDONS
## ***POST*** 

**Summary:** Create multiple entitlements with addOn products

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/subscriptions/createEntitlementsWithAddOns` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| requestedDate | query |  | No | string |
| entitlementDate | query |  | No | string |
| billingDate | query |  | No | string |
| renameKeyIfExistsAndUnused | query |  | No | boolean |
| migrated | query |  | No | boolean |
| callCompletion | query |  | No | boolean |
| callTimeoutSec | query |  | No | long |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid entitlements supplied |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}
## ***GET*** 

**Summary:** Retrieve a subscription by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/subscriptions/{subscriptionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid subscription id supplied |
| 404 | Subscription not found |

## ***PUT*** 

**Summary:** Change entitlement plan

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| subscriptionId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| callCompletion | query |  | No | boolean |
| callTimeoutSec | query |  | No | long |
| billingPolicy | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |
| 404 | Entitlement not found |

## ***DELETE*** 

**Summary:** Cancel an entitlement plan

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/subscriptions/{subscriptionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| callCompletion | query |  | No | boolean |
| callTimeoutSec | query |  | No | long |
| entitlementPolicy | query |  | No | string |
| billingPolicy | query |  | No | string |
| useRequestedDateForBilling | query |  | No | boolean |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |
| 404 | Entitlement not found |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/BCD
## ***PUT*** 

**Summary:** Update the BCD associated to a subscription

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}/bcd` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| subscriptionId | path |  | Yes | string |
| effectiveFromDate | query |  | No | string |
| forceNewBcdWithPastEffectiveDate | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid entitlement supplied |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/BLOCK
## ***PUT*** 

**Summary:** Block a subscription

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}/block` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| subscriptionId | path |  | Yes | string |
| requestedDate | query |  | No | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |
| 404 | Subscription not found |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/CUSTOMFIELDS
## ***GET*** 

**Summary:** Retrieve subscription custom fields

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/subscriptions/{subscriptionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid subscription id supplied |

## ***POST*** 

**Summary:** Add custom fields to subscription

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/subscriptions/{subscriptionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |

## ***PUT*** 

**Summary:** Modify custom fields to subscription

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |

## ***DELETE*** 

**Summary:** Remove custom fields from subscription

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/subscriptions/{subscriptionId}/customFields` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| customFieldList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/TAGS
## ***GET*** 

**Summary:** Retrieve subscription tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/subscriptions/{subscriptionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| audit | query |  | No | string |
| includedDeleted | query |  | No | boolean |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid subscription id supplied |
| 404 | Subscription not found |

## ***POST*** 

**Summary:** Add tags to subscription

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/subscriptions/{subscriptionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |

## ***DELETE*** 

**Summary:** Remove tags from subscription

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/subscriptions/{subscriptionId}/tags` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| tagList | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/UNCANCEL
## ***PUT*** 

**Summary:** Un-cancel an entitlement

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}/uncancel` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |
| 404 | Entitlement not found |

# /1.0/KB/SUBSCRIPTIONS/{SUBSCRIPTIONID}/UNDOCHANGEPLAN
## ***PUT*** 

**Summary:** Undo a pending change plan on an entitlement

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/subscriptions/{subscriptionId}/undoChangePlan` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| pluginProperty | query |  | No | array |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription id supplied |
| 404 | Entitlement not found |

# /1.0/KB/TAGDEFINITIONS
## ***GET*** 

**Summary:** List tag definitions

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tagDefinitions` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

## ***POST*** 

**Summary:** Create a tag definition

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tagDefinitions` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid name or description supplied |

# /1.0/KB/TAGDEFINITIONS/{TAGDEFINITIONID}
## ***GET*** 

**Summary:** Retrieve a tag definition

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tagDefinitions/{tagDefinitionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| tagDefinitionId | path |  | Yes | string |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tagDefinitionId supplied |

## ***DELETE*** 

**Summary:** Delete a tag definition

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tagDefinitions/{tagDefinitionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| tagDefinitionId | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tagDefinitionId supplied |

# /1.0/KB/TAGS/PAGINATION
## ***GET*** 

**Summary:** List tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tags/pagination` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/TAGS/SEARCH/{SEARCHKEY}
## ***GET*** 

**Summary:** Search tags

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tags/search/{searchKey}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| searchKey | path |  | Yes | string |
| offset | query |  | No | long |
| limit | query |  | No | long |
| audit | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

# /1.0/KB/TENANTS
## ***GET*** 

**Summary:** Retrieve a tenant by its API key

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| apiKey | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 404 | Tenant not found |

## ***POST*** 

**Summary:** Create a tenant

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| useGlobalDefault | query |  | No | boolean |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 500 | Tenant already exists |

# /1.0/KB/TENANTS/REGISTERNOTIFICATIONCALLBACK
## ***GET*** 

**Summary:** Retrieve a push notification

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/registerNotificationCallback` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

## ***POST*** 

**Summary:** Create a push notification

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants/registerNotificationCallback` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| cb | query |  | No | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

## ***DELETE*** 

**Summary:** Delete a push notification

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tenants/registerNotificationCallback` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/UPLOADPERTENANTCONFIG
## ***GET*** 

**Summary:** Retrieve a per tenant configuration (system properties)

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/uploadPerTenantConfig` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

## ***POST*** 

**Summary:** Add a per tenant configuration (system properties)

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants/uploadPerTenantConfig` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

## ***DELETE*** 

**Summary:** Delete a per tenant configuration (system properties)

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tenants/uploadPerTenantConfig` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/UPLOADPERTENANTCONFIG/{KEYPREFIX}/SEARCH
## ***GET*** 

**Summary:** Retrieve a per tenant key value based on key prefix

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/uploadPerTenantConfig/{keyPrefix}/search` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| keyPrefix | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/UPLOADPLUGINCONFIG/{PLUGINNAME}
## ***GET*** 

**Summary:** Retrieve a per tenant configuration for a plugin

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/uploadPluginConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| pluginName | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

## ***POST*** 

**Summary:** Add a per tenant configuration for a plugin

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants/uploadPluginConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| pluginName | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

## ***DELETE*** 

**Summary:** Delete a per tenant configuration for a plugin

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tenants/uploadPluginConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| pluginName | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/UPLOADPLUGINPAYMENTSTATEMACHINECONFIG/{PLUGINNAME}
## ***GET*** 

**Summary:** Retrieve a per tenant payment state machine for a plugin

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| pluginName | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

## ***POST*** 

**Summary:** Add a per tenant payment state machine for a plugin

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| pluginName | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

## ***DELETE*** 

**Summary:** Delete a per tenant payment state machine for a plugin

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| pluginName | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/USERKEYVALUE/{KEYNAME}
## ***GET*** 

**Summary:** Retrieve a per tenant user key/value

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/userKeyValue/{keyName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| keyName | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |

## ***POST*** 

**Summary:** Add a per tenant user key/value

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/tenants/userKeyValue/{keyName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| keyName | path |  | Yes | string |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

## ***DELETE*** 

**Summary:** Delete  a per tenant user key/value

**Description:** 

### HTTP Request 
`***DELETE*** /1.0/kb/tenants/userKeyValue/{keyName}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| keyName | path |  | Yes | string |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid tenantId supplied |

# /1.0/KB/TENANTS/{TENANTID}
## ***GET*** 

**Summary:** Retrieve a tenant by id

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/tenants/{tenantId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| tenantId | path |  | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tenantId supplied |
| 404 | Tenant not found |

# /1.0/KB/TEST/CLOCK
## ***GET*** 

**Summary:** Get the current time

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/test/clock` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| timeZone | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid timezone supplied |

## ***POST*** 

**Summary:** Set the current time

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/test/clock` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| requestedDate | query |  | No | string |
| timeZone | query |  | No | string |
| timeoutSec | query |  | No | long |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid time or timezone supplied |

## ***PUT*** 

**Summary:** Move the current time

**Description:** 

### HTTP Request 
`***PUT*** /1.0/kb/test/clock` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| days | query |  | No | integer |
| weeks | query |  | No | integer |
| months | query |  | No | integer |
| years | query |  | No | integer |
| timeZone | query |  | No | string |
| timeoutSec | query |  | No | long |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid timezone supplied |

# /1.0/KB/TEST/QUEUES
## ***GET*** 

**Summary:** Wait for all available bus events and notifications to be processed

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/test/queues` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| timeoutSec | query |  | No | long |

**Responses**

| Code | Description |
| ---- | ----------- |
| 412 | Timeout too short |

# /1.0/KB/USAGES
## ***POST*** 

**Summary:** Record usage for a subscription

**Description:** 

### HTTP Request 
`***POST*** /1.0/kb/usages` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No |  |
| X-Killbill-CreatedBy | header |  | No | string |
| X-Killbill-Reason | header |  | No | string |
| X-Killbill-Comment | header |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid subscription (e.g. inactive) |

# /1.0/KB/USAGES/{SUBSCRIPTIONID}
## ***GET*** 

**Summary:** Retrieve usage for a subscription

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/usages/{subscriptionId}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| startDate | query |  | No | string |
| endDate | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Missing start date or end date |

# /1.0/KB/USAGES/{SUBSCRIPTIONID}/{UNITTYPE}
## ***GET*** 

**Summary:** Retrieve usage for a subscription and unit type

**Description:** 

### HTTP Request 
`***GET*** /1.0/kb/usages/{subscriptionId}/{unitType}` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | string |
| unitType | path |  | Yes | string |
| startDate | query |  | No | string |
| endDate | query |  | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Missing start date or end date |

<!-- Converted with the swagger-to-slate https://github.com/lavkumarv/swagger-to-slate -->
