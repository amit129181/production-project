import './App.css';
import React from 'react';
import {HashRouter as Router, Route, Routes, Outlet, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import User from './utils/User';
import Dashboard from './Pages/Dashboard';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  if (!User()) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
