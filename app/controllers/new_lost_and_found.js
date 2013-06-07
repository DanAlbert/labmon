function takePhoto() {
	Titanium.Media.showCamera({
		success: function (e) {
			$.image.setImage(e.media);
		},
		error: function (e) {
			Titanium.Media.hideCamera();
		},
		cancel: function (e) {
			Titanium.Media.hideCamera();
		},
		saveToPhotoGallery: false,
	});
}

function submit() {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			$.new_lost_and_found.close();
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error: ' + e.error);
		},
		timeout: 10000
	});
	
	var image_data;
	if ($.image.image) {
		image_data = $.image.image.toBlob();
	}
	else {
		image_data = '';
	}
	
	data = {
		description: $.description.value,
		location: $.location.value,
		image: Ti.Utils.base64encode(image_data),
	};
	
	client.open('POST', Alloy.Globals.gaeServiceURI('lost-and-found'));
	client.send(data);
}