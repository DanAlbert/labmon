var printer = arguments[0] || '';
$.row.title = printer.name;

if (printer.has_error) {
	$.row.setRightImage(Ti.Filesystem.resourcesDirectory + 'error.png');
}
else {
	$.row.setRightImage(Ti.Filesystem.resourcesDirectory + 'success.png');
}