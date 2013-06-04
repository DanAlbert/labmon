function Controller() {
    function printerClick(e) {
        var args = {
            name: e.row.title
        };
        Alloy.createController("printer_details", args).getView().open();
    }
    function labClick(e) {
        alert("labClick(" + e.row.title + ")");
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
    $.__views.__alloyId2 = Ti.UI.createTableViewRow({
        title: "Loading...",
        id: "__alloyId2"
    });
    var __alloyId3 = [];
    __alloyId3.push($.__views.__alloyId2);
    $.__views.printer_list = Ti.UI.createTableView({
        data: __alloyId3,
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
    $.__views.__alloyId5 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Labs",
        id: "__alloyId5"
    });
    $.__views.lab_list = Ti.UI.createTableView({
        id: "lab_list"
    });
    $.__views.__alloyId5.add($.__views.lab_list);
    labClick ? $.__views.lab_list.addEventListener("click", labClick) : __defers["$.__views.lab_list!click!labClick"] = true;
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Labs",
        icon: "KS_nav_views.png",
        id: "__alloyId4"
    });
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info(this.responseText);
            var rows = [];
            printerList = JSON.parse(this.responseText);
            for (var i = 0; printerList.length > i; i++) rows.push(Alloy.createController("printer_row", printerList[i]).getView());
            $.printer_list.setData(rows);
        },
        onerror: function(e) {
            Ti.API.error(e.error);
            alert("error");
        },
        timeout: 5e3
    });
    client.open("GET", Alloy.Globals.serviceURI("printers"));
    client.send();
    __defers["$.__views.printer_list!click!printerClick"] && $.__views.printer_list.addEventListener("click", printerClick);
    __defers["$.__views.lab_list!click!labClick"] && $.__views.lab_list.addEventListener("click", labClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;