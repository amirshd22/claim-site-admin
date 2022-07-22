import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FAQScreen from "./screens/FAQScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MessagesScreen from "./screens/MessagesScreen";
import WithdrawScreen from "./screens/WithdrawScreen";
import { useLogin } from "./stores";

const App: React.FC = () => {
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setAccess(JSON.parse(userInfo));
        setIsLogIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/withdrawals" element={<WithdrawScreen />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/faqs" element={<FAQScreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
