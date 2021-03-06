function Controller() {
    function refresh() {
        $.status.text = "Loading...";
        $.toner.text = "Loading...";
        var client = Alloy.Globals.HTTPClient({
            onload: function() {
                var printer = JSON.parse(this.responseText);
                var pagesRemaining = printer.pages_remaining;
                var tonerMax = printer.toner_max;
                $.name.text = printer.name;
                $.status.text = printer.status;
                $.toner.text = 0 > pagesRemaining ? "UNKNOWN" : 100 * (pagesRemaining / tonerMax) + "%";
            },
            onerror: function(e) {
                Ti.API.error(e.error);
                alert("error: " + e.error);
            },
            retry: refresh
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
    refresh ? $.__views.printer_details.addEventListener("focus", refresh) : __defers["$.__views.printer_details!focus!refresh"] = true;
    $.__views.printer_details.activity.onCreateOptionsMenu = function(e) {
        var __alloyId19 = {
            title: "Refresh",
            id: "__alloyId18"
        };
        $.__views.__alloyId18 = e.menu.add(_.pick(__alloyId19, Alloy.Android.menuItemCreateArgs));
        $.__views.__alloyId18.applyProperties(_.omit(__alloyId19, Alloy.Android.menuItemCreateArgs));
        refresh ? $.__views.__alloyId18.addEventListener("click", refresh) : __defers["$.__views.__alloyId18!click!refresh"] = true;
    };
    $.__views.__alloyId20 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId20"
    });
    $.__views.printer_details.add($.__views.__alloyId20);
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
    $.__views.__alloyId20.add($.__views.name);
    $.__views.__alloyId22 = Ti.UI.createTableViewRow({
        id: "__alloyId22"
    });
    var __alloyId23 = [];
    __alloyId23.push($.__views.__alloyId22);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        text: "Status:",
        left: "10dp",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    $.__views.status = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        right: "10dp",
        id: "status"
    });
    $.__views.__alloyId22.add($.__views.status);
    $.__views.__alloyId25 = Ti.UI.createTableViewRow({
        id: "__alloyId25"
    });
    __alloyId23.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        text: "Toner:",
        left: "10dp",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.toner = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        right: "10dp",
        id: "toner"
    });
    $.__views.__alloyId25.add($.__views.toner);
    $.__views.__alloyId21 = Ti.UI.createTableView({
        separatorColor: "transparent",
        data: __alloyId23,
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg = arguments[0];
    var name = arg.name;
    $.name.text = name;
    __defers["$.__views.printer_details!focus!refresh"] && $.__views.printer_details.addEventListener("focus", refresh);
    __defers["$.__views.__alloyId18!click!refresh"] && $.__views.__alloyId18.addEventListener("click", refresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;