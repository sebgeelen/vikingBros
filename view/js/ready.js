var getParameterByName;
getParameterByName = function(name) {
  var regex, regexS, results;
  name    = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  regexS  = "[\\?&]" + name + "=([^&#]*)";
  regex   = new RegExp(regexS);
  results = regex.exec(window.location.search);
  if (results === null) {
    return false;
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
};


$(function() {

  var fbToken = getParameterByName("fbcallbacktoken");
  if(fbToken) {
    // send fb token to the api
    $.ajax({
      url: '/api/facebook',
      dataType: 'json',
      method: 'POST',
      data: "token=" + fbToken,
      success: function(data) {
        console.log("fb url sent");
      }
    });

  } else if( !$("#login-screen").hasClass('hidden-screen') ) {
    // get fb url
    $.ajax({
      url: '/api/facebook',
      dataType: 'json',
      success: function(data) {
        console.log("fb url received");
      }
    });

  }

  // login button
  $('#login-button').on('click', function(e) {
    e.preventDefault();

    console.log('login click');

    $('.screen').addClass("hidden-screen");
    $("#menu-screen").removeClass("hidden-screen");

  });

});
