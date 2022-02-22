import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import ConnectWifi from './pages/Registration/ConnectWifi';
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/deviceSetup" element={<ConnectWifi />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
