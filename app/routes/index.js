'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
   var clickHandler = new ClickHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

   app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);

    app.route('/api/whoami')
      .get(function (req, res) {
        res.json({'ipaddress': req.header('x-forwarded-for') || req.connection.remoteAddress, 'language': req.acceptsLanguages, 'software': req.headers["user-agent"]})
      })
};
