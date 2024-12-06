import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

// Sanitize CLIENT_URL to remove trailing slash
const sanitizedOrigin = process.env.CLIENT_URL?.replace(/\/$/, "");

console.log("CORS allowed origin:", sanitizedOrigin); // Debugging

const corsOptions = {
  origin: sanitizedOrigin, // Frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
