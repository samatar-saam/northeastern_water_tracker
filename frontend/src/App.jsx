// App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Public components
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import About from './component/About';
import WaterPoints from './component/WaterPoints';
import Reports from './component/Reports';
import Service from './component/Service';
import Contact from './component/Contact';
import Communities from './component/Communities';
import Map from './component/Map';
import Login from './component/Login';
import UserLogin from './component/UserLogin';
import UserSignUp from './component/UserSignUp';

// User Dashboard (authenticated area)
import UserDashboard from './users/layout/UserDashboard';
import Dashboard from './users/pages/Dashboard';
import Profile from './users/pages/Profile';
import UserReports from './users/pages/Reports';
import UserWaterPoints from './users/pages/WaterPoints';
import Settings from './users/pages/Settings';

import './App.css';

// ---- Layout for public pages (includes navbar) ----
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ---- Public routes (with navbar) ---- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/water-points" element={<WaterPoints />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignUp />} />
        </Route>

        {/* ---- Protected User Dashboard (no navbar) ---- */}
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<UserReports />} />
          <Route path="water-points" element={<UserWaterPoints />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;