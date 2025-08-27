const History = ({ history, setCurrent }) => {
  return (
    <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl max-h-48 overflow-y-auto text-white text-sm mt-4 shadow-inner">
      {history.length === 0 ? (
        <p className="text-gray-400 text-center">No history yet</p>
      ) : (
        history
          .slice()
          .reverse()
          .map((item, index) => (
            <p
              key={index}
              className="py-1 border-b border-white/20 hover:bg-white/10 cursor-pointer"
              onClick={() => setCurrent(item.split("=")[1].trim())}
            >
              {item}
            </p>
          ))
      )}
    </div>
  );
};

export default History;
