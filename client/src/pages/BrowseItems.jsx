import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom"; // 🔥 ADDED

const BrowseItems = () => {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // 🔥 ADDED

  // 🔥 EMAIL FUNCTION (UNCHANGED)
  const handleInterest = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.email) {
        alert("Please login first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/listings/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerEmail: item.userEmail,
          itemTitle: item.title,
          buyerEmail: user.email,
        }),
      });

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.log(error);
      alert("Failed to send interest");
    }
  };

  // 🔥 FETCH DATA (UNCHANGED)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        const data = await res.json();

        setListings(data);
        setFiltered(data);

      } catch (error) {
        console.log("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // 🔥 FILTER LOGIC (UNCHANGED)
  useEffect(() => {
    let result = listings;

    if (search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (minPrice) {
      result = result.filter((item) => item.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((item) => item.price <= Number(maxPrice));
    }

    if (statusFilter === "available") {
      result = result.filter((item) => item.status !== "sold");
    }

    if (statusFilter === "sold") {
      result = result.filter((item) => item.status === "sold");
    }

    setFiltered(result);
  }, [search, category, minPrice, maxPrice, listings, statusFilter]);

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">Browse Items</h1>

      {/* FILTER SECTION */}
      <div className="flex gap-4 mb-6 flex-wrap bg-white/40 backdrop-blur-lg p-4 rounded-2xl shadow">

        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg border outline-none focus:ring-2 focus:ring-purple-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg border"
        >
          <option value="">All Categories</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Lab Kits</option>
          <option>Stationery</option>
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-3 rounded-lg border w-28"
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-3 rounded-lg border w-28"
        />
      </div>

      {/* STATUS FILTER */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setStatusFilter("")}
          className={`px-4 py-1 rounded-full text-sm transition ${
            statusFilter === ""
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow"
              : "bg-white/60 backdrop-blur border hover:scale-105"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatusFilter("available")}
          className={`px-4 py-1 rounded-full text-sm transition ${
            statusFilter === "available"
              ? "bg-green-500 text-white shadow"
              : "bg-white/60 backdrop-blur border hover:scale-105"
          }`}
        >
          Available
        </button>

        <button
          onClick={() => setStatusFilter("sold")}
          className={`px-4 py-1 rounded-full text-sm transition ${
            statusFilter === "sold"
              ? "bg-red-500 text-white shadow"
              : "bg-white/60 backdrop-blur border hover:scale-105"
          }`}
        >
          Sold
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Loading items...
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          😕 No items found. Try changing filters or add a new item.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6">

          {filtered.map((item) => (
            <div
              key={item._id}

              // 🔥 ADDED NAVIGATION
              onClick={() => navigate(`/product/${item._id}`, { state: item })}

              className="cursor-pointer bg-white/60 backdrop-blur-lg border border-white/30 
              p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] 
              transition duration-300"
            >

              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt="item"
                className="h-40 w-full object-cover rounded-lg mb-4"
              />

              <h3 className="font-bold text-lg mb-1">{item.title}</h3>

              <p className="text-gray-700 font-semibold">
                ₹{item.price} • {item.condition}
              </p>

              <p className="text-sm text-gray-400">
                {item.category}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Seller: {item.userEmail}
              </p>

              <div className="mt-2">
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

              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 FIX
                  handleInterest(item);
                }}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-500 
                text-white py-2 rounded-lg shadow hover:shadow-lg 
                hover:scale-105 transition duration-200"
              >
                Interested
              </button>

            </div>
          ))}

        </div>
      )}

    </MainLayout>
  );
};

export default BrowseItems;