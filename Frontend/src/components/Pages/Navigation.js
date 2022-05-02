/*Author : Parthkumar Patel (B00899800)*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../Images/Logo.png";
import "../Css/Navigation.css";
import { useNavigate } from "react-router-dom";
// import logo from '../logo.svg';
import { Container, NavDropdown } from "react-bootstrap";
import Payment from "./Payment";
import Portfolio from "./Portfolio";
import Dashboard from "./Dashboard";
import Wishlist from "./Wishlist";
import { Routes, Route } from "react-router-dom";
import CustomBasketList from "./CustomBasketList";
import UserBlogs from "./UserBlogs";
import News from "./News";

export class Navigation extends Component {

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  handleProfile = () => {
    window.location = `/profile`;
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
                  <NavDropdown.Item href="/about">About</NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={this.handleProfile}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/payment">Subscription</NavDropdown.Item>
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
                  href="/dashboard"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/portfolio"
                >
                  Portfolio
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/wishlist"
                >
                  Wishlist
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/payment"
                >
                  Payment
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/customBasketList"
                >
                  Custom Basket
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/News"
                >
                  Market News
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/userBlogs"
                >
                  Blogs
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/portfolio" element={<Portfolio />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route
            exact
            path="/customBasketList"
            element={<CustomBasketList />}
          />
          <Route exact path="/userBlogs" element={<UserBlogs />} />
          <Route exact path="/News" element={<News />} />
        </Routes>
      </>
    );
  }
}
