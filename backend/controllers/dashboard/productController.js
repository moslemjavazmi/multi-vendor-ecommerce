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
            error: "Only image files are allowed!"
          });
        }
        return responseReturn(res, 500, {
          error: "Something went wrong, please try again"
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
          error: "All fields are required"
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
}

module.exports = new productController();
