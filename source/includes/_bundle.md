# Bundle

## Bundle Resource

The `Bundle` resource represents a collection of subscriptions. Grouping certain subscriptions into a bundle is mostly useful to ensure
that certain operations propagate to the group. A common example is upon cancellation, to ensure that when cancelling a `BASE` subscription,
any `ADD_ON` subscriptions in the same bundle also end up being cancelled automatically. The Bundle is automatically created by the system
when creating the intial subscription and in order to add additional subscriptions in the same bundle one must specify the `bundleId` previously
created.

The attributes are the following:

* **`accountId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`bundleId`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`externalKey`** <span style="color:#32A9C7">*[User generated, default `bundleId`, immutable]*</span>: The external key provided from client.
* **`subscriptions`** <span style="color:#32A9C7">*(Array[SubscriptionJson], optional, read only)*</span>: List of subscriptions included in this bundle.
* **`timeline`** <span style="color:#32A9C7">*(BundleTimelineJson, optional, read only)*</span>: Event list.

## Bundle

### Retrieve a bundle by id

Retrieves the details information for the `Bundle` using its `bundleId`.


**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d"
```
```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("90ec582a-5da8-49d5-a656-c63cbc9d30fd");

Bundle result = bundleApi.getBundle(bundleId, 
                                    AuditLevel.NONE, 
                                    requestOptions);
```

```ruby
bundle_id = "5b7a5f2d-4054-412f-b354-b722c2cff4ec"

bundle = KillBillClient::Model::Bundle.new
bundle.find_by_id(bundle_id, options)
```

```python
bundleApi = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'

bundleApi.get_bundle(bundle_id, api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
  "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
  "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
  "subscriptions": [
    {
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "subscriptionId": "8ab101b6-15e8-433b-b4f7-f99eeaa56a77",
      "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "startDate": "2018-07-18",
      "productName": "Standard",
      "productCategory": "BASE",
      "billingPeriod": "MONTHLY",
      "phaseType": "TRIAL",
      "priceList": "DEFAULT",
      "planName": "standard-monthly",
      "state": "ACTIVE",
      "sourceType": "NATIVE",
      "cancelledDate": null,
      "chargedThroughDate": null,
      "billingStartDate": "2018-07-18",
      "billingEndDate": null,
      "billCycleDayLocal": 17,
      "events": [
        {
          "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-08-17",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "PHASE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement+billing-service",
          "serviceStateName": "PHASE",
          "phase": "standard-monthly-evergreen",
          "auditLogs": []
        }
      ],
      "priceOverrides": null,
      "prices": [
        {
          "planName": "standard-monthly",
          "phaseName": "standard-monthly-trial",
          "phaseType": "TRIAL",
          "fixedPrice": 0,
          "recurringPrice": null,
          "usagePrices": []
        },
        {
          "planName": "standard-monthly",
          "phaseName": "standard-monthly-evergreen",
          "phaseType": "EVERGREEN",
          "fixedPrice": null,
          "recurringPrice": 100,
          "usagePrices": []
        }
      ],
      "auditLogs": []
    }
  ],
  "timeline": {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "events": [
      {
        "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
        "billingPeriod": "MONTHLY",
        "effectiveDate": "2018-07-18",
        "plan": "standard-monthly",
        "product": "Standard",
        "priceList": "DEFAULT",
        "eventType": "START_ENTITLEMENT",
        "isBlockedBilling": false,
        "isBlockedEntitlement": false,
        "serviceName": "entitlement-service",
        "serviceStateName": "ENT_STARTED",
        "phase": "standard-monthly-trial",
        "auditLogs": []
      },
      {
        "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
        "billingPeriod": "MONTHLY",
        "effectiveDate": "2018-07-18",
        "plan": "standard-monthly",
        "product": "Standard",
        "priceList": "DEFAULT",
        "eventType": "START_BILLING",
        "isBlockedBilling": false,
        "isBlockedEntitlement": false,
        "serviceName": "billing-service",
        "serviceStateName": "START_BILLING",
        "phase": "standard-monthly-trial",
        "auditLogs": []
      },
      {
        "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
        "billingPeriod": "MONTHLY",
        "effectiveDate": "2018-08-17",
        "plan": "standard-monthly",
        "product": "Standard",
        "priceList": "DEFAULT",
        "eventType": "PHASE",
        "isBlockedBilling": false,
        "isBlockedEntitlement": false,
        "serviceName": "entitlement+billing-service",
        "serviceStateName": "PHASE",
        "phase": "standard-monthly-evergreen",
        "auditLogs": []
      }
    ],
    "auditLogs": []
  },
  "auditLogs": []
}
```
```java
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@efd93c26
    accountId: 11d96ccc-9bfb-4349-8d75-0ae5a7ed8d14
    bundleId: 90ec582a-5da8-49d5-a656-c63cbc9d30fd
    externalKey: 93199
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@256a98cc
        accountId: 11d96ccc-9bfb-4349-8d75-0ae5a7ed8d14
        bundleId: 90ec582a-5da8-49d5-a656-c63cbc9d30fd
        subscriptionId: 2a95b238-719f-4c2d-a63e-f1f34f11dd53
        externalKey: 93199
        startDate: 2012-04-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: CANCELLED
        sourceType: NATIVE
        cancelledDate: 2012-04-25
        chargedThroughDate: 2012-04-25
        billingStartDate: 2012-04-25
        billingEndDate: 2012-04-25
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a883ef63
            eventId: 18719cae-eab1-4f75-9ea7-f1e3135a3e7c
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@856f5bdf
            eventId: 81518934-4418-491b-819c-72ab7c840bd6
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@3ced19b8
            eventId: c0a8f0ce-db27-4371-81f0-74148e36663f
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: STOP_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: true
            serviceName: entitlement-service
            serviceStateName: ENT_CANCELLED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@401111f4
            eventId: 762e80db-d75e-4b67-9ccc-b816a00181b7
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: STOP_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: STOP_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-trial
            phaseType: TRIAL
            fixedPrice: 0
            recurringPrice: null
            usagePriceOverrides: []
        }]
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@b8eeb095
        accountId: 11d96ccc-9bfb-4349-8d75-0ae5a7ed8d14
        bundleId: 90ec582a-5da8-49d5-a656-c63cbc9d30fd
        externalKey: 93199
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@d88c1e6d
            eventId: 18719cae-eab1-4f75-9ea7-f1e3135a3e7c
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@92c880de
            eventId: 81518934-4418-491b-819c-72ab7c840bd6
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@4871bbf6
            eventId: c0a8f0ce-db27-4371-81f0-74148e36663f
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: STOP_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: true
            serviceName: entitlement-service
            serviceStateName: ENT_CANCELLED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@3be2d635
            eventId: 762e80db-d75e-4b67-9ccc-b816a00181b7
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: STOP_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: STOP_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
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

### Retrieve a bundle by external key

**HTTP Request** 

Retrieves the details information for the `Bundle` using its `externalKey`.

`GET http://127.0.0.1:8080/1.0/kb/bundles`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles?externalKey=2cd2f4b5-a1c0-42a7-924f-64c7b791332d"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

String externalKey = "93199";
Boolean includedDeleted = false; // Will not include deleted bundles

Bundles bundles = bundleApi.getBundleByKey(externalKey, 
                                           includedDeleted,
                                           AuditLevel.NONE,
                                           requestOptions);
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
bundleApi = killbill.api.BundleApi()
bundle_external_key = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'

bundleApi.get_bundle_by_key(bundle_external_key, api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "subscriptions": [
      {
        "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
        "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "subscriptionId": "8ab101b6-15e8-433b-b4f7-f99eeaa56a77",
        "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "startDate": "2018-07-18",
        "productName": "Standard",
        "productCategory": "BASE",
        "billingPeriod": "MONTHLY",
        "phaseType": "TRIAL",
        "priceList": "DEFAULT",
        "planName": "standard-monthly",
        "state": "ACTIVE",
        "sourceType": "NATIVE",
        "cancelledDate": null,
        "chargedThroughDate": null,
        "billingStartDate": "2018-07-18",
        "billingEndDate": null,
        "billCycleDayLocal": 17,
        "events": [
          {
            "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_STARTED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "START_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-08-17",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "PHASE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement+billing-service",
            "serviceStateName": "PHASE",
            "phase": "standard-monthly-evergreen",
            "auditLogs": []
          }
        ],
        "priceOverrides": null,
        "prices": [
          {
            "planName": "standard-monthly",
            "phaseName": "standard-monthly-trial",
            "phaseType": "TRIAL",
            "fixedPrice": 0,
            "recurringPrice": null,
            "usagePrices": []
          },
          {
            "planName": "standard-monthly",
            "phaseName": "standard-monthly-evergreen",
            "phaseType": "EVERGREEN",
            "fixedPrice": null,
            "recurringPrice": 100,
            "usagePrices": []
          }
        ],
        "auditLogs": []
      }
    ],
    "timeline": {
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "events": [
        {
          "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "f058c95f-9a86-435b-8bba-4f8532635450",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-08-17",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "PHASE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement+billing-service",
          "serviceStateName": "PHASE",
          "phase": "standard-monthly-evergreen",
          "auditLogs": []
        }
      ],
      "auditLogs": []
    },
    "auditLogs": []
  }
]
```
```java
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@2b6e1c9d
    accountId: a7c0b70d-fbc3-43cf-98e7-0af57c1a93fb
    bundleId: 4a2fcd90-7c8c-4877-93f9-9e99e8cd6953
    externalKey: 93199
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@22dc8662
        accountId: a7c0b70d-fbc3-43cf-98e7-0af57c1a93fb
        bundleId: 4a2fcd90-7c8c-4877-93f9-9e99e8cd6953
        subscriptionId: 9a55b6f3-ada7-4a78-915f-373af56cbb00
        externalKey: 93199
        startDate: 2012-04-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-04-25
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@ebe2ab4a
            eventId: 37b7e919-08ba-4c7d-a902-8d7a10b47157
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@9e770028
            eventId: 2a994af7-8faf-444f-a1df-fd6c68a9dbab
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@54e085c2
            eventId: 95ddcc14-ea6d-4a5c-b057-3a0d33341ab9
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-trial
            phaseType: TRIAL
            fixedPrice: 0
            recurringPrice: null
            usagePriceOverrides: []
        }, class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-evergreen
            phaseType: EVERGREEN
            fixedPrice: null
            recurringPrice: 249.95
            usagePriceOverrides: []
        }]
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@7ea930a8
        accountId: a7c0b70d-fbc3-43cf-98e7-0af57c1a93fb
        bundleId: 4a2fcd90-7c8c-4877-93f9-9e99e8cd6953
        externalKey: 93199
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@89e50f83
            eventId: 37b7e919-08ba-4c7d-a902-8d7a10b47157
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@cb989fa0
            eventId: 2a994af7-8faf-444f-a1df-fd6c68a9dbab
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@5fe74ae5
            eventId: 95ddcc14-ea6d-4a5c-b057-3a0d33341ab9
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
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
| **includedDeleted** | boolean | false | choose true to include deleted bundles |
| **audit** | enum | false | level of audit logs returned |

**Returns**

Returns a bundle object if a valid external key was provided.



### Update a bundle externalKey


**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/renameKey`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d '{ "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d", "externalKey": "another_external_key"}' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/renameKey"
```
```java
TODO	
```
```ruby
bundle = KillBillClient::Model::Bundle.new
bundle.bundle_id = bundle_id
bundle.external_key = "new_external_key"

bundle.rename_external_key(user, 
                           reason, 
                           comment, 
                           options)
```

```python
bundleApi = killbill.api.BundleApi()
body = Bundle(bundle_id=bundle_id, 
              external_key='new_external_key')

bundleApi.rename_external_key(bundle_id,
                              body,
                              created_by,
                              api_key,
                              api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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


## Transfer

### Transfer a bundle to another account

The new account_id should be set in this object


**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}`

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
    -d '{ "accountId": "8785164f-b5d7-4da1-9495-33f5105e8d80", "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d"}' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d"
```
```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("b84a8af9-73d4-4749-8d81-38dbcc2d7fb1");
UUID accountId = UUID.fromString("d82d3638-fca7-4c16-9e68-8f8db75997cc");

Bundle bundle = new Bundle();
bundle.setAccountId(accountId);
bundle.setBundleId(bundleId);

LocalDate requestedDate = null;
ImmutableMap<String, String> NULL_PLUGIN_PROPERTIES = null;
BillingActionPolicy billingPolicy = null;

Bundle result = bundleApi.transferBundle(bundleId, 
                                         bundle, 
                                         requestedDate, 
                                         billingPolicy,
                                         NULL_PLUGIN_PROPERTIES, 
                                         requestOptions);
```

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
bundleApi = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'
new_account_id = '71499886-296d-4b0f-8b76-0eed352d8801'
body = Bundle(bundle_id=bundle_id, account_id=new_account_id)

bundleApi.transfer_bundle(bundle_id, 
                          body, 
                          created_by, 
                          api_key, 
                          api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d?billingPolicy=END_OF_TERM
< Content-Type: application/json
< Content-Length: 0
```
```java
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@222591c5
    accountId: d82d3638-fca7-4c16-9e68-8f8db75997cc
    bundleId: b84a8af9-73d4-4749-8d81-38dbcc2d7fb1
    externalKey: 93199
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@a668d933
        accountId: d82d3638-fca7-4c16-9e68-8f8db75997cc
        bundleId: b84a8af9-73d4-4749-8d81-38dbcc2d7fb1
        subscriptionId: 373e7cce-0558-4c31-98af-aab54b67c4a6
        externalKey: 93199
        startDate: 2012-04-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: TRANSFERRED
        cancelledDate: null
        chargedThroughDate: null
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@1e1bbe63
            eventId: 1779fcae-a6ca-43dd-9429-85f946fa4055
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@54887921
            eventId: b242eda1-dc26-4875-b92c-a99c76084a06
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@5652e31d
            eventId: 5b59caa3-d996-4c9c-afc1-cc932e5a0ff8
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: [class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-trial
            phaseType: TRIAL
            fixedPrice: 0
            recurringPrice: null
            usagePriceOverrides: []
        }, class PhasePriceOverride {
            planName: shotgun-monthly
            phaseName: shotgun-monthly-evergreen
            phaseType: EVERGREEN
            fixedPrice: null
            recurringPrice: 249.95
            usagePriceOverrides: []
        }]
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@8ad5adda
        accountId: d82d3638-fca7-4c16-9e68-8f8db75997cc
        bundleId: b84a8af9-73d4-4749-8d81-38dbcc2d7fb1
        externalKey: 93199
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@49f9e293
            eventId: 1779fcae-a6ca-43dd-9429-85f946fa4055
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@55e764b4
            eventId: b242eda1-dc26-4875-b92c-a99c76084a06
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@16aec25d
            eventId: 5b59caa3-d996-4c9c-afc1-cc932e5a0ff8
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
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
| **requestedDate** | string | false | requested date for the transfer of the bundle |

**Returns**

Returns a bundle object if a valid account and bundle id's was provided.


## Blocking State

See section [Account Blocing State](#account-blocking-state) for an introduction.

### Pause a bundle

Provides an easy interface to pause both billing and entitlement for all subscriptions in the bundle.

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/pause`

> Example Request:

```shell
  -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/pause" \
```
```java
TODO	
```
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
bundleApi = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundleApi.pause_bundle(bundle_id, 
                       created_by, 
                       api_key, 
                       api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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
| **requestedDate** | string | false | requested date for pause a bundle |

**Returns**

A `204` http status without content.

### Resume a bundle

Provides an easy interface to resume both billing and entitlement for all subscriptions in the bundle.

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/resume`

> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/resume"
```
```java
TODO	
```
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
bundleApi = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundleApi.resume_bundle(bundle_id, 
                        created_by, 
                        api_key, 
                        api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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
| **requestedDate** | string | false | requested date for resume a bundle |

**Returns**

A `204` http status without content.

### Block a bundle

Provides an low level interface to add `BlockingState` event for this bundle. Note that the previous [pause](#bundle-pause-a-bundle) and [resume](#bundle-resume-a-bundle) operations can be achieved using this api.


**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/block`

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
    -d '{ "stateName": "STATE1", "service": "ServiceStateService", "isBlockChange": false, "isBlockEntitlement": false, "isBlockBilling": false, "effectiveDate": "2018-07-17T21:17:28.842Z", "type": "SUBSCRIPTION" }' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/block"
```
```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("b84a8af9-73d4-4749-8d81-38dbcc2d7fb1");

String stateName = "block";
String service = "service";
Boolean isBlockChange = false;
Boolean isBlockEntitlement = true;
Boolean isBlockBilling = true;
DateTime effectiveDate = null;
List<AuditLog> auditLogs = null;

BlockingState blockingState = new BlockingState(bundleId, 
                                                stateName, 
                                                service, 
                                                isBlockChange, 
                                                isBlockEntitlement, 
                                                isBlockBilling, 
                                                effectiveDate, 
                                                BlockingStateType.SUBSCRIPTION_BUNDLE, 
                                                auditLogs);

LocalDate requestedDate = clock.getToday(DateTimeZone.forID(account.getTimeZone()));
Map<String, String> pluginProperty = ImmutableMap.<String, String>of();

bundleApi.addBundleBlockingState(bundleId, 
                                 blockingState, 
                                 requestedDate, 
                                 pluginProperty, 
                                 requestOptions);
```

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
bundleApi = killbill.api.BundleApi()
bundle_id = 'a760fdc8-1e2d-4020-918a-6e4f7a9cd691'
body = BlockingState(state_name='STATE1', 
                     service='ServiceStateService', 
                     is_block_change=False, 
                     is_block_entitlement=False, 
                     is_block_billing=False)

bundleApi.add_bundle_blocking_state(bundle_id,
                                    body,
                                    created_by,
                                    api_key,
                                    api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/accounts/2ad52f53-85ae-408a-9879-32a7e59dd03d/block?blockingStateTypes=SUBSCRIPTION_BUNDLE
< Content-Type: application/json
< Content-Length: 0
```
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
| **requestedDate** | string | false | requested date for block a bundle |

**Returns**

A `201` http status without content.

## Custom Fields

Custom fields are `{key, value}` attributes that can be attached to any customer resources, and in particularly on the `Bundle` objects.

### Add custom fields to bundle

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/customFields`

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
    -d '[ { "objectType": "BUNDLE", "name": "Test Custom Field", "value": "demo_test_value" }]' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/customFields"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("b84a8af9-73d4-4749-8d81-38dbcc2d7fb1");
final ImmutableList<AuditLog> EMPTY_AUDIT_LOGS = ImmutableList.<AuditLog>of();

CustomFields customFields = new CustomFields();
customFields.add(new CustomField(null, 
                                 bundleId, 
                                 ObjectType.BUNDLE, 
                                 "Test Custom Field", 
                                 "test_value", 
                                 EMPTY_AUDIT_LOGS));

bundleApi.createBundleCustomFields(bundleId, 
                                   customFields, 
                                   requestOptions);
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
bundleApi = killbill.api.BundleApi()
body = CustomField(name='Test Custom Field', value='test_value')

bundleApi.create_bundle_custom_fields(bundle_id,
                                      [body],
                                      created_by,
                                      api_key,
                                      api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/customFields
< Content-Type: application/json
< Content-Length: 0
```
```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: 59860a0d-c032-456d-a35e-3a48fe8579e5
    objectType: BUNDLE
    name: Test Custom Field
    value: test_value
    auditLogs: []
}
```
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

### Retrieve bundle custom fields

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/customFields"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");

List<CustomField> bundleCustomFields = bundleApi.getBundleCustomFields(bundleId,
                                                                       AuditLevel.NONE,
                                                                       requestOptions);
```

```ruby
audit = 'NONE'

bundle.custom_fields(audit, options)
```

```python
bundleApi = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a'

bundleApi.get_bundle_custom_fields(bundle_id, api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "customFieldId": "349de10f-4bb1-4e1a-93f6-11b745200bf5",
    "objectId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "objectType": "BUNDLE",
    "name": "Test Custom Field",
    "value": "demo_test_value",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class CustomField {
    org.killbill.billing.client.model.gen.CustomField@c7d0c38a
    customFieldId: null
    objectId: 59860a0d-c032-456d-a35e-3a48fe8579e5
    objectType: BUNDLE
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

### Modify custom fields to bundle

**HTTP Request** 

`PUT http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/customFields`


> Example Request:

```shell
curl -v \
    -X PUT \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d '[ { "customFieldId": "349de10f-4bb1-4e1a-93f6-11b745200bf5", "objectId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d", "objectType": "BUNDLE", "name": "Test Custom Field", "value": "test_modify_value", "auditLogs": [] }]' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/customFields"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

CustomField customFieldModified = new CustomField();
customFieldModified.setCustomFieldId(customFieldsId);
customFieldModified.setValue("NewValue");

bundleApi.modifyBundleCustomFields(bundleId, 
                                   customFieldModified, 
                                   requestOptions);
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
bundleApi = killbill.api.BundleApi()
body = CustomField(custom_field_id=custom_field_id, 
                   name='Test Custom Field', 
                   value='test_value')

bundleApi.modify_bundle_custom_fields(bundle_id, 
                                      [body], 
                                      created_by, 
                                      api_key, 
                                      api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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

### Remove custom fields from bundle

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/customFields`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/customFields?customField=349de10f-4bb1-4e1a-93f6-11b745200bf5"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("59860a0d-c032-456d-a35e-3a48fe8579e5");
UUID customFieldsId = UUID.fromString("9913e0f6-b5ef-498b-ac47-60e1626eba8f");

bundleApi.deleteBundleCustomFields(bundleId, 
                                   customFieldsId, 
                                   requestOptions);
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
bundleApi = killbill.api.BundleApi()
bundle_id = 'ce967207-851c-4040-bfbd-74a8924f9b8a' 

bundleApi.delete_bundle_custom_fields(bundle_id, 
                                      created_by, 
                                      api_key, 
                                      api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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
| **customField** | string | true | the list of custom field object IDs that should be deleted. |

**Response**

A `204` http status without content.


## Tags

See section [Account Tags](#account-tags) for an introduction.

The are no `system` tags applicable for a `Bundle`.

Let's assume there is an existing `user` tagDefintion already created with `tagDefinitionId`=`353752dd-9041-4450-b782-a8bb03a923c8`.

### Add tags to bundle

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/tags`

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
    -d '[ "353752dd-9041-4450-b782-a8bb03a923c8"]' \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/tags"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("917992d3-5f1f-4828-9fff-799cc4211aa9");

UUID tagDefinitionId = UUID.fromString("353752dd-9041-4450-b782-a8bb03a923c8");

Tags result = bundleApi.createBundleTags(bundleId, 
                                         ImmutableList.<UUID>of(tagDefinitionId), 
                                         requestOptions);
```

```ruby
tag_name = 'foo'

bundle.add_tag(tag_name,
               user,
               reason,
               comment,
               options)
```

```python
bundleApi = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'
tag = ["353752dd-9041-4450-b782-a8bb03a923c8"]

bundleApi.create_bundle_tags(bundle_id, 
                             tag, 
                             created_by, 
                             api_key, 
                             api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/tags
< Content-Type: application/json
< Content-Length: 0
```
```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@bd138472
    tagId: 1bb4b638-3886-4f73-90a5-89eb6d1bcf7f
    objectType: BUNDLE
    objectId: 917992d3-5f1f-4828-9fff-799cc4211aa9
    tagDefinitionId: 353752dd-9041-4450-b782-a8bb03a923c8
    tagDefinitionName: foo
    auditLogs: []
}
```
```ruby
[
   {
      "tagId":"a46cfeb6-e175-42db-be62-7f117326ab4e",
      "objectType":"BUNDLE",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"353752dd-9041-4450-b782-a8bb03a923c8",
      "tagDefinitionName":"foo",
      "auditLogs":[

      ]
   }
]
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `201` http status without content.

### Retrieve bundle tags

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/tags"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("917992d3-5f1f-4828-9fff-799cc4211aa9");
Boolean includedDeleted = false; // Will not include deleted tags

List<Tag> tags1 = bundleApi.getBundleTags(bundleId, 
                                          includedDeleted, 
                                          AuditLevel.FULL, 
                                          requestOptions);
```

```ruby
included_deleted = false
audit = 'NONE'

bundle.tags(included_deleted,
            audit,
            options)
```

```python
bundleApi = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'

bundleApi.get_bundle_tags(bundle_id, api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "tagId": "e054c84a-0518-4611-92a8-53e849f0affd",
    "objectType": "BUNDLE",
    "objectId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "tagDefinitionId": "353752dd-9041-4450-b782-a8bb03a923c8",
    "tagDefinitionName": "foo",
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Tag {
    org.killbill.billing.client.model.gen.Tag@cae768d7
    tagId: d724f79d-fad1-4758-b35e-d62708450d90
    objectType: BUNDLE
    objectId: e659f0f3-745c-46d5-953c-28fe9282fc7d
    tagDefinitionId: 353752dd-9041-4450-b782-a8bb03a923c8
    tagDefinitionName: foo
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
      "objectType":"BUNDLE",
      "objectId":"28af3cb9-275b-4ac4-a55d-a0536e479069",
      "tagDefinitionId":"353752dd-9041-4450-b782-a8bb03a923c8",
      "tagDefinitionName":"foo",
      "auditLogs":[

      ]
   }
]
```
```python
[{'audit_logs': [],
 'object_id': '3e94fccf-0f37-40aa-90a4-122a4f381ebc',
 'object_type': 'BUNDLE',
 'tag_definition_id': '353752dd-9041-4450-b782-a8bb03a923c8',
 'tag_definition_name': 'foo',
 'tag_id': 'fc7fab6e-751c-4dd3-b7fa-e93a66e42822'}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ---- | ------------
| **audit** | enum | false | level of audit logs returned |
| **includedDeleted** | boolean | false | choose true if you want to include deleted tags |

**Returns**

Returns a list of bundle tag objects.

### Remove tags from bundle

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/bundles/{bundleId}/tags`

> Example Request:

```shell
curl -v \
    -X DELETE \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://localhost:8080/1.0/kb/bundles/2cd2f4b5-a1c0-42a7-924f-64c7b791332d/tags?tagDef=353752dd-9041-4450-b782-a8bb03a923c8"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

UUID bundleId = UUID.fromString("917992d3-5f1f-4828-9fff-799cc4211aa9");

UUID tagDefinitionId = UUID.fromString("353752dd-9041-4450-b782-a8bb03a923c8");

bundleApi.deleteBundleTags(bundleId, 
                           ImmutableList.<UUID>of(tagDefinitionId), 
                           requestOptions);
```

```ruby
tag_name = 'foo'

bundle.remove_tag(tag_name,
                  user,
                  reason,
                  comment,
                  options)
```

```python
bundleApi = killbill.api.BundleApi()
bundle_id = '28af3cb9-275b-4ac4-a55d-a0536e479069'
tag = ["353752dd-9041-4450-b782-a8bb03a923c8"]

bundleApi.delete_bundle_tags(bundle_id, 
                             created_by, 
                             api_key, 
                             api_secret,
                             tag_def=tag)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
< Content-Type: application/json
```
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
| **tagDef** | string | true |  the list of tag definition ID identifying the tags that should be removed. |

**Response**

A `204` http status without content.

## Pagination/Search

### List bundles

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/bundles/pagination`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles/pagination"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

Long offset = 0L;
Long limit = 1L;

Bundles allBundles = bundleApi.getBundles(offset, 
                                          limit, 
                                          AuditLevel.NONE, 
                                          requestOptions);
```

```ruby
offset = 0
limit = 100

bundle.find_in_batches(offset,
                       limit,
                       options)
```

```python
bundleApi = killbill.api.BundleApi()

bundleApi.get_bundles(api_key, api_secret,)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "externalKey": "another_external_key",
    "subscriptions": [
      {
        "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
        "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "subscriptionId": "8ab101b6-15e8-433b-b4f7-f99eeaa56a77",
        "externalKey": "another_external_key",
        "startDate": "2018-07-18",
        "productName": "Standard",
        "productCategory": "BASE",
        "billingPeriod": "MONTHLY",
        "phaseType": "TRIAL",
        "priceList": "DEFAULT",
        "planName": "standard-monthly",
        "state": "CANCELLED",
        "sourceType": "NATIVE",
        "cancelledDate": "2018-07-19",
        "chargedThroughDate": null,
        "billingStartDate": "2018-07-18",
        "billingEndDate": "2018-07-19",
        "billCycleDayLocal": 17,
        "events": [
          {
            "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_STARTED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "START_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "01387e92-8b6c-4c74-811f-3d2698646049",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "STOP_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": true,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_CANCELLED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "1d605f2d-e605-47d5-b55c-904a0cba12f8",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "STOP_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "STOP_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "e9f343aa-3650-4709-a09d-8a3df908bd47",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "SERVICE_STATE_CHANGE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "ServiceStateService",
            "serviceStateName": "STATE1",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          }
        ],
        "priceOverrides": null,
        "prices": [],
        "auditLogs": []
      }
    ],
    "timeline": {
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "externalKey": "another_external_key",
      "events": [
        {
          "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "01387e92-8b6c-4c74-811f-3d2698646049",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "STOP_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": true,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_CANCELLED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "1d605f2d-e605-47d5-b55c-904a0cba12f8",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "STOP_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "STOP_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "e9f343aa-3650-4709-a09d-8a3df908bd47",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "SERVICE_STATE_CHANGE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "ServiceStateService",
          "serviceStateName": "STATE1",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        }
      ],
      "auditLogs": []
    },
    "auditLogs": []
  },
  {
    "accountId": "8785164f-b5d7-4da1-9495-33f5105e8d80",
    "bundleId": "02134ca5-8254-4c73-aaf2-89ed99a28fce",
    "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "subscriptions": [
      {
        "accountId": "8785164f-b5d7-4da1-9495-33f5105e8d80",
        "bundleId": "02134ca5-8254-4c73-aaf2-89ed99a28fce",
        "subscriptionId": "3b78a8c1-30fb-4b4e-a247-b131cbf6fa71",
        "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "startDate": "2018-07-19",
        "productName": "Standard",
        "productCategory": "BASE",
        "billingPeriod": "MONTHLY",
        "phaseType": "TRIAL",
        "priceList": "DEFAULT",
        "planName": "standard-monthly",
        "state": "ACTIVE",
        "sourceType": "TRANSFERRED",
        "cancelledDate": null,
        "chargedThroughDate": "2018-07-19",
        "billingStartDate": "2018-07-19",
        "billingEndDate": null,
        "billCycleDayLocal": 18,
        "events": [
          {
            "eventId": "f247597d-deac-468e-8b18-9a04c633ec71",
            "billingPeriod": null,
            "effectiveDate": "2018-07-19",
            "plan": null,
            "product": null,
            "priceList": null,
            "eventType": "SERVICE_STATE_CHANGE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "account-service",
            "serviceStateName": "CLOSE_ACCOUNT",
            "phase": null,
            "auditLogs": []
          },
          {
            "eventId": "15987747-2c28-4475-965c-3b1cff08faa9",
            "billingPeriod": null,
            "effectiveDate": "2018-07-19",
            "plan": null,
            "product": null,
            "priceList": null,
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_STARTED",
            "phase": null,
            "auditLogs": []
          },
          {
            "eventId": "51c53d93-d3c1-4906-b295-c5a1b0d761e7",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "START_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "2cf6cd36-d0d1-461b-b525-f2a36a73be76",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-08-17",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "PHASE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement+billing-service",
            "serviceStateName": "PHASE",
            "phase": "standard-monthly-evergreen",
            "auditLogs": []
          }
        ],
        "priceOverrides": null,
        "prices": [],
        "auditLogs": []
      }
    ],
    "timeline": {
      "accountId": "8785164f-b5d7-4da1-9495-33f5105e8d80",
      "bundleId": "02134ca5-8254-4c73-aaf2-89ed99a28fce",
      "externalKey": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "events": [
        {
          "eventId": "f247597d-deac-468e-8b18-9a04c633ec71",
          "billingPeriod": null,
          "effectiveDate": "2018-07-19",
          "plan": null,
          "product": null,
          "priceList": null,
          "eventType": "SERVICE_STATE_CHANGE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "account-service",
          "serviceStateName": "CLOSE_ACCOUNT",
          "phase": null,
          "auditLogs": []
        },
        {
          "eventId": "15987747-2c28-4475-965c-3b1cff08faa9",
          "billingPeriod": null,
          "effectiveDate": "2018-07-19",
          "plan": null,
          "product": null,
          "priceList": null,
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": null,
          "auditLogs": []
        },
        {
          "eventId": "51c53d93-d3c1-4906-b295-c5a1b0d761e7",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "2cf6cd36-d0d1-461b-b525-f2a36a73be76",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-08-17",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "PHASE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement+billing-service",
          "serviceStateName": "PHASE",
          "phase": "standard-monthly-evergreen",
          "auditLogs": []
        }
      ],
      "auditLogs": []
    },
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@2659bf49
    accountId: b99980fb-331f-4129-834b-3522e845a4e3
    bundleId: b424e3d6-d747-4309-954d-1acb41bc690c
    externalKey: 757e352e-dd97-4800-93a8-d2c38e407140
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@ec70e97d
        accountId: b99980fb-331f-4129-834b-3522e845a4e3
        bundleId: b424e3d6-d747-4309-954d-1acb41bc690c
        subscriptionId: bacec1ee-7815-485f-bec2-0a875a8d68ad
        externalKey: 757e352e-dd97-4800-93a8-d2c38e407140
        startDate: 2012-08-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-08-25
        billingStartDate: 2012-08-25
        billingEndDate: null
        billCycleDayLocal: 24
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@324b0f94
            eventId: 9b35680c-c63c-47c8-9fe5-671b4bfa4e69
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@a1eefba7
            eventId: b24494ca-755c-4432-8b21-6923d5fdd30f
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@66e2bfa7
            eventId: a306143d-d2a3-4f72-95c8-91b97ee7e6ca
            billingPeriod: MONTHLY
            effectiveDate: 2012-09-24
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: []
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@d6ec82ea
        accountId: b99980fb-331f-4129-834b-3522e845a4e3
        bundleId: b424e3d6-d747-4309-954d-1acb41bc690c
        externalKey: 757e352e-dd97-4800-93a8-d2c38e407140
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@43676058
            eventId: 9b35680c-c63c-47c8-9fe5-671b4bfa4e69
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@2e29a294
            eventId: b24494ca-755c-4432-8b21-6923d5fdd30f
            billingPeriod: MONTHLY
            effectiveDate: 2012-08-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@9c578f29
            eventId: a306143d-d2a3-4f72-95c8-91b97ee7e6ca
            billingPeriod: MONTHLY
            effectiveDate: 2012-09-24
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
```
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

### Search bundles

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/bundles/search/{searchKey}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/bundles/search/another_external_key"
```

```java
import org.killbill.billing.client.api.gen.BundleApi;
protected BundleApi bundleApi;

String searchKey = "93199";
Long offset = 0L;
Long limit = 1L;

Bundles result = bundleApi.searchBundles(searchKey, 
                                         offset, 
                                         limit, 
                                         AuditLevel.NONE, 
                                         requestOptions);
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
bundleApi = killbill.api.BundleApi()
search_key = '7b26b0ce-a495-4c0c-9dd5-11a556f03e8c'

bundleApi.search_bundles(search_key, api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
    "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
    "externalKey": "another_external_key",
    "subscriptions": [
      {
        "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
        "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
        "subscriptionId": "8ab101b6-15e8-433b-b4f7-f99eeaa56a77",
        "externalKey": "another_external_key",
        "startDate": "2018-07-18",
        "productName": "Standard",
        "productCategory": "BASE",
        "billingPeriod": "MONTHLY",
        "phaseType": "TRIAL",
        "priceList": "DEFAULT",
        "planName": "standard-monthly",
        "state": "CANCELLED",
        "sourceType": "NATIVE",
        "cancelledDate": "2018-07-19",
        "chargedThroughDate": null,
        "billingStartDate": "2018-07-18",
        "billingEndDate": "2018-07-19",
        "billCycleDayLocal": 17,
        "events": [
          {
            "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_STARTED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-18",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "START_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "START_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "01387e92-8b6c-4c74-811f-3d2698646049",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "STOP_ENTITLEMENT",
            "isBlockedBilling": false,
            "isBlockedEntitlement": true,
            "serviceName": "entitlement-service",
            "serviceStateName": "ENT_CANCELLED",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "1d605f2d-e605-47d5-b55c-904a0cba12f8",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "STOP_BILLING",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "billing-service",
            "serviceStateName": "STOP_BILLING",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          },
          {
            "eventId": "e9f343aa-3650-4709-a09d-8a3df908bd47",
            "billingPeriod": "MONTHLY",
            "effectiveDate": "2018-07-19",
            "plan": "standard-monthly",
            "product": "Standard",
            "priceList": "DEFAULT",
            "eventType": "SERVICE_STATE_CHANGE",
            "isBlockedBilling": false,
            "isBlockedEntitlement": false,
            "serviceName": "ServiceStateService",
            "serviceStateName": "STATE1",
            "phase": "standard-monthly-trial",
            "auditLogs": []
          }
        ],
        "priceOverrides": null,
        "prices": [],
        "auditLogs": []
      }
    ],
    "timeline": {
      "accountId": "2ad52f53-85ae-408a-9879-32a7e59dd03d",
      "bundleId": "2cd2f4b5-a1c0-42a7-924f-64c7b791332d",
      "externalKey": "another_external_key",
      "events": [
        {
          "eventId": "3961e5a4-815c-4e95-aca6-2f3e76c37942",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_STARTED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "8e7a6a7d-7660-49e3-979c-a4a0b6ec6804",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-18",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "START_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "START_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "01387e92-8b6c-4c74-811f-3d2698646049",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "STOP_ENTITLEMENT",
          "isBlockedBilling": false,
          "isBlockedEntitlement": true,
          "serviceName": "entitlement-service",
          "serviceStateName": "ENT_CANCELLED",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "1d605f2d-e605-47d5-b55c-904a0cba12f8",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "STOP_BILLING",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "billing-service",
          "serviceStateName": "STOP_BILLING",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        },
        {
          "eventId": "e9f343aa-3650-4709-a09d-8a3df908bd47",
          "billingPeriod": "MONTHLY",
          "effectiveDate": "2018-07-19",
          "plan": "standard-monthly",
          "product": "Standard",
          "priceList": "DEFAULT",
          "eventType": "SERVICE_STATE_CHANGE",
          "isBlockedBilling": false,
          "isBlockedEntitlement": false,
          "serviceName": "ServiceStateService",
          "serviceStateName": "STATE1",
          "phase": "standard-monthly-trial",
          "auditLogs": []
        }
      ],
      "auditLogs": []
    },
    "auditLogs": []
  }
]
```
```java
//First element of the list
class Bundle {
    org.killbill.billing.client.model.gen.Bundle@6c335adf
    accountId: 132f0ce0-b3ae-4e49-90fd-b265ae8515b6
    bundleId: 23a23ae2-5b41-4b88-a731-98cb6f6f3f21
    externalKey: 93199
    subscriptions: [class Subscription {
        org.killbill.billing.client.model.gen.Subscription@30aa99f
        accountId: 132f0ce0-b3ae-4e49-90fd-b265ae8515b6
        bundleId: 23a23ae2-5b41-4b88-a731-98cb6f6f3f21
        subscriptionId: bc39131f-538d-406c-96f2-38db68dd328a
        externalKey: 93199
        startDate: 2012-04-25
        productName: Shotgun
        productCategory: BASE
        billingPeriod: MONTHLY
        phaseType: TRIAL
        priceList: DEFAULT
        planName: shotgun-monthly
        state: ACTIVE
        sourceType: NATIVE
        cancelledDate: null
        chargedThroughDate: 2012-04-25
        billingStartDate: 2012-04-25
        billingEndDate: null
        billCycleDayLocal: 25
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@850eec8c
            eventId: 03b54e77-da03-4efb-823c-03d4a42557f4
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@c9d2600
            eventId: 81afc2cd-ac13-4b48-86c9-920443291ff7
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@e7c34c4e
            eventId: 0bd9e27d-50fe-4144-9b52-01a0964d2306
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        priceOverrides: []
        auditLogs: []
    }]
    timeline: class BundleTimeline {
        org.killbill.billing.client.model.gen.BundleTimeline@92a9f4c7
        accountId: 132f0ce0-b3ae-4e49-90fd-b265ae8515b6
        bundleId: 23a23ae2-5b41-4b88-a731-98cb6f6f3f21
        externalKey: 93199
        events: [class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@9fa4b25a
            eventId: 03b54e77-da03-4efb-823c-03d4a42557f4
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_ENTITLEMENT
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement-service
            serviceStateName: ENT_STARTED
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@77fd66a
            eventId: 81afc2cd-ac13-4b48-86c9-920443291ff7
            billingPeriod: MONTHLY
            effectiveDate: 2012-04-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: START_BILLING
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: billing-service
            serviceStateName: START_BILLING
            phase: shotgun-monthly-trial
            auditLogs: []
        }, class EventSubscription {
            org.killbill.billing.client.model.gen.EventSubscription@b5670810
            eventId: 0bd9e27d-50fe-4144-9b52-01a0964d2306
            billingPeriod: MONTHLY
            effectiveDate: 2012-05-25
            plan: shotgun-monthly
            product: Shotgun
            priceList: DEFAULT
            eventType: PHASE
            isBlockedBilling: false
            isBlockedEntitlement: false
            serviceName: entitlement+billing-service
            serviceStateName: PHASE
            phase: shotgun-monthly-evergreen
            auditLogs: []
        }]
        auditLogs: []
    }
    auditLogs: []
}
```
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