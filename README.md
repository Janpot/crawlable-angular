crawlable-angular
=================

Investigation in how to make angular applications crawlable

  1. Read up on [ajax crawling](https://developers.google.com/webmasters/ajax-crawling/docs/specification).
  2. Install [node](http://nodejs.org/).
  3. Execute `npm install`, make sure jsdom gets properly installed.
  4. Execute `node server.js`.
  5. Visit the app at [http://localhost:3000/#!/home](http://localhost:3000/#!/home).
  6. Check the html snapshot at [http://localhost:3000/?_escaped_fragment_=/home](http://localhost:3000/?_escaped_fragment_=/home).
