import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/CreditFrame-Logo.svg";
import styles from "../styles/NavMenu.module.css";
import { FaSearch } from "react-icons/fa";
import NG from "country-flag-icons/react/3x2/NG";
import Select from "react-select";




const NavMenu = () => {

    const options = [
        {
            label: (
                <>
                    <NG height="20px" width="25px" />
                    <span>NG</span>
                </>
            ),
            value: "NG",
        }
    ];

    const spacing = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    console.log(NG);
    return (
        <div className="container-fluid">
            <Navbar className={styles.navBar} collapseOnSelect expand="lg" bg="white" sticky="top" variant="white">
                <Container style={{minWidth: "90%"}}>
                    <Navbar.Brand href="./"><img src={logo} width="90%" alt=""></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto text-center">{spacing}
                            {window.location.pathname === "/products" ? <Nav.Link href="./products" style={{color: "#0000FB"}} className="mx-4 active">Products</Nav.Link> : <Nav.Link href="./products" className="mx-4">Products</Nav.Link>}
                            {window.location.pathname === "/company" ? <Nav.Link href="./company" style={{color: "#0000FB"}} className="mx-4 active">Company</Nav.Link> : <Nav.Link href="./company" className="mx-4">Company</Nav.Link>}
                            {window.location.pathname === "/finhack" ? <Nav.Link href="./finhack" style={{color: "#0000FB"}} className="mx-4 active">Finhack</Nav.Link> : <Nav.Link href="./finhack" className="mx-4">Finhack</Nav.Link>}
                            {window.location.pathname === "/contact-us" ? <Nav.Link href="./contact-us" style={{color: "#0000FB"}} className="mx-4 active">Contact Us</Nav.Link> : <Nav.Link href="./contact-us" className="mx-4">Contact Us</Nav.Link>}
                        </Nav>
                        <Nav className="text-center">
                            <Select
                                className={styles.lang}
                                placeholder="LANG"
                                options={options}
                            />{spacing}
                            <Button className={styles.login}>LOGIN</Button>{spacing}
                            <Button variant="success" className={styles.searchIcon}><FaSearch /></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            <div className={styles.search}><FaSearch style={{ color: "#0000FB", marginLeft: "20px"}} /><Form.Control type="text" style={{ backgroundColor: "rgb(0, 0, 251, 6%", padding: "10px 10px 10px 50px", border: "none", marginTop: "-35px" }}></Form.Control></div>
            </Navbar>
        </div>
    )
}

export default NavMenu;