// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/zh_TW/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));

window.fbAsyncInit = function() { 
    
    FB.init({
        appId      : '170582636468453', // App ID
        channelURL : '//event.luxgen-motor.com.tw/u6_turbo/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        oauth      : true, // enable OAuth 2.0
        xfbml      : true  // parse XFBML
    }); // End FB.init.

    FB.getLoginStatus(function(rep){
        if (rep.status == 'connected') {
            var uid = rep.authResponse.userID;
            var fbaccess_token = rep.authResponse.accessToken;

            FB.api({
                method: 'fql.query',
                query: 'SELECT uid, name, email, pic_big FROM user WHERE uid = ' + uid
            }, function(response){
                // if (response) {
                //     u_id      = response.id;
                //     userName  = response.name;
                //     userEmail = response.email;
                // }
                alert(uid);
            });
            alert('connect');
        } else {
            alert('no connect');
        }
    });

}