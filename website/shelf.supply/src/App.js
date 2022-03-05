import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import ConnectWifi from './pages/Registration/ConnectWifi';
import Main from "./pages/Main";
import Login from "./pages/Login";
import AddMeds from "./pages/Registration/AddMeds"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/deviceSetup" element={<ConnectWifi />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addMeds" element={<AddMeds />} />
      </Routes>
    </div>
  );
}

export default App;
