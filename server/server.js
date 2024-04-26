import express from "express";
import cors from "cors";
import mysql from "mysql";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

console.log(process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to db: " + err.stack);
    return;
  }
  console.log("Connected to db");
});

app.use(cors());
app.use(express.static(path.join(__dirname, "songs")));

app.get("/api/v1/songs", (req, res) => {
  const sql = "SELECT * FROM songs";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving songs: " + err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.get("/api/v1/songs/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "songs", fileName);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Error accessing file: ", err);
      res.status(404).json({ error: "File not fond" });
      return;
    }
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
