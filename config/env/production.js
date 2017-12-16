var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var db_url = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost/hortiquet";
var url = 'http://' + ipaddress + ':' + port  + ''

module.exports = {
	port: port,
  ipaddress : ipaddress,
  db: db_url,
  url: url,
  return_url: 'http://www.hortiquet.es',
  facebook: {
		clientID: 'XXX',
		clientSecret: 'XXX',
		callbackURL: url +'/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'XXX',
		clientSecret: 'XXX',
		callbackURL: url +'/oauth/twitter/callback'
	},
  paypal: {
    mode: 'live',
    schema: 'https',
    host: 'api.paypal.com',
    port: '',
    openid_connect_schema: 'https',
    openid_connect_host: 'api.paypal.com',
    openid_connect_port: '',
    authorize_url: 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize',
    logout_url: 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/endsession',
    client_id : "XXX" ,
    client_secret : "XXX"
  }

};
