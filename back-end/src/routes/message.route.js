import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSideBar, getMessages, sendMessage, getChatUser, markMessagesAsRead } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.get("/chat/user/:id", protectRoute, getChatUser);

router.post("/mark-as-read/:chatUserId", protectRoute, markMessagesAsRead);

export default router;