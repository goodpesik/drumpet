const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
const fs      = require('fs');
const http = require("https");
const node_xj = require("xls-to-json");
const feedImages = 8;

app.get('/instaFeed', function(req, res) {
	setHeaders(res);
	getInstaFeed('https://www.instagram.com/drumpetoficial/').then(function(data) {
		res.json(data);
	})
});

app.get('/events', function(req, res) {
	setHeaders(res);
	getEvents('https://docs.google.com/spreadsheets/d/e/2PACX-1vTo4WQ3e98bz9sN18AfOyVJ3-Z7mg-LxSZHB57NAgKCsd22cdpCNvaHZIXhDxb1tUxEO7YUTYSY-7sj/pub?output=xlsx').then(function(data) {
		res.json(data);
	})
});

function setHeaders(res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}
	
function getInstaFeed(url) {
	return new Promise(function(resolve, reject) {
		request(url, function(error, response, html) {
			if(!error) {
				let $ = cheerio.load(html);
				let dataString = $('body script').eq(0).html();
				const dataStart = "window._sharedData = ";
				const dataEnd = ";"
				let data;
				let instagramFeed = [];
	
				dataString = dataString.replace(dataStart,'');
				dataString = dataString.replace(dataEnd,'');
				data = JSON.parse(dataString).entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
				
				for (let index = 0; index < data.length && index < feedImages; index++) {
					instagramFeed.push({
						src: data[index].node.display_url,
						text: data[index].node.edge_media_to_caption.edges[0].node.text,
						url: 'https://instagram.com/p/'+data[index].node.shortcode
					});
				}
				resolve(instagramFeed);
			} else {
				reject(error);
			}
		})
	});
}

function getEvents(fileLink) {
	const filePath = "file.xlsx";
	const file = fs.createWriteStream(filePath);

	function writeFile() {
		return new Promise(function(resolve, reject) {
			http.get(fileLink, response => {
				response.pipe(file);
				file.on("finish", () => { resolve(); });
			});
		});
	}

	return new Promise(function(resolve,reject) {
		return writeFile().then(function() {
			node_xj({
				input: filePath,
				output: null,
				sheet: "Sheet1"
			  }, function(err, result) {
				if(err) {
				  reject(err);
				} else {
				  resolve(result);
				}
			  });
		});
	});
}

app.listen('8081');
console.log('Drumpet Server is up. Port 8081');
exports = module.exports = app;