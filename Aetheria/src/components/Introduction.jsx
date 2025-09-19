const Introduction = () => {
  const features = [
    {
      icon: "🍃",
      title: "Ethically Sourced",
      description:
        "Our ingredients come from trusted sustainable sources around the world.",
    },
    {
      icon: "🌿",
      title: "Pure Ingredients",
      description:
        "No artificial additives, just nature's finest ingredients for your wellness.",
    },
    {
      icon: "♻️",
      title: "Sustainable Practices",
      description:
        "We prioritize eco-friendly packaging and carbon-neutral shipping.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F5F5DC]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#36454F] mb-6">
              Crafted for Your Well-being
            </h2>
            <p className="text-[#36454F] mb-8 leading-relaxed">
              At Aetheria, we believe that true wellness comes from harmony with
              nature. Our products are meticulously crafted using time-honored
              techniques combined with modern innovation to bring you the very
              best in self-care.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-4">{feature.icon}</span>
                  <div>
                    <h3 className="font-medium text-[#36454F]">
                      {feature.title}
                    </h3>
                    <p className="text-[#36454F] text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-96 bg-[#36454F] bg-opacity-10 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1622383568506-4774b018cd5d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Aetheria products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#B8860B] rounded-2xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#36454F] rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
