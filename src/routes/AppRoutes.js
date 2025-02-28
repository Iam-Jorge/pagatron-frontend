import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from '../components/PaymentPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
