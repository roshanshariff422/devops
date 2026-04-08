import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { state: item } = useLocation();
  const navigate = useNavigate();

  if (!item) {
    return <p className="text-center mt-10">No product data</p>;
  }

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-purple-600 hover:underline"
        >
          ← Back
        </button>

        {/* 🔥 MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl"
        >

          {/* 🖼 IMAGE SECTION */}
          <div className="relative group">
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt="item"
              className="w-full h-80 object-cover rounded-2xl shadow-lg transition duration-300 group-hover:scale-105"
            />

            {/* STATUS BADGE */}
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-semibold shadow
              ${item.status === "sold"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
              }`}
            >
              {item.status === "sold" ? "Sold" : "Available"}
            </span>
          </div>

          {/* 📦 DETAILS SECTION */}
          <div className="flex flex-col justify-between">

            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>

              <p className="text-2xl font-bold text-purple-600 mb-4">
                ₹{item.price}
              </p>

              {/* INFO GRID */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">

                <div className="bg-white/70 p-3 rounded-lg shadow">
                  <p className="text-gray-500">Condition</p>
                  <p className="font-semibold">{item.condition}</p>
                </div>

                <div className="bg-white/70 p-3 rounded-lg shadow">
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">{item.category}</p>
                </div>

                <div className="bg-white/70 p-3 rounded-lg shadow col-span-2">
                  <p className="text-gray-500">Seller</p>
                  <p className="font-semibold">{item.userEmail}</p>
                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="bg-white/70 p-4 rounded-xl shadow">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description || "No description provided."}
                </p>
              </div>
              {/* 💬 CONTACT SELLER BUTTON */}
<button
  onClick={() =>
    navigate("/messages", {
      state: {
        name: item.userEmail,
        item: item.title,
      },
    })
  }
  className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition duration-300"
>
  💬 Contact Seller
</button>

            </div>

          </div>

        </motion.div>

      </div>

    </MainLayout>
  );
};

export default ProductDetails;