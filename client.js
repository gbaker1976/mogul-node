var net = require( 'net' );

module.exports = function( options ){

  if ( !options || !options.api || typeof options.api !== 'object' ) {
    return;
  }

  // client for handshake/registration
  var client = net.connect({ port: 8124 }, function( conn ){
  	console.log( 'connected to federator' );

    client.write( JSON.stringify( options.api ) );
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
};
