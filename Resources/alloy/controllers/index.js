function Controller() {
    function printerClick(e) {
        var args = {
            name: e.row.title
        };
        Alloy.createController("printer_details", args).getView().open();
    }
    function refreshPrinters() {
        $.printer_list.setData([ Ti.UI.createTableViewRow({
            title: "Loading..."
        }) ]);
        var client = Alloy.Globals.HTTPClient({
            onload: function() {
                Ti.API.info(this.responseText);
                var rows = [];
                printerList = JSON.parse(this.responseText);
                for (var i = 0; printerList.length > i; i++) rows.push(Alloy.createController("printer_row", printerList[i]).getView());
                $.printer_list.setData(rows);
            },
            onerror: function(e) {
                Ti.API.error(e.error);
                alert("error: " + e.error);
            },
            retry: refreshPrinters
        });
        client.open("GET", Alloy.Globals.serviceURI("printers/status"));
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId1 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Printers",
        id: "__alloyId1"
    });
    refreshPrinters ? $.__views.__alloyId1.addEventListener("focus", refreshPrinters) : __defers["$.__views.__alloyId1!focus!refreshPrinters"] = true;
    $.__views.__alloyId1.activity.onCreateOptionsMenu = function(e) {
        var __alloyId5 = {
            title: "Refresh",
            id: "__alloyId4"
        };
        $.__views.__alloyId4 = e.menu.add(_.pick(__alloyId5, Alloy.Android.menuItemCreateArgs));
        $.__views.__alloyId4.applyProperties(_.omit(__alloyId5, Alloy.Android.menuItemCreateArgs));
        refresh ? $.__views.__alloyId4.addEventListener("click", refresh) : __defers["$.__views.__alloyId4!click!refresh"] = true;
    };
    $.__views.printer_list = Ti.UI.createTableView({
        id: "printer_list"
    });
    $.__views.__alloyId1.add($.__views.printer_list);
    printerClick ? $.__views.printer_list.addEventListener("click", printerClick) : __defers["$.__views.printer_list!click!printerClick"] = true;
    $.__views.printer_tab = Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "printer_tab",
        title: "Printers",
        icon: "KS_nav_ui.png"
    });
    $.__views.index.addTab($.__views.printer_tab);
    $.__views.__alloyId7 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Labs",
        id: "__alloyId7"
    });
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Not yet. Maybe for the next release.",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7,
        title: "Labs",
        icon: "KS_nav_views.png",
        id: "__alloyId6"
    });
    $.__views.index.addTab($.__views.__alloyId6);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.__alloyId1!focus!refreshPrinters"] && $.__views.__alloyId1.addEventListener("focus", refreshPrinters);
    __defers["$.__views.__alloyId4!click!refresh"] && $.__views.__alloyId4.addEventListener("click", refresh);
    __defers["$.__views.printer_list!click!printerClick"] && $.__views.printer_list.addEventListener("click", printerClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;