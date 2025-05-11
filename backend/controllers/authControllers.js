const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utiles/response");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel
        .findOne({ email: email })
        .select("+password");
      if (admin) {
      } else {
        responseReturn(res, 400, { error: "ایمیل یافت نشد" });
      }
      console.log(admin);
    } catch (error) {
      responseReturn(res, 500, { error: error.messages });
    }
  };
}
const authControllerInstance = new authControllers();
module.exports = authControllerInstance;
