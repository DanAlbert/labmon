function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.description = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        id: "description",
        left: "10dp"
    });
    $.__views.row.add($.__views.description);
    $.__views.location = Ti.UI.createLabel({
        height: "30dp",
        color: "#000000",
        font: {
            fontSize: "20dp"
        },
        id: "location",
        right: "10dp"
    });
    $.__views.row.add($.__views.location);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var item = arguments[0] || "";
    $.description.text = item.description;
    $.location.text = item.location;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;