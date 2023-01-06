import './App.scss';
import './normalize.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ChatPage from './components/ChatPage/ChatPage.tsx';
import {SocketProvider} from './SocketContext';

function App() {
  
  return (
    <SocketProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Routes>
    </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
