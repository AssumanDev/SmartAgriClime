const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// Create
router.post("/", auth, (req, res) => {
  const data = req.body;
  db.query("INSERT INTO customers SET ?", data, (err) => {
    if (err) return res.send(err);
    res.send("Customer added");
  });
});

// Read
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    res.send(result);
  });
});

// Update
router.put("/:id", auth, (req, res) => {
  db.query(
    "UPDATE customers SET ? WHERE cust_id=?",
    [req.body, req.params.id],
    (err) => res.send("Updated")
  );
});

// Delete
router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM customers WHERE cust_id=?",
    [req.params.id],
    (err) => res.send("Deleted")
  );
});

module.exports = router;