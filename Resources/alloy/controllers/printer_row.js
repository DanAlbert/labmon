function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: 100,
        color: "#000000",
        font: {
            fontSize: 40
        },
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var printer = arguments[0] || "";
    $.row.title = printer.name;
    printer.has_error ? $.row.setRightImage(Ti.Filesystem.resourcesDirectory + "error.png") : $.row.setRightImage(Ti.Filesystem.resourcesDirectory + "success.png");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;