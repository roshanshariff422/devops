const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const nodemailer = require("nodemailer");


// ➕ ADD LISTING
router.post("/add", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();

    res.json({ message: "Listing added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📥 GET ALL LISTINGS
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ MARK AS SOLD
router.put("/sold/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Item not found" });
    }

    // 🔥 OWNER CHECK
    if (listing.userEmail !== req.body.userEmail) {
      return res.status(403).json({
        message: "You are not allowed to mark this item",
      });
    }

    listing.status = "sold";
    await listing.save();

    res.json({ message: "Marked as sold successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📧 SEND INTEREST EMAIL + SAVE TO DB
router.post("/interest", async (req, res) => {
  try {
    const { sellerEmail, itemTitle, buyerEmail, listingId } = req.body;
    
    if (!buyerEmail) {
  return res.status(400).json({
    message: "User must be logged in to show interest",
  });
}

    // 🔥 SAVE INTEREST IN DATABASE
    await Listing.findByIdAndUpdate(
      listingId,
      {
        $addToSet: { interestedUsers: buyerEmail } // avoids duplicates
      }
    );

    // 📧 SEND EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: "New Interest in Your Item - CampusCycle",
      text: `Hello,

Someone is interested in your item "${itemTitle}".

Buyer Email: ${buyerEmail}

Please contact them to proceed.

- CampusCycle Team`,
    });

    res.json({ message: "Interest saved & email sent!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to process interest" });
  }
});

// 🤖 AI SUGGESTION
router.post("/ai-suggest", async (req, res) => {
  try {
    const { title, category, condition } = req.body;

    let suggestedTitle = title;
    let price = 200;

    // 🔥 SMART LOGIC
    if (category === "Books") price = 300;
    if (category === "Electronics") price = 800;
    if (category === "Lab Kits") price = 500;
    if (category === "Stationery") price = 100;

    // Condition adjustment
    if (condition === "New") price += 200;
    if (condition === "Good") price += 100;

    // Improve title
    suggestedTitle = `${title} – ${condition} Condition`;

    res.json({
      suggestedTitle,
      recommendedPrice: price,
    });

  } catch (error) {
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;