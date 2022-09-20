import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/imageslogo.png";
function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
       
        window.location.replace("/");
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
               
               <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} style={{ width: 120, height: 60 }} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <LinkContainer to="/">
                    <Nav.Link ><i class="fa-solid fa-house-user"></i> Home</Nav.Link>
                </LinkContainer>
                    <Nav className="ms-auto">
                       
                        {!user && (
                            <LinkContainer to="/login">
                               <Nav.Link ><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                            </LinkContainer>
                        )}
                        <LinkContainer to="/chat">
                            <Nav.Link><i class="fa-brands fa-rocketchat"></i> Chat</Nav.Link>
                        </LinkContainer>
                        {user && (
                            <NavDropdown title={
                                <>
                                    <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                    {user.name}
                                </>
                            } id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                
                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;