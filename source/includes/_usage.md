# Usage

## Usage Resource

When invoicing usage-based subscriptions, you need to record usage data into Kill Bill. Note that Kill Bill is not designed to be a metering system, i.e. it shouldn't contain all data points. Instead, it expects that you record a usage summary on a daily basis (1 API call per subscription per day). For a telco company for instance, instead of recording all phone calls, only record the number of minutes effectively used at the end of the day for that day.

For more information, see our [catalog usage documentation](http://docs.killbill.io/latest/userguide_subscription.html#components-catalog-usage) and our [invoice usage documentation](http://docs.killbill.io/latest/userguide_subscription.html#components-invoicing-usage).

Recording and retrieve usage data points is the purpose of the APIs below.


## Usage

### Record usage for a subscription

**HTTP Request**

`POST http://127.0.0.1:8080/1.0/kb/usages`

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
     -d '{"subscriptionId":"365987b2-5443-47e4-a467-c8962fc6995c", "trackingId": "my-unique-tracking-id", "unitUsageRecords":[{"unitType":"chocolate-videos","usageRecords":[{"recordDate":"2013-03-14","amount":1}]}]}' \
    "http://localhost:8080/1.0/kb/usages"
```

```java
import org.killbill.billing.client.api.gen.UsageApi;
protected UsageApi usageApi;

UUID subscriptionId = UUID.fromString("365987b2-5443-47e4-a467-c8962fc6995c");

UsageRecord usageRecord1 = new UsageRecord();
usageRecord1.setAmount(1L);
usageRecord1.setRecordDate(new LocalDate("2013-03-14"));

UnitUsageRecord unitUsageRecord = new UnitUsageRecord();
unitUsageRecord.setUnitType("chocolate-videos");
unitUsageRecord.setUsageRecords(ImmutableList.<UsageRecord>of(usageRecord1));

SubscriptionUsageRecord usage = new SubscriptionUsageRecord();
usage.setSubscriptionId(subscriptionId);
usage.setUnitUsageRecords(ImmutableList.<UnitUsageRecord>of(unitUsageRecord));

usageApi.recordUsage(usage,
                     requestOptions);
```

```ruby
usage_record = KillBillClient::Model::UsageRecordAttributes.new
usage_record.amount = 1
usage_record.record_date = "2013-03-14"

unit_usage_record = KillBillClient::Model::UnitUsageRecordAttributes.new
unit_usage_record.unit_type = "chocolate-videos"
unit_usage_record.usage_records = []
unit_usage_record.usage_records << usage_record

result = KillBillClient::Model::UsageRecord.new
result.subscription_id = "365987b2-5443-47e4-a467-c8962fc6995c"
result.unit_usage_records = []
result.unit_usage_records << unit_usage_record

result.create(user, nil, nil, options)
```

```python
TODO
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201
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

**Returns**

A 201 http status without content.

### Retrieve usage for a subscription and unit type

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/usages/{subscriptionId}/{unitType}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/usages/365987b2-5443-47e4-a467-c8962fc6995c/chocolate-videos?startDate=2012-08-25&endDate=2013-08-26"
```

```java
import org.killbill.billing.client.api.gen.UsageApi;
protected UsageApi usageApi;

UUID subscriptionId = UUID.fromString("365987b2-5443-47e4-a467-c8962fc6995c");

String unitType = "chocolate-videos";
LocalDate startDate = new LocalDate("2012-08-25");
LocalDate endDate = new LocalDate("2013-08-26");

RolledUpUsage retrievedUsage = usageApi.getUsage(subscriptionId,
                                                 unitType,
                                                 startDate,
                                                 endDate,
                                                 requestOptions);
```

```ruby
subscription_id = "365987b2-5443-47e4-a467-c8962fc6995c"
start_date = "2012-08-25"
end_date_ = "2013-08-26"
unit_type = "chocolate-videos"

KillBillClient::Model::RolledUpUsage.find_by_subscription_id_and_type(subscription_id,
                                                                      start_date,
                                                                      end_date,
                                                                      unit_type,
                                                                      options)
```

```python
TODO
```

> Example Response:

```shell
{
  "subscriptionId": "365987b2-5443-47e4-a467-c8962fc6995c",
  "startDate": "2012-08-25",
  "endDate": "2013-08-26",
  "rolledUpUnits": [
    {
      "unitType": "chocolate-videos",
      "amount": 1
    }
  ]
}
```
```java
class RolledUpUsage {
    subscriptionId: 365987b2-5443-47e4-a467-c8962fc6995c
    startDate: 2012-08-25
    endDate: 2012-08-26
    rolledUpUnits: [class RolledUpUnit {
        unitType: chocolate-videos
        amount: 1
    }]
}
```
```ruby
{
  "subscriptionId": "365987b2-5443-47e4-a467-c8962fc6995c",
  "startDate": "2012-08-25",
  "endDate": "2013-08-26",
  "rolledUpUnits": [
    {
      "unitType": "chocolate-videos",
      "amount": 1
    }
  ]
}
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **startDate** | date | true | Oldest data point to retrieve |
| **endDate** | date | true | Newest data point to retrieve (exclusive) |

**Returns**

Returns recorded data points for the specified period and unit type.


### Retrieve usage for a subscription

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/usages/{subscriptionId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/usages/365987b2-5443-47e4-a467-c8962fc6995c?startDate=2012-08-25&endDate=2013-08-26"
```

```java
import org.killbill.billing.client.api.gen.UsageApi;
protected UsageApi usageApi;

UUID subscriptionId = UUID.fromString("365987b2-5443-47e4-a467-c8962fc6995c");

LocalDate startDate = new LocalDate("2012-08-25");
LocalDate endDate = new LocalDate("2013-08-26");

RolledUpUsage retrievedUsage = usageApi.getAllUsage(subscriptionId,
                                                    startDate,
                                                    endDate,
                                                    requestOptions);
```

```ruby
subscription_id = "365987b2-5443-47e4-a467-c8962fc6995c"
start_date = "2012-08-25"
end_date = = "2013-08-26"

KillBillClient::Model::RolledUpUsage.find_by_subscription_id(subscription_id,
                                                             start_date,
                                                             end_date,
                                                             options)
```

```python
TODO
```

> Example Response:

```shell
{
  "subscriptionId": "365987b2-5443-47e4-a467-c8962fc6995c",
  "startDate": "2012-08-25",
  "endDate": "2013-08-26",
  "rolledUpUnits": [
    {
      "unitType": "chocolate-videos",
      "amount": 1
    }
  ]
}
```
```java
class RolledUpUsage {
    subscriptionId: 365987b2-5443-47e4-a467-c8962fc6995c
    startDate: 2012-08-25
    endDate: 2012-08-26
    rolledUpUnits: [class RolledUpUnit {
        unitType: chocolate-videos
        amount: 1
    }]
}
```
```ruby
{
  "subscriptionId": "365987b2-5443-47e4-a467-c8962fc6995c",
  "startDate": "2012-08-25",
  "endDate": "2013-08-26",
  "rolledUpUnits": [
    {
      "unitType": "chocolate-videos",
      "amount": 1
    }
  ]
}
```
```python
TODO
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **startDate** | date | true | Oldest data point to retrieve |
| **endDate** | date | true | Newest data point to retrieve (exclusive) |

**Returns**

Returns recorded data points for the specified period.
