import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center mb-6">

      {/* LEFT SIDE */}
      <h1 className="text-2xl font-bold">
        CampusCycle Marketplace
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex gap-3">

        <button
  onClick={() => navigate("/add")}
  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
>
  + Add Item
</button>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Header;