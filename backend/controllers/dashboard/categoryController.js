const categoryModel = require("../../models/categoryModel");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { responseReturn } = require("../../utiles/response");
class categoryController {
  add_category = async (req, res) => {
    // ایجاد پوشه آپلود اگر وجود ندارد
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 15 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => mimetype && mimetype.includes("image")
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === "LIMIT_FILE_TYPE") {
          return responseReturn(res, 404, {
            error: "فقط فایل‌های تصویری مجاز هستند!"
          });
        }
        return responseReturn(res, 500, {
          error: "مشکلی پیش آمده است لطفا دوباره امتحان کنید"
        });
      }

      try {
        console.log("fields", fields);
        console.log("files", files);
        const { name } = fields;
        const { image } = files;

        if (!image) {
          return responseReturn(res, 400, {
            error: "تصویر الزامی است"
          });
        }

        const categoryName = name.trim();
        const slug = categoryName.split(" ").join("-");

        // ذخیره مسیر نسبی فایل
        const relativeImagePath = path.relative("./", image.filepath);

        const category = new categoryModel({
          name: categoryName,
          image: relativeImagePath,
          slug
        });

        await category.save();
        responseReturn(res, 200, {
          message: "دسته بندی با موفقیت اضافه شد",
          category
        });
      } catch (error) {
        console.error("Error saving category:", error);
        responseReturn(res, 500, {
          error: "خطا در ذخیره دسته بندی"
        });
      }
    });
  };

  get_category = async (req, res) => {
    console.log("get caat");
  };
}

module.exports = new categoryController();
