const formidable = require("formidable");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utiles/response");
const path = require("path");
const fs = require("fs");

class productController {
  add_product = async (req, res) => {
    const { id } = req;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(__dirname, "../../uploads/products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 15 * 1024 * 1024, // 15MB
      filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === "LIMIT_FILE_TYPE") {
          return responseReturn(res, 400, {
            error: "فقط فایل‌های تصویری مجاز هستند!"
          });
        }
        return responseReturn(res, 500, {
          error: "مشکلی پیش آمده است لطفا دوباره امتحان کنید"
        });
      }

      const {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand
      } = fields;

      // Validate required fields
      if (!name || !category || !description || !stock || !price) {
        return responseReturn(res, 400, {
          error: "تمام فیلد ها باید کامل شود"
        });
      }

      // Process images
      let allImageUrl = [];
      const images = files.images;

      if (Array.isArray(images)) {
        // Multiple files case
        for (let img of images) {
          const relativePath = path.relative(
            path.join(__dirname, "../.."),
            img.filepath
          );
          allImageUrl.push(relativePath);
        }
      } else if (images) {
        // Single file case
        const relativePath = path.relative(
          path.join(__dirname, "../.."),
          images.filepath
        );
        allImageUrl.push(relativePath);
      } else {
        return responseReturn(res, 400, {
          error: "حداقل یک تصویر برای نمایش محصول لازم است"
        });
      }

      try {
        // Create slug
        const slug = name
          .trim()
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .split(" ")
          .join("-");

        // Create product
        await productModel.create({
          sellerId: id,
          name: name.trim(),
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount) || 0,
          images: allImageUrl,
          brand: brand ? brand.trim() : ""
        });

        responseReturn(res, 201, {
          message: "محصول با موفقیت اضافه شد"
        });
      } catch (error) {
        console.error("مشکلی در ثبت محصول جدید بوجود آمده است:", error);
        responseReturn(res, 500, {
          error: "سرور پاسخگو نیست"
        });
      }
    });
  };
  get_products = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    try {
      let skipPage = "";
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && perPage) {
        const products = await productModel
          .find({
            $text: { $search: searchValue }
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalproduct = await productModel
          .find({
            $text: { $search: searchValue }
          })
          .countDocuments();
        responseReturn(res, 200, { totalproduct, products });
      } else if (searchValue === "" && page && perPage) {
        const products = await productModel
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalproduct = await productModel.find({}).countDocuments();
        // console.log("totalproduct in controller", totalproduct);

        responseReturn(res, 200, { totalproduct, products });
      } else {
        const products = await productModel.find({}).sort({ createdAt: -1 });
        const totalproduct = await productModel.find({}).countDocuments();
        responseReturn(res, 200, { totalproduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  get_product = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  product_update = async (req, res) => {
    let { name, description, discount, price, brand, stock, productId } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      const productbefor = await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        stock,
        productId,
        slug
      });
      console.log("productbefor", productbefor);
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "به روز رسانی با موفقیت انجام شد"
      });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message
      });
    }
  };
  // product_image_update = async (req, res) => {
  //   const uploadDir = path.join(__dirname, "../../uploads/products");
  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir, { recursive: true });
  //   }
  //   const form = formidable({
  //     multiples: true,
  //     uploadDir,
  //     keepExtensions: true,
  //     maxFileSize: 15 * 1024 * 1024, // 15MB
  //     filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
  //     filename: (name, ext, part) => {
  //       return `${Date.now()}-${part.originalFilename}`;
  //     }
  //   });

  //   form.parse(req, (err, fields, files) => {
  //     const { productId, oldImage } = fields;
  //     const { newImage } = files;
  //     const product = productModel.findById(productId);

  //     if (err) {
  //       if (err.code === "LIMIT_FILE_TYPE") {
  //         return responseReturn(res, 400, {
  //           error: "فقط فایل‌های تصویری مجاز هستند!"
  //         });
  //       }
  //       return responseReturn(res, 500, {
  //         error: "مشکلی پیش آمده است لطفا دوباره امتحان کنید"
  //       });
  //     } else {
  //       if (newImage) {
  //         let allImageUrl = [];

  //         const relativePath = path.relative(
  //           path.join(__dirname, "../.."),
  //           newImage.filepath
  //         );
  //         allImageUrl.push(relativePath);

  //         // const images = pro.images;
  //         // images.push(relativePath);
  //         console.log("pro", product);
  //         // productModel
  //         //   .findByIdAndUpdate(productId, {
  //         //     images: images
  //         //   })
  //         //   .then(() => {
  //         //     fs.unlinkSync(oldImage);
  //         //     responseReturn(res, 200, {
  //         //       message: "به روز رسانی با موفقیت انجام شد"
  //         //     });
  //         //   })
  //         // .catch((error) => {
  //         //   responseReturn(res, 500, {
  //         //     error: "مشکلی پیش آمده است لطفا دوباره امتحان کنید"
  //         //   });
  //         // });
  //       }
  //     }
  //   });
  // };
  product_image_update = async (req, res) => {
    const uploadDir = path.join(__dirname, "../../uploads/products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 15 * 1024 * 1024, // 15MB
      filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === "LIMIT_FILE_TYPE") {
          return responseReturn(res, 400, {
            error: "فقط فایل‌های تصویری مجاز هستند!"
          });
        }
        return responseReturn(res, 500, {
          error: "مشکلی پیش آمده است لطفا دوباره امتحان کنید"
        });
      }

      const { productId, oldImage } = fields;
      const { newImage } = files;

      if (!newImage) {
        return responseReturn(res, 400, {
          error: "تصویر جدید انتخاب نشده است"
        });
      }

      try {
        // Get relative path for new image
        const relativePath = path.relative(
          path.join(__dirname, "../.."),
          newImage.filepath
        );

        // Find product and update images array
        const product = await productModel.findById(productId);
        if (!product) {
          return responseReturn(res, 404, {
            error: "محصول یافت نشد"
          });
        }

        // Replace old image with new one
        const updatedImages = product.images.map((img) =>
          img === oldImage ? relativePath : img
        );

        await productModel.findByIdAndUpdate(productId, {
          $set: { images: updatedImages }
        });

        // Delete old image file
        const oldImagePath = path.join(__dirname, "../../", oldImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }

        responseReturn(res, 200, {
          message: "تصویر محصول با موفقیت به‌روزرسانی شد"
        });
      } catch (error) {
        console.error(error);
        responseReturn(res, 500, {
          error: "خطای سرور"
        });
      }
    });
  };
  product_add_images = async (req, res) => {
    // اضافه کردن لاگ برای دیباگ
    console.log("User ID:", req.id);
    console.log("User Role:", req.role);

    const uploadDir = path.join(__dirname, "../../uploads/products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 15 * 1024 * 1024 * 5, // 75MB
      filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        return responseReturn(res, 500, {
          error: "مشکلی در آپلود تصاویر پیش آمده است"
        });
      }

      const { productId } = fields;
      console.log("Product ID:", productId);

      // تغییر در نحوه دریافت فایل‌ها
      const newImages = Array.isArray(files["newImages[]"])
        ? files["newImages[]"]
        : files["newImages[]"]
        ? [files["newImages[]"]]
        : [];

      console.log("New images count:", newImages.length);

      if (newImages.length === 0) {
        return responseReturn(res, 400, {
          error: "هیچ تصویری انتخاب نشده است"
        });
      }

      try {
        // افزودن بررسی مالکیت محصول
        const product = await productModel.findOne({
          _id: productId,
          sellerId: req.id // فقط فروشنده مالک می‌تواند تغییر دهد
        });

        if (!product) {
          return responseReturn(res, 404, {
            error: "محصول یافت نشد یا شما مجاز به ویرایش آن نیستید"
          });
        }

        const newImagePaths = newImages.map((img) =>
          path.relative(path.join(__dirname, "../.."), img.filepath)
        );

        product.images = [...product.images, ...newImagePaths];
        await product.save();

        responseReturn(res, 200, {
          success: true,
          message: "تصاویر جدید با موفقیت اضافه شدند",
          product
        });
      } catch (error) {
        console.error("Error adding images:", error);
        responseReturn(res, 500, {
          error: "خطای سرور"
        });
      }
    });
  };

  // تابع حذف تصویر
  product_delete_image = async (req, res) => {
    const { productId, image } = req.body;

    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, {
          error: "محصول یافت نشد"
        });
      }

      // حذف تصویر از لیست
      product.images = product.images.filter((img) => img !== image);
      await product.save();

      // حذف فیزیکی فایل
      const imagePath = path.join(__dirname, "../../", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      responseReturn(res, 200, {
        success: true,
        message: "تصویر با موفقیت حذف شد"
      });
    } catch (error) {
      console.error(error);
      responseReturn(res, 500, {
        error: "خطای سرور"
      });
    }
  };
}

module.exports = new productController();
