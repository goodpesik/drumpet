const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
const feedImages = 8;

app.get('/instaFeed', function(req, res) {
	setHeaders(res);
	getInstaFeed('https://www.instagram.com/drumpetoficial/').then(function(data) {
		res.json(data);
	})
});

app.get('/events', function(req, res) {
	setHeaders(res);
	getEvents('https://docs.google.com/spreadsheets/d/e/2PACX-1vTo4WQ3e98bz9sN18AfOyVJ3-Z7mg-LxSZHB57NAgKCsd22cdpCNvaHZIXhDxb1tUxEO7YUTYSY-7sj/pubhtml').then(function(data) {
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
						scr: data[index].node.display_url,
						text: data[index].node.edge_media_to_caption.edges[0].node.text,
						url: 'instagram.com/p/'+data[index].node.shortcode
					});
				}
				resolve(instagramFeed);
			} else {
				reject(error);
			}
		})
	});
}

function getEvents(url) {
	return new Promise(function(resolve, reject) {
		request(url, function(error, response, html) {
			if(!error) {
				let $ = cheerio.load(html);
				let dataObj = {};
				let data = [];
				let dataTable = $('table tbody tr');
				let dataKeys = dataTable.eq(0).find('td');

				if (dataKeys.length) {
					dataKeys.each(function(index,item){
						dataObj[item.children[0].data] = '';
					});
				}

				for (let index = 1; index < dataTable.length; index++) {
					let rowData = dataTable.eq(index).find('td');
					let keyNumber = 0;
					let rowDataArr = [];
					let tempObj = {};

					rowData.each(function(index,item){
						
						if (item.children.length) {
							if (item.children[0].type === 'tag') {
								if (item.children[0].name === 'a') {
									rowDataArr.push(item.children[0].children[0].data);
								} else {
									rowDataArr.push(item.children[0].children[0].children[0].data);
								}
							} else {
								rowDataArr.push(item.children[0].data);
							}
						}
					});

					for (const key in dataObj) {
						if (dataObj.hasOwnProperty(key)) {
							if (keyNumber > rowDataArr.length) {
								tempObj[key] = '';
							} else {
								tempObj[key] = rowDataArr[keyNumber];
							}
							keyNumber++;
						}
					}

					data.push(tempObj);
				}

				resolve(data);
			}
		});
	});
}

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;