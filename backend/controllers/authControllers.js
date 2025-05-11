const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel
        .findOne({ email: email })
        .select("+password");
      if (admin) {
        const match = bcrypt.compare(password, admin.password);
        console.log("true", match);
      } else {
        responseReturn(res, 400, { error: "ایمیل یافت نشد" });
      }
      // console.log(admin);
    } catch (error) {
      responseReturn(res, 500, { error: error.messages });
    }
  };
}
const authControllerInstance = new authControllers();
module.exports = authControllerInstance;
