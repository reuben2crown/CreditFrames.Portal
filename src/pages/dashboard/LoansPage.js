import React, { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/LoansPage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import renmoney from "../../images/renmoney.png";
import branch from "../../images/Branch.png";
import routes from "../../routes";
import useApi from "../../hooks/useApi";
import userApis from "../../api/users";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; 
import loaderLogo from "../../images/CreditFrame logo.png";
import { Modal, Spinner } from "react-bootstrap";


const LoansPage = () => {

    document.title = "Loans Page - Creditframes";

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const authenticate = () => {
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    const [loans, setLoans] = useState([]);
    const getLoanDataApi = useApi(userApis.getLoanData);

    useEffect(() => {
        getLoanData();
    }, []);

    const getLoanData = async () => {
        setLoader(true);
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await getLoanDataApi.request({UserId: newData.userId});
        if (res.status === 200) { 
            setLoans(res.data);
        };
        setLoader(false);
    }

    const loan = [
        {
            "loanId": 1,
            "lendersName": renmoney,
            "loanAmount": "₦10,000,000",
            "amountPaid": "₦5,000,000",
            "dueDate": "09/10/2023",
            "status": "Completed",
        },
        {
            "loanId": 1,
            "lendersName": branch,
            "loanAmount": "₦10,000,000",
            "amountPaid": "₦5,000,000",
            "dueDate": "09/10/2023",
            "status": "Completed",
        }
    ];

    return (
        <div>
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
            <NavMenu />
            <section className={styles.dashboardbg}> 
                <div className="row m-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.pageContent}>
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Loans </h4>
                        </div>
                        <div className="row col-md-12 mt-4">
                            <span className="mb-2"><b>Active Loans</b></span>
                            <div className={styles.cardTable1}>
                                <tr className={styles.cardInside}>
                                    <th>Lender's Logo</th>
                                    <th>Loan Amount</th>
                                    <th>Amount Paid</th>
                                    <th>Status</th>
                                </tr>
                                {loans.items?.map((loans, key) => <tr className={styles.cardInside1} key={key}>
                                    <td><img src={loans.lender?.logo} width="60%" alt="" /></td>
                                    <td>{loans.currencyCode} {loans.loanAmount}</td>
                                    <td>{loans.amountPaid}</td>
                                    <td>{loans.loanStatus}</td>
                                </tr>)}

                            </div>
                        </div>
                        {/* <div className="row col-md-12 mt-4">
                            <span className="mb-2"><b>Paid Loans</b></span>
                            <div className={styles.cardTable1}>
                                <tr className={styles.cardInside}>
                                    <th>Lender's Name</th>
                                    <th>Loan Amount</th>
                                    <th>Amount Paid</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                                {loan.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                    <td><img src={items.lendersName} width="60%" alt="" /></td>
                                    <td>{items.loanAmount}</td>
                                    <td>{items.amountPaid}</td>
                                    <td>{items.dueDate}</td>
                                    <td>{items.status}</td>
                                </tr>)}

                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default LoansPage;