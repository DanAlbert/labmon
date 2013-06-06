var arg = arguments[0];
var name = arg.name;

$.name.text = name;

function refresh() {
	$.status.text = 'Loading...';
	$.toner.text = 'Loading...';
	
	var client = Alloy.Globals.HTTPClient({
		onload: function(e) {
			var printer = JSON.parse(this.responseText);
			var pagesRemaining = printer.pages_remaining;
			var tonerMax = printer.toner_max;
			
			$.name.text = printer.name;
			$.status.text = printer.status;
			
			if (pagesRemaining < 0) {
				// TODO: Would like to be able to make this red, but we're
				// waiting on this feature in order to do this cleanly:
				// https://jira.appcelerator.org/browse/ALOY-210
				$.toner.text = 'UNKNOWN';
			}
			else {
				$.toner.text = pagesRemaining / tonerMax * 100 + '%';
			}
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error: ' + e.error);
		},
		retry: refresh
	});
	
	client.open('GET', Alloy.Globals.serviceURI('printer/' + name));
	client.send();
}