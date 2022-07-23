import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { useLogin } from "../stores";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { login } from "../service";

const LoginScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const setAccess = useLogin((state) => state.setAccess);
  const setLogin = useLogin((state) => state.setIsLogIn);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isLoggedIn) navigate(redirect);
  }, [navigate, isLoggedIn, redirect]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await login(username, password);

      setLoading(false);
      if (typeof data === "string") {
        setAccess(data);
        setLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen>
      <Card className="mt-5">
        <Card.Header className="text-center">Welcome</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>username </Form.Label>
              <Form.Control
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                type="text"
                placeholder=" username"
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit" disabled={loading}>
              {loading ? "loading..." : "login  "}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Screen>
  );
};

export default LoginScreen;
