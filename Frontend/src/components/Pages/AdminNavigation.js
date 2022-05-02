//Author : Pallavi Cherukupalli (B00887062)
import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../Css/AdminNavigation.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UsersList from "./UserList";
import logo from "../Images/Logo.png";

export class AdminNavigation extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          className=" App-header"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container style={{ marginLeft: "unset", minWidth: "100%" }}>
            <Navbar.Brand href="/home">
              <img
                src={logo}
                className="n-App-logo rounded-circle pe-3"
                alt="logo"
              />
              STOCKVERSE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <NavDropdown
                  align="end"
                  title={
                    <i
                      className="fas fa-user-alt rounded-circle c-white"
                      alt="profile"
                      width="30"
                    ></i>
                  }
                >
                  <NavDropdown.Item onClick={this.handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Navbar collapseOnSelect className="bg-secondary" expand="lg">
          <Container style={{ marginLeft: "unset" }}>
            <Navbar.Toggle aria-controls="responsive-navbaritem-nav" />
            <Navbar.Collapse id="responsive-navbaritem-nav">
              <Nav className="me-auto">
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/admin"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/usersList"
                >
                  Check Activity
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/"
                >
                  Mail Management
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/adminBlogs"
                >
                  My blogs
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/CustomBasketListAdmin"
                >
                  Custom Basket Management
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/sendPromotions"
                >
                  Send Promotions
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/News"
                >
                  Market News
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route exact path="/userList" element={<UsersList />} />
        </Routes>
      </>
    );
  }
}
