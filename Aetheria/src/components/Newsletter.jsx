import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log("Submitted email:", email);
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-20 bg-[#36454F]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F5DC] mb-4">
            Elevate Your Routine
          </h2>
          <p className="text-[#F5F5DC] mb-8 text-lg">
            Join our community and receive exclusive offers and wellness tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white flex-grow px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              required
            />
            <button
              type="submit"
              className="bg-[#B8860B] text-[#F5F5DC] font-medium py-4 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300 whitespace-nowrap transform -translate-x-20"
            >
              Subscribe
            </button>
          </form>

          <p className="text-[#F5F5DC] text-sm mt-4 opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
