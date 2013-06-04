var arg = arguments[0];
var name = arg.name;

var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info(this.responseText);
		var printer = JSON.parse(this.responseText);
		$.name.text = printer.name;
		$.status.text = printer.status;
		$.toner.text = printer.toner;
	},
	onerror: function(e) {
		Ti.API.error(e.error);
		alert('error');
	},
	timeout: 5000
});

client.open('GET', Alloy.Globals.serviceURI('printer/' + name));
client.send();