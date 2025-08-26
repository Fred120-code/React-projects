import { useState } from "react";
import "./Faq.css";

const Faq = () => {
  // Adding toggle functionality

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // Main component
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        <div className={`faq-item ${activeIndex === 0 ? "active" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(0)}>
            How does your product work?
            <span className="faq-toggle">+</span>
          </button>
          <div className="faq-answer">
            <p>
              Our product is designed to be simple and intuitive. It works by
              connecting to your existing systems and providing a seamless
              experience through our easy-to-use interface.
            </p>
          </div>
        </div>

        <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(1)}>
            What is your pricing model?
            <span className="faq-toggle">+</span>
          </button>
          <div className="faq-answer">
            <p>
              We offer flexible pricing plans to suit businesses of all sizes.
              Our basic plan starts at $29/month, with premium options available
              for enterprises.
            </p>
          </div>
        </div>

        <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(2)}>
            Do you offer customer support?
            <span className="faq-toggle">+</span>
          </button>
          <div className="faq-answer">
            <p>
              Yes! We pride ourselves on excellent customer support. Our team is
              available 24/7 to answer any questions and help you get the most
              out of our product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
