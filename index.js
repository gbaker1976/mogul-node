var router = require( './services' );
var restify = require( 'restify' );
var net = require( 'net' );
var fs = require( 'fs' );
var routerConfig = require( './routers.json' );
var server = restify.createServer({
  name: 'API Node',
  version: '1.0.0'
});

server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( router( server, routerConfig ) );
server.use( restify.gzipResponse() );

server.listen( 10001, function () {
  console.log( '%s listening at %s', server.name, server.url );
});


// client for handshake/registration
var client = net.connect({ port: 8124 }, function( conn ){
	console.log( 'connected to federator' );

	fs.createReadStream( './api.json', { encoding: 'utf8' } ).pipe( client );
});

client.on( 'data', function( data ){
	if ( 'ACK' === data.toString() ) {
		console.log( 'registration acknowledged' );
		console.log( 'ending connection' );
		client.end();
	}
});

client.on( 'end', function(){
	console.log( 'connection to federator ended' );
});


function handleSocketData( buf, conn ){
	console.log( buf.join('') );
}
