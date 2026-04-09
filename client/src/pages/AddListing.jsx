import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";

const AddListing = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    image: "",
  });

  const [aiData, setAiData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 AI FUNCTION (UPGRADED)
  const getAISuggestion = async () => {
    try {
      const res = await fetch("https://devops-c5cj.onrender.com/api/listings/ai-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          condition: form.condition,
        }),
      });

      const data = await res.json();
      setAiData(data);

      // 🔥 AUTO-FILL FORM (NEW)
      setForm((prev) => ({
        ...prev,
        title: data.suggestedTitle || prev.title,
        price: data.recommendedPrice || prev.price,
        description:
          data.suggestedDescription ||
          "Good quality item, suitable for student use.",
      }));

    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("https://devops-c5cj.onrender.com/api/listings/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          userEmail: user?.email,
        }),
      });

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.log(error);
      alert("Error adding item");
    }
  };

 return (
  <MainLayout>
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 
    p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Add New Item 🚀
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Item Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg border outline-none 
          focus:ring-2 focus:ring-purple-400 transition"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-3 rounded-lg border outline-none 
          focus:ring-2 focus:ring-purple-400 transition"
        />

        {/* CATEGORY + CONDITION */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-3 rounded-lg border"
          >
            <option value="">Select Category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Lab Kits</option>
            <option>Stationery</option>
          </select>

          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="p-3 rounded-lg border"
          >
            <option value="">Condition</option>
            <option>New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 rounded-lg border outline-none 
          focus:ring-2 focus:ring-purple-400 transition"
        />

        {/* IMAGE UPLOAD */}
        <div className="bg-white/40 p-3 rounded-lg border border-white/30">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              const reader = new FileReader();
              reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
              };

              if (file) {
                reader.readAsDataURL(file);
              }
            }}
            className="w-full text-sm cursor-pointer"
          />
        </div>

        {/* AI BUTTON */}
        <button
          type="button"
          onClick={getAISuggestion}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 
          text-white py-2 rounded-lg shadow hover:shadow-lg 
          hover:scale-105 transition duration-200"
        >
          🤖 Get AI Suggestion
        </button>

        {/* AI RESULT */}
        {aiData && (
          <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl shadow-inner">
            <p className="text-sm text-gray-500">Suggested Title:</p>
            <p className="font-semibold text-gray-800">
              {aiData.suggestedTitle}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              Recommended Price:
            </p>
            <p className="text-purple-600 font-bold text-lg">
              ₹{aiData.recommendedPrice}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 
        text-white py-3 rounded-xl font-semibold shadow-lg 
        hover:shadow-2xl hover:scale-105 active:scale-95 transition duration-300">
          Add Item
        </button>

      </form>
    </div>
  </MainLayout>
);
};

export default AddListing;