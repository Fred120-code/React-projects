const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`text-white text-2xl p-5 m-1 rounded-xl transition-all duration-200 shadow-lg 
        bg-white/10 hover:bg-white/20 active:scale-95 active:shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
