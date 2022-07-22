import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { useLogin } from "../stores";

const HomeScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [navigate, isLoggedIn]);

  return <Screen>HomeScreen</Screen>;
};

export default HomeScreen;
