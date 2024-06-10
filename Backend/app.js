const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const userRouter = require("./routes/UserRouter");
const registerRouter = require("./routes/RegisterRouter");
const loginRouter = require("./routes/LoginRouter");
const forgotPassRouter = require("./routes/ForgotPassRouter");
const productRouter = require("./routes/ProductRouter");
const itemRouter = require("./routes/CartItemRouter");
const orderRouter = require("./routes/OrderRouter");
const confirmRouter = require("./routes/ConfirmRouter");
const commentRouter = require("./routes/CommentRouter");
const stripeRouter = require("./routes/StripeRouter");
const socketServer = require("./utils/socketServer");

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
socketServer.registerSocketServer(server);

server.listen(PORT, () => {
  console.log(`Application listening on ${PORT} !`);
});

//configure mongoose
const uri = process.env.DB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful...");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);
  });

app.use("/api/user", userRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/forgot_pass", forgotPassRouter);

app.use("/api/product", productRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
app.use("/api/confirm", confirmRouter);
app.use("/api/comment", commentRouter);
app.use("/api/stripe", stripeRouter);
module.exports = app;
