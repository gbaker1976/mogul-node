var net = require( 'net' );
var rax = require( 'rax-api' );

module.exports = function( config, options ){

  if ( !options || !options.api || typeof options.api !== 'object' ) {
    return;
  }

  rax( config ).queues.publish( 'API-Reg', options.api );
};
