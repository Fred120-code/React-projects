import { useState, useEffect } from "react";
import Display from "./Display";
import Button from "./Button";
import History from "./History";

const Calculator = () => {
  const [current, setCurrent] = useState("0");
  const [memory, setMemory] = useState(null);
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      setCurrent((prev) => (prev === "0" ? value : prev + value));
    } else if (value === "C") {
      setCurrent("0");
    } else if (value === "=") {
      try {
        const result = eval(current).toString();
        setHistory((prev) => [...prev, `${current} = ${result}`]);
        setCurrent(result);
      } catch {
        setCurrent("Error");
      }
    } else if (value === "%") {
      setCurrent((parseFloat(current) / 100).toString());
    } else if (value === "M+") {
      setMemory(parseFloat(current));
    } else if (value === "MR") {
      setCurrent(memory?.toString() || "0");
    } else if (value === "MC") {
      setMemory(null);
    } else {
      setCurrent((prev) => prev + value);
    }
  };

  const buttons = [
    "C",
    "MC",
    "MR",
    "M+",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "%",
    "+",
    "=",
  ];

  // ✅ Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      const allowed = "0123456789+-*/.%";
      if (allowed.includes(e.key)) {
        handleClick(e.key);
      } else if (e.key === "Enter") {
        handleClick("=");
      } else if (e.key === "Backspace") {
        setCurrent((prev) => prev.slice(0, -1) || "0");
      } else if (e.key.toLowerCase() === "c") {
        handleClick("C");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  return (
    <div className="w-96 sm:w-full max-w-md mx-auto mt-20 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl">
      <Display value={current} />
      <History history={history} setCurrent={setCurrent} />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            className={
              btn === "="
                ? "col-span-2 bg-green-500 hover:bg-green-400"
                : ["+", "-", "*", "/"].includes(btn)
                ? "bg-orange-500 hover:bg-orange-400"
                : ["M+", "MR", "MC"].includes(btn)
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-white/10 hover:bg-white/20"
            }
            onClick={() => handleClick(btn)}
          >
            {btn}
          </Button>
        ))}
        {/* Optional clear history button */}
        <Button
          className="col-span-4 bg-red-500 hover:bg-red-400"
          onClick={() => setHistory([])}
        >
          Clear History
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
