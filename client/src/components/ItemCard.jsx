const ItemCard = () => {
  return (
    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-glass">

      <h2 className="font-bold text-lg">Physics Book</h2>
      <p>₹500</p>
      <p className="text-sm">Good Condition</p>

      <div className="flex gap-2 mt-3">
        <button className="bg-blue-500 px-3 py-1 rounded">Interested</button>
        <button className="bg-red-500 px-3 py-1 rounded">Sold</button>
      </div>

    </div>
  );
};

export default ItemCard;