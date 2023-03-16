# MMM-FiElectricityPrice
Magic Mirror Module to display Finnish electricity prices from Nord Pool. The module can be used to show data from other regions from Nord Pool, but I have not tested it with them.

The module loads the electricity prices when started and then every day at 16:01 local time of your MagicMirror installation. The prices are shown as a bar chart with optional average value and highlights for high and low prices, both limits are configurable.

The module reads the data that is shown on this page: https://www.nordpoolgroup.com/en/Market-data1/Dayahead/Area-Prices/FI/Hourly/?view=table

![Screenshot](fielectricityprice.png "Screenshot")

## Installation

Clone this repository in your modules folder, and install dependencies:

    cd ~/MagicMirror/modules 
    git clone https://github.com/jannekalliola/MMM-FiElectricityPrice
    cd MMM-FiElectricityPrice
    npm install 


## Configuration

Go to the MagicMirror/config directory and edit the config.js file. Add the module to your modules array in your config.js.

Enter these details in the config.js for your MagicMirror installation:

        {
            module: "MMM-FiElectricityPrice",
            header: 'Electricity Price',
            position: "top_right",
            config: {
            }
        },

## Module configuration
The module has the following configuration options:

<table>
  <thead>
    <tr>
      <th>Option</th>
	  <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>dataSource</code></td>
      <td><code>https://www.nordpoolgroup.com/
	  api/marketdata/page/35?
	  currency=EUR</code></td>
      <td>The URL where to load the data. Nord Pool lists the available pages here: https://www.nordpoolgroup.com/api/marketdata/queries/</td>
    </tr>
    <tr>
      <td><code>loadingMessage</code></td>
      <td><code>Loading Data...</code></td>
      <td>The message to be shown while the data is loaded from the Nord Pool API.</td>
    </tr>
    <tr>
      <td><code>errorMessage</code></td>
	  <td><code>Data could not be fetched.</code></td>
      <td>The error message to be shown if the data loading failed due to an error.</td>
    </tr>
    <tr>
      <td><code>showPastHours</code></td>
	  <td><code>24</code></td>
      <td>The amount of past hours to show.</td>
    </tr>
    <tr>
      <td><code>showFutureHours</code></td>
	  <td><code>36</code></td>
      <td>The amount of future hours to show.</td>
    </tr>
    <tr>
      <td><code>hourOffset</code></td>
	  <td><code>1</code></td>
      <td>The number of hours to offset the Nord Pool times that are given in CET/CEST. Value 1 corrects the time to Finland and the Baltics, 0 works for countries in the CET/CEST timezone, and -1 for countries in GMT.</td>
    </tr>
    <tr>
      <td><code>priceOffset</code></td>
	  <td><code>0</code></td>
      <td>The amount of euro cents to add on top of the price. You can use this to add the transfer cost, comission and other costs to get the final price you are paying.</td>
    </tr>
    <tr>
      <td><code>showAverage</code></td>
	  <td><code>false</code></td>
      <td>Flag to control whether the average price over seven days (future and past) is shown as a line on top of the bars.</td>
    </tr>
    <tr>
      <td><code>averageColor</code></td>
	  <td><code>#fff</code></td>
      <td>The color of the average line. Hexadecimals and rgba values, such as <code>rgba(255, 255, 255, 0.8)</code>, are allowed.</td>
    </tr>
    <tr>
      <td><code>showGrid</code></td>
	  <td><code>true</code></td>
      <td>Flag to control showing the grid lines.</td>
    </tr>
    <tr>
      <td><code>gridColor</code></td>
	  <td><code>rgba(255, 255, 255, 0.3)</code></td>
      <td>The color of the grid lines.</td>
    </tr>
    <tr>
      <td><code>labelColor</code></td>
	  <td><code>#fff</code></td>
      <td>The color of the axis labels.</td>
    </tr>
    <tr>
      <td><code>tickInterval</code></td>
	  <td><code>false</code></td>
      <td>The interval between ticks (hours on the grid). Default is <code>false</code> to use automatic algorithm. The calculation is based on the hour value, for example, <code>3</code> shows hours 0:00, 3:00, 6:00, etc., and <code>4</code> shows hours 0:00, 4:00, 8:00, etc.</td>
    </tr>
    <tr>
      <td><code>pastColor</code></td>
	  <td><code>rgba(255, 255, 255, 0.5)</code></td>
      <td>The border color of the past hour bars.</td>
    </tr>
    <tr>
      <td><code>pastBg</code></td>
	  <td><code>rgba(255, 255, 255, 0.3)</code></td>
      <td>The fill color of the past hour bars.</td>
    </tr>
    <tr>
      <td><code>currentColor</code></td>
	  <td><code>#fff</code></td>
      <td>The border color of the current hour bar.</td>
    </tr>
    <tr>
      <td><code>currentBg</code></td>
	  <td><code>#fff</code></td>
      <td>The fill color of the current hour bar.</td>
    </tr>
    <tr>
      <td><code>futureColor</code></td>
	  <td><code>rgba(255, 255, 255, 0.8)</code></td>
      <td>The border color of the future hour bars.</td>
    </tr>
    <tr>
      <td><code>futureBg</code></td>
	  <td><code>rgba(255, 255, 255, 0.6)</code></td>
      <td>The fill color of the future hour bars.</td>
    </tr>
    <tr>
      <td><code>alertLimit</code></td>
	  <td><code>false</code></td>
      <td>The limit in euro cents or <code>average</code> to set the lower limit for pricier hours. The limit is not used when the value is set to <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>alertColor</code></td>
	  <td><code>rgba(255, 0, 0, 1)</code></td>
      <td>The border color of the alert hour bars.</td>
    </tr>
    <tr>
      <td><code>alertBg</code></td>
	  <td><code>rgba(255, 0,0, 0.8)</code></td>
      <td>The fill color of the alert hour bars.</td>
    </tr>
    <tr>
      <td><code>safeLimit</code></td>
	  <td><code>false</code></td>
      <td>The limit in euro cents or <code>average</code> to set the upper limit for inexpensive hours. The limit is not used when the value is set to <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>safeColor</code></td>
	  <td><code>rgba(255, 0, 0, 1)</code></td>
      <td>The border color of the safe hour bars.</td>
    </tr>
    <tr>
      <td><code>safeBg</code></td>
	  <td><code>rgba(255, 0,0, 0.8)</code></td>
      <td>The fill color of the safe hour bars.</td>
    </tr>
    <tr>
      <td><code>updateUIInterval</code></td>
	  <td><code>300</code></td>
      <td>The interval, in seconds, to update the UI. Updating the UI does not fetch the data from the network again, it just draws the UI to change the current hour.</td>
    </tr>
  </tbody>
</table>

## Changelog

**2022-09-04** Initial version
