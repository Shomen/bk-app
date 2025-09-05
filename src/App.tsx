// import { useState } from 'react' // Removed unused import
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import './App.css'


// Main App component
function App() {
  return (
    <Router>
      {/* Navigation bar with violet background */}
      <nav className="bg-violet-600 p-4 text-white flex gap-4">
        <Link to="/" className="font-bold text-white">Home</Link>
        {/* Add more menu links here if needed */}
      </nav>
      {/* Define app routes */}
      <Routes>
        {/* Home page: Services listing */}
        <Route path="/" element={<Services />} />
        {/* Service details and booking page */}
        <Route path="/service/:id" element={<ServiceDetails />} />
      </Routes>
      {/* Footer with matching color */}
      <footer className="bg-violet-600 text-white text-center py-4 mt-8">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </Router>
  );
}

export default App
