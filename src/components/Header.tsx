import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
const Header: React.FC = () => {
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
                <Nav.Link>پرداخت شده ها</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/global">
                <Nav.Link>اطالاعات کلی سایت</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contacts">
                <Nav.Link>پیام ها</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
