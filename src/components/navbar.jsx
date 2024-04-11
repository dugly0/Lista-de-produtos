import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

function NavbarPagina() {
  return (
    <Navbar expand="lg" className="navbar__cor">
      <Container>
        <Navbar.Brand href="#home">
          <div className="imagem">
            <img src={logo} alt="Logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="ml-auto">
            <Nav.Link href="#link" className="icones">
              <FontAwesomeIcon className="icones" icon={faUser} />
            </Nav.Link>
            <Nav.Link href="#link">
              <FontAwesomeIcon className="icones" icon={faRightFromBracket} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPagina;
