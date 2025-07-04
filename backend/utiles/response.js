//backend/utiles/response.js
module.exports.responseReturn = (res, code, data) => {
  return res.status(code).json(data);
};
