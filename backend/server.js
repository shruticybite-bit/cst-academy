import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoutes.js";
import workshopRoute from "./routes/workshopRegistration.js";
import serviceRoutes  from "./routes/service.js";
import cmsRoutes from "./routes/cmsPopupRoutes.js"; // ✅ .js extension required

console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET);

const app = express();

// Security Headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting (Prevent Spam/DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/services", serviceRoutes);

app.use("/api/workshop-register", workshopRoute);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);  // ✅ prefix
app.use("/api/cms-popup", cmsRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
