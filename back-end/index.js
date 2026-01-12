import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());


app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});