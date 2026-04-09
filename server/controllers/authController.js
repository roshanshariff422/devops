const User = require("../models/User");
const transporter = require("../config/mailer");
const EmailLog = require("../models/EmailLog");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    // ✅ EMAIL (SAFE)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to CampusCycle Marketplace 🎓",
        text: `Hello ${name},

Welcome to CampusCycle!

You can now buy, sell, and exchange items easily within your campus.

Start exploring listings or post your own items today.

- CampusCycle Team`,
      });

      // Save log
      await EmailLog.create({
        email,
        type: "signup",
        message: "Welcome email sent",
        status: "sent",
      });

    } catch (err) {
      console.log("EMAIL ERROR (signup):", err);
    }

    // ✅ ALWAYS SEND RESPONSE
    res.json({ message: "User created & email sent" });

  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ EMAIL (SAFE)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Login Successful - CampusCycle",
        text: `Hello ${user.name},

You have successfully logged into your CampusCycle account.

If this wasn't you, please secure your account immediately.

- CampusCycle Team`,
      });

      // Save log
      await EmailLog.create({
        email,
        type: "login",
        message: "Login alert sent",
        status: "sent",
      });

    } catch (err) {
      console.log("EMAIL ERROR (login):", err);
    }

    // ✅ IMPORTANT: ALWAYS RETURN USER
    res.json({ message: "Login successful", user });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};