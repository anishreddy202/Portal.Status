# Data Model Design

The design of the data model should be with the following goals and objectives.

	1. Database Maintenance Free
	2. Minimal Database Chatter
	3. Manual File Manipulation over Database Design

## File: schema.json
* A file system stored file that changes or alterations to would require a file drop.

#### Purpose:
Defines the default object information ie: Enum values that can be used by validation code.  The general rule is that all objects have a 3 letter 'code' that can be used by interfaces for language localization but also has a potential friendly name that can be used by default if desired.

__categories__ *(General Product Definition)*  ie: CDN, Transact

```javascript
{
	"categories" : [
		{
	      "code": "CDN",
	      "name": "CDN"
		}
	]
}
```

__systems__ *(Single Systems)*  ie:  MCC, On-Demand Streaming

```javascript
{
	"systems" : [
		{
	      "code": "MCC",
	      "name": "CDN CONTROL CENTER"
		}
	]
}
```

__services__ *(Product Service Offerings)*  ie:  HTTP Large, HTTP Small

```javascript
{
	"services" : [
		{
	      "code": "HLG",
	      "name": "HTTP LARGE"
		}
	]
}
```


__locations__ *(Points of Presences POPs)*  ie:  IAD Ashburn,  DFW Dallas

```javascript
{
	"locations" : [
		{
      		"code": "DCA",
      		"name": "ASHBURN",
      		"region": "AMERICAS"
		}
	]
}
```

__conditions__ *(Possible Status Codes)*  ie:  OK

```javascript
{
	"conditions" : [
		{
      		"status": "OK"
		}
	]
}
```


## File: mapping.json
* A file system stored file that changes or alterations require file drop.

#### Purpose:
Defines the list of categoy relationships between schema objects and allows the enable or disable of locations.

__list of categories__ *(Array)* 

```javascript
[
	{
		"code" :"CDN",
    	"name": "CDN",
    	"systems": [
	    	{
	        "code": "MCC",
	        "name": "CDN CONTROL CENTER"
	      	}
    	],
    	"services": [
    		"code": "HLG",
        	"name": "HTTP LARGE",
        	"locations" : [
        		{ 
        			"code": "DCA",         "enabled": true,
            	  	"name": "ASHBURN",     "region": "AMERICAS" 
            	}
        	]
    	]
	}
]
```

## DB Entry: 
* A full document of details on the state of status at current point in time.

#### Purpose:
A database row is saved every time there is a change commited to the status report.

__document__

```javascript
{
	"_id": ObjectId("54d11347e1c649ef6474c8c1"),
	"time": "2012-11-04T14:51:06.157Z",
  	"report": [
		{
			"code" :"CDN",
	    	"name": "CDN",
	    	"systems": [
		    	{
		        "code": "MCC",
		        "name": "CDN CONTROL CENTER",
		        "status": "OK"
		      	}
	    	],
	    	"services": [
	    		"code": "HLG",
	        	"name": "HTTP LARGE",
	        	"locations" : [
	        		{ 
	        			"code": "DCA",         "enabled": true,
	            	  	"name": "ASHBURN",     "region": "AMERICAS",
	            	  	"status": "OK"
	            	}
	        	]
	    	]
		}
	]
}
```