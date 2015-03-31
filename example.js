
// notes:
//  1. run this code from command line using "node example.js" command
//  2. in your own code, you would require('bcx-temple') instead
var t = require("./index.js");

var template = '<h1>Hello, {{name.first}} {{name.last|uppercase}}, known as {{alias}}!</h1>';
var data = {
	'name': {
		'first': 'John',
		'last': 'Doe'
	},
	'alias': 'JD'
};
console.log(t.doText(template, data));
