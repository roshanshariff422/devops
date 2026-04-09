import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 ADDED FUNCTION (FROM DASHBOARD)
  const user = JSON.parse(localStorage.getItem("user"));

  const markAsSold = async (id) => {
    try {
     await fetch(`https://devops-c5cj.onrender.com/api/listings/sold/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userEmail: user.email,
  }),
});

      // update UI instantly
      setListings((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "sold" } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
          console.log("No user found");
          setLoading(false);
          return;
        }

        const res = await fetch("https://devops-c5cj.onrender.com/api/listings");
        const data = await res.json();

        const myItems = data.filter(
          (item) => item.userEmail === user.email
        );

        setListings(myItems);

      } catch (error) {
        console.log("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  return (
  <MainLayout>
    <h1 className="text-3xl font-bold mb-6">My Listings</h1>

    {/* LOADING */}
    {loading ? (
      <p className="text-center text-gray-500 text-lg mt-10">
        Loading items...
      </p>
    ) : listings.length === 0 ? (
      <p className="text-center text-gray-500 mt-10 text-lg">
        😕 No items found. Try adding a new item.
      </p>
    ) : (
<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white/60 backdrop-blur-lg border border-white/30 
            p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] 
            transition duration-300"
          >

            {/* IMAGE */}
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt="item"
              className="h-40 w-full object-cover rounded-lg mb-4"
            />

            {/* TITLE */}
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>

            {/* PRICE */}
            <p className="text-gray-700 font-semibold">
              ₹{item.price}
            </p>

            {/* CONDITION */}
            <p className="text-sm text-gray-400">
              {item.condition}
            </p>

            {/* STATUS BADGE */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold 
                ${item.status === "sold"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
                }`}
              >
                {item.status === "sold" ? "Sold" : "Available"}
              </span>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => markAsSold(item._id)}
              disabled={item.status === "sold"}
              className={`mt-4 w-full py-2 rounded-lg text-white font-semibold 
              transition duration-200 shadow
              ${
                item.status === "sold"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg hover:scale-105"
              }`}
            >
              {item.status === "sold" ? "Sold" : "Mark as Sold"}
            </button>

          </div>
        ))}

      </div>
    )}
  </MainLayout>
);
};

export default MyListings;