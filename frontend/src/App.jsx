import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MenuPage from './pages/menupage';



function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<MenuPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;

