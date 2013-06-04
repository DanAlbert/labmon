var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.serviceURI = function(method) {
    var scheme = "https";
    var host = "web.engr.oregonstate.edu";
    var servicePath = "cgi-bin/cgiwrap/albertd/labstatus.cgi";
    return scheme + "://" + host + "/" + servicePath + "/" + method;
};

Alloy.createController("index");