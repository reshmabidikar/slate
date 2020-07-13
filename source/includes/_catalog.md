# Catalog

The `Catalog` is at the heart of the Kill Bill subscription and billing systems. It provides complete current information on products available, subscription plans, billing options, and much more. Each tenant has a single catalog, but different tenants may have completely different catalogs.

The catalog for a given tenant may be updated to new versions from time to time. This provides the ability to deprecate old products, add new ones, or change prices for existing products. Older versions remain available in case they are needed. If a new version is uploaded, existing subscriptions are still based on their original versions, but new subscriptions must use the new version.

KAUI, our admin UI, provides the ability to upload a *simple plan*. The *simple plan* provides a way to ease testing and to play with the system. .

A tenant has several options for setting up their catalog. you can choose the option that best meets your needs.

1. Use the default Kill Bill catalog unchanged. This is available to you automatically.
2. Use the default catalog, and add the *simple plan* or other new plans to it.
3. Write your own complete catalog as an XML file and upload it.
4. Write a custom Catalog plugin. This is only for advanced users with special needs.

For a full discussion of the KillBill catalog, see the [Catalog](https://docs.killbill.io/latest/userguide_subscription.html#components-catalog) section in the [Subscription Guide](https://docs.killbill.io/latest/userguide_subscription.html).

The `Catalog` API offers basic CRUD operations, allowing you to upload, retrieve and delete catalog versions. 


## Catalog Resource

At a very high level, the Catalog consists of the following main components:

* **`Products`** : List of products available - e.g *Gold* product.
* **`Plans`** : List of subscription plans available for each product - e.g *gold-monthly*, monthly subscription for the *Gold* product.
* **`Rules`** : Business rules for subscriptions - e.g. when certain changes should take effect.
* **`Price Lists`** : Lists of applicable Plans.

Full details about the elements of a Catalog are given in the links cited above. The Catalog is maintained as an XML file.


## Catalog

### Upload a catalog as XML

This endpoint uploads a complete catalog in XML format. This becomes the current version of the Catalog for this Tenant.

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/catalog/xml`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: text/xml" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><catalog> ...' \
    "http://127.0.0.1:8080/1.0/kb/catalog/xml"
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

String body = getResourceBodyString(catalog);

catalogApi.uploadCatalogXml(body, requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/catalog/xml
< Content-Type: text/xml
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

**Request Body**

Contains the complete catalog in XML format

**Query Parameters**

None.

**Response**

If successful, returns a status code of 201 and an empty body.



### Retrieve the catalog as XML

This endpoint retrieves the Catalog for a specified date in XML format. If there are multiple versions, the latest version with an effective date not later than the requested date is returned. If the effective date for all versions is greater than the requested date, the earliest version is returned.

For example, suppose there are two versions of the catalog, the current version dated 2020-01-01 (Jan. 1, 2020) and a previous version dated 2019-01-01. Then

* A request with no effective date would retrieve the current version
* A request with an effective date of 2020-01-01 or later would retrieve the current version
* A request with an effective date of 2019-01-01 or later, but before 2020-01-01, would retrieve the previous version
* A request with an effective date earlier than 2019-01-01 would retrieve the previous version, as it is the earliest version available.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/xml`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: text/xml" \
    "http://localhost:8080/1.0/kb/catalog/xml"	
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

LocalDate requestedDate = null;
UUID accountId = null;

String catalog = catalogApi.getCatalogXml(requestedDate, 
                                          accountId, 
                                          requestOptions);
```

```ruby
requested_date = nil

KillBillClient::Model::Catalog.get_tenant_catalog_xml(requested_date,
                                                      options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_xml(api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: text/xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <catalogs>
    <versions>
      <version>
        <effectiveDate>2013-02-08T00:00:00Z</effectiveDate>
        <catalogName>SpyCarBasic</catalogName>
        <currencies>
          <currency>USD</currency>
          <currency>GBP</currency>
        </currencies>
        <units/>
        <products>
          <product name="Basic" prettyName="Basic">
            <category>BASE</category>
            <included/>
            <available/>
            <limits/>
          </product>
          <product name="Sports" prettyName="Sports">
            <category>BASE</category>
            <included/>
            <available/>
            <limits/>
          </product>
          <product name="Standard" prettyName="Standard">
            <category>BASE</category>
            <included/>
            <available/>
            <limits/>
          </product>
          <product name="Super" prettyName="Super">
            <category>ADD_ON</category>
            <included/>
            <available/>
            <limits/>
          </product>
        </products>
        <rules>
          <changePolicy>
            <changePolicyCase>
              <policy>IMMEDIATE</policy>
            </changePolicyCase>
          </changePolicy>
          <changeAlignment>
            <changeAlignmentCase>
              <alignment>START_OF_BUNDLE</alignment>
            </changeAlignmentCase>
          </changeAlignment>
          <cancelPolicy>
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
          <plan name="basic-annual" prettyName="basic-annual">
            <product>Basic</product>
            <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
            <initialPhases/>
            <finalPhase type="EVERGREEN">
              <duration>
                <unit>UNLIMITED</unit>
                <number>-1</number>
              </duration>
              <recurring>
                <billingPeriod>ANNUAL</billingPeriod>
                <recurringPrice>
                  <price>
                    <currency>USD</currency>
                    <value>1000</value>
                  </price>
                </recurringPrice>
              </recurring>
              <usages/>
            </finalPhase>
            <plansAllowedInBundle>-1</plansAllowedInBundle>
          </plan>
          <plan name="sports-monthly" prettyName="sports-monthly">
            <product>Sports</product>
            <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
            <initialPhases>
              <phase type="TRIAL">
                <duration>
                  <unit>DAYS</unit>
                  <number>30</number>
                </duration>
                <fixed type="ONE_TIME">
                  <fixedPrice/>
                </fixed>
                <usages/>
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
                    <currency>GBP</currency>
                    <value>375.00</value>
                  </price>
                  <price>
                    <currency>USD</currency>
                    <value>500.00</value>
                  </price>
                </recurringPrice>
              </recurring>
              <usages/>
            </finalPhase>
            <plansAllowedInBundle>-1</plansAllowedInBundle>
          </plan>
          <plan name="standard-monthly" prettyName="standard-monthly">
            <product>Standard</product>
            <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
            <initialPhases>
              <phase type="TRIAL">
                <duration>
                  <unit>DAYS</unit>
                  <number>30</number>
                </duration>
                <fixed type="ONE_TIME">
                  <fixedPrice/>
                </fixed>
                <usages/>
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
                    <currency>GBP</currency>
                    <value>75.00</value>
                  </price>
                  <price>
                    <currency>USD</currency>
                    <value>100.00</value>
                  </price>
                </recurringPrice>
              </recurring>
              <usages/>
            </finalPhase>
            <plansAllowedInBundle>-1</plansAllowedInBundle>
          </plan>
          <plan name="super-monthly" prettyName="super-monthly">
            <product>Super</product>
            <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
            <initialPhases>
              <phase type="TRIAL">
                <duration>
                  <unit>DAYS</unit>
                  <number>30</number>
                </duration>
                <fixed type="ONE_TIME">
                  <fixedPrice/>
                </fixed>
                <usages/>
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
                    <currency>GBP</currency>
                    <value>750.00</value>
                  </price>
                  <price>
                    <currency>USD</currency>
                    <value>1000.00</value>
                  </price>
                </recurringPrice>
              </recurring>
              <usages/>
            </finalPhase>
            <plansAllowedInBundle>-1</plansAllowedInBundle>
          </plan>
        </plans>
        <priceLists>
          <defaultPriceList name="DEFAULT">
            <plans>
              <plan>basic-annual</plan>
              <plan>sports-monthly</plan>
              <plan>standard-monthly</plan>
              <plan>super-monthly</plan>
            </plans>
          </defaultPriceList>
        </priceLists>
      </version>
    </versions>
    <catalogName>SpyCarBasic</catalogName>
  </catalogs>
```
```java
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<catalogs>
    <versions>
        <version>
            <effectiveDate>2013-02-08T00:00:00Z</effectiveDate>
            <catalogName>SpyCarBasic</catalogName>
            <currencies>
                <currency>USD</currency>
                <currency>GBP</currency>
            </currencies>
            <units/>
            <products>
                <product name="Sports" prettyName="Sports">
                    <category>BASE</category>
                    <included/>
                    <available/>
                    <limits/>
                </product>
                <product name="Standard" prettyName="Standard">
                    <category>BASE</category>
                    <included/>
                    <available/>
                    <limits/>
                </product>
                <product name="Super" prettyName="Super">
                    <category>BASE</category>
                    <included/>
                    <available/>
                    <limits/>
                </product>
            </products>
            <rules>
                <changePolicy>
                    <changePolicyCase>
                        <policy>IMMEDIATE</policy>
                    </changePolicyCase>
                </changePolicy>
                <changeAlignment>
                    <changeAlignmentCase>
                        <alignment>START_OF_BUNDLE</alignment>
                    </changeAlignmentCase>
                </changeAlignment>
                <cancelPolicy>
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
                <plan name="sports-monthly" prettyName="sports-monthly">
                    <product>Sports</product>
                    <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
                    <initialPhases>
                        <phase type="TRIAL">
                            <duration>
<unit>DAYS</unit>
<number>30</number>
                            </duration>
                            <fixed type="ONE_TIME">
<fixedPrice/>
                            </fixed>
                            <usages/>
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
    <currency>GBP</currency>
    <value>375.00</value>
</price>
<price>
    <currency>USD</currency>
    <value>500.00</value>
</price>
                            </recurringPrice>
                        </recurring>
                        <usages/>
                    </finalPhase>
                    <plansAllowedInBundle>-1</plansAllowedInBundle>
                </plan>
                <plan name="standard-monthly" prettyName="standard-monthly">
                    <product>Standard</product>
                    <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
                    <initialPhases>
                        <phase type="TRIAL">
                            <duration>
<unit>DAYS</unit>
<number>30</number>
                            </duration>
                            <fixed type="ONE_TIME">
<fixedPrice/>
                            </fixed>
                            <usages/>
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
    <currency>GBP</currency>
    <value>75.00</value>
</price>
<price>
    <currency>USD</currency>
    <value>100.00</value>
</price>
                            </recurringPrice>
                        </recurring>
                        <usages/>
                    </finalPhase>
                    <plansAllowedInBundle>-1</plansAllowedInBundle>
                </plan>
                <plan name="super-monthly" prettyName="super-monthly">
                    <product>Super</product>
                    <recurringBillingMode>IN_ADVANCE</recurringBillingMode>
                    <initialPhases>
                        <phase type="TRIAL">
                            <duration>
<unit>DAYS</unit>
<number>30</number>
                            </duration>
                            <fixed type="ONE_TIME">
<fixedPrice/>
                            </fixed>
                            <usages/>
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
    <currency>GBP</currency>
    <value>750.00</value>
</price>
<price>
    <currency>USD</currency>
    <value>1000.00</value>
</price>
                            </recurringPrice>
                        </recurring>
                        <usages/>
                    </finalPhase>
                    <plansAllowedInBundle>-1</plansAllowedInBundle>
                </plan>
            </plans>
            <priceLists>
                <defaultPriceList name="DEFAULT">
                    <plans>
                        <plan>sports-monthly</plan>
                        <plan>standard-monthly</plan>
                        <plan>super-monthly</plan>
                    </plans>
                </defaultPriceList>
            </priceLists>
        </version>
    </versions>
    <catalogName>SpyCarBasic</catalogName>
</catalogs>

```
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **requestedDate** | string | false | current date | requested date |

**Response**

If successful, returns a status code of 200 and the catalog for the requested date in XML format.


### Retrieve the catalog as JSON

This endpoint retrieves the Catalog for a requested date in JSON format. If there are multiple versions, the latest version with an effective date not later than the requested date is returned. If the effective date for all versions is greater than the requested date, the earliest version is returned. See the previous endpoint for examples.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog"	
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

DateTime requestedDate = null;
UUID accountId = null;

Catalogs catalogsJson = catalogApi.getCatalogJson(requestedDate, 
                                                  accountId, 
                                                  requestOptions);
```

```ruby
requested_date = nil

KillBillClient::Model::Catalog.get_tenant_catalog_json.(requested_date, 
                                                        options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_json(api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "name": "SpyCarBasic",
    "effectiveDate": "2013-02-08T00:00:00.000+0000",
    "currencies": [
      "USD",
      "GBP"
    ],
    "units": [],
    "products": [
      {
        "type": "ADD_ON",
        "name": "Super",
        "prettyName": "Super",
        "plans": [
          {
            "name": "super-monthly",
            "prettyName": "super-monthly",
            "billingPeriod": "MONTHLY",
            "phases": [
              {
                "type": "TRIAL",
                "prices": [],
                "fixedPrices": [],
                "duration": {
                  "unit": "DAYS",
                  "number": 30
                },
                "usages": []
              },
              {
                "type": "EVERGREEN",
                "prices": [
                  {
                    "currency": "GBP",
                    "value": 750
                  },
                  {
                    "currency": "USD",
                    "value": 1000
                  }
                ],
                "fixedPrices": [],
                "duration": {
                  "unit": "UNLIMITED",
                  "number": -1
                },
                "usages": []
              }
            ]
          }
        ],
        "included": [],
        "available": []
      },
      {
        "type": "BASE",
        "name": "Standard",
        "prettyName": "Standard",
        "plans": [
          {
            "name": "standard-monthly",
            "prettyName": "standard-monthly",
            "billingPeriod": "MONTHLY",
            "phases": [
              {
                "type": "TRIAL",
                "prices": [],
                "fixedPrices": [],
                "duration": {
                  "unit": "DAYS",
                  "number": 30
                },
                "usages": []
              },
              {
                "type": "EVERGREEN",
                "prices": [
                  {
                    "currency": "GBP",
                    "value": 75
                  },
                  {
                    "currency": "USD",
                    "value": 100
                  }
                ],
                "fixedPrices": [],
                "duration": {
                  "unit": "UNLIMITED",
                  "number": -1
                },
                "usages": []
              }
            ]
          }
        ],
        "included": [],
        "available": []
      },
      {
        "type": "BASE",
        "name": "Sports",
        "prettyName": "Sports",
        "plans": [
          {
            "name": "sports-monthly",
            "prettyName": "sports-monthly",
            "billingPeriod": "MONTHLY",
            "phases": [
              {
                "type": "TRIAL",
                "prices": [],
                "fixedPrices": [],
                "duration": {
                  "unit": "DAYS",
                  "number": 30
                },
                "usages": []
              },
              {
                "type": "EVERGREEN",
                "prices": [
                  {
                    "currency": "GBP",
                    "value": 375
                  },
                  {
                    "currency": "USD",
                    "value": 500
                  }
                ],
                "fixedPrices": [],
                "duration": {
                  "unit": "UNLIMITED",
                  "number": -1
                },
                "usages": []
              }
            ]
          }
        ],
        "included": [],
        "available": []
      }
    ],
    "priceLists": [
      {
        "name": "DEFAULT",
        "plans": [
          "sports-monthly",
          "standard-monthly",
          "super-monthly"
        ]
      }
    ]
  }
]
```
```java
class Catalog {
    name: Firearms
    effectiveDate: 2011-01-01T00:00:00.000Z
    currencies: [USD, EUR, GBP]
    units: [class Unit {
        name: bullets
        prettyName: bullets
    }, class Unit {
        name: stones
        prettyName: stones
    }]
    products: [class Product {
        type: BASE
        name: Assault-Rifle
        prettyName: Assault-Rifle
        plans: [class Plan {
            name: assault-rifle-annual
            prettyName: assault-rifle-annual
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 5999.95
                }, class Price {
                    currency: EUR
                    value: 3499.95
                }, class Price {
                    currency: GBP
                    value: 3999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: assault-rifle-annual-gunclub-discount
            prettyName: assault-rifle-annual-gunclub-discount
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 99.95
                }, class Price {
                    currency: EUR
                    value: 99.95
                }, class Price {
                    currency: GBP
                    value: 99.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 6
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 5999.95
                }, class Price {
                    currency: EUR
                    value: 3499.95
                }, class Price {
                    currency: GBP
                    value: 3999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: assault-rifle-annual-rescue
            prettyName: assault-rifle-annual-rescue
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 5999.95
                }, class Price {
                    currency: EUR
                    value: 3499.95
                }, class Price {
                    currency: GBP
                    value: 3999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: YEARS
                    number: 1
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 5999.95
                }, class Price {
                    currency: EUR
                    value: 3499.95
                }, class Price {
                    currency: GBP
                    value: 3999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: assault-rifle-monthly
            prettyName: assault-rifle-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 599.95
                }, class Price {
                    currency: EUR
                    value: 349.95
                }, class Price {
                    currency: GBP
                    value: 399.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: [Cleaning, Telescopic-Scope]
        available: [Bullets, Laser-Scope]
    }, class Product {
        type: ADD_ON
        name: Holster
        prettyName: Holster
        plans: [class Plan {
            name: holster-monthly-regular
            prettyName: holster-monthly-regular
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: holster-monthly-special
            prettyName: holster-monthly-special
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: ADD_ON
        name: Refurbish-Maintenance
        prettyName: Refurbish-Maintenance
        plans: [class Plan {
            name: refurbish-maintenance
            prettyName: refurbish-maintenance
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: FIXEDTERM
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: [class Price {
                    currency: USD
                    value: 599.95
                }, class Price {
                    currency: EUR
                    value: 599.95
                }, class Price {
                    currency: GBP
                    value: 599.95
                }]
                duration: class Duration {
                    unit: MONTHS
                    number: 12
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: BASE
        name: Trebuchet
        prettyName: Trebuchet
        plans: [class Plan {
            name: trebuchet-usage-in-arrear
            prettyName: Trebuchet Monthly Plan
            billingPeriod: NO_BILLING_PERIOD
            phases: [class Phase {
                type: EVERGREEN
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: [class Usage {
                    billingPeriod: MONTHLY
                    tiers: [class Tier {
                        limits: [class Limit {
                            unit: stones
                            max: 100.0
                            min: -1.0
                        }]
                        fixedPrice: []
                        recurringPrice: [class Price {
                            currency: USD
                            value: 100
                        }]
                        blocks: []
                    }, class Tier {
                        limits: [class Limit {
                            unit: stones
                            max: -1.0
                            min: -1.0
                        }]
                        fixedPrice: []
                        recurringPrice: [class Price {
                            currency: USD
                            value: 1000
                        }]
                        blocks: []
                    }]
                }]
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: BASE
        name: Blowdart
        prettyName: Blowdart
        plans: [class Plan {
            name: blowdart-monthly
            prettyName: blowdart-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 9.95
                }, class Price {
                    currency: EUR
                    value: 9.95
                }, class Price {
                    currency: GBP
                    value: 9.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 6
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: GBP
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: blowdart-monthly-notrial
            prettyName: blowdart-monthly-notrial
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: GBP
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: blowdart-monthly-trial
            prettyName: blowdart-monthly-trial
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: GBP
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: ADD_ON
        name: Extra-Ammo
        prettyName: Extra-Ammo
        plans: [class Plan {
            name: extra-ammo-monthly
            prettyName: extra-ammo-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 999.95
                }, class Price {
                    currency: EUR
                    value: 499.95
                }, class Price {
                    currency: GBP
                    value: 999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: BASE
        name: Shotgun
        prettyName: Shotgun
        plans: [class Plan {
            name: shotgun-annual
            prettyName: shotgun-annual
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 2399.95
                }, class Price {
                    currency: EUR
                    value: 1499.95
                }, class Price {
                    currency: GBP
                    value: 1699.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: shotgun-annual-gunclub-discount
            prettyName: shotgun-annual-gunclub-discount
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 19.95
                }, class Price {
                    currency: EUR
                    value: 49.95
                }, class Price {
                    currency: GBP
                    value: 69.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 6
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 2399.95
                }, class Price {
                    currency: EUR
                    value: 1499.95
                }, class Price {
                    currency: GBP
                    value: 1699.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: shotgun-monthly
            prettyName: Shotgun Monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 249.95
                }, class Price {
                    currency: EUR
                    value: 149.95
                }, class Price {
                    currency: GBP
                    value: 169.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: [Cleaning]
        available: [Bullets, Holster, Laser-Scope, Telescopic-Scope]
    }, class Product {
        type: ADD_ON
        name: Cleaning
        prettyName: Cleaning
        plans: [class Plan {
            name: cleaning-monthly
            prettyName: cleaning-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 2.95
                }, class Price {
                    currency: EUR
                    value: 1.95
                }, class Price {
                    currency: GBP
                    value: 0.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: ADD_ON
        name: Laser-Scope
        prettyName: Laser-Scope
        plans: [class Plan {
            name: laser-scope-monthly
            prettyName: laser-scope-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 999.95
                }, class Price {
                    currency: EUR
                    value: 499.95
                }, class Price {
                    currency: GBP
                    value: 999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 1
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 1999.95
                }, class Price {
                    currency: EUR
                    value: 1499.95
                }, class Price {
                    currency: GBP
                    value: 1999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: STANDALONE
        name: Knife
        prettyName: Knife
        plans: [class Plan {
            name: knife-monthly-notrial
            prettyName: knife-monthly-notrial
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: GBP
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: BASE
        name: Pistol
        prettyName: Pistol
        plans: [class Plan {
            name: pistol-annual
            prettyName: pistol-annual
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-annual-gunclub-discount
            prettyName: pistol-annual-gunclub-discount
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 9.95
                }, class Price {
                    currency: EUR
                    value: 9.95
                }, class Price {
                    currency: GBP
                    value: 9.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 6
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-annual-gunclub-discount-notrial
            prettyName: pistol-annual-gunclub-discount-notrial
            billingPeriod: ANNUAL
            phases: [class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 9.95
                }, class Price {
                    currency: EUR
                    value: 9.95
                }, class Price {
                    currency: GBP
                    value: 9.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 6
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 199.95
                }, class Price {
                    currency: EUR
                    value: 199.95
                }, class Price {
                    currency: GBP
                    value: 199.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-monthly
            prettyName: pistol-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: GBP
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: USD
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-monthly-fixedterm
            prettyName: pistol-monthly-fixedterm
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: FIXEDTERM
                prices: [class Price {
                    currency: GBP
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: USD
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 12
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-monthly-notrial
            prettyName: pistol-monthly-notrial
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 19.95
                }, class Price {
                    currency: EUR
                    value: 19.95
                }, class Price {
                    currency: GBP
                    value: 19.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-quarterly
            prettyName: pistol-quarterly
            billingPeriod: QUARTERLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: GBP
                    value: 69.95
                }, class Price {
                    currency: EUR
                    value: 69.95
                }, class Price {
                    currency: USD
                    value: 69.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-thirty-days
            prettyName: pistol-thirty-days
            billingPeriod: THIRTY_DAYS
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: GBP
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: USD
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }, class Plan {
            name: pistol-weekly
            prettyName: pistol-weekly
            billingPeriod: WEEKLY
            phases: [class Phase {
                type: TRIAL
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: DAYS
                    number: 30
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: GBP
                    value: 29.95
                }, class Price {
                    currency: EUR
                    value: 29.95
                }, class Price {
                    currency: USD
                    value: 29.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: [Bullets, Cleaning, Refurbish-Maintenance]
    }, class Product {
        type: ADD_ON
        name: Bullets
        prettyName: Bullets
        plans: [class Plan {
            name: bullets-usage-in-arrear
            prettyName: Bullet Monthly Plan
            billingPeriod: NO_BILLING_PERIOD
            phases: [class Phase {
                type: EVERGREEN
                prices: []
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: [class Usage {
                    billingPeriod: MONTHLY
                    tiers: [class Tier {
                        limits: []
                        fixedPrice: []
                        recurringPrice: []
                        blocks: [class TieredBlock {
                            unit: bullets
                            size: 100.0
                            max: 10.0
                            prices: [class Price {
                                currency: USD
                                value: 2.95
                            }, class Price {
                                currency: EUR
                                value: 1.95
                            }, class Price {
                                currency: GBP
                                value: 0.95
                            }]
                        }]
                    }, class Tier {
                        limits: []
                        fixedPrice: []
                        recurringPrice: []
                        blocks: [class TieredBlock {
                            unit: bullets
                            size: 1000.0
                            max: 100.0
                            prices: [class Price {
                                currency: USD
                                value: 5.95
                            }, class Price {
                                currency: EUR
                                value: 4.95
                            }, class Price {
                                currency: GBP
                                value: 3.95
                            }]
                        }]
                    }]
                }]
            }]
        }]
        included: []
        available: []
    }, class Product {
        type: ADD_ON
        name: Telescopic-Scope
        prettyName: Telescopic-Scope
        plans: [class Plan {
            name: telescopic-scope-monthly
            prettyName: telescopic-scope-monthly
            billingPeriod: MONTHLY
            phases: [class Phase {
                type: DISCOUNT
                prices: [class Price {
                    currency: USD
                    value: 399.95
                }, class Price {
                    currency: EUR
                    value: 299.95
                }, class Price {
                    currency: GBP
                    value: 399.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: MONTHS
                    number: 1
                }
                usages: []
            }, class Phase {
                type: EVERGREEN
                prices: [class Price {
                    currency: USD
                    value: 999.95
                }, class Price {
                    currency: EUR
                    value: 499.95
                }, class Price {
                    currency: GBP
                    value: 999.95
                }]
                fixedPrices: []
                duration: class Duration {
                    unit: UNLIMITED
                    number: -1
                }
                usages: []
            }]
        }]
        included: []
        available: []
    }]
    priceLists: [class PriceList {
        name: DEFAULT
        plans: [assault-rifle-annual, assault-rifle-monthly, blowdart-monthly, bullets-usage-in-arrear, cleaning-monthly, extra-ammo-monthly, holster-monthly-regular, holster-monthly-special, laser-scope-monthly, pistol-annual, pistol-monthly, pistol-quarterly, pistol-thirty-days, pistol-weekly, refurbish-maintenance, shotgun-annual, shotgun-monthly, telescopic-scope-monthly, trebuchet-usage-in-arrear]
    }, class PriceList {
        name: gunclubDiscount
        plans: [assault-rifle-annual-gunclub-discount, pistol-annual-gunclub-discount, shotgun-annual-gunclub-discount]
    }, class PriceList {
        name: gunclubDiscountNoTrial
        plans: [pistol-annual-gunclub-discount-notrial]
    }, class PriceList {
        name: rescue
        plans: [assault-rifle-annual-rescue]
    }, class PriceList {
        name: fixedTerm
        plans: [pistol-monthly-fixedterm]
    }, class PriceList {
        name: notrial
        plans: [blowdart-monthly-notrial, knife-monthly-notrial, pistol-monthly-notrial]
    }, class PriceList {
        name: trial
        plans: [blowdart-monthly-trial]
    }]
}
```
```ruby
[
   {
      "name":"Movies",
      "effectiveDate":"2013-02-08T00:00:00.000+0000",
      "currencies":[
         "USD"
      ],
      "units":[

      ],
      "products":[
         {
            "type":"BASE",
            "name":"Basic",
            "prettyName":"Basic",
            "plans":[
               {
                  "name":"basic-monthly",
                  "prettyName":"basic-monthly",
                  "billingPeriod":"MONTHLY",
                  "phases":[
                     {
                        "type":"EVERGREEN",
                        "prices":[
                           {
                              "currency":"USD",
                              "value":1000.0
                           }
                        ],
                        "fixedPrices":[

                        ],
                        "duration":{
                           "unit":"UNLIMITED",
                           "number":-1
                        },
                        "usages":[

                        ]
                     }
                  ]
               }
            ],
            "included":[

            ],
            "available":[

            ]
         }
      ],
      "priceLists":[
         {
            "name":"DEFAULT",
            "plans":[
               "basic-monthly"
            ]
         }
      ]
   }
]
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **requestedDate** | string | false | current date | requested date |

**Response**

if successful, returns a status code of 200 and the full catalog for the requested date in JSON format.

### Retrieve a list of catalog versions

Return a list of the effective dates for all available catalogs versions for this tenant.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/versions`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/versions"
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

UUID accountId = null;

List<DateTime> versions = catalogApi.getCatalogVersions(accountId, requestOptions);
```

```ruby
KillBillClient::Model::Catalog.get_tenant_catalog_versions(options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_catalog_versions(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  "2013-02-08T00:00:00.000Z"
]
```
```java
2013-02-08T00:00:00.000Z
```
```ruby
["2013-02-08T00:00:00.000Z"]
```
```python
[datetime.datetime(2013, 2, 8, 0, 0, tzinfo=tzutc())]
```

**Query Parameters**

None.

**Response**

If successful, returns a status code of 200 and a comma-separated list of ISO date strings giving the effective date for each available catalog version.



### Retrieve available base plans

Returns a list of available base products and associated plans. Each object returned specifies a `product`, a `priceList`, a `plan`selected from the `pricelist`, and pricing information for the final phase of the plan.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/availableBasePlans`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/availableBasePlans"	
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

UUID accountId = null;

List<PlanDetail> basePlans = catalogApi.getAvailableBasePlans(accountId, requestOptions);
```

```ruby
KillBillClient::Model::Catalog.available_base_plans(options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_available_base_plans(api_key, api_secret)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

[
  {
    "product": "Sports",
    "plan": "sports-monthly",
    "priceList": "DEFAULT",
    "finalPhaseBillingPeriod": "MONTHLY",
    "finalPhaseRecurringPrice": [
      {
        "currency": "GBP",
        "value": 375
      },
      {
        "currency": "USD",
        "value": 500
      }
    ]
  },
  {
    "product": "Standard",
    "plan": "standard-monthly",
    "priceList": "DEFAULT",
    "finalPhaseBillingPeriod": "MONTHLY",
    "finalPhaseRecurringPrice": [
      {
        "currency": "GBP",
        "value": 75
      },
      {
        "currency": "USD",
        "value": 100
      }
    ]
  }
]
```
```java
//First element of the list
class PlanDetail {
    product: Assault-Rifle
    plan: assault-rifle-annual
    priceList: DEFAULT
    finalPhaseBillingPeriod: ANNUAL
    finalPhaseRecurringPrice: [class Price {
        currency: USD
        value: 5999.95
    }, class Price {
        currency: EUR
        value: 3499.95
    }, class Price {
        currency: GBP
        value: 3999.95
    }]
}
```
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

**Response**

If successful, returns a status code of 200 and a list of objects representing the available base products and plans.

### Retrieve available add-ons for a given product

Returns a list of available add-on products, if any, for a specified base product, and for a specified price list or all price lists. Each object returned specifies a `product`, a `priceList`, a `plan` selected from the `pricelist`, and pricing information for the final phase of the plan.


**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/availableAddons`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/availableAddons"	
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

String baseProductName = "Bullets";
String priceListName = null;
UUID accountId = null;

List<PlanDetail> availableAddons = catalogApi.getAvailableAddons(baseProductName, 
                                                                 priceListName, 
                                                                 accountId, 
                                                                 requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

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
```java
//First element of the list
class PlanDetail {
    product: Bullets
    plan: bullets-usage-in-arrear
    priceList: DEFAULT
    finalPhaseBillingPeriod: NO_BILLING_PERIOD
    finalPhaseRecurringPrice: []
}
```
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **baseProductName** | string | true | none | base product name |
| **priceListName** | string | false | all price lists | price list name |

**Response**

If successful, returns a status code of 200 and a list of objects representing available add-on products.

### Delete all versions of a per tenant catalog

Delete all per-tenant catalog versions. The tenant reverts to the system default catalog.

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/catalog`

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
    "http://127.0.0.1:8080/1.0/kb/catalog"	
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

catalogApi.deleteCatalog(requestOptions);
```

```ruby
KillBillClient::Model::Catalog.delete_catalog(user,
                                              reason,
                                              comment,
                                              options)
```

```python
catalogApi = killbill.api.CatalogApi()
        
catalogApi.delete_catalog(created_by, api_key, api_secret)
```
> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 204 No Content
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

**Response**

If successful, returna a status code of 204 and an empty body.

## Subscription info

These endpoints return information concerning a particular subscription. They select from the catalog only the items (such as plan, phase, or products) that currently apply to the specified subscription.

### Retrieve the phase for a given subscription and date

This API returns information about the current `Phase` associated with a given subscription. The record returned includes the phase type and information about pricing, duration, and usage.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/phase`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/phase?subscriptionId=8ab101b6-15e8-433b-b4f7-f99eeaa56a77&requestedDate=2018-7-18"	
```

```java
TODO
```

```ruby
requested_date = nil
KillBillClient::Model::Catalog.get_catalog_phase(subscription_id, 
                                                 requested_date, 
                                                 options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_phase_for_subscription_and_date(api_key, 
                                               api_secret, 
                                               subscription_id=subscription_id)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "type": "TRIAL",
  "prices": [],
  "fixedPrices": [],
  "duration": {
    "unit": "DAYS",
    "number": 30
  },
  "usages": []
} 
```
```java
TODO
```
```ruby
{
   "duration":{
      "number":30,
      "unit":"DAYS"
   },
   "fixed_prices":[

   ],
   "prices":[

   ],
   "type":"TRIAL",
   "usages":[

   ]
}
```
```python
{'duration': {'number': 30, 'unit': 'DAYS'},
 'fixed_prices': [],
 'prices': [],
 'type': 'TRIAL',
 'usages': []}
```

**Query Parameters**

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **subscriptionId** | string | true | none | subscription id |
| **requestedDate** | string | false | current date | requested date |

**Response**

If successful, returns a status code of 200 and a record for the current phase.

### Retrieve the plan for a given subscription and date

This API returns information about the current `Plan` associated with a given subscription. The record returned includes the plan name and information for each phase of the plan.


**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/plan`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/plan?subscriptionId=8ab101b6-15e8-433b-b4f7-f99eeaa56a77&requestedDate=2018-7-18"	
```

```java
TODO
```

```ruby
requested_date = nil
KillBillClient::Model::Catalog.get_catalog_plan(subscription_id, 
                                                requested_date, 
                                                options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_plan_for_subscription_and_date(api_key, 
                                              api_secret, 
                                              subscription_id=subscription_id)
```

> Example Response:

```shell
{
  "name": "standard-monthly",
  "prettyName": "standard-monthly",
  "billingPeriod": "MONTHLY",
  "phases": [
    {
      "type": "TRIAL",
      "prices": [],
      "fixedPrices": [],
      "duration": {
        "unit": "DAYS",
        "number": 30
      },
      "usages": []
    },
    {
      "type": "EVERGREEN",
      "prices": [
        {
          "currency": "GBP",
          "value": 75
        },
        {
          "currency": "USD",
          "value": 100
        }
      ],
      "fixedPrices": [],
      "duration": {
        "unit": "UNLIMITED",
        "number": -1
      },
      "usages": []
    }
  ]
}
```
```java
TODO
```
```ruby
{
   "billing_period":"MONTHLY",
   "name":"standard-monthly",
   "phases":[
      {
         "duration":{
            "number":30,
            "unit":"DAYS"
         },
         "fixed_prices":[

         ],
         "prices":[

         ],
         "type":"TRIAL",
         "usages":[

         ]
      },
      {
         "duration":{
            "number":-1,
            "unit":"UNLIMITED"
         },
         "fixed_prices":[

         ],
         "prices":[
            {
               "currency":"GBP",
               "value":75.0
            },
            {
               "currency":"USD",
               "value":100.0
            }
         ],
         "type":"EVERGREEN",
         "usages":[

         ]
      }
   ],
   "pretty_name":"standard-monthly"
}
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **subscriptionId** | string | true | none | subscription id |
| **requestedDate** | string | false | current date | requested date |

**Response**

If successful, returns a status code of 200 and a record for the plan for this subscription.



### Retrieve the priceList for a given subscription and date

This API returns information about the current `priceList` associated with a given subscription. The record returned includes the price list name and the list of plans on this list.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/priceList`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/priceList?subscriptionId=8ab101b6-15e8-433b-b4f7-f99eeaa56a77&requestedDate=2018-7-18"	
```

```java
TODO
```

```ruby
requested_date = nil
KillBillClient::Model::Catalog.get_catalog_price_list(subscription_id, 
                                                      requested_date, 
                                                      options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_price_list_for_subscription_and_date(api_key, 
                                                    api_secret, 
                                                    subscription_id=subscription_id)
```

> Example Response:

```shell
{
  "name": "DEFAULT",
  "plans": [
    "sports-monthly",
    "standard-monthly",
    "super-monthly"
  ]
}
```
```java 
TODO
```
```ruby
{
   "name":"DEFAULT",
   "plans":[
      "sports-monthly",
      "standard-monthly",
      "super-monthly"
   ]
}
```
```python
{'name': 'DEFAULT',
 'plans': ['sports-monthly', 'standard-monthly', 'super-monthly']}
```

**Query Parameters**

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **subscriptionId** | string | true | none | subscription id |
| **requestedDate** | string | false | current date | requested date |

**Response**

If successful, returns a status code of 200 and a record for the price list for this subscription.

### Retrieve product for a given subscription and date

This API returns information about the `product` associated with a given subscription. The record returned includes the product names, available plans, items included, and available add-ons.

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/catalog/product`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/catalog/product?subscriptionId=8ab101b6-15e8-433b-b4f7-f99eeaa56a77&requestedDate=2018-7-18"	
```

```java
TODO
```

```ruby
requested_date = nil
KillBillClient::Model::Catalog.get_catalog_product(subscription_id, 
                                                   requested_date, 
                                                   options)
```

```python
catalogApi = killbill.api.CatalogApi()

catalogApi.get_product_for_subscription_and_date(api_key, 
                                                 api_secret, 
                                                 subscription_id=subscription_id)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "type": "BASE",
  "name": "Standard",
  "prettyName": "Standard",
  "plans": [],
  "included": [],
  "available": []
}
```
```java 
TODO
```
```ruby
{
   "available":[

   ],
   "included":[

   ],
   "name":"Standard",
   "plans":[

   ],
   "pretty_name":"Standard",
   "type":"BASE"
}
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

| Name | Type | Required | Default | Description |
| ---- | -----| -------- | ------- | ----------- |
| **subscriptionId** | string | true | none | subscription id |
| **requestedDate** | string | false | current date | requested date |

**Response**

If successful, returns a status code of 200 and a record for the product for this subscription.

## Simple Plan

We provide a more basic level of APIs as a quick way to add a `Plan` into an **existing version** of the catalog.
The intent is mostly to help getting started with Kill Bill by abstracting away more complex topics such as alignements, rules, ...
The functionality is exposed on our admin UI (KAUI) to provide a simple graphical way to configure a simple catalog and get started quickly.

A simple plan has the following limitations:

* In-advance billing only
* Limited to one `RECURRING` phase  and an optional $0 `TRIAL` phase
* No suport for fixed price

Once a simple plan has been uploaded, one can retrieve the associated XML, edit it to configure additional aspects, and then upload
a new version of this catalog. So, this functionality can also be a stepping stone to a full catalog configuration.

### Add a simple plan

Add a (simple) Plan into the current version of the Catalog associated with the tenant.

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/catalog/simplePlan`

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
    -d '{ "planId": "basic-annual", "productName": "Basic", "productCategory": "BASE", "currency": "USD", "amount": 1000, "billingPeriod": "ANNUAL", "trialLength": 0, "trialTimeUnit": "UNLIMITED"}' \
    "http://localhost:8080/1.0/kb/catalog/simplePlan"
```

```java
import org.killbill.billing.client.api.gen.CatalogApi;
protected CatalogApi catalogApi;

String planId = "foo-monthly";
String productName = "Foo";
Integer trialLength = 0;

SimplePlan body = new SimplePlan(planId, 
                                 productName, 
                                 ProductCategory.BASE, 
                                 Currency.USD, 
                                 BigDecimal.TEN, 
                                 BillingPeriod.MONTHLY, 
                                 trialLength, 
                                 TimeUnit.UNLIMITED, 
                                 ImmutableList.<String>of())
                                 
catalogApi.addSimplePlan(body, requestOptions);
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

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/catalog
< Content-Type: application/json
< Content-Length: 0
```
```java
TODO
```
```ruby
no content
```
```python
no content
```


**Request Body**

Provides the content for the plan in JSON form. This should be very simple. Note that the "planId" becomes the `planName` attribute. For example:

{
  "planId": "newplan",
  "productName": "myitem",
  "productCategory": "BASE",
  "currency": "USD",
  "amount": 0,
  "billingPeriod": "DAILY",
  "trialLength": 0,
  "trialTimeUnit": "DAYS",
  "availableBaseProducts": []
}

**Query Parameters**

None.

**Response**

If successful, returns a status code of 201 and an empty body.
