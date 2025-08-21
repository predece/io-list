const Router = require("express");
const router = Router();
const NewConfig = require("../controller/ConfigurationNewUserController");
const upload = require("../cloudinary/cloudinary"); // Убедитесь, что путь правильный
const User = require("../module/User"); // Замените на вашу модель пользователя
const cloudinary = require("../cloudinary/cloudinaryConfig");

router.post("/", upload.single("img"), NewConfig.AddProfile);

module.exports = router;

// try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Файл не загружен" });
//     }

//     res.json({
//       message: "Успех!",
//       url: req.file.path,
//       originalName: req.file.originalname,
//       size: req.file.size,
//     });
//   } catch (error) {
//     console.error("💥 Ошибка в /upload:", error);
//     res.status(500).json({ error: "Ошибка загрузки файла" });
//   }
