const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf'); // CSRF
const app = express();
const routes = require('./api/routes');
const PORT = process.env.PORT || 3000;

class Server {

  constructor() {
    this.initExpressMiddleWare();
    this.initCsrfProtection();
    this.initRoutes();
    this.start();
  }

  initExpressMiddleWare() {
    app.use(express.static(__dirname + '/dist'));
    app.use(cookieParser());
  }

  initCsrfProtection() {
    app.use(csrf({
      cookie: true
    }));

    /** custom middleware */
/*
    app.use((req, res, next) => {
      const csrfToken = req.csrfToken();
      res.cookie('XSRF-TOKEN', csrfToken, {
        path: '/',
        httpOnly: false
      });
      next();
    });
*/

  }

  initRoutes() {
    app.use('/api', routes);
    // redirect all others to the index (HTML5 history)
    app.all('/*', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
  }

  start() {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  }

}

const server = new Server();
