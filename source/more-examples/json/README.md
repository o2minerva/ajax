# AJAX - JSON

## JSON.parse

```javascript
var doc = JSON.parse(xhr.responseText);
var commands = doc.commands;
var list = '';

for (var i = 0, len = commands.length; i < len; i++) {
  list += '<li>'+commands[i].title+' - '+commands[i].action+'</li>';
}

document.getElementById("container").innerHTML = list;
```
