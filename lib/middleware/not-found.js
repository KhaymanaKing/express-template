module.exports = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};
// Error if the item user is looking for 
//doesn't exist or the route doesn't exist?
