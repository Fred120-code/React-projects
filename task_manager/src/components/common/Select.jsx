const Select = ({
  label,
  error,
  required = false,
  options = [],
  className = "",
  ...props
}) => {
  const selectClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 ${
    error ? "border-red-500" : "border-gray-300"
  } ${className}`;

  return (
    <div>
      {label && (
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select className={selectClasses} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select; 
