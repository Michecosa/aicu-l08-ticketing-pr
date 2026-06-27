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
  const { title, description, customer, priority, area } = req.body;

  const generatedFields = ["id", "status", "source", "createdAt", "updatedAt"];
  const disallowed = generatedFields.filter((f) => f in req.body);
  if (disallowed.length > 0) {
    return res.status(400).json({
      error: `Il campo "${disallowed[0]}" è generato dal sistema e non può essere inviato dal client.`,
      field: disallowed[0]
    });
  }

  const required = [["title", title], ["description", description], ["customer", customer], ["priority", priority], ["area", area]];
  for (const [field, value] of required) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      return res.status(400).json({ error: `Il campo "${field}" è obbligatorio.`, field });
    }
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      error: `Valore priority non valido. Valori ammessi: ${allowedPriorities.join(", ")}`,
      field: "priority"
    });
  }

  if (!allowedAreas.includes(area)) {
    return res.status(400).json({
      error: `Valore area non valido. Valori ammessi: ${allowedAreas.join(", ")}`,
      field: "area"
    });
  }

  const maxNum = tickets.reduce((max, t) => {
    const num = parseInt(t.id.replace("TCK-", ""), 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 1000);

  const now = new Date().toISOString();
  const newTicket = {
    id: `TCK-${maxNum + 1}`,
    title: title.trim(),
    description: description.trim(),
    customer: customer.trim(),
    priority,
    area,
    status: "open",
    source: "support",
    createdAt: now,
    updatedAt: now
  };

  tickets.push(newTicket);
  return res.status(201).json(newTicket);
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.listen(port, () => {
  console.log(`API server ready on http://127.0.0.1:${port}`);
});
