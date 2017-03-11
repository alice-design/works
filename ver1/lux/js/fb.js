window.fbAsyncInit = function() {
    FB.init({
        appId      : '170582636468453',
        // channelUrl : '//yourdomain.com/channel.html',
        status     : true,
        cookie     : true,
        xfbml      : true
    });

};
    // FB.getLoginStatus(checkLoginStatus);

    function checkLoginStatus(response) {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // console.log('user connected' + response.authResponse.userID);
                uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;

                FB.api({
                    method: 'fql.query',
                    query: 'SELECT uid, name, email, pic_big FROM user WHERE uid = ' + uid
                }, function(rep){
                    if (!isEmpty(rep)) {
                        fb_id    = rep[0].uid;
                        fb_name  = rep[0].name;
                        fb_email = rep[0].email;
                    }
                    // console.log(fb_id);
                    // console.log(fb_name);
                    // console.log(fb_email);
                    sec1away();
                });

            } else if (response.status === 'not_authorized') {
                // console.log('user not authorize');
                fbLogin();
            } else {
                // the user isn't logged in to Facebook.
                // console.log('user not login');
                fbLogin();
            }
        });
        return false;
    }

    function fbLogin() {

        FB.login(function(response){
            
            if (response.authResponse) {
                
                var uid = response.authResponse.userID;
                var fbaccess_token = response.authResponse.accessToken;

                // console.log('login ' + uid);
                // console.log(fbaccess_token);

                FB.api({
                    method: 'fql.query',
                    query: 'SELECT uid, name, email, pic_big FROM user WHERE uid = ' + uid
                }, function(rep){
                    if (!isEmpty(rep)) {
                        fb_id    = rep[0].uid;
                        fb_name  = rep[0].name;
                        fb_email = rep[0].email;
                        if (_ajaxStart == false) {
                            $.ajax({
                                url: "http://event.luxgen-motor.com.tw/u6/httphandler/connect.ashx",
                                type: "post",
                                data: "name=" + fb_name + "&fbid=" + fb_id + "&email=" + fb_email,
                                dataType: "json",
                                success: function (data) {
                                    // console.log(data);
                                    if (data.ErrorString == "error") {
                                        alert("請重新登入 Facebook");
                                    } else {
                                        sec1away();
                                    }
                                },
                                error: function (err) {
                                    // alert("Ooos! " + err);
                                    alert("請重新登入");

                                }
                            });
                        }
                    }
                });

            } else {
                // console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_likes'});

    }


    // function setCookie(c_name, value, exdays) {
    //     var exdate = new Date();
    //     //  save cookie in 5 min.
    //     exdate.setTime(exdate.getTime() + (5 * 60) * 1000);
    //     var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    //     document.cookie = c_name + "=" + c_value;
    // }

    // function getCookie(c_name) {
    //     var i, x, y, ARRcookies = document.cookie.split(";");
    //     for (i = 0; i < ARRcookies.length; i++) {
    //         x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    //         y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    //         x = x.replace(/^\s+|\s+$/g, "");
    //         if (x == c_name) {
    //             return unescape(y);
    //         }
    //     }
    // }