import { useState } from "react";
import { motion } from "framer-motion";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Serenity Oil Blend",
      description: "A calming blend of lavender and chamomile essential oils",
      price: "$38.00",
      image:
        "https://images.unsplash.com/photo-1652282556241-0ce13285d00f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Mindful Meditation Candle",
      description: "Hand-poured soy candle with subtle sage fragrance",
      price: "$32.00",
      image:
        "https://images.unsplash.com/photo-1728897161054-a31928d12a16?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Harmony Tea Collection",
      description: "Organic herbal teas for balance and tranquility",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    },
    {
      id: 4,
      name: "Revitalizing Bath Soak",
      description: "Mineral-rich soak with eucalyptus and mint",
      price: "$42.00",
      image:
        "https://plus.unsplash.com/premium_photo-1661542222943-cc597380d437?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#36454F] text-center mb-12">
          Curated Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="group bg-[#F5F5DC] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeOut" }}
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-[#36454F] text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-[#36454F] text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#36454F] font-medium">
                    {product.price}
                  </span>
                  <button className="bg-[#B8860B] text-[#F5F5DC] text-sm py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
