function Controller() {
    function takePhoto() {
        Titanium.Media.showCamera({
            success: function(e) {
                $.image.setImage(e.media);
            },
            error: function() {
                Titanium.Media.hideCamera();
            },
            cancel: function() {
                Titanium.Media.hideCamera();
            },
            saveToPhotoGallery: false
        });
    }
    function submit() {
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                $.new_lost_and_found.close();
            },
            onerror: function(e) {
                Ti.API.error(e.error);
                alert("error: " + e.error);
            },
            timeout: 1e4
        });
        var image_data;
        image_data = $.image.image ? $.image.image.toBlob() : "";
        data = {
            description: $.description.value,
            location: $.location.value,
            image: Ti.Utils.base64encode(image_data)
        };
        client.open("POST", Alloy.Globals.gaeServiceURI("lost-and-found"));
        client.send(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.new_lost_and_found = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "new_lost_and_found",
        title: "New Lost and Found Item",
        modal: "true"
    });
    $.__views.new_lost_and_found && $.addTopLevelView($.__views.new_lost_and_found);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.new_lost_and_found.add($.__views.__alloyId13);
    $.__views.description = Ti.UI.createTextField({
        width: "100%",
        id: "description",
        hintText: "What"
    });
    $.__views.__alloyId13.add($.__views.description);
    $.__views.location = Ti.UI.createTextField({
        width: "100%",
        id: "location",
        hintText: "Where"
    });
    $.__views.__alloyId13.add($.__views.location);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.__alloyId13.add($.__views.image);
    $.__views.__alloyId14 = Ti.UI.createButton({
        width: "100%",
        title: "Take Photo",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    takePhoto ? $.__views.__alloyId14.addEventListener("click", takePhoto) : __defers["$.__views.__alloyId14!click!takePhoto"] = true;
    $.__views.__alloyId15 = Ti.UI.createButton({
        width: "100%",
        title: "Submit",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    submit ? $.__views.__alloyId15.addEventListener("click", submit) : __defers["$.__views.__alloyId15!click!submit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId14!click!takePhoto"] && $.__views.__alloyId14.addEventListener("click", takePhoto);
    __defers["$.__views.__alloyId15!click!submit"] && $.__views.__alloyId15.addEventListener("click", submit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;