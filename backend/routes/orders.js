const router = require("express").Router();
const db = require("../db");

// Daily report
router.get("/report", (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  db.query(
    `SELECT customers.*, \`order\`.order_date 
     FROM customers 
     JOIN \`order\` ON customers.order_number = \`order\`.order_number
     WHERE order_date = ?`,
    [today],
    (err, result) => {
      res.send(result);
    }
  );
});

module.exports = router;