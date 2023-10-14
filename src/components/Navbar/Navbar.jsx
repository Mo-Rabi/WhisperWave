import { useContext, useReducer } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
//import { CounterContext } from "../../Context/Counter";
import { TokenContext } from "../../Context/TokenContext";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

function CollapsibleExample() {
  //let { counter, setCounter } = useContext(CounterContext);
  let { token } = useContext(TokenContext);
  let navigate = useNavigate();

  let { counter } = useSelector((state) => state.counterRed);
 // console.log("Counter " + counter);

  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand>
          <Link>
            <img
              src="https://www.svgrepo.com/show/482673/anonymous.svg"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {token ? (
              <>
                <Link className="nav-link text-white" to={"profile"}>
                  Profile {counter}
                </Link>
                <Button variant="outline-light" onClick={logOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link className="nav-link text-white" to={"register"}>
                  Register
                </Link>
                <Link className="nav-link text-white" to={"login"}>
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
