# Catalog

## Catalog Resource

The `Catalog` is at the heart of the billing system. It is a data model that captures the core configuration of the billing system. 


## Retrieve the catalog as JSON or XML

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
format = 'xml'
requested_date = nil

KillBillClient::Model::Catalog.get_tenant_catalog(format,
                                                  requested_date,
                                                  options)
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


**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **requestedDate** | string | false | requested date |

**Returns**

Returns a catalog in the selected format.

## Upload the full catalog as XML

**HTTP Request** 

`POST http://example.com/1.0/kb/catalog`

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

> Example Response:

```ruby
#This is what we get when we do a get_tenant_catalog(format, requested_date, options)
```


**Query Parameters**

None.

**Returns**

A `200` http status without content.

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
base_product_name = 'base_product_example'
KillBillClient::Model::Catalog.available_addons(base_product_name, 
                                                options)
```

> Example Response:

```ruby
[
  {
    "product": "string",
    "plan": "string",
    "priceList": "string",
    "finalPhaseBillingPeriod": "DAILY",
    "finalPhaseRecurringPrice": [
      {
        "currency": "string",
        "value": 0
      }
    ]
  }
]
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

> Example Response:

```ruby
[
  {
    "product": "string",
    "plan": "string",
    "priceList": "string",
    "finalPhaseBillingPeriod": "DAILY",
    "finalPhaseRecurringPrice": [
      {
        "currency": "string",
        "value": 0
      }
    ]
  }
]
```


**Query Parameters**

None.

**Returns**

Returns a list with the available base plans.

## Upload a simple plan as JSON

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

> Example Response:

```ruby
no content
```


**Query Parameters**

None.

**Returns**

A `200` http status without content.