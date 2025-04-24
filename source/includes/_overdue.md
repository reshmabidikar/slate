# Overdue

The Overdue resource offers endpoints that can be used to upload/retrieve overdue configurations.

## Overdue APIs

### Upload Overdue XML

Uploads the overdue configuration in XML format.

**HTTP Request**

`POST http://127.0.0.1:8080/1.0/kb/overdue/xml`

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
    -d '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><overdueConfig> ...' \
    "http://127.0.0.1:8080/1.0/kb/overdue/xml"
```

```java
import org.killbill.billing.client.api.gen.OverdueApi;

protected OverdueApi overdueApi;

String overdueXML = "<overdueConfig>...</overdueConfig>";
overdueApi.uploadOverdueConfigXml(overdueXML, requestOptions);
```

```ruby
TODO
```

```python
TODO
```

````javascript
TODO
````

````php
TODO
````

**Request Body**

The complete overdue configuration in XML format.

**Query Parameters**

None

**Response**

If successful, returns a status code of 201 and an empty body.

### Upload Overdue JSON

Uploads the overdue configuration in JSON format.

**HTTP Request**

`POST http://127.0.0.1:8080/1.0/kb/overdue/`

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
    -d 'json body' \
    "http://127.0.0.1:8080/1.0/kb/overdue/"	
```

```java
import org.killbill.billing.client.api.gen.OverdueApi;

protected OverdueApi overdueApi;

Overdue overdue = new Overdue(); //construct overdue object appropriately
overdueApi.uploadOverdueConfigJson(overdue, requestOptions);
```

```ruby
TODO
```

```python
TODO
```

````javascript
TODO
````

````php
TODO
````

**Request Body**

The complete overdue configuration in JSON format.

**Query Parameters**

None

**Response**

If successful, returns a status code of 201 and an empty body.

### Retrieve Overdue XML

Retrieves the overdue configuration in XML format.

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/overdue/xml`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: text/xml" \
    "http://localhost:8080/1.0/kb/overdue/xml"  

```

```java
import org.killbill.billing.client.api.gen.OverdueApi;

protected OverdueApi overdueApi;

String overdueXml = overdueApi.getOverdueConfigXml(requestOptions);
```

```ruby
TODO
```

```python
TODO
```

````javascript
TODO
````

````php
TODO
````

> Example Response:
```xml
<overdueConfig>
    <accountOverdueStates>
        <initialReevaluationInterval>
            <unit>DAYS</unit>
            <number>10</number>
        </initialReevaluationInterval>
        <state name="CANCELLATION">
            <condition>
                <timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
                    <unit>DAYS</unit>
                    <number>21</number>
                </timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
            </condition>
            <externalMessage>Reached CANCELATION</externalMessage>
            <blockChanges>false</blockChanges>
            <disableEntitlementAndChangesBlocked>false</disableEntitlementAndChangesBlocked>
            <subscriptionCancellationPolicy>END_OF_TERM</subscriptionCancellationPolicy>
            <isClearState>false</isClearState>
        </state>
        <state name="BLOCKED">
            <condition>
                <timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
                    <unit>DAYS</unit>
                    <number>14</number>
                </timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
            </condition>
            <externalMessage>Reached BLOCKED</externalMessage>
            <blockChanges>true</blockChanges>
            <disableEntitlementAndChangesBlocked>false</disableEntitlementAndChangesBlocked>
            <subscriptionCancellationPolicy>NONE</subscriptionCancellationPolicy>
            <isClearState>false</isClearState>
            <autoReevaluationInterval>
                <unit>DAYS</unit>
                <number>7</number>
            </autoReevaluationInterval>
        </state>
        <state name="WARNING">
            <condition>
                <timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
                    <unit>DAYS</unit>
                    <number>10</number>
                </timeSinceEarliestUnpaidInvoiceEqualsOrExceeds>
            </condition>
            <externalMessage>Reached WARNING</externalMessage>
            <blockChanges>true</blockChanges>
            <disableEntitlementAndChangesBlocked>true</disableEntitlementAndChangesBlocked>
            <subscriptionCancellationPolicy>NONE</subscriptionCancellationPolicy>
            <isClearState>false</isClearState>
            <autoReevaluationInterval>
                <unit>DAYS</unit>
                <number>4</number>
            </autoReevaluationInterval>
        </state>
    </accountOverdueStates>
</overdueConfig>
```

**Query Parameters**

None

**Response**

If successful, returns a status code of 201 and the overdue configuration in XML format.

### Retrieve Overdue JSON

Retrieves the overdue configuration in JSON format.

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/overdue/`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://127.0.0.1:8080/1.0/kb/overdue"	    
```

```java
import org.killbill.billing.client.api.gen.OverdueApi;

protected OverdueApi overdueApi;

Overdue overdueJson = overdueApi.getOverdueConfigJson(requestOptions);
```

```ruby
TODO
```

```python
TODO
```

````javascript
TODO
````

````php
TODO
````

> Example Response:
```json
{
  "initialReevaluationInterval": 10,
  "overdueStates": [
    {
      "name": "CANCELLATION",
      "isClearState": false,
      "condition": {
        "timeSinceEarliestUnpaidInvoiceEqualsOrExceeds": {
          "unit": "DAYS",
          "number": 21
        },
        "controlTagInclusion": null,
        "controlTagExclusion": null,
        "numberOfUnpaidInvoicesEqualsOrExceeds": null,
        "responseForLastFailedPayment": null,
        "totalUnpaidInvoiceBalanceEqualsOrExceeds": null
      },
      "externalMessage": "Reached CANCELATION",
      "isBlockChanges": false,
      "isDisableEntitlement": false,
      "subscriptionCancellationPolicy": "END_OF_TERM",
      "autoReevaluationIntervalDays": null
    },
    {
      "name": "BLOCKED",
      "isClearState": false,
      "condition": {
        "timeSinceEarliestUnpaidInvoiceEqualsOrExceeds": {
          "unit": "DAYS",
          "number": 14
        },
        "controlTagInclusion": null,
        "controlTagExclusion": null,
        "numberOfUnpaidInvoicesEqualsOrExceeds": null,
        "responseForLastFailedPayment": null,
        "totalUnpaidInvoiceBalanceEqualsOrExceeds": null
      },
      "externalMessage": "Reached BLOCKED",
      "isBlockChanges": true,
      "isDisableEntitlement": false,
      "subscriptionCancellationPolicy": "NONE",
      "autoReevaluationIntervalDays": 7
    },
    {
      "name": "WARNING",
      "isClearState": false,
      "condition": {
        "timeSinceEarliestUnpaidInvoiceEqualsOrExceeds": {
          "unit": "DAYS",
          "number": 10
        },
        "controlTagInclusion": null,
        "controlTagExclusion": null,
        "numberOfUnpaidInvoicesEqualsOrExceeds": null,
        "responseForLastFailedPayment": null,
        "totalUnpaidInvoiceBalanceEqualsOrExceeds": null
      },
      "externalMessage": "Reached WARNING",
      "isBlockChanges": true,
      "isDisableEntitlement": true,
      "subscriptionCancellationPolicy": "NONE",
      "autoReevaluationIntervalDays": 4
    }
  ]
}
```

**Query Parameters**

None

**Response**

If successful, returns a status code of 201 and the overdue configuration in JSON format.