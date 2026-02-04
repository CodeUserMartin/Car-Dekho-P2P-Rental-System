import multer from "multer";
import path from "path";
import crypto from "crypto";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  // File name  
  filename: function (req, file, cb) {
    const uniqueName =
      crypto.randomBytes(16).toString("hex") +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

// File filter (allow only images & pdf)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Multer instance
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  },
  fileFilter
});

























// // Storing file in public/temp folder
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp")
//     },

//     // filename as original file name provided by user
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer(
//     { storage }
// )

