function rand(number) {
	return Math.ceil(Math.random()*number);
}

function SetClickTracksCookies()
{
	// This sets the persistent cookie for unique visitors and tracking latent purchases
	var thisCookie = GetCookie_clicktracks("CLICKTRACKS_PERSISTENT");
    var myValue = thisCookie;
	if( thisCookie == null)
	{
		//Setup the random cookie value
		myValue = new Date();
		var randNum = rand(100);		
		//myValue = myValue.toGMTString() + "_" + randNum;
		myValue = myValue.getTime() + "_" + randNum;

		//Setup the expiry date to expire in 2010
		var expiryDate = new Date();
		var date2010 = "Fri, 31 Dec 2030 23:00:00 EST";
		var dt = Date.parse(date2010);

		expiryDate.setTime(dt);

		SetCookie_clicktracks("CLICKTRACKS_PERSISTENT", myValue, expiryDate, "/", window.location.hostname);
	}     
	// This sets the session cookie for maintaining session integrity
	// Set to 15 minutes by default.  Change var minutes value to adjust session length
	
	var minutes = 15;
	var session = GetCookie_clicktracks("CLICKTRACKS_SESSION");
	var scdt = new Date();
	var sdt = new Date(scdt.getMilliseconds + (minutes * 60 * 1000));

        var sessionVal;
        if(session==null){
           sessionVal=myValue + "=" + scdt.toGMTString() + "_" + rand(100);
        }else{
           sessionVal=session;
        }

        SetCookie_clicktracks("CLICKTRACKS_SESSION", sessionVal, sdt, "/", window.location.hostname);
}


// ---------------------------------------------------------------
    //  Cookie Functions - Second Helping  (21-Jan-96)
    //  Written by:  Bill Dortch, hIdaho Design <BDORTCH@NETW.COM>
    //  The following functions are released to the public domain.
    //
    // "Internal" function to return the decoded value of a cookie
    //
    function getCookieVal (offset) {
      var endstr = document.cookie.indexOf (";", offset);
      if (endstr == -1)
        endstr = document.cookie.length;
      return unescape(document.cookie.substring(offset, endstr));
    }

    //
    //  Function to return the value of the cookie specified by "name".
    //    name - String object containing the cookie name.
    //    returns - String object containing the cookie value, or null if
    //      the cookie does not exist.
    //
    function GetCookie_clicktracks (name) {
      var arg = name + "=";
      var alen = arg.length;
      var clen = document.cookie.length;
      var i = 0;
      while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
          return getCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
      }
      return null;
    }

    //
    //  Function to create or update a cookie.
    //    name - String object object containing the cookie name.
    //    value - String object containing the cookie value.  May contain
    //      any valid string characters.
    //    [expires] - Date object containing the expiration data of the cookie.  If
    //      omitted or null, expires the cookie at the end of the current session.
    //    [path] - String object indicating the path for which the cookie is valid.
    //      If omitted or null, uses the path of the calling document.
    //    [domain] - String object indicating the domain for which the cookie is
    //      valid.  If omitted or null, uses the domain of the calling document.
    //    [secure] - Boolean (true/false) value indicating whether cookie transmission
    //      requires a secure channel (HTTPS).  
    //
    //  The first two parameters are required.  The others, if supplied, must
    //  be passed in the order listed above.  To omit an unused optional field,
    //  use null as a place holder.  For example, to call SetCookie using name,
    //  value and path, you would code:
    //
    //      SetCookie ("myCookieName", "myCookieValue", null, "/");
    //
    //  Note that trailing omitted parameters do not require a placeholder.
    //
    //  To set a secure cookie for path "/myPath", that expires after the
    //  current session, you might code:
    //
    //      SetCookie (myCookieVar, cookieValueVar, null, "/myPath", null, true);
    //
    function SetCookie_clicktracks (name, value) {
      var argv = SetCookie_clicktracks.arguments;
      var argc = SetCookie_clicktracks.arguments.length;
      var expires = (argc > 2) ? argv[2] : null;
      var path = (argc > 3) ? argv[3] : null;
      var domain = (argc > 4) ? argv[4] : null;
      var secure = (argc > 5) ? argv[5] : false;
            
      //document.cookie = name + "=" + escape (value) +
      thecookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        //((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
      document.cookie = thecookie;
    }

    //  Function to delete a cookie. (Sets expiration date to current date/time)
    //    name - String object containing the cookie name
    //
    function DeleteCookie (name) {
      var exp = new Date();
      exp.setTime (exp.getTime() - 1);  // This cookie is history
      var cval = GetCookie_clicktracks (name);
      document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
    }

//---------------------------------------------------------------------------------------------



//Call the SetClickTracksCookies() function

SetClickTracksCookies();
