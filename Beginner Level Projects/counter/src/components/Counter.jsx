import { useState } from "react";

const Counter = () => {
  //Creating the variable count

  const [count, setCount] = useState(0);

  //Functions to modify state
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">React Counter</h1>
      <p className="text-3xl mb-6">{count}</p>

      <div className="flex gap-4">
        <button
          onClick={decrease}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          - Decrease
        </button>

        <button
          onClick={reset}
          className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Reset
        </button>

        <button
          onClick={increase}
          className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Increase
        </button>
      </div>
    </div>
  );
};

export default Counter; 