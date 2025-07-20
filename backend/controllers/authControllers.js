//backend/controllers/authControllers.js
const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const bcrypt = require("bcrypt");
const { responseReturn } = require("../utiles/response");
const { createToken } = require("../utiles/tokenCreate");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
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
  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel
        .findOne({ email: email })
        .select("+password");
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role
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
      // console.log(seller);
    } catch (error) {
      responseReturn(res, 500, { error: error.messages });
    }
  };
  seller_register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: "ایمیل قبلا ثبت شده است" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
          shopInfo: {}
        });

        await sellerCustomerModel.create({ myId: seller.id });
        const token = await createToken({
          id: seller.id,
          role: seller.role
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        responseReturn(res, 201, {
          token,
          message: "ثبت نام موفقیت آمیز بود"
        });
      }
    } catch (error) {
      console.log("error", error);
      responseReturn(res, 500, { error: "خطای سرور" });
    }
  };

  // getUser = async (req, res) => {
  //   const { id, role } = req;
  //   try {
  //     if (role === "admin") {
  //       const user = await adminModel.findById(id);
  //       responseReturn(res, 200, { userInfo: user });
  //     } else {
  //       // responseReturn(res, 404, { error: "شما به این صفحه دسترسی ندارید" });
  //       const seller = await sellerModel.findById(id);
  //       responseReturn(res, 200, { userInfo: seller });
  //     }
  //   } catch (error) {
  //     responseReturn(res, 500, { error: "خطای سرور" });
  //   }
  // };
  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        console.log("seller in auth controller", seller);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "خطای سرور" });
    }
  };

  profile_image_upload = async (req, res) => {
    const { id, role } = req;

    // مسیر دایرکتوری آپلود - اصلاح شده
    const uploadDir = path.join(__dirname, "../../backend/uploads/profile/");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: false,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 500, {
          error: "مشکلی در آپلود تصویر پیش آمده است"
        });
      }

      const { image } = files;
      if (!image) {
        return responseReturn(res, 400, {
          error: "هیچ تصویری انتخاب نشده است"
        });
      }

      try {
        // محاسبه مسیر ذخیره سازی در دیتابیس - اصلاح شده
        const dbPath = `uploads/profile/${path.basename(image.filepath)}`;

        let user;
        if (role === "admin") {
          // حذف عکس قبلی اگر وجود داشته باشد
          const oldUser = await adminModel.findById(id);

          if (oldUser && oldUser.image) {
            const oldImagePath = path.join(
              __dirname,
              "../../backend/",
              oldUser.image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }

          // آپدیت کاربر با عکس جدید
          user = await adminModel.findByIdAndUpdate(
            id,
            { image: dbPath },
            { new: true }
          );
        } else {
          // همین منطق برای فروشنده
          const oldUser = await sellerModel.findById(id);
          if (oldUser && oldUser.image) {
            const oldImagePath = path.join(
              __dirname,
              "../../backend/",
              oldUser.image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }

          user = await sellerModel.findByIdAndUpdate(
            id,
            { image: dbPath },
            { new: true }
          );
        }

        if (!user) {
          return responseReturn(res, 404, {
            error: "کاربر یافت نشد"
          });
        }

        responseReturn(res, 200, {
          message: "تصویر پروفایل با موفقیت آپلود شد",
          userInfo: user
        });
      } catch (error) {
        console.error("Error uploading profile image:", error);
        responseReturn(res, 500, {
          error: "خطای سرور"
        });
      }
    });
  };
  profile_info_add = async (req, res) => {
    const { division, district, shopName, sub_district, id } = req.body;
    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: { division, district, shopName, sub_district }
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 200, {
        message: "اطلاعات پروفایل با موفقیت ثبت شد",
        userInfo: userInfo
      });
    } catch (error) {
      responseReturn(res, 500, { error: "خطای سرور" });
    }
  };
}
const authControllerInstance = new authControllers();
module.exports = authControllerInstance;
