const router = require("express").Router();
const db = require("../db");

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username,password) VALUES (?,?)",
    [username, password],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User created");
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (result.length > 0) {
        req.session.user = result[0];
        res.send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

// ✅ LOGOUT (PUT HERE)
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Logout failed");

    res.clearCookie("connect.sid");
    res.send("Logged out");
  });
});

module.exports = router;