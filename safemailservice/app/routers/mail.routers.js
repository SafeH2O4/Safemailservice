const controller = require("../controllers/sendMail");
const validateToken=require("../controllers/validateToken");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/mail/send",
      validateToken.validateJwtToken,
      controller.sendMail,
      controller.sendCustomerMail
    );
  };