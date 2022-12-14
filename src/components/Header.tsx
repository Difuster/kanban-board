import React, {FC} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header: FC = () => {
  return (
    <Navbar style={{backgroundColor: "rgb(64, 145, 216)"}} expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link
              href="#home"
              style={{color: "rgb(249, 237, 221)"}}
            >
              Home
            </Nav.Link>

            <Nav.Link
              href="#link"
              style={{color: "rgb(249, 237, 221)"}}
            >
              Boards
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand
          href="#home"
          style={{color: "rgb(249, 237, 221)"}}
        >
          Kanban Board
        </Navbar.Brand>

      </Container>
    </Navbar>
  );
}

export default Header;
