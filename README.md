# Currency-Converter
Chrome Web Store link: <a target=”_blank” href="https://chrome.google.com/webstore/detail/kfajmjadkkhkihidkbffmomhjmcilpei">Currency Converter</a>

A real-time currency converter chrome extension.
Key features include:
<ul>
<li> Real-time conversion </li>
<li> Fetches updated exchange rates through API (openexchangerates.org) once in every 3 days to deal with the monthly free limit of 1000 API calls</li>
<li>Stores the JSON object containing the exchange rates in chrome local storage and uses the data for the conversion</li>
<li> Can select from 170 different currencies </li>
<li> Remembers the last selected currencies by preserving the selections in chrome local storage </li>
<li>Handles "No internet connection" error by loading up the last stored data</li>
<li>No need to rewrite the input currency value when any currency is chanfed as the output is automatically changed</li>
</ul>
