import { Headphones, Search } from "lucide-react";
import singer from "./assets/Singer.png"
import spotlight from "./assets/spotlight.jpg"
import "./App.css";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200">
      {/* Left side */}
      <div className="flex items-center space-x-2">
        {/* Logo placeholder */}
        <div className="w-6 h-6 bg-black rounded-full"></div>
        <span className="text-sm text-gray-700">/ book@ai-artist.io</span>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <a href="#" className="hover:text-gray-500">
          Our Pricing
        </a>
        <a href="#" className="hover:text-gray-500">
          Treatment
        </a>
        <a href="#" className="hover:text-gray-500">
          Signup
        </a>
        <button className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Artist Login
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="grid grid-cols-1 md:grid-cols-3 items-start px-6 md:px-12 py-16 gap-6">
      {/* Left Side */}
      <div className="text-sm text-gray-600 md:self-start text-center md:text-left">
        Mission <br /> Statement
      </div>

      {/* Center Title */}
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Discover <br /> Artist
        </h1>
        <p className="mt-6 text-gray-600 text-base">
          Discover Events happening near you or in whichever country{" "}
          <br className="hidden md:block" />
          Discover artist Nearby or around the globe
        </p>
      </div>

      {/* Right Side */}
      <div className="text-sm text-gray-600 md:self-start text-center md:text-right">
        Search Artist <br /> or event
      </div>
    </header>
  );
}

function Cards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-12 pb-16">
      {/* Card 1 - Singer stats */}
      <div className="relative bg-gradient-to-r from-green-300 to-blue-300 rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-lg">
        {/* Icon */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
          <Headphones className="w-5 h-5 text-black" />
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="text-4xl font-bold">4.9 M</div>
          <p className="text-sm font-medium">Listeners — This week</p>
        </div>

        {/* Singer image */}
        <img
          src={singer}
          alt="Singer"
          className="absolute bottom-0 right-4 h-40 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Card 2 - Search */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 flex flex-col justify-center items-center text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Search Artist</h3>

        {/* Search input */}
        <div className="w-full flex items-center bg-white rounded-full px-4 py-2 shadow-md">
          <input
            type="text"
            placeholder="Type a name..."
            className="flex-1 outline-none text-black placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-600" />
        </div>

        {/* Example */}
        <p className="mt-3 text-sm text-gray-100 text-center">
          Example: Yesi, Texas Hold Em
        </p>
      </div>

      {/* Card 3 - Spotlight */}
      <div className="bg-black rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
        <img
          src={spotlight}
          alt="Artist spotlight"
          className="w-1/2 h-1/2 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card 4 - Registered Artists */}
      <div className="bg-green-400 rounded-full flex flex-col items-center justify-center p-10 text-black shadow-lg">
        <div className="text-4xl font-bold">3K</div>
        <p className="text-sm font-medium">Registered verified Artist</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar></Navbar>

      <Hero></Hero>

      <Cards></Cards>
    </div>
  );
}

export default App;
