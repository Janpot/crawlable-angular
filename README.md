crawlable-angular
=================

Investigation in how to make angular applications crawlable

  1. Read up on [ajax crawling](https://developers.google.com/webmasters/ajax-crawling/docs/specification)
  2. install [node](http://nodejs.org/)
  3. execute `npm install`, make sure jsdom gets properly installed
  4. execute `node server.js`
  5. visit the app at [http://localhost:3000/#!/home](http://localhost:3000/#!/home)
  6. check the html snapshot at [http://localhost:3000/?_escaped_fragment_=/home](http://localhost:3000/?_escaped_fragment_=/home)
