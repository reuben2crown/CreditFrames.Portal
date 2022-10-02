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


const DashboardPage = () => {

    const navigate = useNavigate();

    const authenticate = () => {
        const user = window.localStorage.getItem("userData");
        if (user === null || user === "undefined") {
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
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        //console.log(newData.userId);
        const res = await getDashboardDataApi.request({userId: newData.userId});
        //console.log(res.data);
        if (res.status === 200) { 
            setDashboard(res.data);
        }
    }

    // activeLoan: null
    // loanHistory: null
    // recentSearch: []
    // totalActiveLoan: 0
    // totalCompletedLoan: 0
    // totalLoans: 0

    // const authenticate = () => {
    //     const user = window.localStorage.getItem("userData");
    //     console.log(user);
    //     if (user === null || user === "undefined") {
    //         navigate(routes.LoginPage);
    //     }
    // }
    // useEffect(() => {
    //     authenticate();
    // }, []);

    const loans = [
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
                                            <h1>Seyi Martins</h1>
                                            <span>We've grouped all the important things in one place, to help personalised your experience</span>
                                        </div>
                                        <img src={Character} className={styles.illustration1} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className={styles.pageCard2}>
                                        <h3>Get the best loan offers that suits your needs</h3>
                                        <button onClick={() => navigate(routes.LoanRequestPage)}>Apply Here</button>
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