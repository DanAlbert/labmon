var arg = arguments[0];
var name = arg.name;

$.name.text = name;

function refresh() {
	$.status.text = 'Loading...';
	$.toner.text = 'Loading...';
	
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info(this.responseText);
			var printer = JSON.parse(this.responseText);
			var pagesRemaining = printer.pages_remaining;
			var tonerMax = printer.toner_max;
			
			$.name.text = printer.name;
			$.status.text = printer.status;
			$.toner.text = pagesRemaining / tonerMax * 100 + '%';
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error');
		},
		timeout: 5000
	});
	
	client.open('GET', Alloy.Globals.serviceURI('printer/' + name));
	client.send();
}

refresh();
