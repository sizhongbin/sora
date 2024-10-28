
// Check if body is empty
module.exports.isBodyEmpty = (req, res, next) => {
  console.log("body: ", req.body);
  if (Object.keys(req.body).length === 0) res.status(400).send('Empty body');
  else next();
}

// Get current time
module.exports.now = (time = +new Date()) => {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substring(0, 23).replace('T', ' ');
}