import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allowedAreas, allowedPriorities, tickets } from "./data/tickets.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distPath = path.join(projectRoot, "dist");

app.use(express.json());

app.get("/api/tickets", (req, res) => {
  res.json(tickets.filter((ticket) => ticket.status === "open"));
});

app.get("/api/ticket-options", (req, res) => {
  res.json({
    priorities: allowedPriorities,
    areas: allowedAreas
  });
});

app.post("/api/tickets", (req, res) => {
  res.status(501).json({
    code: "NOT_IMPLEMENTED",
    message: "POST /api/tickets e' il primo slice da implementare nel Lab 08."
  });
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.listen(port, () => {
  console.log(`API server ready on http://127.0.0.1:${port}`);
});
