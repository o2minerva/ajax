var load = function(request, uri, async) {
  var xhr = new XMLHttpRequest();

  xhr.open(request, uri, async);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        var doc = JSON.parse(xhr.responseText);
        var commands = doc.commands;
        var list = '';
        for (var i = 0, len = commands.length; i < len; i++) {
          list += '<li>'+commands[i].title+' - '+commands[i].action+'</li>';
        }
        document.getElementById("container").innerHTML = list;
      } else {
        alert("Operation failed.");
      }
    }
  }
  xhr.send(null);
}

load('GET', 'test.json', true);
