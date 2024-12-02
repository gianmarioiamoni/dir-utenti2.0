---
title: API Documentazione v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="api-documentazione">API Documentazione v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Documentazione delle API per la gestione utenti.

Base URLs:

* <a href="http://localhost:5000/api">http://localhost:5000/api</a>

Email: <a href="mailto:gianmarioiamoni1@gmail.com">Gianmario Iamoni</a> 

<h1 id="api-documentazione-default">Default</h1>

## get__users

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/users \
  -H 'Accept: application/json'

```

```http
GET http://localhost:5000/api/users HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://localhost:5000/api/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://localhost:5000/api/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users`

*Ottieni tutti gli utenti*

Restituisce una lista di tutti gli utenti registrati, con supporto per la paginazione.

<h3 id="get__users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numero della pagina da visualizzare.|
|limit|query|integer|false|Numero di utenti da mostrare per pagina.|
|fields|query|string|false|Campi degli utenti da includere nella risposta, separati da spazi.|

> Example responses

> 200 Response

```json
{
  "users": [
    {
      "id": "string",
      "nome": "string",
      "cognome": "string",
      "email": "string"
    }
  ],
  "total": 0
}
```

<h3 id="get__users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Lista degli utenti con metadati di paginazione.|Inline|

<h3 id="get__users-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» users|[object]|false|none|none|
|»» id|string|false|none|none|
|»» nome|string|false|none|none|
|»» cognome|string|false|none|none|
|»» email|string|false|none|none|
|» total|integer|false|none|Numero totale di utenti disponibili.|

<aside class="success">
This operation does not require authentication
</aside>

## post__users

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:5000/api/users HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "nome": "string",
  "cognome": "string",
  "email": "string",
  "dataNascita": "2019-08-24",
  "fotoProfilo": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:5000/api/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:5000/api/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users`

*Crea un nuovo utente*

Aggiunge un nuovo utente al database. L'email deve essere univoca.

> Body parameter

```json
{
  "nome": "string",
  "cognome": "string",
  "email": "string",
  "dataNascita": "2019-08-24",
  "fotoProfilo": "string"
}
```

<h3 id="post__users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» nome|body|string|true|Nome dell'utente.|
|» cognome|body|string|true|Cognome dell'utente.|
|» email|body|string|true|Email univoca dell'utente.|
|» dataNascita|body|string(date)|false|Data di nascita dell'utente (opzionale).|
|» fotoProfilo|body|string|false|URL della foto profilo (opzionale).|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "nome": "string",
  "cognome": "string",
  "email": "string",
  "dataNascita": "2019-08-24",
  "fotoProfilo": "string"
}
```

<h3 id="post__users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Utente creato con successo.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Dati non validi o mancanti.|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Email già in uso.|None|

<h3 id="post__users-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|string|false|none|none|
|» nome|string|false|none|none|
|» cognome|string|false|none|none|
|» email|string|false|none|none|
|» dataNascita|string(date)|false|none|none|
|» fotoProfilo|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__users_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/users/{id} \
  -H 'Accept: application/json'

```

```http
GET http://localhost:5000/api/users/{id} HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://localhost:5000/api/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://localhost:5000/api/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/{id}`

*Ottieni un utente per ID*

Restituisce i dettagli di un singolo utente specificato dall'ID. L'ID deve essere un ObjectId valido.

<h3 id="get__users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|ID univoco dell'utente.|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "nome": "string",
  "cognome": "string",
  "email": "string"
}
```

<h3 id="get__users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Dettagli dell'utente.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Formato dell'ID non valido.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Utente non trovato.|None|

<h3 id="get__users_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|string|false|none|none|
|» nome|string|false|none|none|
|» cognome|string|false|none|none|
|» email|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="api-documentazione-users">Users</h1>

## get__total

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/total \
  -H 'Accept: application/json'

```

```http
GET http://localhost:5000/api/total HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/total',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://localhost:5000/api/total',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://localhost:5000/api/total', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/total', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/total");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/total", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /total`

*Ottieni il numero totale di utenti*

Restituisce il numero totale di documenti nella collezione degli utenti.

> Example responses

> 200 Response

```json
150
```

<h3 id="get__total-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Numero totale di utenti restituito con successo.|integer|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Errore interno del server.|None|

<aside class="success">
This operation does not require authentication
</aside>

