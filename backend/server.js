const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const auditRoutes = require("./routes/auditRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", auditRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
