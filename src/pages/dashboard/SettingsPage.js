import React, { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/DashboardPage.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";


const SettingsPage = () => {

    const navigate = useNavigate();

    const authenticate = () => {
        const user = window.localStorage.getItem("userData");
        console.log(user);
        if (user === null || user === "undefined") {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    return (
        <div>
            <NavMenu />
            <section className={styles.dashboardbg}> 
                <div className="row m-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h1>tfg7yuh8jniknm drtfgvy bnuibjh n4d6rgvbjh n</h1>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SettingsPage;