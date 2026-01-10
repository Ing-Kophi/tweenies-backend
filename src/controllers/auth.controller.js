const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [admins] = await db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email]
  );

  if (!admins.length) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const admin = admins[0];
  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
