import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import profilePicture from "../images/profilePicture.png";
import profilePhoto from "../images/profilePhoto.png";
import { DashboardIcon, AvatarIcon, CashIcon, SettingsIcon } from "./SidebarIcon";
import { FiLogOut } from "react-icons/fi";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import jwtDecode from "jwt-decode";
import routes from "../routes";


const Sidebar = () => {

    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState();
    const getProfilePictureApi = useApi.apply(userApis.getProfilePicture);

    useEffect(() => {
        getProfilePicture();
    }, []);

    const getProfilePicture = async () => {
        const res = await getProfilePictureApi.request();
        if (res.status === 200) {
            console.log(res.data);
            setProfilePicture(res.data);
        }
    }

    const [fileToUpload, setFileToUpload] = useState();
    const [imgDisplay, setImgDisplay] = useState({});
    
    const uploadPictureApi = useApi.apply(userApis.uploadPicture);
    
    const onFileChange = (e) => {
        console.log(e.target.files[0]);

        const upload = e.target.files[0]
        setImgDisplay(URL.createObjectURL(upload));
        setFileToUpload(upload);
    }

    const handleUpload = async () => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await uploadPictureApi.request({ PhotoUpload: fileToUpload, UserId: newData.userId });
        if (res.ok) {
            
        }
    }

    const userLogoutApi = useApi(userApis.userLogout);

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await userLogoutApi.request({ refreshToken: user.refreshToken, userId: newData.userId });
        if (res.ok) {
            window.localStorage.removeItem("userData");
            navigate(routes.LoginPage);
        }
    } 

    const pathname = window.location.pathname;
    

    const nonActive = "rgba(255, 255, 255, 0.6)";
    const active = "#FFF";

    return (
        <div className={styles.sideContainer}>
            <img src={profilePhoto} className={styles.userImage} width="80%" alt="" />
            {/* <img src={profilePicture} className={styles.userImage} alt="" /> */}
            <div>
                <ul className={styles.sidebarMenu}>
                    <li><Link to="/dashboard" style={{textDecoration: "none"}}><DashboardIcon color={pathname === "/dashboard" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/dashboard" ? styles.menuTitleActive : styles.menuTitle}>Dashboard</span></Link></li>
                    <li><Link to="/loans" style={{textDecoration: "none"}}><CashIcon color={pathname === "/loans" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/loans" ? styles.menuTitleActive : styles.menuTitle}>Loans</span></Link></li>
                    <li><Link disabled to="/profile" style={{textDecoration: "none"}}><AvatarIcon color={pathname === "/profile" ? active : nonActive} iconHeight="25px" /> <span className={pathname === "/profile" ? styles.menuTitleActive : styles.menuTitle}>Profile</span></Link></li>
                    <li><Link to="/settings" style={{textDecoration: "none"}}><SettingsIcon color={pathname === "/settings" ? active : nonActive} iconHeight="25px" /> <span className={ pathname === "/settings" ? styles.menuTitleActive : styles.menuTitle}>Settings</span></Link></li>
                </ul>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}><FiLogOut /> &nbsp; Log Out</button>
        </div>
    )
}

export default Sidebar;