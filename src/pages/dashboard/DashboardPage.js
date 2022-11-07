import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/DashboardPage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import Character from "../../images/Character.svg";
import refresh from "../../images/refresh.png";
import cash from "../../images/cash.png";
import usertime from "../../images/usertime.png";
import renmoney from "../../images/renmoney.png";
import branch from "../../images/Branch.png";
import routes from "../../routes";
import useApi from "../../hooks/useApi";
import userApis from "../../api/users";
import jwtDecode from "jwt-decode";
import { Form, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";


const DashboardPage = () => {

    document.title = "Account Dashboard - Creditframes";

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userData"));
    const decodedData = jwtDecode(user.accessToken);
    const newData = JSON.parse(decodedData.UserData);

    const [show, setShow] = useState(false);

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
        const res = await getDashboardDataApi.request();
        if (res.status === 200) { 
            setDashboard(res.data);
        }
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
            return navigate(`/./loan-request?loanType=${searchLoan.LoanTypeId}&loanAmount=${searchLoan.LoanAmount}`);

        }
        if (localStorage.getItem("userData") === null) {
            return navigate(`/./login-register?returnUrl=/loan-request?loanType%3D${searchLoan.LoanTypeId}%26loanAmount%3D${searchLoan.LoanAmount}`);
        }

    };


    return (
        <div>
            <NavMenu />
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
                                        <button onClick={() => setShow(true)}>Apply Here</button>
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
                                    {/* "loanHistory": [
                                        {
                                            "id": 0,
                                            "userId": 0,
                                            "loanTypeId": 0,
                                            "loanTypeName": "string",
                                            "lenderId": 0,
                                            "lenderName": "string",
                                            "loanAmount": 0,
                                            "loanStatus": "Pending",
                                            "overdueBalance": 0
                                        } */}
                                    {dashboard.loanHistory === null ? "No available loan history." : <></>}
                                    {dashboard.loanHistory?.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                        <td>{items.lenderName}</td>
                                        <td>{items.loanTypeName}</td>
                                        <td>{items.loanAmount}</td>
                                        <td>{items.overdueBalance}</td>
                                        <td>{items.loanStatus}</td>
                                    </tr>)
                                    }
                                    {/* {loans.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                        <td><img src={items.lendersName} width="60%" alt="" /></td>
                                        <td>{items.loanAmount}</td>
                                        <td>{items.amountPaid}</td>
                                        <td>{items.dueDate}</td>
                                        <td>{items.status}</td>
                                    </tr>)} */}
                                    
                                </div>
                            </div>
                        </div>
                        {/* <div class="">
                            <h3>Example</h3>
                            <div className="">
                                <table className="table table-striped " id="">
                                    <tbody><tr>
                                        <th>Company</th>
                                        <th>Contact</th>
                                        <th>Country</th>
                                    </tr>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>
                                            <td>Germany</td>
                                        </tr>
                                        <tr>
                                            <td>Centro comercial Moctezuma</td>
                                            <td>Francisco Chang</td>
                                            <td>Mexico</td>
                                        </tr>
                                        <tr>
                                            <td>Ernst Handel</td>
                                            <td>Roland Mendel</td>
                                            <td>Austria</td>
                                        </tr>
                                        <tr>
                                            <td>Island Trading</td>
                                            <td>Helen Bennett</td>
                                            <td>UK</td>
                                        </tr>
                                        <tr>
                                            <td>Laughing Bacchus Winecellars</td>
                                            <td>Yoshi Tannamuri</td>
                                            <td>Canada</td>
                                        </tr>
                                        <tr>
                                            <td>Magazzini Alimentari Riuniti</td>
                                            <td>Giovanni Rovelli</td>
                                            <td>Italy</td>
                                        </tr>
                                    </tbody></table>
                            </div>
                            <a className="w3-btn w3-margin-top w3-margin-bottom" href="tryit.asp?filename=tryhtml_table_intro" target="_blank">Try it Yourself »</a>
                        </div> */}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DashboardPage;