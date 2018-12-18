# csrf-test

Cross-Site Request Forgery (XSRF) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website.

 Angular's `HttpClient` module supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token) used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default XSRF-TOKEN, and sets it as an HTTP header, X-XSRF-TOKEN. Since only _code that runs on your domain could read the cookie_, the backend can be certain that the HTTP request came from the client application and not an attacker.

 By default, an interceptor sends this cookie on all mutating requests (POST, etc.) to relative URLs but not on GET/HEAD requests or on requests with an absolute URL.

To take advantage of this, server needs to set a token in a JavaScript readable session cookie called XSRF-TOKEN on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the X-XSRF-TOKEN HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens.

## Components

### Angular

#### Supported `HttpClient` implementation
* takes token from a response cookie (named XSRF-TOKEN)
* sends the token back in the header on all mutating requests (POST, etc.) but not on GET/HEAD
  * note: sends the header to relative URLs only
* source: https://github.com/angular/angular/blob/master/packages/http/src/backends/xhr_backend.ts

### NodeJS

#### Adding `csurf` middleware
  * generates a token
  * validates requests
  * makes sure that the requests are coming from a proper client
  * `app.use(csrf({cookie: true}));`
  * source: https://github.com/expressjs/csurf/blob/master/index.js

### Testing

### Testing with proxy (Angular & Node)

* run `npm run client` to start the Angular application
* run `npm run server` to start the Node server
* browse to application address `http://localhost:4200`

`proxy.config.json` is used for taking the API request at the same domain+port where the frontend application runs (4200) and then forward the request to the backend API server.

### How to test without the CSRF protection?

1. In `server.js` comment the following line
    ```
    this.initCsrfProtection();
    ```
1. Start the server `npm start`
1. Clear cookies on your browser
1. Notice that everything works in the app
1. Open up the _Dangerous website_ (`./dangerous-website/index.html`)
1. See that you can do POST submit

### Building the app for heroku

`Package.json` has the proper `postinstall` npm script for Heroku deployment.
