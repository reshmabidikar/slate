# Bundle

## Bundle Resource

The `Bundle` resource represents a collection of subscriptions that are associated with a particular instance of a product. 

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default null, immutable]*</span>: The external key provided from client.
* **`subscriptions`** <span style="color:#32A9C7">*(Array[SubscriptionJson], optional, read only)*</span>: Subscriptions list.
* **`timeline`** <span style="color:#32A9C7">*(BundleTimelineJson, optional, read only)*</span>: Event list.

## Retrieve a bundle by external key

**HTTP Request** 

Retrieves the details information for the `Bundle` using its `externalKey`.

`GET http://example.com/1.0/kb/bundles`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
external_key = '4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135'
included_deleted = false

bundle = KillBillClient::Model::Bundle.new
bundle.find_by_external_key(external_key, 
                            included_deleted, 
                            options)
```

```python
bundle = killbill.api.BundleApi()
bundle_external_key = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'

bundle.get_bundle_by_key(bundle_external_key, api_key, api_secret)
```

> Example Response:

```ruby
{
   "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
   "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
   "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
   "subscriptions":[
      {
         "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
         "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
         "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
         "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
         "startDate":"2013-08-01",
         "productName":"Sports",
         "productCategory":"BASE",
         "billingPeriod":"MONTHLY",
         "phaseType":"TRIAL",
         "priceList":"DEFAULT",
         "planName":"sports-monthly",
         "state":"ACTIVE",
         "sourceType":"NATIVE",
         "chargedThroughDate":"2013-08-01",
         "billingStartDate":"2013-08-01",
         "billCycleDayLocal":31,
         "events":[
            {
               "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"sports-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"sports-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-31",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "priceOverrides":[
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-trial",
               "phaseType":"TRIAL",
               "fixedPrice":0
            },
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-evergreen",
               "phaseType":"EVERGREEN",
               "recurringPrice":500.0
            }
         ],
         "auditLogs":[]
      }
   ],
   "timeline":{
      "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
      "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
      "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
      "events":[
         {
            "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_ENTITLEMENT",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement-service",
            "serviceStateName":"ENT_STARTED",
            "phase":"sports-monthly-trial",
            "auditLogs":[]
         },
         {
            "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_BILLING",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"billing-service",
            "serviceStateName":"START_BILLING",
            "phase":"sports-monthly-trial",
            "auditLogs":[]
         },
         {
            "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-31",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"PHASE",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement+billing-service",
            "serviceStateName":"PHASE",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         }
      ],
      "auditLogs":[]
   },
   "auditLogs":[]
}
```
```python
{'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
 'audit_logs': [],
 'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
 'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
 'subscriptions': [{'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
                    'audit_logs': [],
                    'bill_cycle_day_local': 6,
                    'billing_end_date': None,
                    'billing_period': 'MONTHLY',
                    'billing_start_date': datetime.date(2018, 5, 7),
                    'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
                    'cancelled_date': None,
                    'charged_through_date': None,
                    'events': [{'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '80ca6915-0293-4b1d-8bc6-b3c9fe1bee03',
                                'event_type': 'START_ENTITLEMENT',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement-service',
                                'service_state_name': 'ENT_STARTED'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': 'ce26b570-0a9f-463e-b65c-96a9fd67f124',
                                'event_type': 'START_BILLING',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'billing-service',
                                'service_state_name': 'START_BILLING'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 6, 6),
                                'event_id': 'c7af9fa3-5465-4e69-8a84-6977c711921c',
                                'event_type': 'PHASE',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-evergreen',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement+billing-service',
                                'service_state_name': 'PHASE'}],
                    'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
                    'phase_type': 'TRIAL',
                    'plan_name': 'standard-monthly',
                    'price_list': 'DEFAULT',
                    'price_overrides': [{'fixed_price': 0.0,
                                         'phase_name': 'standard-monthly-trial',
                                         'phase_type': 'TRIAL',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': None,
                                         'usage_price_overrides': []},
                                        {'fixed_price': None,
                                         'phase_name': 'standard-monthly-evergreen',
                                         'phase_type': 'EVERGREEN',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': 100.0,
                                         'usage_price_overrides': []}],
                    'product_category': 'BASE',
                    'product_name': 'Standard',
                    'source_type': 'NATIVE',
                    'start_date': datetime.date(2018, 5, 7),
                    'state': 'ACTIVE',
                    'subscription_id': '6f6cab9d-dfe0-4b89-9a09-b16055f72f5c'}],
 'timeline': {'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
              'audit_logs': [],
              'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
              'events': [{'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '80ca6915-0293-4b1d-8bc6-b3c9fe1bee03',
                          'event_type': 'START_ENTITLEMENT',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement-service',
                          'service_state_name': 'ENT_STARTED'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': 'ce26b570-0a9f-463e-b65c-96a9fd67f124',
                          'event_type': 'START_BILLING',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'billing-service',
                          'service_state_name': 'START_BILLING'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 6, 6),
                          'event_id': 'c7af9fa3-5465-4e69-8a84-6977c711921c',
                          'event_type': 'PHASE',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-evergreen',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement+billing-service',
                          'service_state_name': 'PHASE'}],
              'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'}}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **includedDeleted** | boolean | true | choose true to include deleted bundles |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid external key was provided.

## Retrieve a bundle by id

Retrieves the details information for the `Bundle` using its `bundleId`.


**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}`

> Example Request:

```ruby
bundle_id = "5b7a5f2d-4054-412f-b354-b722c2cff4ec"

bundle = KillBillClient::Model::Bundle.new
bundle.find_by_id(bundle_id, options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'

bundle.get_bundle(bundle_id, api_key, api_secret)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
{
   "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
   "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
   "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
   "subscriptions":[
      {
         "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
         "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
         "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
         "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
         "startDate":"2013-08-01",
         "productName":"Sports",
         "productCategory":"BASE",
         "billingPeriod":"MONTHLY",
         "phaseType":"TRIAL",
         "priceList":"DEFAULT",
         "planName":"sports-monthly",
         "state":"ACTIVE",
         "sourceType":"NATIVE",
         "chargedThroughDate":"2013-08-01",
         "billingStartDate":"2013-08-01",
         "billCycleDayLocal":31,
         "events":[
            {
               "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"sports-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"sports-monthly-trial",
               "auditLogs":[]
            },
            {
               "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-08-31",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"PHASE",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement+billing-service",
               "serviceStateName":"PHASE",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "priceOverrides":[
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-trial",
               "phaseType":"TRIAL",
               "fixedPrice":0
            },
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-evergreen",
               "phaseType":"EVERGREEN",
               "recurringPrice":500.0
            }
         ],
         "auditLogs":[]
      }
   ],
   "timeline":{
      "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
      "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
      "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
      "events":[
         {
            "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_ENTITLEMENT",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement-service",
            "serviceStateName":"ENT_STARTED",
            "phase":"sports-monthly-trial",
            "auditLogs":[]
         },
         {
            "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_BILLING",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"billing-service",
            "serviceStateName":"START_BILLING",
            "phase":"sports-monthly-trial",
            "auditLogs":[]
         },
         {
            "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-08-31",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"PHASE",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement+billing-service",
            "serviceStateName":"PHASE",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         }
      ],
      "auditLogs":[]
   },
   "auditLogs":[]
}
```
```python
{'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
 'audit_logs': [],
 'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
 'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
 'subscriptions': [{'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
                    'audit_logs': [],
                    'bill_cycle_day_local': 6,
                    'billing_end_date': None,
                    'billing_period': 'MONTHLY',
                    'billing_start_date': datetime.date(2018, 5, 7),
                    'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
                    'cancelled_date': None,
                    'charged_through_date': None,
                    'events': [{'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '80ca6915-0293-4b1d-8bc6-b3c9fe1bee03',
                                'event_type': 'START_ENTITLEMENT',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement-service',
                                'service_state_name': 'ENT_STARTED'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': 'ce26b570-0a9f-463e-b65c-96a9fd67f124',
                                'event_type': 'START_BILLING',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'billing-service',
                                'service_state_name': 'START_BILLING'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 6, 6),
                                'event_id': 'c7af9fa3-5465-4e69-8a84-6977c711921c',
                                'event_type': 'PHASE',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-evergreen',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement+billing-service',
                                'service_state_name': 'PHASE'}],
                    'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
                    'phase_type': 'TRIAL',
                    'plan_name': 'standard-monthly',
                    'price_list': 'DEFAULT',
                    'price_overrides': [{'fixed_price': 0.0,
                                         'phase_name': 'standard-monthly-trial',
                                         'phase_type': 'TRIAL',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': None,
                                         'usage_price_overrides': []},
                                        {'fixed_price': None,
                                         'phase_name': 'standard-monthly-evergreen',
                                         'phase_type': 'EVERGREEN',
                                         'plan_name': 'standard-monthly',
                                         'recurring_price': 100.0,
                                         'usage_price_overrides': []}],
                    'product_category': 'BASE',
                    'product_name': 'Standard',
                    'source_type': 'NATIVE',
                    'start_date': datetime.date(2018, 5, 7),
                    'state': 'ACTIVE',
                    'subscription_id': '6f6cab9d-dfe0-4b89-9a09-b16055f72f5c'}],
 'timeline': {'account_id': '8ef95bea-9306-4b26-a43c-090de8779599',
              'audit_logs': [],
              'bundle_id': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691',
              'events': [{'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '80ca6915-0293-4b1d-8bc6-b3c9fe1bee03',
                          'event_type': 'START_ENTITLEMENT',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement-service',
                          'service_state_name': 'ENT_STARTED'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': 'ce26b570-0a9f-463e-b65c-96a9fd67f124',
                          'event_type': 'START_BILLING',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'billing-service',
                          'service_state_name': 'START_BILLING'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 6, 6),
                          'event_id': 'c7af9fa3-5465-4e69-8a84-6977c711921c',
                          'event_type': 'PHASE',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-evergreen',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement+billing-service',
                          'service_state_name': 'PHASE'}],
              'external_key': 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'}}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid identifier was provided.

## Transfer a bundle to another account

The new account_id should be set in this object


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}`

> Example Request:

```ruby
requested_date = "2013-08-01"
billing_policy = "END_OF_TERM"

bundle = KillBillClient::Model::Bundle.new
bundle.account_id = new_account_id
bundle.bundle_id = bundle_id

bundle.transfer(requested_date, 
                billing_policy, 
                user, 
                reason, 
                comment, 
                options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'
new_account_id = '71499886-296d-4b0f-8b76-0eed352d8801'
body = Bundle(bundle_id=bundle_id, account_id=new_account_id)

bundle.transfer_bundle(bundle_id, 
                       body, 
                       created_by, 
                       api_key, 
                       api_secret)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
```
```ruby
{
   "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
   "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
   "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
   "subscriptions":[
      {
         "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
         "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
         "subscriptionId":"46e6fcdc-9f63-4ffc-a091-0cde70f964f0",
         "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
         "startDate":"2013-09-01",
         "productName":"Sports",
         "productCategory":"BASE",
         "billingPeriod":"MONTHLY",
         "phaseType":"EVERGREEN",
         "priceList":"DEFAULT",
         "planName":"sports-monthly",
         "state":"ACTIVE",
         "sourceType":"TRANSFERRED",
         "billingStartDate":"2013-09-01",
         "billCycleDayLocal":1,
         "events":[
            {
               "eventId":"605c5696-4046-4597-8a67-7e50d26856cd",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-09-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_ENTITLEMENT",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"entitlement-service",
               "serviceStateName":"ENT_STARTED",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            },
            {
               "eventId":"fbc53e69-0683-4904-bc77-5d244b9ad1c9",
               "billingPeriod":"MONTHLY",
               "effectiveDate":"2013-09-01",
               "plan":"sports-monthly",
               "product":"Sports",
               "priceList":"DEFAULT",
               "eventType":"START_BILLING",
               "isBlockedBilling":false,
               "isBlockedEntitlement":false,
               "serviceName":"billing-service",
               "serviceStateName":"START_BILLING",
               "phase":"sports-monthly-evergreen",
               "auditLogs":[]
            }
         ],
         "priceOverrides":[
            {
               "planName":"sports-monthly",
               "phaseName":"sports-monthly-evergreen",
               "phaseType":"EVERGREEN",
               "recurringPrice":500.0
            }
         ],
         "auditLogs":[]
      }
   ],
   "timeline":{
      "accountId":"71499886-296d-4b0f-8b76-0eed352d8801",
      "bundleId":"cff04ff5-19ba-4bdc-8aca-ed486d4b845c",
      "externalKey":"25f2de6b-2443-4d7c-8487-22bf6df5a5ec-73709",
      "events":[
         {
            "eventId":"605c5696-4046-4597-8a67-7e50d26856cd",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-09-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_ENTITLEMENT",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"entitlement-service",
            "serviceStateName":"ENT_STARTED",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         },
         {
            "eventId":"fbc53e69-0683-4904-bc77-5d244b9ad1c9",
            "billingPeriod":"MONTHLY",
            "effectiveDate":"2013-09-01",
            "plan":"sports-monthly",
            "product":"Sports",
            "priceList":"DEFAULT",
            "eventType":"START_BILLING",
            "isBlockedBilling":false,
            "isBlockedEntitlement":false,
            "serviceName":"billing-service",
            "serviceStateName":"START_BILLING",
            "phase":"sports-monthly-evergreen",
            "auditLogs":[]
         }
      ],
      "auditLogs":[]
   },
   "auditLogs":[]
}
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date for transfer a bundle |

**Returns**

Returns a bundle object if a valid account and bundle id's was provided.

## Block a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/block`

> Example Request:

```ruby
state_name = "STATE1"
service = "ServiceStateService"
block_change = false
block_entitlement = false
block_billing = false
requested_date = "2013-08-01"

bundle.set_blocking_state(state_name,
                          service,
                          block_change, 
                          block_entitlement,
                          block_billing, 
                          requested_date,
                          user, 
                          reason, 
                          comment,
                          options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'
body = BlockingState(state_name='STATE1', 
                     service='ServiceStateService', 
                     is_block_change=False, 
                     is_block_entitlement=False, 
                     is_block_billing=False)

bundle.add_bundle_blocking_state(bundle_id,
                                 body,
                                 created_by,
                                 api_key,
                                 api_secret)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
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
| **requestedDate** | string | false | requested date for block a bundle |

**Returns**

A `200` http status without content.

## Add custom fields to bundle

**HTTP Request** 

`POST http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field = KillBillClient::Model::CustomFieldAttributes.new
custom_field.object_type = 'BUNDLE'
custom_field.name = 'Test Custom Field'
custom_field.value = 'test_value'

bundle.add_custom_field(custom_field, 
                        user,
                        reason,
                        comment,
                        options)
```

```python
bundle = killbill.api.BundleApi()
body = CustomField(name='Test Custom Field', value='test_value')

bundle.create_bundle_custom_fields(bundle_id,
                                   [body],
                                   created_by,
                                   api_key,
                                   api_secret)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"6e571e22-b794-413c-be6f-1b2aa4bf9824",
      "objectId":"0149ffc6-fdfd-40b1-8cf4-29a66aef51d4",
      "objectType":"BUNDLE",
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

## Retrieve bundle custom fields

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
audit = 'NONE'

bundle.custom_fields(audit, options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundle.get_bundle_custom_fields(bundle_id, api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "customFieldId":"7fb3dde7-0911-4477-99e3-69d142509bb9",
      "objectId":"4927c1a2-3959-4f71-98e7-ce3ba19c92ac",
      "objectType":"BUNDLE",
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
 'object_id': 'ce967207-851c-4040-bfbd-74a8924f9b8a',
 'object_type': 'BUNDLE',
 'value': 'test_value'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a list of custom field objects.

## Modify custom fields to bundle

**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/customFields`


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

bundle.modify_custom_field(custom_field,                                                                                            
                           user, 
                           reason,
                           comment, 
                           options)
```

```python
bundle = killbill.api.BundleApi()
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

bundle.modify_bundle_custom_fields(bundle_id, 
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
      "objectType":"BUNDLE",
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

## Remove custom fields from bundle

**HTTP Request** 

`DELETE http://example.com/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
custom_field_id = custom_field.id

bundle.remove_custom_field(custom_field_id, 
                           user, 
                           reason,
                           comment, 
                           options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a' 

bundle.delete_bundle_custom_fields(bundle_id, 
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
| **customFieldList** | string | true | a list of custom field objects that you want to remove it |

**Response**

A `200` http status without content.

## Pause a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/pause`

> Example Request:

```ruby
bundle = KillBillClient::Model::Bundle.new
bundle.bundle_id = bundle_id
requested_date = "2013-08-01"

bundle.pause(requested_date, 
             user, 
             reason, 
             comment, 
             options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundle.pause_bundle(bundle_id, 
                    created_by, 
                    api_key, 
                    api_secret)
```

> Example Response:

```shell
**TODO**
```
```java
**TODO**
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
| **requestedDate** | string | false | requested date for pause a bundle |

**Returns**

A `200` http status without content.

## Resume a bundle


**HTTP Request** 

`PUT http://example.com/1.0/kb/bundles/{bundleId}/resume`

> Example Request:

```ruby
bundle = KillBillClient::Model::Bundle.new
bundle.bundle_id = bundle_id
requested_date = "2013-08-01"

bundle.resume(requested_date, 
              user, 
              reason, 
              comment, 
              options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundle.resume_bundle(bundle_id, 
                     created_by, 
                     api_key, 
                     api_secret)
```
> Example Response:

```shell
**TODO**
```
```java
**TODO**
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
| **requestedDate** | string | false | requested date for resume a bundle |

**Returns**

A `200` http status without content.

## Add tags to bundle

**HTTP Request** 

`POST http://example.com/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

bundle.add_tag(tag_name,
               user,
               reason,
               comment,
               options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'
tag = ["00000000-0000-0000-0000-000000000002"]

bundle.create_bundle_tags(bundle_id, 
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
      "objectType":"BUNDLE",
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

Returns a bundle tag object.

## Retrieve bundle tags

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/{bundleId}/tags`

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

bundle.tags(included_deleted,
            audit,
            options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

bundle.get_bundle_tags(bundle_id, api_key, api_secret)
```
> Example Response:

```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"BUNDLE",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"00000000-0000-0000-0000-000000000006",
      "tagDefinitionName":"TEST",
      "auditLogs":[

      ]
   }
]
```
```python
[{'audit_logs': [],
 'object_id': '3e94fccf-0f37-40aa-90a4-122a4f381ebc',
 'object_type': 'BUNDLE',
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

Returns a list of bundle tag objects.

## Remove tags from bundle

**HTTP Request** 

`DELETE http://example.com/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
tag_name = 'TEST'

bundle.remove_tag(tag_name,
                  user,
                  reason,
                  comment,
                  options)
```

```python
bundle = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

bundle.delete_bundle_tags(bundle_id, 
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

## List bundles

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/pagination`

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

bundle.find_in_batches(offset,
                       limit,
                       options)
```

```python
bundle = killbill.api.BundleApi()

bundle.get_bundles(api_key, api_secret,)
```
> Example Response:

```ruby
[
  {
     "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
     "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
     "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
     "subscriptions":[
        {
           "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
           "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
           "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
           "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
           "startDate":"2013-08-01",
           "productName":"Sports",
           "productCategory":"BASE",
           "billingPeriod":"MONTHLY",
           "phaseType":"TRIAL",
           "priceList":"DEFAULT",
           "planName":"sports-monthly",
           "state":"ACTIVE",
           "sourceType":"NATIVE",
           "chargedThroughDate":"2013-08-01",
           "billingStartDate":"2013-08-01",
           "billCycleDayLocal":31,
           "events":[
              {
                 "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-01",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"START_ENTITLEMENT",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"entitlement-service",
                 "serviceStateName":"ENT_STARTED",
                 "phase":"sports-monthly-trial",
                 "auditLogs":[]
              },
              {
                 "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-01",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"START_BILLING",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"billing-service",
                 "serviceStateName":"START_BILLING",
                 "phase":"sports-monthly-trial",
                 "auditLogs":[]
              },
              {
                 "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-31",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"PHASE",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"entitlement+billing-service",
                 "serviceStateName":"PHASE",
                 "phase":"sports-monthly-evergreen",
                 "auditLogs":[]
              }
           ],
           "priceOverrides":[
              {
                 "planName":"sports-monthly",
                 "phaseName":"sports-monthly-trial",
                 "phaseType":"TRIAL",
                 "fixedPrice":0
              },
              {
                 "planName":"sports-monthly",
                 "phaseName":"sports-monthly-evergreen",
                 "phaseType":"EVERGREEN",
                 "recurringPrice":500.0
              }
           ],
           "auditLogs":[]
        }
     ],
     "timeline":{
        "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
        "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
        "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
        "events":[
           {
              "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-01",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"START_ENTITLEMENT",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"entitlement-service",
              "serviceStateName":"ENT_STARTED",
              "phase":"sports-monthly-trial",
              "auditLogs":[]
           },
           {
              "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-01",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"START_BILLING",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"billing-service",
              "serviceStateName":"START_BILLING",
              "phase":"sports-monthly-trial",
              "auditLogs":[]
           },
           {
              "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-31",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"PHASE",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"entitlement+billing-service",
              "serviceStateName":"PHASE",
              "phase":"sports-monthly-evergreen",
              "auditLogs":[]
           }
        ],
        "auditLogs":[]
     },
     "auditLogs":[]
  }
]
```

```python
[{'account_id': '7c86f63a-3380-4487-99e1-1865108a3e6c',
 'audit_logs': [],
 'bundle_id': 'e700381c-3af4-479a-af92-485c5ac89e41',
 'external_key': 'e700381c-3af4-479a-af92-485c5ac89e41',
 'subscriptions': [{'account_id': '7c86f63a-3380-4487-99e1-1865108a3e6c',
                    'audit_logs': [],
                    'bill_cycle_day_local': 6,
                    'billing_end_date': None,
                    'billing_period': 'MONTHLY',
                    'billing_start_date': datetime.date(2018, 5, 7),
                    'bundle_id': 'e700381c-3af4-479a-af92-485c5ac89e41',
                    'cancelled_date': None,
                    'charged_through_date': None,
                    'events': [{'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '3639baf9-57a5-4c52-92da-d13432b48919',
                                'event_type': 'START_ENTITLEMENT',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement-service',
                                'service_state_name': 'ENT_STARTED'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '2b3efee7-6cb5-4801-8abd-c11936b69439',
                                'event_type': 'START_BILLING',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'billing-service',
                                'service_state_name': 'START_BILLING'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 6, 6),
                                'event_id': '2dbbf736-1c24-42f7-83fc-fbc2a8059e96',
                                'event_type': 'PHASE',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-evergreen',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement+billing-service',
                                'service_state_name': 'PHASE'}],
                    'external_key': 'e700381c-3af4-479a-af92-485c5ac89e41',
                    'phase_type': 'TRIAL',
                    'plan_name': 'standard-monthly',
                    'price_list': 'DEFAULT',
                    'price_overrides': [],
                    'product_category': 'BASE',
                    'product_name': 'Standard',
                    'source_type': 'NATIVE',
                    'start_date': datetime.date(2018, 5, 7),
                    'state': 'ACTIVE',
                    'subscription_id': '5ce4f7e1-5f82-4b6b-8ff6-a25ff64e7bdd'}],
 'timeline': {'account_id': '7c86f63a-3380-4487-99e1-1865108a3e6c',
              'audit_logs': [],
              'bundle_id': 'e700381c-3af4-479a-af92-485c5ac89e41',
              'events': [{'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '3639baf9-57a5-4c52-92da-d13432b48919',
                          'event_type': 'START_ENTITLEMENT',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement-service',
                          'service_state_name': 'ENT_STARTED'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '2b3efee7-6cb5-4801-8abd-c11936b69439',
                          'event_type': 'START_BILLING',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'billing-service',
                          'service_state_name': 'START_BILLING'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 6, 6),
                          'event_id': '2dbbf736-1c24-42f7-83fc-fbc2a8059e96',
                          'event_type': 'PHASE',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-evergreen',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement+billing-service',
                          'service_state_name': 'PHASE'}],
              'external_key': 'e700381c-3af4-479a-af92-485c5ac89e41'}}]
```
**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- | 
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |

**Returns**

Returns a list with all bundles.

## Search bundles

**HTTP Request** 

`GET http://example.com/1.0/kb/bundles/search/{searchKey}`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
search_key = 'example'
offset = 0
limit = 100

bundle.find_in_batches_by_search_key(search_key,
                                     offset,
                                     limit,
                                     options)
```

```python
bundle = killbill.api.BundleApi()
search_key = '7b26b0ce-a495-4c0c-9dd5-11a556f03e8c'

bundle.search_bundles(search_key, api_key, api_secret)
```
> Example Response:

```ruby
[
  {
     "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
     "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
     "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
     "subscriptions":[
        {
           "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
           "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
           "subscriptionId":"e29573cc-d0e6-4d26-b97e-1a9c02d520ad",
           "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
           "startDate":"2013-08-01",
           "productName":"Sports",
           "productCategory":"BASE",
           "billingPeriod":"MONTHLY",
           "phaseType":"TRIAL",
           "priceList":"DEFAULT",
           "planName":"sports-monthly",
           "state":"ACTIVE",
           "sourceType":"NATIVE",
           "chargedThroughDate":"2013-08-01",
           "billingStartDate":"2013-08-01",
           "billCycleDayLocal":31,
           "events":[
              {
                 "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-01",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"START_ENTITLEMENT",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"entitlement-service",
                 "serviceStateName":"ENT_STARTED",
                 "phase":"sports-monthly-trial",
                 "auditLogs":[]
              },
              {
                 "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-01",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"START_BILLING",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"billing-service",
                 "serviceStateName":"START_BILLING",
                 "phase":"sports-monthly-trial",
                 "auditLogs":[]
              },
              {
                 "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
                 "billingPeriod":"MONTHLY",
                 "effectiveDate":"2013-08-31",
                 "plan":"sports-monthly",
                 "product":"Sports",
                 "priceList":"DEFAULT",
                 "eventType":"PHASE",
                 "isBlockedBilling":false,
                 "isBlockedEntitlement":false,
                 "serviceName":"entitlement+billing-service",
                 "serviceStateName":"PHASE",
                 "phase":"sports-monthly-evergreen",
                 "auditLogs":[]
              }
           ],
           "priceOverrides":[
              {
                 "planName":"sports-monthly",
                 "phaseName":"sports-monthly-trial",
                 "phaseType":"TRIAL",
                 "fixedPrice":0
              },
              {
                 "planName":"sports-monthly",
                 "phaseName":"sports-monthly-evergreen",
                 "phaseType":"EVERGREEN",
                 "recurringPrice":500.0
              }
           ],
           "auditLogs":[]
        }
     ],
     "timeline":{
        "accountId":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995",
        "bundleId":"5b7a5f2d-4054-412f-b354-b722c2cff4ec",
        "externalKey":"4b67f7d8-d7db-4e4f-b282-eb1cdf43a995-43135",
        "events":[
           {
              "eventId":"e0136144-a852-4eaa-b721-c8b585dcb4a6",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-01",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"START_ENTITLEMENT",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"entitlement-service",
              "serviceStateName":"ENT_STARTED",
              "phase":"sports-monthly-trial",
              "auditLogs":[]
           },
           {
              "eventId":"72a51773-9e1d-4ad7-beeb-03139f60ea3d",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-01",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"START_BILLING",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"billing-service",
              "serviceStateName":"START_BILLING",
              "phase":"sports-monthly-trial",
              "auditLogs":[]
           },
           {
              "eventId":"341992e2-4565-4457-9d20-d2803d11aa61",
              "billingPeriod":"MONTHLY",
              "effectiveDate":"2013-08-31",
              "plan":"sports-monthly",
              "product":"Sports",
              "priceList":"DEFAULT",
              "eventType":"PHASE",
              "isBlockedBilling":false,
              "isBlockedEntitlement":false,
              "serviceName":"entitlement+billing-service",
              "serviceStateName":"PHASE",
              "phase":"sports-monthly-evergreen",
              "auditLogs":[]
           }
        ],
        "auditLogs":[]
     },
     "auditLogs":[]
  }
]
```
```python
[{'account_id': '7b26b0ce-a495-4c0c-9dd5-11a556f03e8c',
 'audit_logs': [],
 'bundle_id': '69328cf3-f088-4684-b440-4e2969531930',
 'external_key': '69328cf3-f088-4684-b440-4e2969531930',
 'subscriptions': [{'account_id': '7b26b0ce-a495-4c0c-9dd5-11a556f03e8c',
                    'audit_logs': [],
                    'bill_cycle_day_local': 6,
                    'billing_end_date': None,
                    'billing_period': 'MONTHLY',
                    'billing_start_date': datetime.date(2018, 5, 7),
                    'bundle_id': '69328cf3-f088-4684-b440-4e2969531930',
                    'cancelled_date': None,
                    'charged_through_date': None,
                    'events': [{'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '8a449d77-6894-4903-a048-e625bfec0acd',
                                'event_type': 'START_ENTITLEMENT',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement-service',
                                'service_state_name': 'ENT_STARTED'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 5, 7),
                                'event_id': '996d3548-110c-4870-afa6-a8f0d448b184',
                                'event_type': 'START_BILLING',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-trial',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'billing-service',
                                'service_state_name': 'START_BILLING'},
                               {'audit_logs': [],
                                'billing_period': 'MONTHLY',
                                'effective_date': datetime.date(2018, 6, 6),
                                'event_id': 'e8d24a7d-d463-44dc-ac9d-b41ebbb16a91',
                                'event_type': 'PHASE',
                                'is_blocked_billing': False,
                                'is_blocked_entitlement': False,
                                'phase': 'standard-monthly-evergreen',
                                'plan': 'standard-monthly',
                                'price_list': 'DEFAULT',
                                'product': 'Standard',
                                'service_name': 'entitlement+billing-service',
                                'service_state_name': 'PHASE'}],
                    'external_key': '69328cf3-f088-4684-b440-4e2969531930',
                    'phase_type': 'TRIAL',
                    'plan_name': 'standard-monthly',
                    'price_list': 'DEFAULT',
                    'price_overrides': [],
                    'product_category': 'BASE',
                    'product_name': 'Standard',
                    'source_type': 'NATIVE',
                    'start_date': datetime.date(2018, 5, 7),
                    'state': 'ACTIVE',
                    'subscription_id': '24f54c5b-ee87-407d-a079-22b5d359f2fd'}],
 'timeline': {'account_id': '7b26b0ce-a495-4c0c-9dd5-11a556f03e8c',
              'audit_logs': [],
              'bundle_id': '69328cf3-f088-4684-b440-4e2969531930',
              'events': [{'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '8a449d77-6894-4903-a048-e625bfec0acd',
                          'event_type': 'START_ENTITLEMENT',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement-service',
                          'service_state_name': 'ENT_STARTED'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 5, 7),
                          'event_id': '996d3548-110c-4870-afa6-a8f0d448b184',
                          'event_type': 'START_BILLING',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-trial',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'billing-service',
                          'service_state_name': 'START_BILLING'},
                         {'audit_logs': [],
                          'billing_period': 'MONTHLY',
                          'effective_date': datetime.date(2018, 6, 6),
                          'event_id': 'e8d24a7d-d463-44dc-ac9d-b41ebbb16a91',
                          'event_type': 'PHASE',
                          'is_blocked_billing': False,
                          'is_blocked_entitlement': False,
                          'phase': 'standard-monthly-evergreen',
                          'plan': 'standard-monthly',
                          'price_list': 'DEFAULT',
                          'product': 'Standard',
                          'service_name': 'entitlement+billing-service',
                          'service_state_name': 'PHASE'}],
              'external_key': '69328cf3-f088-4684-b440-4e2969531930'}}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **searchKey** | string | true | What you want to find? |
| **offset** | long | true | offset |
| **limit** | long | true | limit search items |

**Returns**

Return a list with bundles matched with the search key entered.