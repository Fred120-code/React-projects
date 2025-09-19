import Header from "./components/Header";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
function App() {
  return (
    <>
      <Header></Header>
      <Hero />
      <Introduction></Introduction>
     <Products></Products>
      <Testimonials></Testimonials>
       <Newsletter></Newsletter>
    <ContactForm></ContactForm>
      <Footer></Footer>
    </>
  );
}

export default App;
