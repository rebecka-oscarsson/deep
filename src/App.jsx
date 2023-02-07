import './App.scss';
import './'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ChatPage from './components/ChatPage/ChatPage.tsx';
import {SocketProvider} from './SocketContext';

function App() {
  
  if (window.screen.width <= 700) {
    window.location = "https://blackholechat.onrender.com/";
  }

  return (
    <SocketProvider>
    <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/talk" element={<ChatPage />}></Route>
        </Routes>
    </HashRouter>
    </SocketProvider>
  );
}

export default App;
