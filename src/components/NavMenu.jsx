import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/CreditFrame-Logo.svg";
import styles from "../styles/NavMenu.module.css";
import { FaSearch, FaUser, FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import jwtDecode from "jwt-decode";
import loaderLogo from "../images/CreditFrame logo.png";
import { Spinner } from "react-bootstrap";
import SearchModal from "./SearchModal";



const NavMenu = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log(decodeURIComponent(`site.com/post?comments=1%2C2%2C3%2C4`));
    // console.log(encodeURIComponent(`site.com/post?comments=1,2,3,4`));

    const [loader, setLoader] = useState(false);

    const [currency, setCurrency] = useState("NGN");

    const [profileDropdown, setProfileDropdown] = useState(true);

    const handleDropdownSHow = () => {
        if (profileDropdown === false) {
            setProfileDropdown(true)
        }
        else {
            setProfileDropdown(false);
        }
    };

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [countries, setCountries] = useState([]);
    const getCountriesApi = useApi(userApis.getCountries);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const res = await getCountriesApi.request();
        if (res.status === 200) {
            //console.log(res.data[167]);
            if (localStorage.getItem("countrySelected") !== null) {
                const items = JSON.parse(localStorage.getItem("countrySelected"));
                const preselectOptions = {
                    value: items,
                    label: <><img src={items.flagUrl} height="30px" alt="" /> {items.code}</>
                };
                setCurrency(items.currencyCode);
                setSelectedOption(preselectOptions);
            }
            if (localStorage.getItem("countrySelected") === null || localStorage.getItem("countrySelected") === undefined) {
                window.localStorage.setItem("countrySelected", JSON.stringify(res.data[0]));
                const items = JSON.parse(localStorage.getItem("countrySelected"));
                const preselectOptions = {
                    value: items,
                    label: <><img src={items.flagUrl} height="30px" alt="" /> {items.code}</>
                };
                setCurrency(items.currencyCode);
                setSelectedOption(preselectOptions);
            }
            setCountries(res.data);
        }
    }

    const handleLogin = () => {
        navigate(routes.LoginPage);
    }

    const userLogoutApi = useApi(userApis.userLogout);

    const handleLogout = async () => {
        setLoader(true);
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await userLogoutApi.request({ refreshToken: user.refreshToken, userId: newData.userId });
        if (res.status === 200) {
            window.localStorage.removeItem("userData");
            navigate(routes.LoginPage);
        }
        setLoader(false);
    } 

    const getLoanTypesApi = useApi(userApis.getLoanTypes);
    const [loanTypes, setloanTypes] = useState([]);

    useEffect(() => {
        const getLoanTypes = async () => {
            const res = await getLoanTypesApi.request();
            if (res.status === 200) {
                setloanTypes(res.data);
            }
        }
        getLoanTypes();
    }, []);

    const handleChangeCountry = (selectedOption) => {
        setSelectedOption(selectedOption);
        const userCountry = selectedOption.value;
        window.localStorage.setItem("countrySelected", JSON.stringify(userCountry));
    };

    const options = countries.map((option, idx) => ({
        value: option,
        label: option.name
    }));

    const spacing = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return (
        <div className="container-fluid">
            <SearchModal show={show} handleClose={handleClose} handleShow={handleShow} />
            <Modal size="sm" show={loader} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" style={{ color: "#0000FB", width: "100px", height: "100px", position: "absolute" }} />
                    <img src={loaderLogo} width="60px" height="60px" alt="" style={{ margin: "20px" }} />
                    {/* <ProgressBar animated now={100} /> */}
                    {/* <div className={styles.contactForm}>
                        <img src={statusIcon} alt="" />
                        <h3 align="center" className={styles.sectitle}>Application Successful</h3>
                        <p>{message}</p>
                        <Link to="/search-result" className={styles.apply}> Proceed </Link>
                    </div> */}
                </Modal.Body>
            </Modal>
            <Navbar className={styles.navBar} collapseOnSelect expand="lg" bg="white" sticky="top" variant="white">
                <Container style={{minWidth: "90%"}}>
                    <Navbar.Brand href="./" className={styles.logoParent}><img src={logo} className={styles.logo} alt=""></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto text-center">{spacing}
                            {window.location.pathname === "/products" ? <Nav.Link href="./products" style={{color: "#0000FB"}} className="mx-4 active">Products</Nav.Link> : <Nav.Link href="./products" className="mx-4">Products</Nav.Link>}
                            {window.location.pathname === "/company" ? <Nav.Link href="./company" style={{color: "#0000FB"}} className="mx-4 active">Company</Nav.Link> : <Nav.Link href="./company" className="mx-4">Company</Nav.Link>}
                            {/* {window.location.pathname === "/finhack" ? <Nav.Link href="./finhack" style={{color: "#0000FB"}} className="mx-4 active">Finhack</Nav.Link> : <Nav.Link href="./finhack" className="mx-4">Finhack</Nav.Link>} */}
                            {window.location.pathname === "/contact-us" ? <Nav.Link href="./contact-us" style={{color: "#0000FB"}} className="mx-4 active">Contact Us</Nav.Link> : <Nav.Link href="./contact-us" className="mx-4">Contact Us</Nav.Link>}
                        </Nav>
                        <Nav className="text-center">
                            <Select
                                className={styles.lang}
                                defaultValue={selectedOption}
                                onChange={handleChangeCountry}
                                //placeholder="LANG"
                                options={options}
                                value={selectedOption}
                                isSearchable={true}
                            />{spacing} 
                            <Button variant="success" onClick={() => handleShow()} className={styles.searchIcon}><FaSearch /></Button>{spacing}
                            {localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined ? <Button className={styles.login} onClick={() => handleLogin()}>LOGIN</Button> : <div style={{verticalAlign: "bottom", cursor: "pointer"}}><FaUser onClick={() => handleDropdownSHow()} style={{ fontSize: "40px", color: "grey", border: "1px solid grey", borderRadius: "50%", padding: "10px" }} /> <FaChevronDown onClick={() => handleDropdownSHow()} className={styles.loginDropdown} /></div>}
                            <div hidden={profileDropdown} className={styles.userProfile}>
                                <Nav.Link href="./dashboard" style={{ color: "grey" }}>My Profile</Nav.Link>
                                <hr></hr>
                                <button onClick={() => handleLogout()} style={{ color: "#0000FB", backgroundColor: "transparent", border: "none" }}>Logout</button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            <div className={styles.search}><FaSearch style={{ color: "#0000FB", marginLeft: "20px"}} /><Form.Control type="text" style={{ backgroundColor: "rgb(0, 0, 251, 6%", padding: "10px 10px 10px 50px", border: "none", marginTop: "-35px" }}></Form.Control></div>
            </Navbar>
        </div>
    )
}

export default NavMenu;