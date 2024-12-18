import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../employee-card-svgrepo-com.svg";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em;
  padding: 0.5em 0;
`;

const ProfileDiv = styled.div`
  margin-left: auto;
  outline: solid 1px red;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;

  a {
    color: black;
    text-decoration: none;
  }
`;

const LogoItem = styled(Logo)`
  width: 3em;
  height: auto;
  margin-right: 0.8em;
`;

const LinkDiv = styled.div`
  display: flex;
  align-items: center;

  a {
    color: black;
    text-decoration: none;
  }

  a:hover {
    margin-bottom: -3px;
    border-bottom: 3px solid #996515;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const LinkItem = styled(Link)`
  margin-right: 1em;
  padding: 0.6em;
`;

const StyledLink = styled(Nav.Link).attrs({ className: "nav-link" })`
  @media (min-width: 991px) {
    &:hover {
      margin-bottom: -3px;
      border-bottom: 3px solid #996515;
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

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
            <StyledLink as={Link} to="/" aria-label="Link to employees table">
              Employees
            </StyledLink>
            <StyledLink
              as={Link}
              to="/create-user"
              aria-label="Link to create user"
            >
              Create
            </StyledLink>
            <StyledLink as={Link} to="/game" aria-label="Link to tic tac toe">
              Game
            </StyledLink>
            <StyledLink as={Link} to="/product" aria-label="Link to product">
              Product
            </StyledLink>
            <StyledLink
              as={Link}
              to="/caravaggio"
              aria-label="Link to caravaggio"
            >
              Caravaggio
            </StyledLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function NavBar() {
  return (
    <HeaderContainer>
      <LogoDiv>
        <LinkItem to="/">
          {" "}
          <LogoItem />
          Employee Management (beta)
        </LinkItem>
      </LogoDiv>
      <LinkDiv>
        <LinkItem to="/">Employees</LinkItem>
        <LinkItem to="/create-user">Create</LinkItem>
        <LinkItem to="/game">Game</LinkItem>
        <LinkItem to="/product">Product</LinkItem>
        <LinkItem to="/caravaggio">Caravaggio</LinkItem>
      </LinkDiv>
    </HeaderContainer>
  );
}

export default CommonNavBar;
