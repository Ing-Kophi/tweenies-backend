const db = require("../config/db");

exports.create = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image_url = req.file ? req.file.path : null;

  await db.query(
    `INSERT INTO menu_items 
     (category_id, name, description, price, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [category_id, name, description, price, image_url]
  );

  res.json({ message: "Menu item created successfully" });
};
