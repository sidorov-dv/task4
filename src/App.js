import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UsersPanel from "./components/UsersPanel";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminpanel" element={<UsersPanel />} />
      <Route path="/" element={<Navigate replace to="/signup" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
