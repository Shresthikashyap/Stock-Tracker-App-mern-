import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockTracker from './pages/StockTracker';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StockTracker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;