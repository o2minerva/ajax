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

### Steps
#### 1. Create an instance of the XMLHttpRequest object

To create an instance of XHR, you simply get a variable name, and use the new XMLHttpRequest() method to crate the instance. Let’s call our instance “xhr”. So, we’ll create an instance as follows

```javascript
xhr = new XMLHttpRequest();
```
#### 2. Use open() method of the XHR to specify what kind of data you want
The XHR’s open() is used to specify the kind of data an object wants from the server. You basically use it to describe what you want from the server. It takes three arguments i.e. the type of request, the location of the file on the server, and a synchronous indicator. Calling it looks like this:

They are broken down as follows:

 - request ‐ this is the type of request you are sending to the server. It takes one of two values: GET or POST. In simple terms, GET is for retrieving something from the server. POST is for sending something to the server.
 - url ‐ this is the URL of the file on the server. It is can be static or relative URL or simply the path from the folder which contains the web page.
 - async ‐ this is used to determine whether or not the request should be executed asynchronously. It takes the value “true” or “false”. True is for asynchronous execution. False is for synchronous execution.

In our case, we shall call the open() method as follows:

```javascript
// open(mode, url, boolean);
xhr.open('GET', 'source/test.txt', true);   
```
#### 3. Create a function to utilize the results
An XHR object has many inbuilt variables in which it stores data retrieved from the server. One of these variables is called responseText. Now, responseText usually contains any text information retrieved from the server.

When we call xhr.open(), it will fetch the text information stored “ajax_data.txt” and store it in its responseText variable. So, to access the data, we simply have to call xhr.responseText

Since our goal is to replace the <h2> in the <div id=”myContent”> with the new text read from the server, we use the document.getElementById(). So, we shall create an anonymous function as
follows:

```javascript
function() {
  document.getElementById("container").innerHTML = xhr.responseText;
}
```
This function basically replaces the HTML found in the <div> “myContent” with the text fetched from the server. Where shall we call this function? We’ll get to that shortly.

#### 4. Use the XHR’s send() method to send the request
The send() method is used to send the request to the server. It doesn’t take any parameters, so you simply call it as follows:

```javascript
xhr.send(null);
```

#### 5. Receive the response
How do you know when a response has come from the server? Well, XHR has two properties are used to indicate a response from the server. The first is "readyState", and the second is "status".
The "readyState" property records how the request is progressing. It returns a numerical value, numbered 0 to 4 which indicate different states of progress. The numbers translate as follows:
- 0 ‐ request not initialized
- 1 ‐ connection to server established
- 2 ‐ request received by server
- 3 ‐ server is processing the request
- 4 ‐ the request has been processed, and the response is ready

The "status" property indicates whether or not the request was successfully executed.
200 ‐ request successfully executed and response delivered
404 ‐ page not found
You can access these properties by referencing them from the XHR variable as follows: xhr.readyState or xhr.status

In fact, it is better to test these values in the function (mentioned in 3 above) before attempting to retrieve the other values. Before retrieving any of the XHR’s other variables (e.g the responseText), we have to ensure that the "readyState" is 4 and "status" is 200.

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
