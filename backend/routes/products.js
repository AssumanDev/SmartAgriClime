const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// GET all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.json(result);
  });
});

// ADD product
router.post("/", auth, (req, res) => {
  db.query("INSERT INTO products SET ?", req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Product added");
  });
});

// UPDATE product
router.put("/:id", auth, (req, res) => {
  db.query(
    "UPDATE products SET ? WHERE productcode=?",
    [req.body, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
});

// DELETE product
router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM products WHERE productcode=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Deleted");
    }
  );
});

module.exports = router;