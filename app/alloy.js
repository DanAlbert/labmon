// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.serviceURI = function(method) {
	var scheme = 'https';
	var host = 'web.engr.oregonstate.edu';
	var servicePath = 'cgi-bin/cgiwrap/albertd/labstatus-staging.cgi';
	return scheme + '://' + host + '/' + servicePath + '/' + method;
}

Alloy.Globals.gaeServiceURI = function(method) {
	var scheme = 'http';
	var host = 'whdlabmon.appspot.com';
	var servicePath = '';
	return scheme + '://' + host + '/' + servicePath + '/' + method;
}

Alloy.Globals.login = function(callback) {
	var username = '';
	var password = '';
	
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			callback();
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			alert('error: ' + e.error);
		},
		timeout: 10000
	});
	
	client.open('POST', Alloy.Globals.serviceURI('login'));
	client.send({username: username, password: password});
}

Alloy.Globals.HTTPClient = function(data) {
	return client = Ti.Network.createHTTPClient({
		onload: data.onload,
		onerror: function(e) {
			if (e.source.status == 401) {
				Alloy.Globals.login(data.retry);
			}
			else {
				data.onerror(e);
			}
		},
		timeout: 10000
	});
}