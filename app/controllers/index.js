function printerClick(e) {
	var args = {name: e.row.title};
	Alloy.createController('printer_details', args).getView().open();
}

function labClick(e) {
	alert('labClick(' + e.row.title + ')');
}

function newLostAndFound() {
	Alloy.createController('new_lost_and_found').getView().open();
}

function refreshPrinters() {
	$.printer_list.setData([Ti.UI.createTableViewRow({title: 'Loading...'})]);
	
	var client = Alloy.Globals.HTTPClient({
		onload: function(e) {
			Ti.API.info(this.responseText);
			var rows = [];
			printerList = JSON.parse(this.responseText);
			for (var i = 0; i < printerList.length; i++) {
				rows.push(Alloy.createController(
					'printer_row', printerList[i]).getView());
			}
			$.printer_list.setData(rows);
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error: ' + e.error);
		},
		retry: refreshPrinters
	});
	
	client.open('GET', Alloy.Globals.serviceURI('printers/status'));
	client.send();
}

function refreshLostAndFound() {
	$.laf_list.setData([Ti.UI.createTableViewRow({title: 'Loading...'})]);
	
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info(this.responseText);
			var rows = [];
			lafList = JSON.parse(this.responseText);
			for (var i = 0; i < lafList.length; i++) {
				rows.push(Alloy.createController(
					'laf_row', lafList[i]).getView());
			}
			$.laf_list.setData(rows);
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error: ' + e.error);
		},
		retry: refreshLostAndFound
	});
	
	Ti.API.info(Alloy.Globals.gaeServiceURI('lost-and-found'));
	client.open('GET', Alloy.Globals.gaeServiceURI('lost-and-found'));
	client.send();
}

$.index.open();