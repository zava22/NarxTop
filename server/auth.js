
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config({
  path: ".env.local",
});

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME =
  process.env.MONGODB_DB_NAME || "narxitop";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

app.get("/api/health", async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected.",
      });
    }

    await db.command({ ping: 1 });

    res.json({
      success: true,
      message: "NarxTop API and MongoDB Atlas are connected.",
      database: MONGODB_DB_NAME,
    });
  } catch (error) {
    console.error("Health check error:", error);

    res.status(500).json({
      success: false,
      message: "MongoDB connection check failed.",
    });
  }
});

async function startServer() {
  try {
    await client.connect();

    db = client.db(MONGODB_DB_NAME);

    await db.command({ ping: 1 });

    // Load auth routes after .env.local has been loaded.
    const { createAuthRouter } = await import("./auth.js");

    app.use(
      "/api/auth",
      createAuthRouter(db)
    );

    console.log("✅ Connected to MongoDB Atlas");
    console.log(`✅ Database: ${MONGODB_DB_NAME}`);

    app.listen(PORT, () => {
      console.log(
        `✅ API server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Server startup failed:");
    console.error(error.message);

    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await client.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await client.close();
  process.exit(0);
});

startServer();
