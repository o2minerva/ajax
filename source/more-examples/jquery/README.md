# AJAX - jQuery

## Modules

### xhr.js

```javascript
jQuery.ajaxSettings.xhr = function() {
  try {
    return new window.XMLHttpRequest();
  } catch ( e ) {}
};

var xhrSuccessStatus = {
  // File protocol always yields status code 0, assume 200
  0: 200,
  // Support: IE9 only
  // #1450: sometimes IE returns 1223 when it should be 204
  1223: 204
},
xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
  var callback, errorCallback;

  // Cross domain only allowed if supported through XMLHttpRequest
  if ( support.cors || xhrSupported && !options.crossDomain ) {
    return {
      send: function( headers, complete ) {
        var i,
          xhr = options.xhr();

        xhr.open(
          options.type,
          options.url,
          options.async,
          options.username,
          options.password
        );

        // Apply custom fields if provided
        if ( options.xhrFields ) {
          for ( i in options.xhrFields ) {
            xhr[ i ] = options.xhrFields[ i ];
          }
        }

        // Override mime type if needed
        if ( options.mimeType && xhr.overrideMimeType ) {
          xhr.overrideMimeType( options.mimeType );
        }

        // X-Requested-With header
        // For cross-domain requests, seeing as conditions for a preflight are
        // akin to a jigsaw puzzle, we simply never set it to be sure.
        // (it can always be set on a per-request basis or even using ajaxSetup)
        // For same-domain requests, won't change header if already provided.
        if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
          headers[ "X-Requested-With" ] = "XMLHttpRequest";
        }

        // Set headers
        for ( i in headers ) {
          xhr.setRequestHeader( i, headers[ i ] );
        }

        // Callback
        callback = function( type ) {
          return function() {
            if ( callback ) {
              callback = errorCallback = xhr.onload =
                xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

              if ( type === "abort" ) {
                xhr.abort();
              } else if ( type === "error" ) {

                // Support: IE9 only
                // On a manual native abort, IE9 throws
                // errors on any property access that is not readyState
                if ( typeof xhr.status !== "number" ) {
                  complete( 0, "error" );
                } else {
                  complete(

                    // File: protocol always yields status 0; see #8605, #14207
                    xhr.status,
                    xhr.statusText
                  );
                }
              } else {
                complete(
                  xhrSuccessStatus[ xhr.status ] || xhr.status,
                  xhr.statusText,

                  // Support: IE9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  ( xhr.responseType || "text" ) !== "text"  ||
                  typeof xhr.responseText !== "string" ?
                    { binary: xhr.response } :
                    { text: xhr.responseText },
                  xhr.getAllResponseHeaders()
                );
              }
            }
          };
        };

        // Listen to events
        xhr.onload = callback();
        errorCallback = xhr.onerror = callback( "error" );

        // Support: IE9 only
        // Use onreadystatechange to replace onabort
        // to handle uncaught aborts
        if ( xhr.onabort !== undefined ) {
          xhr.onabort = errorCallback;
        } else {
          xhr.onreadystatechange = function() {

            // Check readyState before timeout as it changes
            if ( xhr.readyState === 4 ) {

              // Allow onerror to be called first,
              // but that will not handle a native abort
              // Also, save errorCallback to a variable
              // as xhr.onerror cannot be accessed
              window.setTimeout( function() {
                if ( callback ) {
                  errorCallback();
                }
              } );
            }
          };
        }

        // Create the abort callback
        callback = callback( "abort" );

        try {

          // Do send the request (this may raise an exception)
          xhr.send( options.hasContent && options.data || null );
        } catch ( e ) {

          // #14683: Only rethrow if this hasn't been notified as an error yet
          if ( callback ) {
            throw e;
          }
        }
      },

      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
});
```

### script.js

```javascript
// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
  if ( s.crossDomain ) {
    s.contents.script = false;
  }
});
// Install script dataType
jQuery.ajaxSetup( {
  accepts: {
    script: "text/javascript, application/javascript, " +
      "application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /\b(?:java|ecma)script\b/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
});
// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
  }
});
// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
  // This transport only deals with cross domain requests
  if ( s.crossDomain ) {
    var script, callback;
    return {
      send: function( _, complete ) {
        script = jQuery( "<script>" ).prop( {
          charset: s.scriptCharset,
          src: s.url
        } ).on(
          "load error",
          callback = function( evt ) {
            script.remove();
            callback = null;
            if ( evt ) {
              complete( evt.type === "error" ? 404 : 200, evt.type );
            }
          }
        );

        // Use native DOM manipulation to avoid our domManip AJAX trickery
        document.head.appendChild( script[ 0 ] );
      },
      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
});
```

### parseXML.js

```javascript
// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
  var xml;
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  // Support: IE 9-11 only
  // IE throws on parseFromString with invalid input.
  try {
    xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
  } catch ( e ) {
    xml = undefined;
  }

  if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};

return jQuery.parseXML;
```

### load.js

```javascript
/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
  var selector, type, response,
    self = this,
    off = url.indexOf( " " );

  if ( off > -1 ) {
    selector = jQuery.trim( url.slice( off ) );
    url = url.slice( 0, off );
  }

  // If it's a function
  if ( jQuery.isFunction( params ) ) {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  } else if ( params && typeof params === "object" ) {
    type = "POST";
  }

  // If we have elements to modify, make the request
  if ( self.length > 0 ) {
    jQuery.ajax( {
      url: url,

      // If "type" variable is undefined, then "GET" method will be used.
      // Make value of this field explicit since
      // user can override it through ajaxSetup method
      type: type || "GET",
      dataType: "html",
      data: params
    } ).done( function( responseText ) {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

        // Otherwise use the full result
        responseText );

    // If the request succeeds, this function gets "data", "status", "jqXHR"
    // but they are ignored because response was set above.
    // If it fails, this function gets "jqXHR", "status", "error"
    } ).always( callback && function( jqXHR, status ) {
      self.each( function() {
        callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
      } );
    } );
  }

  return this;
};
```

### jsonp.js

```javascript
var oldCallbacks = [],
  rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
  jsonp: "callback",
  jsonpCallback: function() {
    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
    this[ callback ] = true;
    return callback;
  }
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
      "url" :
      typeof s.data === "string" &&
        ( s.contentType || "" )
          .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
        rjsonp.test( s.data ) && "data"
    );

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
      s.jsonpCallback() :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ) {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    } else if ( s.jsonp !== false ) {
      s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    }

    // Use data converter to retrieve json after script execution
    s.converters[ "script json" ] = function() {
      if ( !responseContainer ) {
        jQuery.error( callbackName + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // Force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function() {
      responseContainer = arguments;
    };

    // Clean-up function (fires after converters)
    jqXHR.always( function() {

      // If previous value didn't exist - remove it
      if ( overwritten === undefined ) {
        jQuery( window ).removeProp( callbackName );

      // Otherwise restore preexisting value
      } else {
        window[ callbackName ] = overwritten;
      }

      // Save back as free
      if ( s[ callbackName ] ) {

        // Make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // Save the callback name for future use
        oldCallbacks.push( callbackName );
      }

      // Call if it was a function and we have a response
      if ( responseContainer && jQuery.isFunction( overwritten ) ) {
        overwritten( responseContainer[ 0 ] );
      }

      responseContainer = overwritten = undefined;
    } );

    // Delegate to script
    return "script";
  }
});
```
