# AJAX - XML

## xhr.responseXML

```javascript
var doc = xhr.responseXML;
var element = doc.getElementsByTagName('root').item(0);
document.getElementById("container").innerHTML = element.firstChild.data;
```
