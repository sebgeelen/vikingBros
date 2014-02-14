
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
  $("#logo").show();
}

var user = null;
function loadAllUserData () {
  $.ajax({
    url: '/api/users/' + userId,
    dataType: 'json',
    method: 'GET',
    success: function(data) {
      user = data;
      console.log("get user data");
      changeScreenTo('menu-screen');
    }
  });
}

var goldArray = [],
    bestArray = [],
    totalArray = [];
function calculLeaderBoard() {
  $.ajax({
    url: '/api/friendlist/' + userId,
    dataType: 'json',
    method: 'GET',
    success: function(data) {
      user = data;
      console.log("get user data");

      for (var i = data.length - 1; i >= 0; i--) {
        goldArray[data[i].score_total] = {"name" : data[i].name, "i" : data[i].score_total};
        bestArray[data[i].distance_best] = {"name" : data[i].name, "i" : data[i].distance_best};
        totalArray[data[i].distance_total] = {"name" : data[i].name, "i" : data[i].distance_total};
      }

    }
  });
}

$(function() {

  var fbToken = getParameterByName("code");
  if(fbToken) {
    //http://localhost:3000/?code=AQB0D13a9KKE7EjmfxnNJhLcq0oCgFYnwec2bEnRohtXolwS5rFbz-eJgpBH0UKmaxRFBVXeD9SpRo0Bm2oGPKM-dDNFn_bOOKw8rMnaa5srAB4rBhaU4iHaa4HEKAVvPXuJEiAhWWCzrpHzGqYQpN_xyn4O5Ydkdh_Ce5HwEvXNLXonbNxxbOMuMXimf7wEfrYaWfiP7jyZAhyKhmrqwS368sdwnfiZn3vNPpbqtaOhcN6xCjnEt_UHQJ4LAMpb8Fu_SgpfSdf3NRoDvBvEVimL41_YU5WjJZSao9-NrmwFxnhICUmAfdb5aEbUSS1WKuE&state=9f17b3e17ae396a627d5d1d551d92cf7#_=_
    // send fb token to the api
    $.ajax({
      url: '/api/facebook',
      dataType: 'json',
      method: 'POST',
      data: "code=" + fbToken,
      success: function(data) {
        console.log("fb url sent");
        userId = data.id;
        loadAllUserData();
      }
    });

  } else if( !$("#login-screen").hasClass('hidden-screen') ) {

    //  button
    $('#login-button, #logo').on('click', function(e) {
      e.preventDefault();
      window.location.href = $(this).text("loading ...").data("href");
      //
    });
    // get fb url
    $.ajax({
      url: '/api/facebook',
      dataType: 'json',
      success: function(data) {
        $('#login-button').text("Login").data('href', data.authUrl);
        console.log("fb url received ("+data.authUrl+")");
      }
    });
  }

  // leader board list opener

  $('#leaderboard-screen h2').on('click', function(e) {
    e.preventDefault();

    $(".lb-list").addClass("hidden-list");
    $(this).next().removeClass("hidden-list");
  });

  // button
  $('#logo').on('click', function(e) {
    e.preventDefault();
    changeScreenTo('menu-screen');
  });
  $('#play-button').on('click', function(e) {
    e.preventDefault();
    changeScreenTo('game-screen');
    $("#logo").hide();
    // startGame();
  });
  $('#lb-button').on('click', function(e) {
    e.preventDefault();
    calculLeaderBoard();
    changeScreenTo('leaderboard-screen');
  });
  $('#credit-button').on('click', function(e) {
    window.location.href = 'https://mobilevikings.com/';
  });

});
