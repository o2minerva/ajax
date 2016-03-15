var load = function(request, uri, async) {
  var xhr = new XMLHttpRequest();

  xhr.open(request, uri, async);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        var doc = xhr.responseXML;
        var element = doc.getElementsByTagName('root').item(0);
        document.getElementById("container").innerHTML = element.firstChild.data;
      } else {
        alert("Operation failed.");
      }
    }
  }
  xhr.send(null);
}

load('GET', '/source/more-examples/xml/test.xml', true);
