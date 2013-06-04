function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.printer_details = Ti.UI.createWindow({
        id: "printer_details",
        title: "Printer Details"
    });
    $.__views.printer_details && $.addTopLevelView($.__views.printer_details);
    $.__views.name = Ti.UI.createLabel({
        id: "name"
    });
    $.__views.printer_details.add($.__views.name);
    $.__views.status = Ti.UI.createLabel({
        id: "status"
    });
    $.__views.printer_details.add($.__views.status);
    $.__views.toner = Ti.UI.createLabel({
        id: "toner"
    });
    $.__views.printer_details.add($.__views.toner);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg = arguments[0];
    var name = arg.name;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info(this.responseText);
            var printer = JSON.parse(this.responseText);
            $.name.text = printer.name;
            $.status.text = printer.status;
            $.toner.text = printer.toner;
        },
        onerror: function(e) {
            Ti.API.error(e.error);
            alert("error");
        },
        timeout: 5e3
    });
    client.open("GET", Alloy.Globals.serviceURI("printer/" + name));
    client.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;