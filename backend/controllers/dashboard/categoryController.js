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
        const { name } = fields;
        const { image } = files;

        if (!image) {
          return responseReturn(res, 400, {
            error: "تصویر الزامی است"
          });
        }

        const categoryName = name.trim();
        const slug = categoryName.split(" ").join("-");

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
          error: "خطا در ذخیره دسته بندی بوجود آمده است."
        });
      }
    });
  };

  get_category = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    try {
      let skipPage = "";
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && perPage) {
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue }
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue }
          })
          .countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else if (searchValue === "" && page && perPage) {
        const categorys = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else {
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new categoryController();
