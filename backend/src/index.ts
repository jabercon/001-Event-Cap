import express = require("express");
import multer = require("multer");
import path = require("path");
import fs = require("fs");

const app = express();
const PORT = 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Event Cap API is running (TypeScript)");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/events", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "text field is required" });
    return;
  }

  res.status(201).json({
    id: Math.random().toString(36).substring(7),
    text,
    timestamp: new Date().toISOString(),
  });
});

app.post("/events/upload", upload.single("photo"), (req, res) => {
  const { id, type, description, tags } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "photo file is required" });
    return;
  }

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "id field is required" });
    return;
  }

  if (!type || typeof type !== "string") {
    res.status(400).json({ error: "type field is required" });
    return;
  }

  if (!description || typeof description !== "string") {
    res.status(400).json({ error: "description field is required" });
    return;
  }

  if (!tags || typeof tags !== "string") {
    res.status(400).json({ error: "tags field is required" });
    return;
  }

  res.status(201).json({
    id,
    type,
    description,
    tags,
    photoPath: file.path,
    photoMimetype: file.mimetype,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
