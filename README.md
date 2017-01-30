# **GeckoRest Library**

A Javascript library for GeckoRest API. 
            
##**Features**

* Using POST, GET, DELETE and UPDATE methods.
* Using Pre-defined functions to create HTTP Requests.

## **Installation**
* **Manual** : download latest from <a href="google.com">here</a>

```    
<script src="jquery.min.js"></script> <!-- GeckoRest is dependent on Jquery library-->
<script src="geckorest.js"></script> 
```

## **Usage**

### **Initialization**

>Initialize first the library by using this syntax:
   
```
GeckoRest.init('<stackgecko_id>');
```

>After initializing the library, you can now use the following functions:

### REGISTER
   
```
GeckoREST.register(endpoint, email, password)
   .then(function(response)){
   
   })
   .catch(function(error)){
   
   });
````

| Parameters       | Description       | Required |
| -----------------|-------------------|---------:|
| endpoint         | Database Table    |true      | 
| email            | Email             |true      |
| password         | Password          |true      |
  
  
### SIGNIN

```
GeckoREST.signin(endpoint, email, password)
    .then(function(response)){
   
    })
    .catch(function(error)){
    
    });
```
| Parameters       | Description       | Required |
| -----------------|-------------------|---------:|
| endpoint         | Database Table    |true      | 
| email            | Email             |true      |
| password         | Password          |true      |

>
>Signin function will response with 'id' and 'jwt' (jsonwebtoken). This jwt or access token will be the one to interact your apis as well as authentication in certain resource. Jwt will be stored in local storage as token. You can access it by using `window.localStorage.getItem('token')`.
>

### SIGNOUT

```
GeckoREST.signout()
```
>
>This function will remove the token from localStorage.
>


### GET
```
GeckoREST.list(endpoint, [query], [options])
    .then(function(response)){
 
    })
    .catch(function(error)){
  
    });
```

| Parameters       | Description         | Required |
| -----------------|---------------------|---------:|
| endpoint         | Database Table      |true      | 
| query(optional)  | Filters             |false     |
| options(optional)| HTTP request headers|false     |

### GET BY ID

```
GeckoREST.fetch(endpoint, id, [options])
    .then(function(response)){
    
    })
    .catch(function(error)){
    
    });
```

| Parameters       | Description         | Required |
| -----------------|---------------------|---------:|
| endpoint         | Database Table      |true      | 
| id               | ID                  |true      |
| options(optional)| HTTP request headers|false     |

### CREATE

```
GeckoREST.create(endpoint, data, [options])
    .then(function(response)){
 
    })
    .catch(function(error)){
    
    });
```

| Parameters       | Description          | Required |
| -----------------|----------------------|---------:|
| endpoint         | Database Table       |true      | 
| data             | Data Object to Create|true      |
| options(optional)| HTTP request headers |false     |

### UPDATE

```
GeckoREST.update(endpoint, id, data, [options])
    .then(function(response)){

    })
    .catch(function(error)){

    });
```

| Parameters       | Description          | Required |
| -----------------|----------------------|---------:|
| endpoint         | Database Table       |true      | 
| data             | Data Object to Update|true      |
| id               | id                   |true      |
| options(optional)| HTTP request headers |false     |

### DELETE

```
GeckoREST.delete(endpoint, id)
    .then(function(response)){

    })
    .catch(function(error)){

    });
```

| Parameters       | Description          | Required |
| -----------------|----------------------|---------:|
| endpoint         | Database Table       |true      | 
| id               | id                   |true      |

## Parameter Values

### QUERIES

These are filters for retrieving data 

| Filter   | Description                                                                         |
| ---------|-------------------------------------------------------------------------------------|
| from     | (integer) default 0. This is the starting index of the matching records to return.  |
| size     | (integer) default 20. This is the maximum number of matching records to return.     |
| sort     | (string) default dateCreated. This is the field to sort by.                         |
| order    | (string) default desc. This is the order to sort by and accepts only “asc” or “desc”.|
| *_lt     | e.g.( age_lt=7 )This will find resources where age is less than 7.                  |
| *_lte    | e.g.(age_lte=7) will find resources where age is less than or equal to 7.           |
| *_gt     | e.g.(age_gt=7) will find resources where age is greater than 7.                     |
| *_gte    | e.g.(age_gte=7) will find resources where age is greater than or equal to 7.        |
| *        | For datatypes like boolean, integer, number and unanazlyed strings, this will return exact values.|
|          | For datatype string and analyzed, this will perform a full-text search.|

### OPTIONS

>You can use Authorization header if your resource is set to "private". Format will be:
>
```
'Authorization' : 'Bearer ' + <token>
```
>This is an example of setting headers from options variable:
```
var token = window.localStorage.getItem('token');
var options = {
		'Authorization': 'Bearer ' + token					
}
```

