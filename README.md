# csrf-test

Cross-Site Request Forgery (XSRF) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website.

If an application uses sessions/cookies you need CSRF protection.

> Note: When dealing with single-page app that means you will have fresh csrf-token only upon first render


## CSRF protection
1. Server passes a cookie to the client that contains a CSRF token value (`XSRF-TOKEN`)
1. Client sends the cookie back AND sets a header with the cookie value in it (`X-XSRF-TOKEN`)
1. Server compares cookie value to header value

## Reason this works?
* Client can only set the header when it's in the **same domain as the server**

## Components

### Angular

#### Supported `HttpClient` implementation
* takes token from a response cookie (named XSRF-TOKEN)
* sends the token back in the header on all mutating requests (POST, etc.) but not on GET/HEAD
  * note: sends the header to relative URLs only

### NodeJS

#### Adding `csurf` middleware
  * generates a token
  * validates requests
  * makes sure that the requests are coming from a proper client
  * `app.use(csrf({cookie: true}));`

### Testing

### Testing with proxy (Angular & Node)

* run `npm run client` to start the Angular application
* run `npm run server` to start the Node server
* browse to application address `http://localhost:4200`

`proxy.config.json` is used for taking the API request at the same domain+port where the frontend application runs (4200) and then forward the request to the backend API server. No CORS needed.

### How to test without the CSRF protection?

1. In `server.js` comment the following line
    ```
    this.initCsrfProtection();
    ```
1. Start the server `npm start`
1. Clear cookies on your browser
1. Notice that everything works in the app
1. Open up the _Dangerous website_ (`./dangerouns-website/index.html`)
1. See that you can do POST

### Building the app for distribution

```
npm run build   # build angular app
npm start
```

### Testing remotely

* Deploy to heroku when testing with Postman

