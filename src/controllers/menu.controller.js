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

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id } = req.body;

  const image_url = req.file ? req.file.path : null;

  if (image_url) {
    await db.query(
      `UPDATE menu_items
       SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?
       WHERE id = ?`,
      [name, description, price, category_id, image_url, id]
    );
  } else {
    await db.query(
      `UPDATE menu_items
       SET name = ?, description = ?, price = ?, category_id = ?
       WHERE id = ?`,
      [name, description, price, category_id, id]
    );
  }

  res.json({ message: "Menu item updated successfully" });
};


exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM menu_items WHERE id = ?", [id]);
  res.json({ message: "Menu item deleted" });
};
