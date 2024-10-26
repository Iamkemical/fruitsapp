require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();

const { Sequelize, Op } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config/config");

const sequelize = new Sequelize(process.env.DATABASE_URL, config[env]);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    // Test query
    const result = await sequelize.query("SELECT NOW()", {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log("📊 Test query result:", result);
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  } finally {
    //await sequelize.close();
  }
}

testConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: `FruitsApi ${process.env.NODE_ENV} environment`,
    data: null,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: `API up and running`,
    data: null,
  });
});

app.get("/api/fruit", async (req, res) => {
  const { name, color, season, createdAt } = req.query;

  let baseQuery = `SELECT color, name, price, season, "createdAt" FROM public.fruits WHERE "createdAt" IS NOT null`;
  const replacements = {};
  if (name) {
    baseQuery += ` AND to_tsvector('english', name) @@ to_tsquery('english', :name || ':*')`;
    replacements.name = name;
  }
  if (color) {
    baseQuery += ` AND to_tsvector('english', color) @@ to_tsquery('english', :color || ':*')`;
    replacements.color = color;
  }
  if (season) {
    baseQuery += ` AND to_tsvector('english', season) @@ to_tsquery('english', :season || ':*')`;
    replacements.season = season;
  }
  const [result, metadata] = await sequelize.query(baseQuery, {
    replacements,
  });

  return res.status(200).json({
    status: "Success",
    message: "Fruits fetched successfully",
    data: result,
  });
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("Server up and running on port", PORT);
});
