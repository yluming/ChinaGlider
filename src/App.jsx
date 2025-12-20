import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Result from './components/Result';
import POISelection from './components/POISelection';
import TripForm from './components/TripForm';
import Itinerary from './components/Itinerary';
import StarterPack from './components/StarterPack';
import ScrollToTop from './components/ScrollToTop'; // We'll create this small utility

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/poi-selection" element={<POISelection />} />
          <Route path="/trip-basics" element={<TripForm />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/starter-pack" element={<StarterPack />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
