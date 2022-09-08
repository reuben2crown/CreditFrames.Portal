import React from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/LoansPage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import renmoney from "../../images/renmoney.png";
import branch from "../../images/Branch.png";



const LoansPage = () => {

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
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Loans </h4>
                        </div>
                        <div className="row col-md-12 mt-4">
                            <span className="mb-2"><b>Active Loans</b></span>
                            <div className={styles.cardTable1}>
                                <tr className={styles.cardInside}>
                                    <th>Lender's Name</th>
                                    <th>Loan Amount</th>
                                    <th>Amount Paid</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                                {loans.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                    <td><img src={items.lendersName} width="60%" alt="" /></td>
                                    <td>{items.loanAmount}</td>
                                    <td>{items.amountPaid}</td>
                                    <td>{items.dueDate}</td>
                                    <td>{items.status}</td>
                                </tr>)}

                            </div>
                        </div>
                        <div className="row col-md-12 mt-4">
                            <span className="mb-2"><b>Paid Loans</b></span>
                            <div className={styles.cardTable1}>
                                <tr className={styles.cardInside}>
                                    <th>Lender's Name</th>
                                    <th>Loan Amount</th>
                                    <th>Amount Paid</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                                {loans.map((items, key) => <tr className={styles.cardInside1} key={key}>
                                    <td><img src={items.lendersName} width="60%" alt="" /></td>
                                    <td>{items.loanAmount}</td>
                                    <td>{items.amountPaid}</td>
                                    <td>{items.dueDate}</td>
                                    <td>{items.status}</td>
                                </tr>)}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default LoansPage;