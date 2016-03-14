var jqxhr = $.ajax({
    method: "GET",
    dataType: "json",
    url: "test.json"
  })
  .done(function(data) {
    console.log( "success" );
    var commands = data.commands;
    var list = '';
    for (var i = 0, len = commands.length; i < len; i++) {
      list += '<li>'+commands[i].title+' - '+commands[i].action+'</li>';
    }
    document.getElementById("container").innerHTML = list;
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
