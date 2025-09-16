import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import StackBuilder from './Components/StackBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/stack/:id" element={<StackBuilder />} />
      </Routes>
    </Router>
    
  );
}

export default App;
