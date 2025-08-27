const Display = ({ value }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md text-white text-right p-6 rounded-2xl text-4xl font-mono shadow-inner transition-all duration-300">
      {value}
    </div>
  );
};

export default Display;
