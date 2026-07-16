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
import AdminLogin from './component/AdminLogin';

// User Dashboard
import UserDashboard from './users/layout/UserDashboard';
import Dashboard from './users/pages/Dashboard';
import Profile from './users/pages/Profile';
import UserReports from './users/pages/Reports';
import UserWaterPoints from './users/pages/WaterPoints';
import Settings from './users/pages/Settings';
import UserCommunities from './users/pages/Communities';
import UserMap from './users/pages/Map';
import UserAnalytics from './users/pages/Analytics';
import UserMessages from './users/pages/Messages';

// 👇 Admin Dashboard
import AdminDashboard from './admin/layout/AdminDashboard';
import AdminDashboardPage from './admin/pages/Dashboard';
import AdminUsers from './admin/pages/Users';
import AdminReports from './admin/pages/Reports';
import AdminWaterPoints from './admin/pages/WaterPoints';
import AdminMap from './admin/pages/Map';
import AdminCommunities from './admin/pages/Communities';
import AdminAnalytics from './admin/pages/Analytics';
import AdminMessages from './admin/pages/Messages';
import AdminSettings from './admin/pages/Settings';

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
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>

        {/* ---- Protected User Dashboard (no navbar) ---- */}
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<UserReports />} />
          <Route path="water-points" element={<UserWaterPoints />} />
          <Route path="settings" element={<Settings />} />
          <Route path="communities" element={<UserCommunities />} />
          <Route path="map" element={<UserMap />} />
          <Route path="analytics" element={<UserAnalytics />} />
          <Route path="messages" element={<UserMessages />} />
        </Route>

        {/* ---- Admin Dashboard (no navbar) ---- */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="water-points" element={<AdminWaterPoints />} />
          <Route path="map" element={<AdminMap />} />
          <Route path="communities" element={<AdminCommunities />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;