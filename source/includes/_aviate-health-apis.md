# Aviate Health APIs

//TODO - Add introduction



## Endpoints

### Retrieve Health Data

Return the current HealthData report. It is meant to show the current health of the cluster, show debugging information, and draw attention to potential problems.

It contains:

* `nodeInfos`: details on all nodes in the Kill Bill cluster. 
* `parkedAccounts`: parked accounts (limit 50), if any. 
* `lateBusEvents`: bus events that need processing (limit 100), if any. 
* `lateNotifications`: notifications that need processing (limit 100), if any. 
* `recentBusEvents`: recent bus events that were processed (limit 100). 
* `recentNotifications`: recent notifications that were processed (limit 100). 
* `recentAccessLogs`: recent HTTP requests from all nodes (at most 2 days).

//TODO - mention about com.killbill.billing.plugin.aviate.lockSleepMilliSeconds??

**HTTP Request**

`GET /plugins/aviate-plugin/v1/health/data`

> Example Request:

```shell
curl -X GET \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/data
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

> Example Response:

```json
{
  "nodeInfos": [
    {
      "time": 1732797874123,
      "kbClock": "2024-11-28T12:44:34.076252400",
      "nodeName": "DESKTOP-NCUS49R",
      "bootTime": "2024-11-28T12:37:23.000Z",
      "lastUpdatedDate": "2024-11-28T12:37:23.000Z",
      "killbillVersion": "0.24.12-SNAPSHOT",
      "apiVersion": "0.54.0",
      "platformVersion": "0.41.11",
      "commonVersion": "0.26.4",
      "pluginApiVersion": "0.27.3",
      "pluginInfos": [
        {
          "pluginKey": "aviate",
          "bundleSymbolicName": "com.kill-bill.billing.plugin.java.aviate-plugin",
          "pluginName": "aviate-plugin",
          "version": "1.0.13-SNAPSHOT",
          "pluginState": "RUNNING",
          "isSelectedForStart": true,
          "services": [
            {
              "serviceTypeName": "org.killbill.billing.osgi.api.Healthcheck",
              "registrationName": "aviate-plugin"
            },
            {
              "serviceTypeName": "javax.servlet.Servlet",
              "registrationName": "aviate-plugin"
            }
          ]
        },
        {
          "pluginKey": "",
          "bundleSymbolicName": "org.kill-bill.billing.killbill-platform-osgi-bundles-kpm",
          "pluginName": "org.kill-bill.billing.killbill-platform-osgi-bundles-kpm",
          "version": "",
          "pluginState": "RUNNING",
          "isSelectedForStart": true,
          "services": []
        },
        {
          "pluginKey": "",
          "bundleSymbolicName": "org.kill-bill.billing.killbill-platform-osgi-bundles-logger",
          "pluginName": "org.kill-bill.billing.killbill-platform-osgi-bundles-logger",
          "version": "",
          "pluginState": "RUNNING",
          "isSelectedForStart": true,
          "services": []
        },
        {
          "pluginKey": "",
          "bundleSymbolicName": "org.kill-bill.billing.killbill-platform-osgi-bundles-metrics",
          "pluginName": "org.kill-bill.billing.killbill-platform-osgi-bundles-metrics",
          "version": "",
          "pluginState": "RUNNING",
          "isSelectedForStart": true,
          "services": []
        },
        {
          "pluginKey": "",
          "bundleSymbolicName": "org.kill-bill.billing.plugin.java.stripe-plugin",
          "pluginName": "stripe-plugin",
          "version": "8.0.1",
          "pluginState": "RUNNING",
          "isSelectedForStart": true,
          "services": [
            {
              "serviceTypeName": "org.killbill.billing.payment.plugin.api.PaymentPluginApi",
              "registrationName": "killbill-stripe"
            },
            {
              "serviceTypeName": "org.killbill.billing.osgi.api.Healthcheck",
              "registrationName": "killbill-stripe"
            },
            {
              "serviceTypeName": "javax.servlet.Servlet",
              "registrationName": "killbill-stripe"
            }
          ]
        }
      ]
    }
  ],
  "parkedAccounts": [],
  "lateBusEvents": [
    {
      "recordId": 1,
      "className": "org.killbill.billing.tenant.api.user.DefaultTenantConfigChangeInternalEvent",
      "eventJson": "{\"id\":\"85edc9d5-8683-434f-bfd5-ef2ebd7ab9b3\",\"key\":\"CATALOG\",\"searchKey1\":null,\"searchKey2\":1,\"userToken\":\"c4fe88f8-36c3-461d-8ace-0f0a7efc1a42\"}",
      "userToken": "c4fe88f8-36c3-461d-8ace-0f0a7efc1a42",
      "createdDate": "2024-01-30T06:38:25.000Z",
      "creatingOwner": "DESKTOP-NCUS49R",
      "processingOwner": "",
      "processingAvailableDate": "2024-01-30T06:38:25.000Z",
      "processingState": "PROCESSED",
      "errorCount": 0,
      "searchKey1": 0,
      "searchKey2": 1
    }
  ],
  "lateNotifications": [],
  "recentBusEvents": [
    {
      "recordId": 184174,
      "className": "org.killbill.billing.util.broadcast.DefaultBroadcastInternalEvent",
      "eventJson": "{\"serviceName\":\"broadcast-service\",\"type\":\"START_PLUGIN\",\"jsonEvent\":\"{\\\"pluginKey\\\":\\\"aviate\\\",\\\"pluginName\\\":null,\\\"pluginVersion\\\":\\\"1.0.13-d197203\\\",\\\"properties\\\":[{\\\"key\\\":\\\"kbVersion\\\",\\\"value\\\":\\\"0.24.12-SNAPSHOT\\\"}]}\",\"searchKey1\":null,\"searchKey2\":0,\"userToken\":null}",
      "userToken": "",
      "createdDate": "2024-11-28T04:21:37.000Z",
      "creatingOwner": "DESKTOP-NCUS49R",
      "processingOwner": "",
      "processingAvailableDate": "2024-11-28T04:21:37.000Z",
      "processingState": "PROCESSED",
      "errorCount": 0,
      "searchKey1": 0,
      "searchKey2": 0
    },
    {
      "recordId": 184173,
      "className": "org.killbill.billing.util.broadcast.DefaultBroadcastInternalEvent",
      "eventJson": "{\"serviceName\":\"broadcast-service\",\"type\":\"INSTALL_PLUGIN\",\"jsonEvent\":\"{\\\"pluginKey\\\":\\\"aviate\\\",\\\"pluginName\\\":null,\\\"pluginVersion\\\":\\\"1.0.13-d197203\\\",\\\"properties\\\":[{\\\"key\\\":\\\"pluginUri\\\",\\\"value\\\":\\\"https://dl.cloudsmith.io/Y9NsUe0Lb5JBOnwf/killbill/aviate/maven/com/kill-bill/billing/plugin/java/aviate-plugin/1.0.13-d197203/aviate-plugin-1.0.13-d197203.jar\\\"},{\\\"key\\\":\\\"pluginType\\\",\\\"value\\\":\\\"java\\\"},{\\\"key\\\":\\\"kbVersion\\\",\\\"value\\\":\\\"0.24.12-SNAPSHOT\\\"}]}\",\"searchKey1\":null,\"searchKey2\":0,\"userToken\":null}",
      "userToken": "",
      "createdDate": "2024-11-28T04:21:32.000Z",
      "creatingOwner": "DESKTOP-NCUS49R",
      "processingOwner": "",
      "processingAvailableDate": "2024-11-28T04:21:32.000Z",
      "processingState": "PROCESSED",
      "errorCount": 0,
      "searchKey1": 0,
      "searchKey2": 0
    }
  ],
  "recentAccessLogs": [
    {
      "nodeName": "DESKTOP-NCUS49R",
      "hostName": "127.0.0.1",
      "timestamp": "27/Nov/2024:10:58:21 +0530",
      "method": "GET",
      "uri": "/1.0/kb/security/subject",
      "statusCode": "401",
      "bytesSent": "-"
    },
    {
      "nodeName": "DESKTOP-NCUS49R",
      "hostName": "127.0.0.1",
      "timestamp": "27/Nov/2024:10:58:34 +0530",
      "method": "GET",
      "uri": "/1.0/kb/security/permissions",
      "statusCode": "200",
      "bytesSent": "7"
    }
  ]
}
```

**Request Body**

None

**Query Parameters**

None

**Response**

If successful, returns a `HealthData` object.

### Retrieve Host Samples

Returns metrics data for dashboards.

//TODO add more information here


**HTTP Request**

`GET /plugins/aviate-plugin/v1/health/host_samples`

> Example Request:

```shell
curl -X GET \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/host_samples?group=shiro.pool.Wait&from=2024-01-01T00:00:00&to=2025-03-14T00:00:00
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

**Request Body**

None

**Query Parameters**

| Name                   | Type           | Required | Default      | Description                                                                                                                                                                                         |
|------------------------|----------------|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **startTimeParameter**          | string         | false    | none         | Start time for the samples                                                                                                                                                                          |
| **endTimeParameter**   | string         | false    | Current time | End time for the samples                                                                                                                                                                            |
| **hostNames**   | List of String | false    | None         | List of host names. Multiple host names can be specified by specifying a separate `hostNames` parameter corresponding to each host                                                                  |
| **group** | string         | false    | None         | Event group for the requested sample kinds                                                                                                                                                          |
| **category_and_sample_kind**     | List of String | false    | None         | List of samples kinds (format: category,sample_kind). Multiple category and sample kinds can be specified by specifying a separate `category_and_sample_kind` parameter corresponding to each value |
| **granularity**     | SampleGranularity           | false    | None         | Granularity (One of `SECOND`, `MINUTE`, `HOUR`, `DAY`                                                                                                                                               |

**Response**

If successful, returns a status code of 200 and the requested host data.


// ### Fix Parked Accounts - This method is not implemented in the code, so not documenting it

### Fix Stuck Bus Entries

Fixes stuck bus entries. Basically sets the `creating_owner`, `processing_owner`, `processing_avialable_date`, `processing_state`, `error_count` fields to `null` in the `bus_events` table for the specified recordIds.

**HTTP Request**

`PUT /plugins/aviate-plugin/v1/health/bus/fixup`

> Example Request:

```shell
curl -X PUT \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     -d '[1,2]' \
     http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/bus/fixup
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

**Request Body**

A List of `recordId` values from the `bus_events` table that need to be fixed.

**Query Parameters**

None

**Response**

If successful, returns a status code of 200 and an empty body.


### Fix Stuck Notification Entries

Fixes stuck notification entries. Basically sets the `creating_owner`, `processing_owner`, `processing_avialable_date`, `processing_state`, `error_count`, `effective_date` fields to `null` in the `notifications` table for the specified recordIds.

**HTTP Request**

`PUT /plugins/aviate-plugin/v1/health/notifications/fixup`

> Example Request:

```shell
curl -X PUT \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     -d '[1,2]' \
     http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/notifications/fixup
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

**Request Body**

A List of `recordId` values from the `notifications` table that need to be fixed.

**Query Parameters**

None

**Response**

If successful, returns a status code of 200 and an empty body.

### Retrieve Diagnostic Report

This endpoint generates a diagnostic report. The report includes logs, tenant config, Kill Bill & system config, and account data, similar to the [kpm diagnostic tool](https://docs.killbill.io/latest/how-to-use-kpm-diagnostic), either as JSON or as a ZIP file.

A few pointers:

* if the `-H "Accept: application/zip" header is specified`, creates a zip file 
* At least one query parameter needs to be specified, otherwise an empty response is returned.
* HealthData and logs are returned only when the `-H "Accept: application/zip"` header is specified
* Logs from only a single node will be included

**HTTP Request**

`GET /plugins/aviate-plugin/v1/health/diagnostic`

> Example Request:

```shell
## Example 1 - Returns data for the specified account in JSON format
curl -X GET \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/diagnostic?accountId=af65531a-fc2e-43cd-8af1-6ec0709d9700
     
## Example 2 - Creates a zip file. Includes account information, Kill Bill configuration data and tenant configuration data
curl -X GET \
     -H 'Authorization: Bearer ${ID_TOKEN}' \     
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     -H "Accept: application/zip" \
     "http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/diagnostic?accountId=af65531a-fc2e-43cd-8af1-6ec0709d9700&withKillbillConfig=true&withTenantConfig=true" -JO
     
## Example 3 - Creates a zip file. Includes account information and the catalina.2024-11-27.log and localhost_access_log.2024-11-27.txt logs from the Tomcat directory.
curl -X GET \
     -H 'X-killbill-apiKey: test7' \
     -H 'X-killbill-apisecret: test7' \
     -H "Accept: application/zip"  \
     "http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/diagnostic?accountId=68704a87-23d8-46db-a1ba-310daa8e1f4f&withLogs=true&logsFilenames=catalina.2024-11-27.log&logsFilenames=localhost_access_log.2024-11-27.txt" -JO
	 
## Example 4- Creates a zip file. Includes account information and the killbill.out/kaui.out log files from the /var/lib/killbill/logs directory.
curl -X GET \
     -H 'X-killbill-apiKey: bob' \
     -H 'X-killbill-apisecret: lazar' \
     -H "Accept: application/zip"  \
     "http://127.0.0.1:8080/plugins/aviate-plugin/v1/health/diagnostic?accountId=68704a87-23d8-46db-a1ba-310daa8e1f4f&withLogs=true&logsDir=/var/lib/killbill/logs&logsFilenames=killbill.out&logsFilenames=kaui.out" -JO
```

```java
```

```ruby
```

```python
```

````php
````

````javacript
````

> Example Response:

```json
{
  "account.data": "-- account_history record_id|id|target_record_id|external_key|email|name|first_name_length|currency|billing_cycle_day_local|parent_account_id|is_payment_delegated_to_parent|payment_method_id|reference_time|time_zone|locale|address1|address2|company_name|city|state_or_province|country|postal_code|phone|notes|migrated|change_type|created_by|created_date|updated_by|updated_date|tenant_record_id\n12999|402d7c14-0318-4706-b110-eff813d59ce2|7077|user29Nov1||||USD|0||||2024-11-29T04:11:51.000+00:00|Etc/UTC|en_US||||||US||||false|INSERT|admin|2024-11-29T04:11:51.000+00:00|admin|2024-11-29T04:11:51.000+00:00|4621\n-- accounts record_id|id|external_key|email|name|first_name_length|currency|billing_cycle_day_local|parent_account_id|is_payment_delegated_to_parent|payment_method_id|reference_time|time_zone|locale|address1|address2|company_name|city|state_or_province|country|postal_code|phone|notes|migrated|created_date|created_by|updated_date|updated_by|tenant_record_id\n7077|68704a87-23d8-46db-a1ba-310daa8e1f4f|user29Nov1||||USD|0||||2024-11-29T04:11:51.000+00:00|Etc/UTC|en_US||||||US||||false|2024-11-29T04:11:51.000+00:00|admin|2024-11-29T04:11:51.000+00:00|admin|4621\n-- audit_log record_id|id|target_record_id|table_name|change_type|created_date|created_by|reason_code|comments|user_token|account_record_id|tenant_record_id\n525321|0d34f135-5a72-4acc-90d9-7e8615717cf0|12999|ACCOUNT_HISTORY|INSERT|2024-11-29T04:11:51.000+00:00|admin|||1b557c51-4a01-45d0-977b-49cd27810153|7077|4621\n-- bus_events_history record_id|class_name|event_json|user_token|created_date|creating_owner|processing_owner|processing_available_date|processing_state|error_count|search_key1|search_key2\n184177|org.killbill.billing.account.api.user.DefaultAccountCreationEvent|{\"data\":{\"externalKey\":\"user29Nov1\",\"name\":\"user29Nov1\",\"firstNameLength\":null,\"email\":null,\"billCycleDayLocal\":0,\"currency\":\"USD\",\"parentAccountId\":null,\"isPaymentDelegatedToParent\":null,\"paymentMethodId\":null,\"referenceTime\":\"2024-11-29T04:11:51.000Z\",\"timeZone\":\"Etc/UTC\",\"locale\":\"en_US\",\"address1\":null,\"address2\":null,\"companyName\":null,\"city\":null,\"stateOrProvince\":null,\"postalCode\":null,\"country\":\"US\",\"phone\":null,\"notes\":null,\"isMigrated\":false},\"id\":\"68704a87-23d8-46db-a1ba-310daa8e1f4f\",\"searchKey1\":7077,\"searchKey2\":4621,\"userToken\":\"1b557c51-4a01-45d0-977b-49cd27810153\"}|1b557c51-4a01-45d0-977b-49cd27810153|2024-11-29T04:11:51.000+00:00|DESKTOP-NCUS49R|DESKTOP-NCUS49R|2024-11-29T04:11:51.000+00:00|PROCESSED|0|7077|4621\n-- bus_ext_events_history record_id|class_name|event_json|user_token|created_date|creating_owner|processing_owner|processing_available_date|processing_state|error_count|search_key1|search_key2\n182535|org.killbill.billing.beatrix.extbus.DefaultBusExternalEvent|{\"objectId\":\"68704a87-23d8-46db-a1ba-310daa8e1f4f\",\"objectType\":\"ACCOUNT\",\"eventType\":\"ACCOUNT_CREATION\",\"accountId\":\"68704a87-23d8-46db-a1ba-310daa8e1f4f\",\"tenantId\":\"a7ac9384-f2aa-42cb-8367-9f298d228fae\",\"metaData\":null}|1b557c51-4a01-45d0-977b-49cd27810153|2024-11-29T04:11:51.000+00:00|DESKTOP-NCUS49R|DESKTOP-NCUS49R|2024-11-29T04:11:51.000+00:00|PROCESSED|0|7077|4621\n",
  "tenant_config.data": [
    {
      "key": "CATALOG",
      "values": [
        "<catalog-xml-here>"
      ]
    },
    {
      "key": "INVOICE_TRANSLATION_fr_FR",
      "values": [
        "invoiceTitle=FACTURE\ninvoiceDate=Date:\ninvoiceNumber=Facture #"
      ]
    }
  ],
  "killbill_configuration.data": {
    "awt.toolkit": "sun.awt.windows.WToolkit",
    "java.specification.version": "11",
    "org.killbill.server.updateCheck.url": "https://raw.github.com/killbill/killbill/master/profiles/killbill/src/main/resources/update-checker/killbill-server-update-list.properties",
    "sun.cpu.isalist": "amd64",
    "sun.jnu.encoding": "Cp1252",
    "org.killbill.billing.plugin.kpm.bundlesPath": "D:/var/tmp/bundles",
    "java.naming.provider.url": "rmi://127.0.0.1:1099",
    "sun.arch.data.model": "64",
    "org.killbill.billing.plugin.auth.adminUsername": "admin",
    "org.killbill.billing.plugin.kpm.kpmPath": "D:/Software/Ruby27-x64/bin/kpm.bat",
    "org.killbill.billing.plugin.auth.adminPassword": "*****",
    "com.killbill.billing.plugin.aviate.enableUsageApis": "false",
    "kaui.db.password": "*****",
    "org.killbill.server.lookupEnvironmentVariables": "true",
    "shared.loader": "",
    "java.util.logging.manager": "org.apache.juli.ClassLoaderLogManager",
    "org.killbill.persistent.bus.external.tableName": "bus_ext_events",
    "java.vm.info": "mixed mode",
    "java.vm.version": "11.0.6+8-LTS",
    "java.class.version": "55.0"
  }
}
```

**Request Body**

None

**Query Parameters**

| Name                   | Type           | Required | Default                                                                                                                                                          | Description                                                                                                                                                                                                             |
|------------------------|----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **accountId**          | UUID           | false    | none                                                                                                                                                             | Account Id for which to create the diagnostic report                                                                                                                                                                    |
| **withTenantConfig**   | boolean        | false    | false                                                                                                                                                            | If specified, includes per-tenant configuration properties (like catalog, overdue, etc.)                                                                                                                                |
| **withSystemConfig**   | boolean        | false    | false                                                                                                                                                            | If specified, includes system information (KB/Kaui version, environment variables, OS information, CPU information, memory information, disk information, etc.                                                          |
| **withKillbillConfig** | boolean        | false    | false                                                                                                                                                            | If specified, includes the global Kill Bill configuration properties                                                                                                                                                    |
| **withHealthData**     | boolean        | false    | false                                                                                                                                                            | If specified, includes health data.                                                                                                                                                                                     |
| **withLogs**           | boolean        | false    | false                                                                                                                                                            | If specified, includes the logs specified via the `logsDir` parameter. If `logsDir` is not specified, includes the Tomcat logs. In either case, only the log files specified via `logFileNames` are included. |
| **logsSize**           | int            | false    | 5242880                                                                                                                                                          | Desired log size. Applicable only if withLogs=true is specifed.                                                                                                                                                         |
| **logsDir**            | string         | false    | The value of `com.killbill.billing.plugin.aviate.logsPath` if specified or TOMCAT_HOME/logs (TOMCAT_HOME is determined using the `catalina.base` system property | The directory from which to include the logs. Works only if `withLogs=true` is specifed.                                                                                                                                  |
| **logsFilenames**      | List of String | false    | catalina.out                                                                                                                                                     | Desired log file names. Works only if `withLogs=true` is specifed. Multiple log file names can be specified by specifying a separate `logsFilenames` parameter corresponding to each value                                |

**Response**

If successful, returns a status code of 200 and the requested diagnostic data.