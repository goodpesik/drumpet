const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
const FeedParser = require('feedparser');

const feedKey = "временно прекращено водоснабжение";



app.get('/', function(req, res) {

	url = 'https://www.instagram.com/goodpesik__music/';

	request(url, function(error, response, html){
		if(!error){
			let $ = cheerio.load(html);
			let dataString = $('body script').eq(0).html();
			const dataStart = "window._sharedData = ";
			const dataEnd = ";"
			let data;
			let instagramFeed = [];

			dataString = dataString.replace(dataStart,'');
			dataString = dataString.replace(dataEnd,'');
			data = JSON.parse(dataString).entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
			
				for (let index = 0; index < data.length; index++) {
					instagramFeed.push({
						scr: data[index].node.display_url,
						text: data[index].node.edge_media_to_caption.edges[0].node.text,
						url: 'instagram.com/p/'+data[index].node.shortcode
					});
				}
			
			console.log(instagramFeed);
			}
	})
	
	// rss();
	
	// function rss() {
	// 	let rssData = [];
	// 	let feedparser = new FeedParser();
	// 	var req = request('https://vodokanal.kharkov.ua/rss');
		
	// 	req.on('response', function (res) {
	// 		var stream = this;

	// 		if (res.statusCode !== 200) {
	// 			this.emit('error', new Error('Bad status code'));
	// 		}
	// 		else {
	// 			stream.pipe(feedparser);
	// 		}
	// 	});
		
	// 	feedparser.on('readable', function () {
	// 		let stream = this; 
	// 		let item;
	// 		let content = '';
	// 		const templateFirst = '\n<b>';
	// 		const templateSecond = '</b>\n';
			
	// 		while (item = stream.read()) {
	// 			if (item.title.indexOf(feedKey) !== -1) {
	// 				let content = '';
	// 				let feedDate = item['rss:pubdate']['#'].replace('+0300','');
	// 				content += templateFirst + item['rss:pubdate']['#'].replace('+0300','') + templateSecond;
	// 				content += item['yandex:full-text']['#'];
					
	// 				rssData.push(content);
	// 			}
	// 		}
			
	// 	});
		
	// 	feedparser.on('end', function() {
	// 		console.log(rssData);
	// 	});
	// }


});
	
	

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;