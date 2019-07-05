const fs = require('fs');
const csv = require('csv-parser');
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const doc = new GoogleSpreadsheet('1cL9PugfTLrAjnxmyOUYl-dihU41mT28t5-qVDVlDo_c');

// POST /api/csv-submit
exports.submit = (request, response, next) => {
	let res = [],
		firstArr = [],
		final = [],
		findUniqueChatters = [],
		minsWatchedArr = [],
		minsWatched,
		hoursWatched,
		avgViewersArr = [],
		avgViewers,
		uniqueViewsArr = [],
		uniqueViews,
		minsStreamedArr = [],
		minsStreamed,
		hoursStreamed,
		newFollowersArr = [],
		newFollowers,
		uniqueChattersArr = [],
		uniqueChatters,
		chatMessagesArr = [],
		chatMessages,
		clipsCreatedArr = [],
		clipsCreated,
		clipViewsArr = [],
		clipViews,
		csvFile,
		sheet;

	if (request.body.Player.length > 0 && request.files.length > 0) {
		try {
			csvFile = request.files[0].path;
			fs.createReadStream(csvFile)
				.pipe(csv())
				.on('data', data => res.push(data))
				.on('end', () => {
					for (let i = 0; i < res.length; i++) {
						const hrsWatched = res[i]['Minutes Watched'] / 60;
						const hrsStreamed = res[i]['Minutes Streamed'] / 60;
						findUniqueChatters.push(parseInt(res[i]['Chatters']));

						firstArr.push({
							minutesWatched: res[i]['Minutes Watched'],
							hoursWatched: hrsWatched.toString(),
							uniqueViews: res[i]['Unique Views'],
							minutesStreamed: res[i]['Minutes Streamed'],
							hoursStreamed: hrsStreamed.toString(),
							averageViewers: res[i]['Average Viewers'],
							newFollowers: res[i]['New Followers'],
							uniqueChatters: findUniqueChatters.reduce((a, b) => (a += b)),
							chatMessages: res[i]['Chat Messages'],
							clipsCreated: res[i]['Clips Created'],
							clipViews: res[i]['Clip Views']
						});
					}

					for (let i = 0; i < firstArr.length; i++) {
						minsWatchedArr.push(parseInt(firstArr[i].minutesWatched));
						uniqueViewsArr.push(parseInt(firstArr[i].uniqueViews));
						avgViewersArr.push(parseInt(firstArr[i].averageViewers));
						minsStreamedArr.push(parseInt(firstArr[i].minutesStreamed));
						newFollowersArr.push(parseInt(firstArr[i].newFollowers));
						uniqueChattersArr.push(parseInt(firstArr[i].uniqueChatters));
						chatMessagesArr.push(parseInt(firstArr[i].chatMessages));
						clipsCreatedArr.push(parseInt(firstArr[i].clipsCreated));
						clipViewsArr.push(parseInt(firstArr[i].clipViews));
					}

					// prettier-ignore
					minsWatched = minsWatchedArr.reduce((a, b) => { return a + b; }, 0);
					hoursWatched = Math.ceil(minsWatched / 60);
					// prettier-ignore
					uniqueViews = uniqueViewsArr.reduce((a, b) => { return a + b; }, 0);
					// prettier-ignore
					minsStreamed = Math.ceil(minsStreamedArr.reduce((a, b) => { return a + b; }, 0));
					hoursStreamed = Math.ceil(minsStreamed / 60);
					avgViewers = Math.ceil(avgViewersArr.reduce((a, b) => (a += b)) / avgViewersArr.length);
					// prettier-ignore
					newFollowers = newFollowersArr.reduce((a, b) => { return a + b; }, 0);
					// prettier-ignore
					uniqueChatters = uniqueChattersArr.reduce((a, b) => { return a + b; }, 0);
					// prettier-ignore
					chatMessages = chatMessagesArr.reduce((a, b) => { return a + b; }, 0);
					// prettier-ignore
					clipsCreated = clipsCreatedArr.reduce((a, b) => { return a + b; }, 0);
					// prettier-ignore
					clipViews = clipViewsArr.reduce((a, b) => { return a + b; }, 0);

					final.push({
						minutesWatched: minsWatched,
						hoursWatched: hoursWatched,
						uniqueViews: uniqueViews,
						minutesStreamed: minsStreamed,
						hoursStreamed: hoursStreamed,
						averageViewers: avgViewers,
						newFollowers: newFollowers,
						uniqueChatters: uniqueChatters,
						chatMessages: chatMessages,
						clipsCreated: clipsCreated,
						clipViews: clipViews
					});

					// Add to spreadsheet
					async.series([
						function setAuth(step) {
							const creds = require('./client_secret.json');
							doc.useServiceAccountAuth(creds, step);
						},
						function getInfoAndWorksheets(step) {
							doc.getInfo((err, info) => {
								console.log(`Loaded document: ${info.title}`);
								sheet = info.worksheets[0];
								console.log(`Sheet: ${sheet.title}`);
								step();
							});
						},
						function addStuff(step) {
							doc.addRow(
								1,
								{
									Player: request.body.Player,
									'Minutes Watched': minsWatched,
									'Hours Watched': hoursWatched,
									'Unique Viewers': uniqueViews,
									'Minutes Streamed': minsStreamed,
									'Hours Streamed': hoursStreamed,
									'Average Viewers': avgViewers,
									'New Followers': newFollowers,
									'Unique Chatters': uniqueChatters,
									'Chat Messages': chatMessages,
									'Clips Created': clipsCreated,
									'Clips Viewed': clipViews
								},
								err => {
									err ? console.log(err) : console.log('Google Sheet written successfully.');
								}
							);
						}
					]);
					response.status(200);
					response.json({
						success: {
							message: 'Google Sheet written successfully.'
						}
					});
					response.end();
				});
		} catch (err) {
			response.status(err.status || 404);
			response.json({
				error: {
					message: err.message
				}
			});
		}
	} else {
		response.status(400);
		response.json({
			error: {
				message: 'Missing player or file.'
			}
		});
	}
};
