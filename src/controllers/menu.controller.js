const db = require("../config/db");

exports.getAll = async (req, res) => {
  const [rows] = await db.query(`
    SELECT m.*, c.name AS category
    FROM menu_items m
    JOIN categories c ON m.category_id = c.id
    WHERE m.is_available = 1
  `);
  res.json(rows);
};

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
