const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "warehouse_secret",
  resave: false,
  saveUninitialized: true
}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});