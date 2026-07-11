// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import About from './component/About';
import WaterPoints from './component/WaterPoints';
import Reports from './component/Reports';
import Service from './component/Service';   // ✅ import Service page
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/water-points" element={<WaterPoints />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/service" element={<Service />} />   {/* ✅ new route */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;