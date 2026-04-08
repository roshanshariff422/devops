const Navbar = () => {
  return (
    <div className="flex justify-between items-center">

      <h1 className="text-2xl font-bold">CampusCycle Marketplace</h1>

      <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 rounded-xl shadow-lg">
        + Add Item
      </button>

    </div>
  );
};

export default Navbar;