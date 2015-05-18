#!/usr/bin/env node

var fs = require('fs'),
    yleApiAuth = JSON.parse(fs.readFileSync('yle-api-auth.json', 'utf8')),
    yleApi = require('../lib/index.js')(yleApiAuth),
    command = (process.argv.length > 2) ? process.argv[2] : null;

if(!command) {
	console.log('Usage: yle-api [command] [args...]\n');
	console.log('Commands:\n');
	console.log('\tget-programs');
	console.log('\tget-program-stream [programId]');
} else {
	if(command === 'get-programs') {
		yleApi.getPrograms({}, function (err, programs) {
			console.log( JSON.stringify(programs, null, 2) );
		});
	}
	if(command === 'get-program') {
		var programId = process.argv[3] || '';
		yleApi.getProgram(programId, function(err, streams) {
			console.log( JSON.stringify(streams, null, 2) );
		});
	}
	if(command === 'get-program-stream') {
		var programId = process.argv[3] || '';
		yleApi.getProgramStream(programId, function(err, streams) {
			console.log( JSON.stringify(streams, null, 2) );
		});
	} else {
		console.error('Invalid command ' + command);
	}
}