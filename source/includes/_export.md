# Export

The Export resource offers an endpoint that can be used to export account data.

## Export APIs

### Export Account Data

Exports data corresponding to the specified account to a text file. 

**HTTP Request**

`GET http://127.0.0.1:8080/1.0/kb/export/{accountId}`

> Example Request:

```shell
curl -v \
	-N --output output.txt \
    -u admin:password \
    -H "X-Killbill-ApiKey: bob" \
    -H "X-Killbill-ApiSecret: lazar" \
    -H "Content-Type: application/json" \
    -H "Accept: application/octet-stream" \
    -H "X-Killbill-CreatedBy: demo" \
    -H "X-Killbill-Reason: demo" \
    -H "X-Killbill-Comment: demo" \
    "http://127.0.0.1:8080/1.0/kb/export/0f84a73c-9f1d-44e0-962e-e7d554e9cff6"  
```

```java
import org.killbill.billing.client.api.gen.InvoiceApi;
protected ExportApi exportApi;

UUID accountId = UUID.fromString("0f84a73c-9f1d-44e0-962e-e7d554e9cff6");

FileOutputStream output = new FileOutputStream("output.txt");

exportApi.exportDataForAccount(accountId, output, requestOptions);
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

**Query Parameters**

None

**Response**

If successful, returns a status code of 201 and an empty body. The exported data is written to the specified file.