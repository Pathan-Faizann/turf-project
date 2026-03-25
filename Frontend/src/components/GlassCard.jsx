const GlassCard = ({ children }) => {
  return (
    <div className="bg-glass backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-lg">
      {children}
    </div>
  );
};

export default GlassCard;