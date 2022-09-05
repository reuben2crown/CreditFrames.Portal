import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import profilePicture from "../images/profilePicture.png";
import { DashboardIcon, AvatarIcon, CashIcon, SettingsIcon } from "./SidebarIcon";
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {

    const pathname = window.location.pathname
    

    const nonActive = "rgba(255, 255, 255, 0.6)";
    const active = "#FFF";

    return (
        <div className={styles.sideContainer}>
            <img src={profilePicture} className={styles.userImage} alt="" />
            <div>
                <ul className={styles.sidebarMenu}>
                    <li><Link to="/dashboard" style={{textDecoration: "none"}}><DashboardIcon color={pathname === "/dashboard" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/dashboard" ? styles.menuTitleActive : styles.menuTitle}>Dashboard</span></Link></li>
                    <li><Link to="/loans" style={{textDecoration: "none"}}><CashIcon color={pathname === "/loans" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/loans" ? styles.menuTitleActive : styles.menuTitle}>Loans</span></Link></li>
                    <li><Link to="/profile" style={{textDecoration: "none"}}><AvatarIcon color={pathname === "/profile" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/profile" ? styles.menuTitleActive : styles.menuTitle}>Profile</span></Link></li>
                    <li><Link to="/settings" style={{textDecoration: "none"}}><SettingsIcon color={pathname === "/settings" ? active : nonActive} iconHeight="25px" /> <span className={ pathname === "/settings" ? styles.menuTitleActive : styles.menuTitle}>Settings</span></Link></li>
                </ul>
            </div>
            <button className={styles.logoutButton}><FiLogOut /> &nbsp; Log Out</button>
        </div>
    )
}

export default Sidebar;