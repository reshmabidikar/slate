# Catalog

## Catalog Resource

The `Catalog` is at the heart of the billing system, it captures the core configuration of the billing system. At a very high level, configuring the catalog is about defining the inventory available:

* **`Products`** : List of products available - e.g *Gold* product.
* **`Plans`** : List of plans available for each product - e.g *gold-monthly*, monthly subscription for the *Gold* product.

In practice, Kill Bill offers a powerful configuration, which goes beyond the definition of the inventory and includes rules for customizing the invoice generation. Please refer to our [Billing Manual](http://docs.killbill.io/latest/userguide_subscription.html#components-catalog) for more details.

Also, it is important to understand that the catalog is versionned to provide the ability to deprecate old products, add new ones, or change prices for existing products. The catalog configuration is stored on a per tenant basis, meaning that 2 tenants may have completely different catalogs.


In terms of api, we offer basic CRUD operations, where catalog (versions) are fetched/uploaded using XML. We also offer the ability to retrieve JSON, and have  also added support to modify a given catalog version to add new plans - so called *simple plan* - mostly to easy the testing, and provide an easy way to play with the system - KAUI, our admin UI provides a nice integration for that purpose.

##  Delete all versions for a per tenant catalog

**HTTP Request** 

`DELETE http://example.com/1.0/kb/catalog`

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
catalogApi = killbill.api.CatalogApi()
        
catalogApi.delete_catalog(created_by, api_key, api_secret)
```
> Example Response:

```ruby
**TODO**
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `200` http status without content.

## Retrieve the catalog as JSON

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_json(api_key, api_secret)
```
> Example Response:

```ruby
**TODO**
```
```python
[{'currencies': ['USD', 'GBP'],
 'effective_date': datetime.datetime(2013, 2, 8, 0, 0, tzinfo=tzutc()),
 'name': 'SpyCarBasic',
 'price_lists': [{'name': 'DEFAULT',
                  'plans': ['sports-monthly',
                            'standard-monthly',
                            'super-monthly']}],
 'products': [{'available': [],
               'included': [],
               'name': 'Super',
               'plans': [{'billing_period': 'MONTHLY',
                          'name': 'super-monthly',
                          'phases': [{'duration': {'number': 30,
                                                   'unit': 'DAYS'},
                                      'fixed_prices': [],
                                      'prices': [],
                                      'type': 'TRIAL',
                                      'usages': []},
                                     {'duration': {'number': -1,
                                                   'unit': 'UNLIMITED'},
                                      'fixed_prices': [],
                                      'prices': [{'currency': 'GBP',
                                                  'value': 750.0},
                                                 {'currency': 'USD',
                                                  'value': 1000.0}],
                                      'type': 'EVERGREEN',
                                      'usages': []}],
                          'pretty_name': 'super-monthly'}],
               'pretty_name': 'Super',
               'type': 'BASE'},
              {'available': [],
               'included': [],
               'name': 'Standard',
               'plans': [{'billing_period': 'MONTHLY',
                          'name': 'standard-monthly',
                          'phases': [{'duration': {'number': 30,
                                                   'unit': 'DAYS'},
                                      'fixed_prices': [],
                                      'prices': [],
                                      'type': 'TRIAL',
                                      'usages': []},
                                     {'duration': {'number': -1,
                                                   'unit': 'UNLIMITED'},
                                      'fixed_prices': [],
                                      'prices': [{'currency': 'GBP',
                                                  'value': 75.0},
                                                 {'currency': 'USD',
                                                  'value': 100.0}],
                                      'type': 'EVERGREEN',
                                      'usages': []}],
                          'pretty_name': 'standard-monthly'}],
               'pretty_name': 'Standard',
               'type': 'BASE'},
              {'available': [],
               'included': [],
               'name': 'Sports',
               'plans': [{'billing_period': 'MONTHLY',
                          'name': 'sports-monthly',
                          'phases': [{'duration': {'number': 30,
                                                   'unit': 'DAYS'},
                                      'fixed_prices': [],
                                      'prices': [],
                                      'type': 'TRIAL',
                                      'usages': []},
                                     {'duration': {'number': -1,
                                                   'unit': 'UNLIMITED'},
                                      'fixed_prices': [],
                                      'prices': [{'currency': 'GBP',
                                                  'value': 375.0},
                                                 {'currency': 'USD',
                                                  'value': 500.0}],
                                      'type': 'EVERGREEN',
                                      'usages': []}],
                          'pretty_name': 'sports-monthly'}],
               'pretty_name': 'Sports',
               'type': 'BASE'}],
 'units': []}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a catalog in JSON format.

## Retrieve available add-ons for a given product

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/availableAddons`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
base_product_name = 'Basic'
KillBillClient::Model::Catalog.available_addons(base_product_name, 
                                                options)
```

```python
catalogApi = killbill.api.CatalogApi()
        
catalogApi.get_available_addons(api_key, 
                                api_secret, 
                                base_product_name='Basic')
```
> Example Response:

```ruby
[
   {
      "product":"Basic",
      "plan":"basic-annual",
      "finalPhaseBillingPeriod":"ANNUAL",
      "priceList":"DEFAULT",
      "finalPhaseRecurringPrice":[
         {
            "currency":"USD",
            "value":10000.0
         }
      ]
   }
]
```
```python
[{'product': 'Basic',
  'plan': 'basic-annual',
  'final_phase_billing_period': 'ANNUAL',
  'price_list': 'DEFAULT',
  'final_phase_recurring_price':[{'currency': 'USD',
                                  'value': 10000.0}]
}]
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **baseProductName** | string | true | base product name |
| **priceListName** | string | true | price list name |

**Returns**

Returns a list with add-ons for a product.

## Retrieve available base plans

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/availableBasePlans`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
KillBillClient::Model::Catalog.available_base_plans(options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_available_base_plans(api_key, api_secret)
```

> Example Response:

```ruby
[
   {
      "product":"Basic",
      "plan":"basic-annual",
      "finalPhaseBillingPeriod":"ANNUAL",
      "priceList":"DEFAULT",
      "finalPhaseRecurringPrice":[
         {
            "currency":"USD",
            "value":10000.0
         }
      ]
   },
   {
      "product":"Basic",
      "plan":"basic-monthly",
      "finalPhaseBillingPeriod":"MONTHLY",
      "priceList":"DEFAULT",
      "finalPhaseRecurringPrice":[
         {
            "currency":"USD",
            "value":1000.0
         }
      ]
   }
]
```
```python
[{'final_phase_billing_period': 'MONTHLY',
 'final_phase_recurring_price': [{'currency': 'GBP', 'value': 375.0},
                                 {'currency': 'USD', 'value': 500.0}],
 'plan': 'sports-monthly',
 'price_list': 'DEFAULT',
 'product': 'Sports'}, {'final_phase_billing_period': 'MONTHLY',
 'final_phase_recurring_price': [{'currency': 'GBP', 'value': 75.0},
                                 {'currency': 'USD', 'value': 100.0}],
 'plan': 'standard-monthly',
 'price_list': 'DEFAULT',
 'product': 'Standard'}, {'final_phase_billing_period': 'MONTHLY',
 'final_phase_recurring_price': [{'currency': 'GBP', 'value': 750.0},
                                 {'currency': 'USD', 'value': 1000.0}],
 'plan': 'super-monthly',
 'price_list': 'DEFAULT',
 'product': 'Super'}]
```

**Query Parameters**

None.

**Returns**

Returns a list with the available base plans.

## Retrieve phase for a given subscription and date

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/phase`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_phase_for_subscription_and_date(api_key, 
                                               api_secret, 
                                               subscription_id=subscription_id)
```

> Example Response:

```ruby
**TODO**
```
```python
{'duration': {'number': 30, 'unit': 'DAYS'},
 'fixed_prices': [],
 'prices': [],
 'type': 'TRIAL',
 'usages': []}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **subscriptionId** | string | true | subscription id |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a list with phase info.

## Retrieve plan for a given subscription and date

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/plan`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_plan_for_subscription_and_date(api_key, 
                                              api_secret, 
                                              subscription_id=subscription_id)
```

> Example Response:

```ruby
**TODO**
```
```python
{'billing_period': 'MONTHLY',
 'name': 'standard-monthly',
 'phases': [{'duration': {'number': 30, 'unit': 'DAYS'},
             'fixed_prices': [],
             'prices': [],
             'type': 'TRIAL',
             'usages': []},
            {'duration': {'number': -1, 'unit': 'UNLIMITED'},
             'fixed_prices': [],
             'prices': [{'currency': 'GBP', 'value': 75.0},
                        {'currency': 'USD', 'value': 100.0}],
             'type': 'EVERGREEN',
             'usages': []}],
 'pretty_name': 'standard-monthly'}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **subscriptionId** | string | true | subscription id |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a list with plan info.

## Retrieve priceList for a given subscription and date

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/priceList`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_price_list_for_subscription_and_date(api_key, 
                                                    api_secret, 
                                                    subscription_id=subscription_id)
```

> Example Response:

```ruby
**TODO**
```
```python
{'name': 'DEFAULT',
 'plans': ['sports-monthly', 'standard-monthly', 'super-monthly']}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **subscriptionId** | string | true | subscription id |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a price list.

## Retrieve product for a given subscription and date

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/product`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_product_for_subscription_and_date(api_key, 
                                                 api_secret, 
                                                 subscription_id=subscription_id)
```

> Example Response:

```ruby
**TODO**
```
```python
{'available': [],
 'included': [],
 'name': 'Standard',
 'plans': [],
 'pretty_name': 'Standard',
 'type': 'BASE'}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **subscriptionId** | string | true | subscription id |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a list with the product info.

## Add a simple plan entry in the current version of the catalog

**HTTP Request** 

`POST http://example.com/1.0/kb/catalog/simplePlan`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
simple_plan                  = KillBillClient::Model::SimplePlanAttributes.new
simple_plan.plan_id          = 'basic-annual'
simple_plan.product_name     = 'Basic'
simple_plan.product_category = 'BASE'
simple_plan.currency         = 'USD'
simple_plan.amount           = 10000.00
simple_plan.billing_period   = 'ANNUAL'
simple_plan.trial_length     = 0
simple_plan.trial_time_unit  = 'UNLIMITED'

KillBillClient::Model::Catalog.add_tenant_catalog_simple_plan(simple_plan,
                                                              user,
                                                              reason,
                                                              comment,
                                                              options)
```
```python
catalogApi = killbill.api.CatalogApi()
body = SimplePlan(plan_id='basic-annual',
                  product_name='Basic',
                  product_category='BASE',
                  currency='USD',
                  amount=10000.00,
                  billing_period='ANNUAL',
                  trial_length=0,
                  trial_time_unit='UNLIMITED')
                  
catalogApi.add_simple_plan(body, created_by, api_key, api_secret)
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

##  Retrieve a list of catalog versions

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/versions`

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
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_versions(api_key, api_secret)
```

> Example Response:

```ruby
**TODO**
```
```python
[datetime.datetime(2013, 2, 8, 0, 0, tzinfo=tzutc())]
```

**Query Parameters**

None.

**Returns**

Returns a list with the available catalog versions.

## Retrieve the catalog as XML

**HTTP Request** 

`GET http://example.com/1.0/kb/catalog/xml`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
format = 'xml'
requested_date = nil

KillBillClient::Model::Catalog.get_tenant_catalog(format,
                                                  requested_date,
                                                  options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_xml(api_key, api_secret)
```
> Example Response:

```ruby
<?xml version="1.0" encoding="UTF-8"?>
<catalogs>
   <versions>
      <version>
         <effectiveDate>2013-02-08T00:00:00Z</effectiveDate>
         <catalogName>Movies</catalogName>
         <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
         <currencies>
            <currency>USD</currency>
         </currencies>
         <units />
         <products>
            <product name="Basic">
               <category>BASE</category>
               <included />
               <available />
               <limits />
            </product>
         </products>
         <rules>
            <changePolicy>
               <changePolicyCase>
                  <policy>END_OF_TERM</policy>
               </changePolicyCase>
            </changePolicy>
            <changeAlignment>
               <changeAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </changeAlignmentCase>
            </changeAlignment>
            <cancelPolicy>
               <cancelPolicyCase>
                  <productCategory>BASE</productCategory>
                  <policy>END_OF_TERM</policy>
               </cancelPolicyCase>
               <cancelPolicyCase>
                  <policy>IMMEDIATE</policy>
               </cancelPolicyCase>
            </cancelPolicy>
            <createAlignment>
               <createAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </createAlignmentCase>
            </createAlignment>
            <billingAlignment>
               <billingAlignmentCase>
                  <alignment>ACCOUNT</alignment>
               </billingAlignmentCase>
            </billingAlignment>
            <priceList>
               <priceListCase>
                  <toPriceList>DEFAULT</toPriceList>
               </priceListCase>
            </priceList>
         </rules>
         <plans>
            <plan name="basic-monthly">
               <product>Basic</product>
               <initialPhases />
               <finalPhase type="EVERGREEN">
                  <duration>
                     <unit>UNLIMITED</unit>
                     <number>-1</number>
                  </duration>
                  <recurring>
                     <billingPeriod>MONTHLY</billingPeriod>
                     <recurringPrice>
                        <price>
                           <currency>USD</currency>
                           <value>1000.00</value>
                        </price>
                     </recurringPrice>
                  </recurring>
                  <usages />
               </finalPhase>
               <plansAllowedInBundle>-1</plansAllowedInBundle>
            </plan>
         </plans>
         <priceLists>
            <defaultPriceList name="DEFAULT">
               <plans>
                  <plan>basic-monthly</plan>
               </plans>
            </defaultPriceList>
         </priceLists>
      </version>
      <version>
         <effectiveDate>2013-02-08T00:00:01Z</effectiveDate>
         <catalogName>Movies</catalogName>
         <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
         <currencies>
            <currency>USD</currency>
         </currencies>
         <units />
         <products>
            <product name="Basic">
               <category>BASE</category>
               <included />
               <available />
               <limits />
            </product>
         </products>
         <rules>
            <changePolicy>
               <changePolicyCase>
                  <policy>END_OF_TERM</policy>
               </changePolicyCase>
            </changePolicy>
            <changeAlignment>
               <changeAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </changeAlignmentCase>
            </changeAlignment>
            <cancelPolicy>
               <cancelPolicyCase>
                  <productCategory>BASE</productCategory>
                  <policy>END_OF_TERM</policy>
               </cancelPolicyCase>
               <cancelPolicyCase>
                  <policy>IMMEDIATE</policy>
               </cancelPolicyCase>
            </cancelPolicy>
            <createAlignment>
               <createAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </createAlignmentCase>
            </createAlignment>
            <billingAlignment>
               <billingAlignmentCase>
                  <alignment>ACCOUNT</alignment>
               </billingAlignmentCase>
            </billingAlignment>
            <priceList>
               <priceListCase>
                  <toPriceList>DEFAULT</toPriceList>
               </priceListCase>
            </priceList>
         </rules>
         <plans>
            <plan name="basic-monthly">
               <product>Basic</product>
               <initialPhases>
                  <phase type="TRIAL">
                     <duration>
                        <unit>DAYS</unit>
                        <number>30</number>
                     </duration>
                     <fixed type="ONE_TIME">
                        <fixedPrice />
                     </fixed>
                     <usages />
                  </phase>
               </initialPhases>
               <finalPhase type="EVERGREEN">
                  <duration>
                     <unit>UNLIMITED</unit>
                     <number>-1</number>
                  </duration>
                  <recurring>
                     <billingPeriod>MONTHLY</billingPeriod>
                     <recurringPrice>
                        <price>
                           <currency>USD</currency>
                           <value>1000.00</value>
                        </price>
                     </recurringPrice>
                  </recurring>
                  <usages />
               </finalPhase>
               <plansAllowedInBundle>-1</plansAllowedInBundle>
            </plan>
         </plans>
         <priceLists>
            <defaultPriceList name="DEFAULT">
               <plans>
                  <plan>basic-monthly</plan>
               </plans>
            </defaultPriceList>
         </priceLists>
      </version>
   </versions>
   <catalogName>Movies</catalogName>
   <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
</catalogs>
```
```python
<?xml version="1.0" encoding="UTF-8"?>
<catalogs>
   <versions>
      <version>
         <effectiveDate>2013-02-08T00:00:00Z</effectiveDate>
         <catalogName>Movies</catalogName>
         <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
         <currencies>
            <currency>USD</currency>
         </currencies>
         <units />
         <products>
            <product name="Basic">
               <category>BASE</category>
               <included />
               <available />
               <limits />
            </product>
         </products>
         <rules>
            <changePolicy>
               <changePolicyCase>
                  <policy>END_OF_TERM</policy>
               </changePolicyCase>
            </changePolicy>
            <changeAlignment>
               <changeAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </changeAlignmentCase>
            </changeAlignment>
            <cancelPolicy>
               <cancelPolicyCase>
                  <productCategory>BASE</productCategory>
                  <policy>END_OF_TERM</policy>
               </cancelPolicyCase>
               <cancelPolicyCase>
                  <policy>IMMEDIATE</policy>
               </cancelPolicyCase>
            </cancelPolicy>
            <createAlignment>
               <createAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </createAlignmentCase>
            </createAlignment>
            <billingAlignment>
               <billingAlignmentCase>
                  <alignment>ACCOUNT</alignment>
               </billingAlignmentCase>
            </billingAlignment>
            <priceList>
               <priceListCase>
                  <toPriceList>DEFAULT</toPriceList>
               </priceListCase>
            </priceList>
         </rules>
         <plans>
            <plan name="basic-monthly">
               <product>Basic</product>
               <initialPhases />
               <finalPhase type="EVERGREEN">
                  <duration>
                     <unit>UNLIMITED</unit>
                     <number>-1</number>
                  </duration>
                  <recurring>
                     <billingPeriod>MONTHLY</billingPeriod>
                     <recurringPrice>
                        <price>
                           <currency>USD</currency>
                           <value>1000.00</value>
                        </price>
                     </recurringPrice>
                  </recurring>
                  <usages />
               </finalPhase>
               <plansAllowedInBundle>-1</plansAllowedInBundle>
            </plan>
         </plans>
         <priceLists>
            <defaultPriceList name="DEFAULT">
               <plans>
                  <plan>basic-monthly</plan>
               </plans>
            </defaultPriceList>
         </priceLists>
      </version>
      <version>
         <effectiveDate>2013-02-08T00:00:01Z</effectiveDate>
         <catalogName>Movies</catalogName>
         <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
         <currencies>
            <currency>USD</currency>
         </currencies>
         <units />
         <products>
            <product name="Basic">
               <category>BASE</category>
               <included />
               <available />
               <limits />
            </product>
         </products>
         <rules>
            <changePolicy>
               <changePolicyCase>
                  <policy>END_OF_TERM</policy>
               </changePolicyCase>
            </changePolicy>
            <changeAlignment>
               <changeAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </changeAlignmentCase>
            </changeAlignment>
            <cancelPolicy>
               <cancelPolicyCase>
                  <productCategory>BASE</productCategory>
                  <policy>END_OF_TERM</policy>
               </cancelPolicyCase>
               <cancelPolicyCase>
                  <policy>IMMEDIATE</policy>
               </cancelPolicyCase>
            </cancelPolicy>
            <createAlignment>
               <createAlignmentCase>
                  <alignment>START_OF_BUNDLE</alignment>
               </createAlignmentCase>
            </createAlignment>
            <billingAlignment>
               <billingAlignmentCase>
                  <alignment>ACCOUNT</alignment>
               </billingAlignmentCase>
            </billingAlignment>
            <priceList>
               <priceListCase>
                  <toPriceList>DEFAULT</toPriceList>
               </priceListCase>
            </priceList>
         </rules>
         <plans>
            <plan name="basic-monthly">
               <product>Basic</product>
               <initialPhases>
                  <phase type="TRIAL">
                     <duration>
                        <unit>DAYS</unit>
                        <number>30</number>
                     </duration>
                     <fixed type="ONE_TIME">
                        <fixedPrice />
                     </fixed>
                     <usages />
                  </phase>
               </initialPhases>
               <finalPhase type="EVERGREEN">
                  <duration>
                     <unit>UNLIMITED</unit>
                     <number>-1</number>
                  </duration>
                  <recurring>
                     <billingPeriod>MONTHLY</billingPeriod>
                     <recurringPrice>
                        <price>
                           <currency>USD</currency>
                           <value>1000.00</value>
                        </price>
                     </recurringPrice>
                  </recurring>
                  <usages />
               </finalPhase>
               <plansAllowedInBundle>-1</plansAllowedInBundle>
            </plan>
         </plans>
         <priceLists>
            <defaultPriceList name="DEFAULT">
               <plans>
                  <plan>basic-monthly</plan>
               </plans>
            </defaultPriceList>
         </priceLists>
      </version>
   </versions>
   <catalogName>Movies</catalogName>
   <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
</catalogs>
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a catalog in XML format.

## Upload the full catalog as XML

**HTTP Request** 

`POST http://example.com/1.0/kb/catalog/xml`

> Example Request:

```shell
TODO	
```

```java
TODO
```

```ruby
catalog_file_xml = resource_file.read
KillBillClient::Model::Catalog.upload_tenant_catalog(catalog_file_xml, 
                                                     user,
                                                     reason,
                                                     comment,
                                                     options)
```

```python
catalogApi = killbill.api.CatalogApi()
xml_catalog = open("../resources/SpyCarBasic.xml", "r+").read()

catalogApi.upload_catalog_xml(xml_catalog, 
                              created_by, 
                              api_key, 
                              api_secret)
```
> Example Response:

```ruby
#This is what we get when we do a get_tenant_catalog(format, requested_date, options)
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A `200` http status without content.