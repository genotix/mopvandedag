"user strict";

function init() {
	Homey.log("Starting init joke");

	Homey.manager('flow').on('action.tell_joke',function(callback,args){
		tellJoke(callback);
	});

}

var tellJoke = function(callback) {

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

module.exports.init = init;
