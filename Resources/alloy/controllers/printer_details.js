function Controller() {
    function refresh() {
        $.status.text = "Loading...";
        $.toner.text = "Loading...";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info(this.responseText);
                var printer = JSON.parse(this.responseText);
                var pagesRemaining = printer.pages_remaining;
                var tonerMax = printer.toner_max;
                $.name.text = printer.name;
                $.status.text = printer.status;
                $.toner.text = 100 * (pagesRemaining / tonerMax) + "%";
            },
            onerror: function(e) {
                Ti.API.error(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        client.open("GET", Alloy.Globals.serviceURI("printer/" + name));
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.printer_details = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "printer_details",
        title: "Printer Details",
        modal: "true"
    });
    $.__views.printer_details && $.addTopLevelView($.__views.printer_details);
    $.__views.printer_details.activity.onCreateOptionsMenu = function(e) {
        var __alloyId9 = {
            title: "Refresh",
            id: "__alloyId8"
        };
        $.__views.__alloyId8 = e.menu.add(_.pick(__alloyId9, Alloy.Android.menuItemCreateArgs));
        $.__views.__alloyId8.applyProperties(_.omit(__alloyId9, Alloy.Android.menuItemCreateArgs));
        refresh ? $.__views.__alloyId8.addEventListener("click", refresh) : __defers["$.__views.__alloyId8!click!refresh"] = true;
    };
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId10"
    });
    $.__views.printer_details.add($.__views.__alloyId10);
    $.__views.name = Ti.UI.createLabel({
        height: "50dp",
        color: "#000000",
        font: {
            fontSize: "30dp",
            fontWeight: "bold"
        },
        left: "10dp",
        id: "name"
    });
    $.__views.__alloyId10.add($.__views.name);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        id: "__alloyId12"
    });
    var __alloyId13 = [];
    __alloyId13.push($.__views.__alloyId12);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        text: "Status:",
        left: "10dp",
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    $.__views.status = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        right: "10dp",
        id: "status"
    });
    $.__views.__alloyId12.add($.__views.status);
    $.__views.__alloyId15 = Ti.UI.createTableViewRow({
        id: "__alloyId15"
    });
    __alloyId13.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        text: "Toner:",
        left: "10dp",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.toner = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        right: "10dp",
        id: "toner"
    });
    $.__views.__alloyId15.add($.__views.toner);
    $.__views.__alloyId11 = Ti.UI.createTableView({
        separatorColor: "transparent",
        data: __alloyId13,
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg = arguments[0];
    var name = arg.name;
    $.name.text = name;
    refresh();
    __defers["$.__views.__alloyId8!click!refresh"] && $.__views.__alloyId8.addEventListener("click", refresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;