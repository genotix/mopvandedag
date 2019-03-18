/*
 * No real changes
 *
 * */

"user strict";

function init() {
	Homey.log("Starting init joke");

	Homey.manager('flow').on('action.tell_joke',function(callback,args){
		//tellDutchJoke(callback);
		tellEnglishJoke(callback);
	});
}

/*
var tellDutchJoke = function(callback) {

	var http = require('http');
	var options = {
		    host: 'mop.genotix.nl',
		    path: '/'
	}

	var joke = '';

	var request = http.request(options, 
		function (res) {

		    // retrieving joke
		    res.on('data', function (chunk) { joke += chunk; });
		    res.on('end',  function () {

		    console.log("Debug grap:", joke);
		    Homey.manager('speech-output').say(joke);
		    });
	});

	request.on('error', function (e) {
		    console.log(e.message);
	});

	request.end();

	callback(null, true);
}
*/

var tellEnglishJoke = function(callback) {

	var http = require('http');	
	var options = { 
			host: 'www.jokesareawesome.com',
			path: '/rss/random/'
	}

	var xmlresult = '';

	var request = http.request(options, 
			function(res) {
		
		    // retrieving joke
		    res.on('data', function (chunk) { xmlresult += chunk; });
		    res.on('end',  function () {

		    var DOMParser = new (require('xmldom')).DOMParser;
		    var document = DOMParser.parseFromString(xmlresult);

		    var joke = document.getElementsByTagName("content:encoded");
		    console.log("Debug grap:", joke);
		    Homey.manager('speech-output').say(joke);
		    });
	});

	request.on('error', function (e) {
		    console.log(e.message);
	});

	request.end();

	callback(null, true);
}

module.exports.init = init;
