# Tenant

## Tenant Resource

Kill Bill has been designed from the group up as a multi-tenant system, that is one where multiple unrelated deployments can be hosted on the same physical system; each one of these deployments comes with its own separate configuration, catalog, plugins, and of course its data set is kept entirely separate from the others. RBAC control allows different users/admin/apps to access zero, one or multiple tenants. This [blog](http://killbill.io/blog/subscription-service-using-kill-bill/) illustrates some interesting use cases. The tenant resource allows the management of such tenants.

The attributes are the following:

* **`tenant_id`** <span style="color:#32A9C7">*[System generated, immutable]*</span>: The `ID` allocated by Kill Bill upon creation.
* **`external_key`** <span style="color:#32A9C7">*[System or User generated, immutable]*</span>. The external key provided from client.
* **`api_key`** <span style="color:#32A9C7">*[User generated, immutable]*</span>.  The api key associated with the tenant. 
* **`api_secret`** <span style="color:#32A9C7">*[User generated, immutable]*</span>.  The api secret associated with the tenant. Note that the api secret is hashed and cannot be retrieved.

## Tenant

### Create a tenant

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/tenants`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d '{ "apiKey": "bob", "apiSecret": "lazar"}' \
    "http://localhost:8080/1.0/kb/tenants"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

UUID tenantId = null;
String externalKey = null;
String apiKey = bob;
String apiSecret = lazar;

Tenant body = new Tenant(tenantId,
                         externalKey,
                         apiKey,
                         apiSecret);
                         
tenantApi.createTenant(body, requestOptions)
```

```ruby
tenant = KillBillClient::Model::Tenant.new
tenant.external_key = "demo_external_key"
tenant.api_key = "demo_api_key"
tenant.api_secret = "demo_api_secret"

use_global_defalut = true
user = "demo"
reason = nil
comment = nil

tenant.create(use_global_defalut, 
              user, 
              reason, 
              comment, 
              options)
```

```python
tenantApi = killbill.api.TenantApi()

body = Tenant(api_key='demo_api_key', api_secret='demo_api_secret')

tenantApi.create_tenant(body, created_by='demo')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/e7b03c81-f41a-4eb7-a645-b9166057f186
< Content-Type: application/json
< Content-Length: 0
```
```java
class Tenant {
    tenantId: 5cce926f-7f3a-4007-a5a0-e5b55fc50079
    externalKey: null
    apiKey: bob
    apiSecret: lazar
    auditLogs: []
}
```
```ruby
{
   "tenantId":"ab5981c2-de14-43d6-a35b-a2ed0b28c746",
   "externalKey":"demo_external_key",
   "apiKey":"bob
}
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **useGlobalDefault** | boolean | false | Setting the `useGlobalDefault` parameter to `true` can be used for test purpose: This will configure the tenant with a default catalog, and therefore make it easy to quickly start playing with the apis. Note that in order to then upload a new custom catalog, one would need to [invalidate the caches for this tenant](#admin-invalidates-caches-per-tenant-level). |

**Returns**

A 201 http status without content.

### Retrieve a tenant by id

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/{tenantId}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/6907712e-e940-4033-8695-36894db128d3"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

UUID tenantId = UUID.fromString("6907712e-e940-4033-8695-36894db128d3");
tenantApi.getTenant(tenantId, requestOptions);
```

```ruby
tenant_id = "ab5981c2-de14-43d6-a35b-a2ed0b28c746"

KillBillClient::Model::Tenant.find_by_id(tenant_id, options)
```

```python
tenantApi = killbill.api.TenantApi()

tenant.get_tenant(tenant_id='3d90ec45-c640-4fd7-abde-798bc582513b')
```

> Example Response:

```shell
{
  "tenantId": "6907712e-e940-4033-8695-36894db128d3",
  "externalKey": "1532546166-326384",
  "apiKey": "bob",
  "apiSecret": null,
  "auditLogs": []
}
```
```java
class Tenant {
  "tenantId": "6907712e-e940-4033-8695-36894db128d3",
  "externalKey": "1532546166-326384",
  "apiKey": "bob",
  "apiSecret": null,
  "auditLogs": []
}
```
```ruby
{
   "tenantId":"ab5981c2-de14-43d6-a35b-a2ed0b28c746",
   "externalKey":"demo_external_key",
   "apiKey":"bob"
}
```
```python
{'api_key': 'udwg',
 'api_secret': None,
 'audit_logs': [],
 'external_key': None,
 'tenant_id': '3d90ec45-c640-4fd7-abde-798bc582513b'}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **tenantId** | string | true | tenant id |

**Returns**

Returns a tenant object.

### Retrieve a tenant by its API key

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants?apiKey=bob"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String apiKey = "bob";

tenantApi.getTenantByApiKey(apiKey, requestOptions);
```

```ruby
api_key = "demo_api_key"

KillBillClient::Model::Tenant.find_by_api_key(api_key, options)
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.get_tenant_by_api_key(api_key='bob')
```

> Example Response:

```shell
{
  "tenantId": "6907712e-e940-4033-8695-36894db128d3",
  "externalKey": "1532546166-326384",
  "apiKey": "bob",
  "apiSecret": null,
  "auditLogs": []
}
```
```java
{
  "tenantId": "6907712e-e940-4033-8695-36894db128d3",
  "externalKey": "1532546166-326384",
  "apiKey": "bob",
  "apiSecret": null,
  "auditLogs": []
}
```
```ruby
{
   "tenantId":"ab5981c2-de14-43d6-a35b-a2ed0b28c746",
   "externalKey":"demo_external_key",
   "apiKey":"bob"
}
```
```python
{'api_key': 'bob',
 'api_secret': None,
 'audit_logs': [],
 'external_key': None,
 'tenant_id': '3d90ec45-c640-4fd7-abde-798bc582513b'}
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **apiKey** | string | true | api key |

**Returns**

Returns a tenant object.

## Push Notifications

Push notifications is a convenient way to get notified about events from the system.
One can register a callback, i.e a valid URL that will be called whenever there is an event dispatched for this tenant.
Note that this can result in a large number of calls, basically everytime there is a state change for one of the `Account`
in this tenant, such callback would be invoked.

In case the error, the system will retry the callback as defined by the system property `org.killbill.billing.server.notifications.retries`.

Also see push notification documentation [here](http://docs.killbill.io/0.20/push_notifications.html).

### Register a push notification

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/tenants/registerNotificationCallback`

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
    'http://localhost:8080/1.0/kb/tenants/registerNotificationCallback?cb=http://demo/callmeback'
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String cb = "http://demo/callmeback";

TenantKeyValue result = tenantApi.registerPushNotificationCallback(cb, requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.register_push_notification_callback(created_by='demo', cb='http://demo/callmeback')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/registerNotificationCallback
< Content-Type: application/json
< Content-Length: 0
```
```java
class TenantKeyValue {
    key: PUSH_NOTIFICATION_CB
    values: [http://demo/callmeback]
}
```
```ruby
TODO
```
```python
no content
```

**Query Parameters**

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| **cb** | string | true | valid callback url |

**Returns**

A 201 http status without content.

### Retrieve a registered push notification

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/registerNotificationCallback`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/registerNotificationCallback"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

TenantKeyValue result = tenantApi.getPushNotificationCallbacks(requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.get_push_notification_callbacks()
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "PUSH_NOTIFICATION_CB",
  "values": [
    "http://demo/callmeback"
  ]
}
```
```java
class TenantKeyValue {
    key: PUSH_NOTIFICATION_CB
    values: [http://demo/callmeback]
}
```
```ruby
TODO
```
```python
{'key': 'PUSH_NOTIFICATION_CB', 'values': ['http://demo/callmeback']}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Delete a registered push notification

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tenants/registerNotificationCallback`

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
    "http://localhost:8080/1.0/kb/tenants/registerNotificationCallback"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

tenantApi.deletePushNotificationCallbacks(requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.delete_push_notification_callbacks(created_by='demo')
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

A 204 http status without content.

## Configuration

Please refer to our [configuartion guide](http://docs.killbill.io/0.20/userguide_configuration.html) to see what can be confugured in the system.
Some of the configuration can be overriden at the tenant level to allow for different behaviors. The endpoints below allow to set per-tenant properties.

### Add a per tenant configuration (system properties)

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/tenants/uploadPerTenantConfig`

For example, in order to disable the invoice safety bound mechanism on a per-tenant level, one could overwrite the per-tenant system property `org.killbill.invoice.sanitySafetyBoundEnabled` to false.


> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: text/plain" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d "{"org.killbill.invoice.sanitySafetyBoundEnabled":"false"}" \
    "http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String body = "{"org.killbill.invoice.sanitySafetyBoundEnabled":"false"}";

TenantKeyValue result = tenantApi.uploadPerTenantConfiguration(body, requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()
body = '{"org.killbill.invoice.sanitySafetyBoundEnabled":"false"}'

tenantApi.upload_per_tenant_configuration(body, created_by='demo')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig
< Content-Type: application/json
< Content-Length: 0
```
```java
class TenantKeyValue {
    key: PER_TENANT_CONFIG
    values: [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]
}
```
```ruby
TODO
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A 201 http status without content.

### Retrieve a per tenant configuration (system properties)

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/uploadPerTenantConfig`

> Example Request:

curl  \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig"

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

TenantKeyValue result = tenantApi.getPerTenantConfiguration(requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.get_per_tenant_configuration()
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "PER_TENANT_CONFIG",
  "values": [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]
}
```
```java
class TenantKeyValue {
    key: PER_TENANT_CONFIG
    values: [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]
}
```
```ruby
TODO
```
```python
{'key': 'PER_TENANT_CONFIG', 'values': [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Retrieve a per tenant key value based on key prefix

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/uploadPerTenantConfig/{keyPrefix}/search`

The search api allows to search for existing keys based on prefix. So, for instance we can use the prefix `PER_TENANT` and expect
to see the result for our previous key `PER_TENANT_CONFIG`.

> Example Request:



```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig/PER_TENANT/search"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String keyPrefix = "PER_TENANT";

TenantKeyValue result = tenantApi.getAllPluginConfiguration(keyPrefix, requestOptions);
```

```ruby
key_prefix = "PER_TENANT"

KillBillClient::Model::Tenant.search_tenant_config(key_prefix, options)
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.get_all_plugin_configuration(key_prefix='tenant_config')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "PER_TENANT_CONFIG",
  "values": [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]
}
```
```java
class TenantKeyValue {
    key: PER_TENANT_CONFIG
    values: [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]
}
```
```ruby
TODO
```
```python
{'key': 'PER_TENANT_CONFIG', 'values': [
    "{org.killbill.invoice.sanitySafetyBoundEnabled:false}"
  ]}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Delete a per tenant configuration (system properties)

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tenants/uploadPerTenantConfig`

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
    "http://localhost:8080/1.0/kb/tenants/uploadPerTenantConfig"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

tenantApi.deletePerTenantConfiguration(requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

tenantApi.delete_per_tenant_configuration(created_by='demo')
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

A 204 http status without content.


## Plugin Configuration

Plugins also support configuration on a per-tenant level. Please refer to our plugin [configuration manual](http://docs.killbill.io/0.20/plugin_development.html#_plugin_configuration) for more details.

An example for using such per-tenant properties is to to configure a payment plugin with different api keys,
one set of keys for each tenant. This allows for a true multi-tenant deployment where plugins have different configuration
based on the tenant in which they operate.

Upon adding/deleting new per-tenant plugin configuration, the system will generate a `TENANT_CONFIG_CHANGE`/`TENANT_CONFIG_DELETION` event, and such event can be handled in the plugin to refresh its configuration. In multi-node scenarios, events will be dispatched on each node, that is, on each plugin instance so they end up with a consistent view. A lot of the logic to handle configuration update has been implemented in our plugin frameworks, see [ruby framework](https://github.com/killbill/killbill-plugin-framework-ruby) and [java framework](https://github.com/killbill/killbill-plugin-framework-java).


The following endpoints provide the ability to configure plugins on a per-tenant level.

### Add a per tenant configuration for a plugin

**HTTP Request** 



`POST http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginConfig/{pluginName}`

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
    -d "tenant_config"
    "http://localhost:8080/1.0/kb/tenants/uploadPluginConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String pluginName = "PLUGIN_FOO";
String pluginConfig = getResourceBodyString("plugin.yml");

TenantKeyValue result = tenantApi.uploadPluginConfiguration(pluginName, pluginConfig, requestOptions);
```

```ruby
plugin_name = "demo_plugin"
plugin_config = "tenant_config"
user = "demo"
reason = nil
comment = nil

KillBillClient::Model::Tenant.upload_tenant_plugin_config(plugin_name, 
                                                          plugin_config, 
                                                          user, 
                                                          reason, 
                                                          comment, 
                                                          options)
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'
body = 'tenant_config'

tenantApi.upload_plugin_configuration(plugin_name, body, created_by='demo')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/uploadPluginConfig/demo_plugin
< Content-Type: application/json
< Content-Length: 0
```
```java
class TenantKeyValue {
    key: PLUGIN_CONFIG_PLUGIN_FOO
    values: 
    
    :my_plugin:
      :test: True
      :log_file: /var/tmp/myplugin.log
      :username: xx
      :password: yoyoyo
      :merchant_id:
        :USD: '0689870'
    
    :database:
      :adapter: sqlite3
      :database: test.db
    
    ]
}
```
```ruby
{
   "key":"PLUGIN_CONFIG_demo_plugin",
   "values":[
      "tenant_config"
   ]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A 201 http status without content.

### Retrieve a per tenant configuration for a plugin

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginConfig/{pluginName}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/uploadPluginConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

final String pluginName = "PLUGIN_FOO";

final TenantKeyValue result = tenantApi.getPluginConfiguration(pluginName, requestOptions);
```

```ruby
plugin_name = "demo_plugin"

KillBillClient::Model::Tenant.get_tenant_plugin_config(plugin_name, options)
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'

tenantApi.get_plugin_configuration(plugin_name)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "PLUGIN_CONFIG_demo_plugin",
  "values": [
    "tenant_config"
  ]
}
```
```java
class TenantKeyValue {
    key: PLUGIN_CONFIG_PLUGIN_FOO
    values: 
    
    :my_plugin:
      :test: True
      :log_file: /var/tmp/myplugin.log
      :username: xx
      :password: yoyoyo
      :merchant_id:
        :USD: '0689870'
    
    :database:
      :adapter: sqlite3
      :database: test.db
    
    ]
}
```
```ruby
{
   "key":"PLUGIN_CONFIG_demo_plugin",
   "values":[
      "tenant_config"
   ]
}
```
```python
{'key': 'PLUGIN_CONFIG_demo_plugin', 'values': []}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Delete a per tenant configuration for a plugin

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginConfig/{pluginName}`

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
    "http://localhost:8080/1.0/kb/tenants/uploadPluginConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

final String pluginName = "PLUGIN_FOO";

tenantApi.deletePluginConfiguration(pluginName, requestOptions);
```

```ruby
user = "demo"
reason = nil
comment = nil

plugin_name = "demo_plugin"

KillBillClient::Model::Tenant.delete_tenant_plugin_config(plugin_name, 
                                                          user, 
                                                          reason, 
                                                          comment, 
                                                          options)
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'

tenantApi.delete_plugin_configuration(plugin_name, created_by='demo')
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

A 204 http status without content.

## Payment State Machines

This is a somewhat advanced use case to override the default internal payment state machine within Kill Bill. Please refer to our [payment manual](http://docs.killbill.io/0.20/userguide_payment.html#_payment_states) for more details about payment states.

The endpoints below allow to override such state machine on a per-tenant level.

### Add a per tenant payment state machine for a plugin

**HTTP Request** 

Let's say we want to overwite the default Kill Bill payment state machine for the payment plugin `demo_plugin`, and assuming
a valid payment state machine xml file in `SimplePaymentStates.xml`.

`POST http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: text/plain" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
	-d '@SimplePaymentStates.xml' \
    "http://localhost:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String pluginName = "noop";
String stateMachineConfig = getResourceBodyString("SimplePaymentStates.xml");

TenantKeyValue result = tenantApi.uploadPluginPaymentStateMachineConfig(pluginName, 
                                                                        stateMachineConfig, 
                                                                        requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'
body = 'SimplePaymentStates.xml'

tenantApi.upload_plugin_payment_state_machine_config(plugin_name, body, created_by='demo')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/demo_plugin
< Content-Type: application/json
< Content-Length: 0
```
```java
class TenantKeyValue {
    key: PLUGIN_PAYMENT_STATE_MACHINE_noop
    values: [<?xml version="1.0" encoding="UTF-8"?>
   
    
    <stateMachineConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xsi:noNamespaceSchemaLocation="StateMachineConfig.xsd">
    
        <stateMachines>
            <stateMachine name="BIG_BANG">
                <states>
                    <state name="BIG_BANG_INIT"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>BIG_BANG_INIT</initialState>
                        <operation>OP_DUMMY</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>BIG_BANG_INIT</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_DUMMY"/>
                </operations>
            </stateMachine>
            <stateMachine name="AUTHORIZE">
                <states>
                    <state name="AUTH_INIT"/>
                    <state name="AUTH_SUCCESS"/>
                    <state name="AUTH_FAILED"/>
                    <state name="AUTH_ERRORED"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>AUTH_SUCCESS</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>FAILURE</operationResult>
                        <finalState>AUTH_FAILED</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>EXCEPTION</operationResult>
                        <finalState>AUTH_ERRORED</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_AUTHORIZE"/>
                </operations>
            </stateMachine>
        </stateMachines>
    
        <linkStateMachines>
            <linkStateMachine>
                <initialStateMachine>BIG_BANG</initialStateMachine>
                <initialState>BIG_BANG_INIT</initialState>
                <finalStateMachine>AUTHORIZE</finalStateMachine>
                <finalState>AUTH_INIT</finalState>
            </linkStateMachine>
        </linkStateMachines>
    </stateMachineConfig>
    ]
}
```
```ruby
TODO
```
```python
no content
```

**Query Parameters**

None. 

**Returns**

A 201 http status without content.

### Retrieve a per tenant payment state machine for a plugin

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String pluginName = "noop";

TenantKeyValue result = tenantApi.getPluginPaymentStateMachineConfig(pluginName, requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'

tenantApi.get_plugin_payment_state_machine_config(plugin_name)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "PLUGIN_PAYMENT_STATE_MACHINE_demo_plugin",
  "values": [<?xml version="1.0" encoding="UTF-8"?>
    
    <stateMachineConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xsi:noNamespaceSchemaLocation="StateMachineConfig.xsd">
    
        <stateMachines>
            <stateMachine name="BIG_BANG">
                <states>
                    <state name="BIG_BANG_INIT"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>BIG_BANG_INIT</initialState>
                        <operation>OP_DUMMY</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>BIG_BANG_INIT</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_DUMMY"/>
                </operations>
            </stateMachine>
            <stateMachine name="AUTHORIZE">
                <states>
                    <state name="AUTH_INIT"/>
                    <state name="AUTH_SUCCESS"/>
                    <state name="AUTH_FAILED"/>
                    <state name="AUTH_ERRORED"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>AUTH_SUCCESS</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>FAILURE</operationResult>
                        <finalState>AUTH_FAILED</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>EXCEPTION</operationResult>
                        <finalState>AUTH_ERRORED</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_AUTHORIZE"/>
                </operations>
            </stateMachine>
        </stateMachines>
    
        <linkStateMachines>
            <linkStateMachine>
                <initialStateMachine>BIG_BANG</initialStateMachine>
                <initialState>BIG_BANG_INIT</initialState>
                <finalStateMachine>AUTHORIZE</finalStateMachine>
                <finalState>AUTH_INIT</finalState>
            </linkStateMachine>
        </linkStateMachines>
    </stateMachineConfig>
    ]
}
```
```java
class TenantKeyValue {
    key: PLUGIN_PAYMENT_STATE_MACHINE_noop
    values: [<?xml version="1.0" encoding="UTF-8"?>
    
    <stateMachineConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xsi:noNamespaceSchemaLocation="StateMachineConfig.xsd">
    
        <stateMachines>
            <stateMachine name="BIG_BANG">
                <states>
                    <state name="BIG_BANG_INIT"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>BIG_BANG_INIT</initialState>
                        <operation>OP_DUMMY</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>BIG_BANG_INIT</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_DUMMY"/>
                </operations>
            </stateMachine>
            <stateMachine name="AUTHORIZE">
                <states>
                    <state name="AUTH_INIT"/>
                    <state name="AUTH_SUCCESS"/>
                    <state name="AUTH_FAILED"/>
                    <state name="AUTH_ERRORED"/>
                </states>
                <transitions>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>SUCCESS</operationResult>
                        <finalState>AUTH_SUCCESS</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>FAILURE</operationResult>
                        <finalState>AUTH_FAILED</finalState>
                    </transition>
                    <transition>
                        <initialState>AUTH_INIT</initialState>
                        <operation>OP_AUTHORIZE</operation>
                        <operationResult>EXCEPTION</operationResult>
                        <finalState>AUTH_ERRORED</finalState>
                    </transition>
                </transitions>
                <operations>
                    <operation name="OP_AUTHORIZE"/>
                </operations>
            </stateMachine>
        </stateMachines>
    
        <linkStateMachines>
            <linkStateMachine>
                <initialStateMachine>BIG_BANG</initialStateMachine>
                <initialState>BIG_BANG_INIT</initialState>
                <finalStateMachine>AUTHORIZE</finalStateMachine>
                <finalState>AUTH_INIT</finalState>
            </linkStateMachine>
        </linkStateMachines>
    </stateMachineConfig>
    ]
}
```
```ruby
TODO
```
```python
{'key': 'PLUGIN_PAYMENT_STATE_MACHINE_demo_plugin', 'values': []}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Delete a per tenant payment state machine for a plugin

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/{pluginName}`

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
    "http://localhost:8080/1.0/kb/tenants/uploadPluginPaymentStateMachineConfig/demo_plugin"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String pluginName = "noop";

tenantApi.deletePluginPaymentStateMachineConfig(pluginName, requestOptions);
```

```ruby
TODO
```

```python
tenantApi = killbill.api.TenantApi()

plugin_name = 'demo_plugin'

tenantApi.delete_plugin_payment_state_machine_config(plugin_name, created_by='demo')
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

A 204 http status without content.

## Tenant Key Values


We provide a mechanism to register `{key, value}` pairs for a given tenant. Such functionality
is used internally by the system to keep track of all the per-tenant configuration, from catalog, system properties, plugin configuration.

However, one can add *user* keys as well to keep track of per-specific mapping information. For example some global setting that would be accessible
for all plugins could be stored here.

### Add a per tenant user key/value

**HTTP Request** 

`POST http://127.0.0.1:8080/1.0/kb/tenants/userKeyValue/{keyName}`

> Example Request:

```shell
curl -v \
    -X POST \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: text/plain" \
    -H "Accept: application/json" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    -d "demo_value" \
    "http://localhost:8080/1.0/kb/tenants/userKeyValue/demo_value"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String keyName = "demo_value";
String body = "demo_value";
TenantKeyValue result = tenantApi.insertUserKeyValue(keyName, body, requestOptions);
```

```ruby
user = "demo"
reason = nil
comment = nil

key_name = "demo_value"
key_value = "demo_value"

KillBillClient::Model::Tenant.upload_tenant_user_key_value(key_name, 
                                                           key_value, 
                                                           user, 
                                                           reason, 
                                                           comment, 
                                                           options)
```

```python
tenantApi = killbill.api.TenantApi()

key_name = 'demo_value'
body = 'demo_value'

tenantApi.insert_user_key_value(key_name, body, created_by='demo')
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 201 Created
< Location: http://localhost:8080/1.0/kb/tenants/userKeyValue/demo_value
< Content-Type: application/json
< Content-Length: 0
```
```java
class TenantKeyValue {
    key: demo_value
    values: [demo_value]
}
```
```ruby
{
   "key":"demo_value",
   "values":[
      "demo_value"
   ]
}
```
```python
no content
```

**Query Parameters**

None.

**Returns**

A 201 http status without content.

### Retrieve a per tenant user key/value

**HTTP Request** 

`GET http://127.0.0.1:8080/1.0/kb/tenants/userKeyValue/{keyName}`

> Example Request:

```shell
curl -v \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Accept: application/json" \
    "http://localhost:8080/1.0/kb/tenants/userKeyValue/demo_value"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String keyName = "demo_value";

TenantKeyValue result = tenantApi.getUserKeyValue(keyName, requestOptions);
```

```ruby
key_name = "demo_value"

KillBillClient::Model::Tenant.get_tenant_user_key_value(key_name, options)
```

```python
tenantApi = killbill.api.TenantApi()

key_name = 'demo_value'

tenantApi.get_user_key_value(key_name)
```

> Example Response:

```shell
# Subset of headers returned when specifying -v curl option
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "key": "demo_value",
  "values": [
    "demo_value",
    "demo_value"
  ]
}
```
```java
class TenantKeyValue {
    key: demo_value
    values: [demo_value]
}
```
```ruby
{
   "key":"demo_value",
   "values":[
      "demo_value"
   ]
}
```
```python
{'key': 'demo_value', 'values': []}
```

**Query Parameters**

None.

**Returns**

Returns a tenant key value object.

### Delete a per tenant user key/value

**HTTP Request** 

`DELETE http://127.0.0.1:8080/1.0/kb/tenants/userKeyValue/{keyName}`

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
    "http://localhost:8080/1.0/kb/tenants/userKeyValue/demo_value"
```

```java
import org.killbill.billing.client.api.gen.TenantApi;
protected AdminApi tenantApi;

String keyName = "demo_value";

tenantApi.deleteUserKeyValue(keyName, requestOptions);
```

```ruby
user = "demo"
reason = nil
comment = nil
key_value = "demo_value"

KillBillClient::Model::Tenant.delete_tenant_user_key_value(key_value, 
                                                           user,
                                                           reason, 
                                                           comment, 
                                                           options)
```

```python
tenantApi = killbill.api.TenantApi()

key_name = 'demo_value'

tenantApi.delete_user_key_value(key_name, created_by='demo')
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

A 204 http status without content.