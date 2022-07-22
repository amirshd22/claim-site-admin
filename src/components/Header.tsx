import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useLogin } from "../stores";
const Header: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>پنل ادمین ویدرکش</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>خانه</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/withdrawals">
                <Nav.Link>پرداختی ها</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/messages">
                <Nav.Link>پیام ها</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faqs">
                <Nav.Link>سوالات متداول</Nav.Link>
              </LinkContainer>
              {isLoggedIn && <Nav.Link onClick={logout}>خروج</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
