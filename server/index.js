require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Messppage = require("./models/Message");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const app = express(); // ✅ VERY IMPORTANT
const dns = require("dns");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/listings", listingRoutes);

dns.setServers(["1.1.1.1", "8.8.8.8"]);


// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/api/messages/send", async (req, res) => {
  try {
    const { sender, receiver, item, text } = req.body;

    // ✅ SAVE MESSAGE
    const newMessage = new Message({
      sender,
      receiver,
      item,
      text,
    });

    await newMessage.save();

    // 🔥 SEND EMAIL (ADD THIS PART)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver,
      subject: `New message about ${item}`,
      text: `You received a message from ${sender}:\n\n"${text}"`,
    });

    res.json({ message: "Message sent + Email delivered 🚀" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending message" });
  }
});
app.get("/api/messages/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const messages = await Message.find({
      $or: [{ sender: email }, { receiver: email }],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});