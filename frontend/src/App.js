import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main.jsx';
import Login from './pages/login.jsx';
import Translate from './pages/translate.jsx';
import Pay from './components/pay.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* 기본 경로에 Main 컴포넌트를 렌더링 */}
          <Route path='/' element={<Main />} />
          {/* '/login' 경로에 Login 컴포넌트를 렌더링 */}
          <Route path="/login" element={<Login />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/pay" element={<Pay/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
