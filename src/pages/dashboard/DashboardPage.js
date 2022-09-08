import React from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/DashboardPage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import Character from "../../images/Character.svg";
import refresh from "../../images/refresh.png";
import cash from "../../images/cash.png";
import usertime from "../../images/usertime.png";


const DashboardPage = () => {

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
                                        <button>Apply Here</button>
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
                                            <h1> 02</h1>
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
                                            <h1> 10</h1>
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
                                            <h1> 01</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-md-12 mt-4">
                                <span><b>Loan History</b><button className={styles.viewAll}>View all</button></span>
                                <div className={styles.cardTable1}>

                                </div>
                            </div>
                        </div>
                        <div class="">
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
                        </div>
                        <div class="">
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
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DashboardPage;