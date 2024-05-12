import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../employee-card-svgrepo-com.svg";

function CommonNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Logo className="navbar-logo" />
          Employee Management (beta)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" aria-label="Link to employees table">
              Employees
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/create-user"
              aria-label="Link to create user"
            >
              Create
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CommonNavBar;
