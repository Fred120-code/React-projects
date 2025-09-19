import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Aetheria's products have transformed my self-care routine. The quality is exceptional and you can tell every ingredient is carefully sourced.",
      author: "Sarah J.",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      text: "I've been using the Serenity Oil Blend for my meditation practice and it's created such a peaceful atmosphere in my home. Highly recommend!",
      author: "Michael T.",
      location: "Portland, OR",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      text: "The mindful candle has the perfect subtle scent that isn't overwhelming. It burns cleanly and evenly. Will definitely be purchasing again.",
      author: "Jessica L.",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="journal" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#36454F] text-center mb-12">
          What Our Community Says
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Content with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-start mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].author}
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#36454F] italic text-lg">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>
              </div>
              <div className="text-[#36454F] font-medium">
                {testimonials[currentTestimonial].author},{" "}
                {testimonials[currentTestimonial].location}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? "bg-[#B8860B]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
