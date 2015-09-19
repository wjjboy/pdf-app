/**
 * configuration
 */
var config = {
	port : 3333,
	sessionTime : 30*60, //s
	RedisOptions : {
		host : '127.0.0.1',
		port : '6379',
		ttl  : this.sessionTime,
		prefix : 'pdf-session_'
	}
}

module.exports = config;
