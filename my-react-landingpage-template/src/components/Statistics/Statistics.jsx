import "./Statistics.css";
import { useState, useEffect } from "react";

const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / duration;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

function Statistics() {
  return (
    <section className="statistics">
      <div className="stats-container">
        <div className="stat">
          <h3 className="stat-number" data-target="1000">
            <Counter target={1000} duration={100} />
          </h3>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h3 className="stat-number" data-target="500">
            <Counter target={500} duration={100} />
          </h3>
          <p>Projects Completed</p>
        </div>

        <div className="stat">
          <h3 className="stat-number" data-target="99">
            <Counter target={99} duration={100} />
          </h3>
          <p> Success Rate(%) </p>
        </div>

        <div className="stat">
          <h3 className="stat-number" data-target="24">
            <Counter target={24} duration={100} />
          </h3>
          <p>Support Hours</p>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
