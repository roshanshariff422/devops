const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg p-5 rounded-xl shadow-glass">
      <h3>{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;