# angular-swagger-ui

angular-swagger-ui is an angularJS implementation of [Swagger UI](http://swagger.io)

Swagger helps you documenting your RESTful API.

Swagger UI helps developers discovering your RESTful API by providing an online documentation with an integrated API explorer.

### Warning 
> Only JSON Swagger 2.0 is supported

> Authentication is not implemented, please use modules to customize API calls

## Quick Start

### Install

`bower install angular-swagger-ui --save`

### Dependencies

1. [angularJS](https://angularjs.org)
2. [bootstrap CSS](http://getbootstrap.com)

## Demo

A builded version of the angular-swagger-ui is available at this address:

http://orange-opensource.github.io/angular-swagger-ui

## License

All code in this repository is covered by the [MIT license](http://opensource.org/licenses/MIT).
See LICENSE file for copyright details.

## Getting Started

Include angular-swagger-ui as a dependency into your application

As some properties of Swagger descriptors can be formatted as HTML:

* You **SHOULD** include "ngSanitize" as a dependency into your application (avoids JS injection) if Swagger descriptors are loaded from **untrusted** sources (see dist/index.html as an example)
* You **CAN** add trusted-sources="true" as directive parameter (avoids embedding "ngSanitize") if Swagger descriptors are loaded from **trusted** sources (see src/index.html as an example)
* You **MUST** at least choose one of the two previous solutions

```
<script type="text/javascript">
	angular.module('yourApp', ['swaggerUi']);
	...
	// OR if you choosed to use "ngSanitize"
	angular.module('yourApp', ['ngSanitize', 'swaggerUi']);
	...
</script>
```
Create an HTML element in your angularJS application's template or in your HTML page
```
<div swagger-ui url="URLToYourSwaggerDescriptor" api-explorer="true"></div>
```
Add swagger-ui.min.js and angular.min.js to the end of the body
```
<body>
 	...
 	<script src="yourPathToAngularJS/angular.min.js"></script>
 	<script src="yourPathToAngularSwaggerUI/dist/scripts/swagger-ui.min.js"></script>
 	<!-- if you choosed to use "ngSanitize" -->
 	<script src="yourPathToAngularSanitize/angular-sanitize.min.js"></script>
</body>
```
Add swagger-ui.min.css and bootstrap.min.css to the head of the HTML page.
```
<body>
	<head>
		...
		<link rel="stylesheet" href="yourPathToBootstrapCSS/bootstrap.min.css">
		<link rel="stylesheet" href="yourPathToAngularSwaggerUI/dist/css/swagger-ui.min.css">
  	</head>
</body>
```
## Customization

#### Enable or disable API explorer
```
<div swagger-ui url="URLToYourSwaggerDescriptor" api-explorer="true/false"></div>
```

#### Swagger descriptor loading indicator
```
<div ng-show="yourScopeVariable">loading ...</div>
<div swagger-ui url="URLToYourSwaggerDescriptor" loading="yourScopeVariable"></div>
```

#### Define an error handler to catch Swagger descriptor loading errors
```
<div swagger-ui url="URLToYourSwaggerDescriptor" error-handler="yourErrorHandler"></div>
```
```
$scope.yourErrorHandler = function(/*HTTP response*/ response, /*HTTP status*/ status){
	
}
```

#### Enable Swagger external references
See [Swagger 2.0 spec](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#relative-schema-file-example)
Add swagger-external-references.min.js to the end of the body
```
<body>
 	...
 	<script src="yourPathToAngularJS/angular.min.js"></script>
 	<script src="yourPathToAngularSwaggerUI/dist/scripts/swagger-ui.min.js"></script>
 	<script src="yourPathToAngularSwaggerUI/dist/scripts/modules/swagger-external-references.min.js"></script>
</body>
```
Add module to angular-swagger-ui
```
angular
    .module('myApp', ['swaggerUi'])
    .run(function(swaggerModules, swaggerUiExternalReferences){
        swaggerModules.add(swaggerModules.BEFORE_PARSE, swaggerUiExternalReferences);
    })
    ...
```

#### Enable XML formatter on API explorer responses
Add swagger-xml-formatter.min.js to the end of the body
```
<body>
 	...
 	<script src="yourPathToAngularJS/angular.min.js"></script>
 	<script src="yourPathToAngularSwaggerUI/dist/scripts/swagger-ui.min.js"></script>
 	<script src="yourPathToAngularSwaggerUI/dist/scripts/modules/swagger-xml-formatter.min.js"></script>
</body>
```
Add module to angular-swagger-ui
```
angular
    .module('myApp', ['swaggerUi'])
    .run(function(swaggerModules, swaggerUiXmlFormatter){
        swaggerModules.add(swaggerModules.AFTER_EXPLORER_LOAD, swaggerUiXmlFormatter);
    })
    ...
```

#### Writing your own modules
Modifying angular-swagger-ui can be achieved by writing your own modules. As an example your can have a look at the ones in src/scripts/modules.
A module is an object (can be a service) having a function "execute" which must return a promise.

You can make your module modifying behaviours at different phases:

* BEFORE_LOAD: allows modifying Swagger descriptor request before it is sent
* BEFORE_PARSE: allows modifying Swagger descriptor after it has been loaded
* PARSE: allows adding a Swagger parser for content types other than JSON
* BEFORE_DISPLAY: allows modifying internal parsed Swagger descriptor before it is displayed
* BEFORE_EXPLORER_LOAD: allows modifying API explorer request before it is sent
* AFTER_EXPLORER_LOAD: allows modifying API explorer response before it is displayed

```
angular
	.module('myApp', ['swaggerUi'])
	.run(function(swaggerModules, myModule){
		swaggerModules.add(swaggerModules.BEFORE_LOAD, myModule);
	})
	.service('myModule', function($q) {

		this.execute = function() {
			var deferred = $q.defer();
			// if success: call deferred.resolve();
			// if error: call deferred.reject({message: 'error message', code: 'error_code'});
			return deferred.promise;
		}

	})
	...

```
