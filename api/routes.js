const router = require('express').Router();

const getResponse = (cookieSession) => {
  return { 'session': cookieSession ? cookieSession : 'not authenticated' };
};

const log = (event, req) => {
  console.log(event);
  console.log('REQ HEADERS', req.headers);
  console.log('REQ COOKIES', req.cookies);
  console.log('REQ BODY', req.body);
};

router.route('/').get((req, res) => {
  log('/get', req);
  res.send(getResponse(req.cookies['sessionid']))
});

router.route('/login').post((req, res) => {
  log('/login', req);
  res.cookie('sessionid', '12345');
  res.send(getResponse(req.cookies['sessionid']))
});

router.get('/logout', (req, res) => {
  log('/logout', req);
  res.clearCookie('sessionid');
  res.send(getResponse(req.cookies['sessionid']))
});

router.put('/put', (req, res) => {
  log('/put', req);
  res.send(getResponse(req.cookies['sessionid']))
});

router.post('/post', (req, res) => {
  log('/post', req);
  res.send(getResponse(req.cookies['sessionid']))
});

module.exports = router;
