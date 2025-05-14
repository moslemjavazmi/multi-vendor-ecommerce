const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { responseReturn } = require("../utiles/response");
const { createToken } = require("../utiles/tokenCreate");
const { userInfo } = require("os");
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
            role: admin.role
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });
          responseReturn(res, 200, { token, message: "ورود موقیت آمیز بود" });
        } else {
          responseReturn(res, 404, { error: "رمز عبور اشتباه است" });
        }
      } else {
        responseReturn(res, 404, { error: "ایمیل یافت نشد" });
      }
      // console.log(admin);
    } catch (error) {
      responseReturn(res, 500, { error: error.messages });
    }
  };
  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        // responseReturn(res, 404, { error: "شما به این صفحه دسترسی ندارید" });
        console.log("seller info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
const authControllerInstance = new authControllers();
module.exports = authControllerInstance;
