import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function NavBar({ orderascending, setorderascending }) {
  //   const [ascending, setascending] = useState(true);
  //   useEffect(() => {
  //     localStorage.setItem("order",ascending)
  //   }, [ascending]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container-fluid">
          <Link  style={{textDecoration:"none"}} to="/">
            <Navbar.Brand >Articles</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Sort Order" id="basic-nav-dropdown">
                <NavDropdown.Item
                  className={orderascending ? "active" : ""}
                  onClick={() => setorderascending(true)}
                >
                  Ascending
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={!orderascending ? "active" : ""}
                  onClick={() => setorderascending(false)}
                >
                  Descending
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Link to="/article?edit=true">
              <Button variant="primary">New Article</Button>
            </Link>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
