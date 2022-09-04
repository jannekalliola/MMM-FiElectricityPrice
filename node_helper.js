/* Magic Mirror
 * Module: MMM-FiElectricityPrice
 *
 * By JanneKalliola
 *
 */
const NodeHelper = require('node_helper');
const https = require('https');

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
        if(notification === 'GET_PRICEDATA') {
            this.getPriceData(payload);
        }
	},

	/**
	 * Fetch price data from the given URL and parse it. When parsing is
	 * done, the function sends notification back to the front-end with the
	 * data or an error.
	 *
	 * @param String url The URL
	 */
	getPriceData(url) {
		https.get(url, (res) => {
			let body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				try {
					let json = JSON.parse(body);
					let ret = this.parsePriceData(json);
					if(ret === false) {
						this.sendSocketNotification('PRICEDATAERROR');
					}
					else {
						this.sendSocketNotification('PRICEDATA', ret);
					}
				} catch (error) {
					this.sendSocketNotification('PRICEDATAERROR');
				};
			});

		}).on('error', (error) => {
			this.sendSocketNotification('PRICEDATAERROR');
		});
	},

	/**
	 * Parses the loaded price data to simplify processing on the 
     * front-end.
	 *
	 * @param Object The price data.
	 * @return Object The parsed price data or false, if an error
	 * occurred.
	 */
	parsePriceData(data) {
		if(!data) {
			return false;
		}

		if(!data['data'] || !data['data']['Rows']) {
			return false;
		}

		data = data['data']['Rows'];
		let ret = [];
		for(let j = 0; j < 7; j++) {
			for(let i = 23; i >= 0; i--) {
				let row = data[i];
				let priceTime = row['StartTime'].substring(11);
				if(row['Columns']) {
					let dp = row['Columns'][j];
					
					// Calculate price in euro cents per MWh
					let value = parseInt(dp['Value'].replace(',', ''), 10);
					let dt = dp['Name'].substring(6, 10) + '-' + dp['Name'].substring(3, 5) + '-' + dp['Name'].substring(0, 2);
					let retRow = {
						date: dt,
						time: priceTime,
						value: value,
					}
					ret.push(retRow);
				}
			}
		}

		return ret;
	}
});
