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
import Tosspage from './components/client/tosspage.js';
import Success from './components/client/success.js'; // Success 컴포넌트를 불러오는 경로가 정확한지 확인
import Fail from './components/client/fail.js';

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
          <Route path="/tosspage" element={<Tosspage />} />
          <Route path="/success" element={<Success />} /> {/* Success 컴포넌트를 /success 경로에 연결 */}
          <Route path="/fail" element={<Fail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
