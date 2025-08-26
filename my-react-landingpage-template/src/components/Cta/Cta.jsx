import "./Cta.css";

const Cta = () => {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers today.</p>
        <div className="cta-buttons">
          <button className="cta-button primary">Sign Up Now</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
