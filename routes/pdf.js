var wkhtmltopdfPath = 'D:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
var express = require('express');
var router = express.Router();
var wkhtmltopdf = require('wkhtmltopdf');

/* GET users listing. */
router.post('/create', function(req, res, next) {
	
	var url = req.body.url;
	console.log("ip: " + req.ip + " url: " + url);
	if(url){
		wkhtmltopdf.command = wkhtmltopdfPath;
		try {
			var steam = wkhtmltopdf(url,{"margin-left":15,"margin-right":15,"margin-right":15,"encoding":"utf-8"},function(err){
				if(err){
					throw new Error(err);
				}
			});
			steam.pipe(res);
		} catch(err){
			var errorMsg= ''+ 'Error ' + new Date().toISOString() + ' ' + res.url+ ''+ err.stack || err.message || 'unknow error'+ '';
			console.error(errorMsg);
			throw new Error(errorMsg);
		}
	}else{
		res.status(400);
		res.render('error', {
			message: 'url not be null',
			error: {}
		});
	}
});

module.exports = router;
