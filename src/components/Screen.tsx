import React from "react";
import Container from "react-bootstrap/Container";
interface props {
  children: React.ReactNode;
}

const Screen: React.FC<props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Screen;
