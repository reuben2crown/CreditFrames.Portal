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
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import { NumericFormat } from "react-number-format";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import jwtDecode from "jwt-decode";



const NavMenu = () => {

    const navigate = useNavigate();

    const location = useLocation();

    // console.log(decodeURIComponent(`site.com/post?comments=1%2C2%2C3%2C4`));
    // console.log(encodeURIComponent(`site.com/post?comments=1,2,3,4`));

    const [userValid, setUserValid] = useState();

    const [show, setShow] = useState(false);

    const [currency, setCurrency] = useState("NGN");

    //console.log(localStorage.getItem("countrySelected").length);

    ///////////////////////////////////////////////////////////////////////////////////////////

    const refreshTokenApi = useApi(userApis.refreshToken);

    useEffect(() => {
        const refreshUserToken = async () => {
            if (JSON.parse(localStorage.getItem("userData"))) {
                const user = JSON.parse(localStorage.getItem("userData"));
                const decodedData = jwtDecode(user.accessToken);
                //console.log(decodedData.exp * 1000 > Date.now());
                if (decodedData.exp * 1000 < Date.now()) {
                    const newData = JSON.parse(decodedData.UserData);
                    const fp = await FingerprintJS.load();
                    const result = await fp.get();
                    const res = await refreshTokenApi.request({ refreshToken: user.refreshToken, userId: newData.userId, deviceId: result.visitorId });
                    if (res.status === 200) {
                        window.localStorage.setItem("userData", JSON.stringify(res.data));
                    }
                    if (res.status === 400 || res.status === 401 || res.status === 500) {
                        navigate(routes.LoginPage);
                    }
                }
            }
            //return client.post("/api/Auth/RefreshToken", input);
            // window.localStorage.removeItem("userData");
            // window.location.reload(false);
        }
        refreshUserToken();
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////////

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
                setSelectedOption(preselectOptions);
            }
            if (localStorage.getItem("countrySelected") === null || localStorage.getItem("countrySelected") === undefined) {
                window.localStorage.setItem("countrySelected", JSON.stringify(res.data[0]));
                const items = JSON.parse(localStorage.getItem("countrySelected"));
                const preselectOptions = {
                    value: items,
                    label: <><img src={items.flagUrl} height="30px" alt="" /> {items.code}</>
                };
                setSelectedOption(preselectOptions);
            }
            setCountries(res.data);
        }
    }


    // useEffect(() => {
    //     if (localStorage.getItem("countrySelected") !== null || localStorage.getItem("countrySelected") !== undefined) {
    //         const currency = JSON.parse(localStorage.getItem("countrySelected"));
    //         setCurrency(currency.currencyCode);
    //     };
    //     window.localStorage.removeItem("prevUrl");
    // }, []);


    const handleLogin = () => {
        navigate(routes.LoginPage);
    }

    const userLogoutApi = useApi(userApis.userLogout);

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await userLogoutApi.request({ refreshToken: user.refreshToken, userId: newData.userId });
        if (res.status === 200) {
            window.localStorage.removeItem("userData");
            navigate(routes.LoginPage);
        }
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


    const [searchLoan, setSearchLoan] = useState();
    const searchLoanApi = useApi(userApis.searchLoan);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("userData") !== null && localStorage.getItem("userData") !== undefined) {
            // return navigate(`./loan-request?loanType%3D${searchLoan.LoanTypeId}%26loanAmount%3D${searchLoan.LoanAmount}`);
            
            // We recommend to call `load` at application startup.
            const fp = await FingerprintJS.load();

            // The FingerprintJS agent is ready.
            // Get a visitor identifier when you'd like to.
            const result = await fp.get();

            // This is the visitor identifier:
            //console.log(result.visitorId);

            const user = JSON.parse(localStorage.getItem("userData"));
             const decodedData = jwtDecode(user.accessToken);
             const newData = JSON.parse(decodedData.UserData);
             setUserValid(newData.userId);

            const country = JSON.parse(localStorage.getItem("countrySelected"));
            
            const res = await searchLoanApi.request({ ...searchLoan, UserId: userValid, DeviceId: result.visitorId, CountryId: country.id });
            if (res.status === 200) {
                const input = {
                    LoanAmount: searchLoan.LoanAmount,
                    PageNumber: searchLoan.PageNumber,
                    PageSize: searchLoan.PageSize,
                    LoanTypeId: searchLoan.LoanTypeId,
                    DeviceId: result.visitorId,
                    CountryId: country.id
                }
                window.localStorage.setItem("searchLoan", JSON.stringify(input));
                setShow(false);
                navigate(routes.SearchPage);
            //  if (location.pathname === "/search-result") {
            //      window.location.reload(false);
            //  }
            }
        }
        if (localStorage.getItem("userData") === null) {
            // return navigate(`./login-register?returnUrl=/loan-request?loanType%3D${searchLoan.LoanTypeId}%26loanAmount%3D${searchLoan.LoanAmount}`);   
            
            //console.log(searchLoan);
            // We recommend to call `load` at application startup.
            const fp = await FingerprintJS.load();

            // The FingerprintJS agent is ready.
            // Get a visitor identifier when you'd like to.
            const result = await fp.get();

            // This is the visitor identifier:
            //console.log(result.visitorId);

             const country = JSON.parse(localStorage.getItem("countrySelected"));
            // console.log(userValid, country);
             const res = await searchLoanApi.request({ ...searchLoan, DeviceId: result.visitorId, CountryId: country.id });
            if (res.status === 200) {
                const input = {
                    LoanAmount: searchLoan.LoanAmount,
                    PageNumber: searchLoan.PageNumber,
                    PageSize: searchLoan.PageSize,
                    LoanTypeId: searchLoan.LoanTypeId,
                    DeviceId: result.visitorId,
                    CountryId: country.id
                }
                window.localStorage.setItem("searchLoan", JSON.stringify(input));
                setShow(false);
                navigate(routes.SearchPage);
            //  if (location.pathname === "/search-result") {
            //      window.location.reload(false);
            //  }
            }
        }
        
    };

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
                                defaultValue={selectedOption}
                                onChange={handleChangeCountry}
                                //placeholder="LANG"
                                options={options}
                                value={selectedOption}
                                isSearchable={true}
                            />{spacing} 
                            <Button variant="success" onClick={() => setShow(true)} className={styles.searchIcon}><FaSearch /></Button>{spacing}
                            {localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined ? <Button className={styles.login} onClick={() => handleLogin()}>LOGIN</Button> : <div style={{verticalAlign: "bottom", cursor: "pointer"}}><FaUser style={{ fontSize: "40px", color: "grey", border: "1px solid grey", borderRadius: "50%", padding: "10px" }} /> <FaChevronDown onClick={() => handleDropdownSHow()} className={styles.loginDropdown} /></div>}
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

            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} 
                onHide={() => setShow(false)}>
                <Modal.Body>
                    <div className={styles.card}>
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 text-start">
                                    <label>How much would you like to borrow?</label>
                                    {/* <Form.Control type="number" className={styles.select} onChange={(e) => setSearchLoan({ ...searchLoan, amount: e.target.value })} placeholder="Enter your preferred amount"></Form.Control> */}
                                    <NumericFormat thousandSeparator={true} thousandsGroupStyle="thousand" prefix={`${currency} `} allowNegative={false} onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;
                                        const newAmount = value;
                                        setSearchLoan({ ...searchLoan, LoanAmount: newAmount, PageNumber: 1, PageSize: 1 })
                                        // do something with floatValue
                                    }} className={styles.select} required placeholder={`${currency} 0.00`} />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label>Types of Loan</label>
                                    <Form.Select className={styles.select} required onChange={(e) => setSearchLoan({ ...searchLoan, LoanTypeId: e.target.value })}>
                                        <option selected disabled>Select Loan Type</option>
                                        {loanTypes.map(loans => <option value={loans.id}>{loans.name}</option>)}
                                    </Form.Select>
                                </div>
                                <div className="col-md-10 m-auto pt-4"><button type="submit" className={styles.submit}>{searchLoanApi.loading ? "Searching..." : "Search for loan"}</button></div>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NavMenu;