var express = require('express');
var wkhtmltopdf = require('wkhtmltopdf');
var config = require('../config');
var router = express.Router();

var wkhtmltopdfPath = config.wkhtmltopdfPath;

//url mapping
router.post('/create', createPDF);


function createPDF(req, res, next) {
	var url = req.body.url;
	var option = req.body.option;
	console.log("ip: " + req.ip + " url: " + url);
	if(url){
		wkhtmltopdf.command = wkhtmltopdfPath;
		try {
			var steam = wkhtmltopdf(url,option,function(err){
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
			error:  'url not be null',
		});
	}
}

module.exports = router;
