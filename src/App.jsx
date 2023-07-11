import './App.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ChatPage from './pages/ChatPage/ChatPage';
import {SocketProvider} from './contexts/SocketContext';
import {UsersProvider} from './contexts/UsersContext';

function App() {

  return (
    <SocketProvider>
      <UsersProvider>
    <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/talk" element={<ChatPage />}></Route>
        </Routes>
    </HashRouter>
    </UsersProvider>
    </SocketProvider>
  );
}

export default App;
