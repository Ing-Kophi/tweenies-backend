const db = require("../config/db");

exports.getAll = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM categories");
  res.json(rows);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
  res.json({ message: "Category created" });
};
