var net = require( 'net' );
var rax = require( 'rax-api' );

module.exports = function( config, options ){
  if ( !options || !options.api || typeof options.api !== 'object' ) {
    return;
  }

  rax( config ).queues.publish( 'API-Reg', options.api, function( err, payload ){
    if ( err ) {
      console.error( err );
      return;
    }

    console.log( 'API registration message posted.' );
    console.log( "Response: \n %s", JSON.stringify( payload ) );
  });
};
