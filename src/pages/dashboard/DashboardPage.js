import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/DashboardPage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import Character from "../../images/Character.svg";
import refresh from "../../images/refresh.png";
import cash from "../../images/cash.png";
import usertime from "../../images/usertime.png";
import routes from "../../routes";
import useApi from "../../hooks/useApi";
import userApis from "../../api/users";
import jwtDecode from "jwt-decode";
import { Modal, Spinner } from "react-bootstrap";
import loaderLogo from "../../images/CreditFrame logo.png";
import SearchModal from "../../components/SearchModal";


const DashboardPage = () => {

    document.title = "Account Dashboard - Creditframes";

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = JSON.parse(localStorage.getItem("userData"));
    const decodedData = jwtDecode(user.accessToken);
    const newData = JSON.parse(decodedData.UserData);

    const [loader, setLoader] = useState(false);

    const [currency, setCurrency] = useState("NGN");

    const authenticate = () => {
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    const [dashboard, setDashboard] = useState([]);
    const getDashboardDataApi = useApi(userApis.getDashboardData);

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        setLoader(true);
        const res = await getDashboardDataApi.request();
        if (res.status === 200) { 
            setDashboard(res.data);
        }
        setLoader(false);
    }

    const [countries, setCountries] = useState([]);
    const getCountriesApi = useApi(userApis.getCountries);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const res = await getCountriesApi.request();
        if (res.status === 200) {
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


    return (
        <div>
            <SearchModal show={show} handleClose={handleClose} handleShow={handleShow} />
            <Modal size="sm" show={loader} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" style={{ color: "#0000FB", width: "60px", height: "60px", position: "absolute" }} />
                    <img src={loaderLogo} width="30px" height="30px" alt="" style={{ margin: "15px" }} />
                </Modal.Body>
            </Modal>
            <NavMenu />
            <section className={styles.dashboardbg}> 
                <div className="row m-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.pageContent}>
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{marginRight: "5px", verticalAlign: "top"}} /> Dashboard Overview </h4>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className={styles.pageCard1}>
                                        <div className={styles.cardContent1}>
                                            <h4>Welcome back</h4>
                                            <h1>{`${newData.firstName} ${newData.lastName}`}</h1>
                                            <span>We've grouped all the important things in one place, to help personalised your experience</span>
                                        </div>
                                        <img src={Character} className={styles.illustration1} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className={styles.pageCard2}>
                                        <h3>Get the best loan offers that suits your needs</h3>
                                        <button onClick={() => handleShow()}>Apply Here</button>
                                    </div>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={styles.pageCard3}>
                                        <div className={styles.card3Content}>
                                            <div className={styles.card3left}>
                                                <img src={refresh} alt="" />
                                                <h5>Active <br /> Loans</h5>
                                                <button>View</button>
                                            </div>
                                            <h1> {dashboard.totalActiveLoan} </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={styles.pageCard4}>
                                        <div className={styles.card4Content}>
                                            <div className={styles.card4left}>
                                                <img src={cash} alt="" />
                                                <h5>Paid <br /> Loans</h5>
                                                <button>View</button>
                                            </div>
                                            <h1> {dashboard.totalCompletedLoan} </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={styles.pageCard5}>
                                        <div className={styles.card5Content}>
                                            <div className={styles.card5left}>
                                                <img src={usertime} alt="" />
                                                <h5>Overdue <br /> Loans</h5>
                                                <button>View</button>
                                            </div>
                                            <h1> {dashboard.totalOutstandingLoan}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-md-12 mt-4">
                                <span className="mb-2"><b>Loan History</b><button onClick={() => navigate(routes.LoansPage)} className={styles.viewAll}>View all</button></span>
                                <div className={styles.cardTable1}>
                                    <tr className={styles.cardInside}>
                                        <th>Lender's Name</th>
                                        <th>Loan Type</th>
                                        <th>Loan Amount</th>
                                        <th>Overdue Balance</th>
                                        <th>Status</th>
                                    </tr>
                                    {dashboard.loanHistory === null ? "No available loan history." : <></>}
                                    {dashboard.loanHistory?.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                        <td>{items.lenderName}</td>
                                        <td>{items.loanTypeName}</td>
                                        <td>{items.loanAmount}</td>
                                        <td>{items.overdueBalance}</td>
                                        <td>{items.loanStatus}</td>
                                    </tr>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DashboardPage;