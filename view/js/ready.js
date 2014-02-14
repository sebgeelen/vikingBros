
function getParameterByName(name) {
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
}

function changeScreenTo(idName) {
    $('.screen').addClass("hidden-screen");
    $("#" + idName).removeClass("hidden-screen");
}

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

  // leader board list opener

  $('#leaderboard-screen h2').on('click', function(e) {
    e.preventDefault();
    $(".lb-list").addClass("hidden-list");
    $(this).next().removeClass("hidden-list");
  });

  //  button
  $('#login-button, #logo').on('click', function(e) {
    e.preventDefault();
    changeScreenTo('menu-screen');
  });
  $('#play-button').on('click', function(e) {
    e.preventDefault();
    changeScreenTo('game-screen');
  });
  $('#lb-button').on('click', function(e) {
    e.preventDefault();
    changeScreenTo('leaderboard-screen');
  });
  $('#credit-button').on('click', function(e) {
    window.location.href = 'https://mobilevikings.com/';
  });

});
