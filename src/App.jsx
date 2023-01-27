import './App.scss';
import './normalize.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ChatPage from './components/ChatPage/ChatPage.tsx';
import {SocketProvider} from './SocketContext';

function App() {
  
  return (
    <SocketProvider>
    <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Routes>
    </HashRouter>
    </SocketProvider>
  );
}

export default App;