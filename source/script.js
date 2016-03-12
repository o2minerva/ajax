var initXhr = function() {
  var xmlhttp;
  if ( window.XMLHttpRequest ) {
    //code for IE7,firefox chrome and above
    xmlhttp = new XMLHttpRequest();
  } else {
    // add support for different version of IE
    var versions = ["Microsoft.XMLHTTP", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.6.0"];
    for (var i = 3; i--;) {
      try {
        variable = new ActiveXObject(names[i]);
        break;
      } catch (e) { }
    }
  }

  if( !xmlhttp ) {
    throw new Error("This browser does not support XMLHttpRequest.");
  }

  return xmlhttp;
}

var load = function(request, uri, async) {
  var xhr = initXhr();
  /*
  * Creating a HTTP request
  * @param request {String} "GET" or "POST"
  * @param uri {String} Resources URI
  * @param async {Boolean} Asynchronous or not. True if Ajax.
  */
  xhr.open(request, uri, async);
  /*
  * Customize request header
  * @param header {String} Header. Like 'Content-type'.
  * @param value {String} Value of header. Like 'text'.
  */
  xhr.setRequestHeader("Content-type", "text/plain");

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        document.getElementById("container").innerHTML = xhr.responseText;
      } else {
        alert("Operation failed.");
      }
    }
  }
  /*
  * Send the request
  * @param content {String} Body of the http request. Only needed in POST method
  */
  xhr.send();
}


load('GET', 'source/test.txt', true);
