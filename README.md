# Resource Ajax

[![licence mit](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://hemersonvianna.mit-license.org/)
[![issues](https://img.shields.io/github/issues/resource-solutions/resource-js-ajax.svg?style=flat-square)](https://github.com/resource-solutions/resource-js-ajax/issues)

## Translations

* [Portuguese - Brazil](translations/pt_BR)

## Introduction

> Asynchronous JavaScript + XML, while not a technology in itself, is a term coined in 2005 by Jesse James Garrett, that describes a "new" approach to using a number of existing technologies together, including: HTML or XHTML, Cascading Style Sheets, JavaScript, The Document Object Model, XML, XSLT, and most importantly the XMLHttpRequest object.
> When these technologies are combined in the Ajax model, web applications are able to make quick, incremental updates to the user interface without reloading the entire browser page. This makes the application faster and more responsive to user actions.

> Although X in Ajax stands for XML, JSON is used more than XML nowadays because of its many advantages such as being lighter and a part of JavaScript. Both JSON and XML are used for packaging information in Ajax model.

> [MDN](https://developer.mozilla.org/en-US/docs/AJAX)


AJAX is not a programming language. Neither is it a software. AJAX is a programming paradigm – a technique.

Modern browsers have an inbuilt object called the XMLHttpRequest object. This object makes it quite easy for a JavaScript to communicate with the server.


## AJAX using Pure JavaScript

### Steps (GET):
#### 1. Create an instance of the XMLHttpRequest object


To create an instance of XHR, you simply need to assign to a variable the `XMLHttpRequest ()` method with the operator `new` to create the instance. So, we'll create an instance as follows:

```javascript
var xhr = new XMLHttpRequest();
```

#### 2. Use open() method of the XHR to specify what kind of data you want

The method `open()` is used to specify the kind of data an object wants from the server. It takes three arguments the type of request, the location of the file on the server, and a synchronous indicator.

 - **request** ‐ This is the type of request you are sending to the server. It takes the value `GET` or `POST`. In simple terms, `GET` is for retrieving something from the server. `POST` is for sending something to the server.
 - **url** ‐ This is the URL of the file on the server. It is can be static or relative URL or simply the path from the folder which contains the web page.
 - **async** ‐ This is used to determine whether or not the request should be executed asynchronously. It takes the value "true" or "false". True is for asynchronous execution. False is for synchronous execution.

```javascript
// open(request, url, async);
xhr.open('GET', 'source/test.txt', true);   
```

#### 3. Create a function to utilize the results

An XHR object has many inbuilt variables in which it stores data retrieved from the server. One of these variables is called `responseText`. Usually contains any text information retrieved from the server.

When we call `xhr.open()`, it will fetch the text information stored `test.txt` and store it in its responseText variable. So, to access the data, we simply have to call `xhr.responseText`.

Our goal is to populate `<div id="container">` with the new text read from the server, we use the `document.getElementById()`. So, we shall create an anonymous function as follows:

```javascript
function() {
  document.getElementById("container").innerHTML = xhr.responseText;
}
```

This function basically replaces the HTML found in the `<div> container` with the text fetched from the server.

#### 4. Use the XHR’s `send()` method to send the request

The `send()` method is used to send the request to the server. It doesn’t take any parameters, so you simply call it as follows:

```javascript
xhr.send(null);
```

#### 5. Receive the response

The XHR has two properties are used to indicate a response from the server. The first is `readyState`, and the second is `status`.

The `readyState` property records how the request is progressing. It returns a numerical value, numbered `0` to `4` which indicate different states of progress.

 - 0 ‐ request not initialized
 - 1 ‐ connection to server established
 - 2 ‐ request received by server
 - 3 ‐ server is processing the request
 - 4 ‐ the request has been processed, and the response is ready

The `status` property indicates whether or not the request was successfully executed.

 - 200 ‐ request successfully executed and response delivered
 - 404 ‐ page not found

You can access these properties by referencing them from the XHR variable as follows: `xhr.readyState` or `xhr.status`.
Before retrieving any of the XHR's other variables how `responseText`, we have to ensure that the `readyState` is `4` and `status` is `200`.

#### Example of the above steps
 
In the example the `initXhr() ', serve only to demonstrate what needed to be done to support for IE prior to 7. This function can be disregarded and use only:

```javascript
var xhr = new XMLHttpRequest();
```
 
Check [script.js](https://github.com/resource-solutions/resource-js-ajax/blob/master/source/script.js)

## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -m 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

## Log

Check [Releases](https://github.com/resource-solutions/resource-js-ajax/releases) for detailed changelog.

## License

[MIT license](http://hemersonvianna.mit-license.org/) © Hemerson Vianna
