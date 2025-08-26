import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Features from "./components/Features/Features.jsx";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer.jsx";
import Cta from "./components/Cta/Cta.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import Faq from "./components/Faq/Faq.jsx";

const App = () => {
  // Adding the state to handle submission

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Statistics />
      <Faq></Faq>
      <Cta></Cta>
      {/* Sign-up Section */}
      <section id="signup" className="signup">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the lattest updates.</p>
        <form action="" className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default App;
