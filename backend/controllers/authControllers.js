const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { responseReturn } = require("../utiles/response");
const { createToken } = require("../utiles/createToken");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel
        .findOne({ email: email })
        .select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "ورود موقیت آمیز بود" });
        } else {
        }
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
