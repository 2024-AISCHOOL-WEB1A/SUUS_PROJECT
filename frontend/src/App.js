// frontend/src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main.jsx';
import Login from './pages/login.jsx';
import Translate from './pages/translate.jsx';
import Pay from './components/pay.jsx';
import Suus from './components/suus.jsx';
import Mypage from './components/mypage.jsx';
import Personpage from './components/person.jsx';
import Card from './components/card.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/suus" element={<Suus />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/personpage" element={<Personpage />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
