var restify = require( 'restify' );
var client = require( './client' );
var server;

module.exports = function( services, config, options ){
  options = options || {};

  if ( options.api ) {
    client( config, options );
  }

  var server = restify.createServer({
    name: options.serviceName || 'Mogul API Node',
    version: options.serviceVersion || '1.0.0'
  });

  server.use( restify.queryParser() );
  server.use( restify.bodyParser() );

  services && services.forEach(function( service ){
    service.register( server );
  });

  server.use( restify.gzipResponse() );

  server.listen( options.api.port || 10001, function () {
    console.log( '%s listening at %s', server.name, server.url );
  });

};
