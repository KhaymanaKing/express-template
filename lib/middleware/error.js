// eslint-disable-next-line no-unused-vars
module.export = (err, req, res, next) => {
  const status = err.status || 50;
  let message = err.message;
  if(status === 500 && process.env.NODE_ENV === 'production'){
    message = 'Unexpected server error';
  }
  res.status(status);

  if(process.env.NODE_ENV !== 'test' || status === 500){
    console.log(err);
  }
  res.send({ status, message });
};
