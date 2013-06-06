var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.serviceURI = function(method) {
    var scheme = "https";
    var host = "web.engr.oregonstate.edu";
    var servicePath = "cgi-bin/cgiwrap/albertd/labstatus-staging.cgi";
    return scheme + "://" + host + "/" + servicePath + "/" + method;
};

Alloy.Globals.login = function(callback) {
    var username = "";
    var password = "";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            callback();
        },
        onerror: function(e) {
            Ti.API.error(e.error);
            alert("error: " + e.error);
        },
        timeout: 1e4
    });
    client.open("POST", Alloy.Globals.serviceURI("login"));
    client.send({
        username: username,
        password: password
    });
};

Alloy.Globals.HTTPClient = function(data) {
    return client = Ti.Network.createHTTPClient({
        onload: data.onload,
        onerror: function(e) {
            401 == e.source.status ? Alloy.Globals.login(data.retry) : data.onerror(e);
        },
        timeout: 1e4
    });
};

Alloy.createController("index");