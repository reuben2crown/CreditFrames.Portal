import React, { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/ProfilePage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"; 
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";


const ProfilePage = () => {

    const navigate = useNavigate();

    const authenticate = () => {
        //const user = window.localStorage.getItem("userData");
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    const [profile, setProfile] = useState();
    const [phone, setPhone] = useState("");

    const handleProfileUpdate = async() => {

    } 

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
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Profile </h4>
                        </div>
                        <div className="row col-md-12 mt-4">
                            <div className={styles.cardTable1}>
                                <div className={styles.cardInside}>
                                    <span>Profile Settings</span>
                                </div>
                                <Form onSubmit={handleProfileUpdate} className={styles.contactForm}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>First Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, amount: e.target.value })} placeholder="Samuel Emmanuel"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Last Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Samuel Emmanuel"></Form.Control>
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="email" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Email Address"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Date of Birth  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="date" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Samuel Emmanuel"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel} style={{position: "relative", zIndex: "9"}}>Phone Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            {/* <InputGroup style={{width: "100%"}}>
                                                <Form.Select className={styles.contactInput} style={{ width: "20%"}}>
                                                    <option>+234</option>
                                                    <option>+234</option>
                                                    <option>+234</option>
                                                </Form.Select>
                                                <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="8012345678" style={{ width: "80%" }}></Form.Control>
                                            </InputGroup> */}
                                            <PhoneInput
                                                inputStyle={{width: "100%", marginTop: "-20px"}}
                                                country={"eg"}
                                                enableSearch={true}
                                                value={phone}
                                                onChange={(phone) => setPhone(phone)}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Label className={styles.contactLabel}>Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="12 wasooro avenue, block C Abuja "></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>State of Origin  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option>Select State</option>
                                                <option value="ABUJA FCT">ABUJA FCT</option>
                                                <option value="ABIA">ABIA</option>
                                                <option value="ADAMAWA">ADAMAWA</option>
                                                <option value="AKWA IBOM">AKWA IBOM</option>
                                                <option value="ANAMBRA">ANAMBRA</option>
                                                <option value="BAUCHI">BAUCHI</option>
                                                <option value="BAYELSA">BAYELSA</option>
                                                <option value="BENUE">BENUE</option>
                                                <option value="BORNO">BORNO</option>
                                                <option value="CROSS RIVER">CROSS RIVER</option>
                                                <option value="DELTA">DELTA</option>
                                                <option value="EBONYI">EBONYI</option>
                                                <option value="EDO">EDO</option>
                                                <option value="EKITI">EKITI</option>
                                                <option value="ENUGU">ENUGU</option>
                                                <option value="GOMBE">GOMBE</option>
                                                <option value="IMO">IMO</option>
                                                <option value="JIGAWA">JIGAWA</option>
                                                <option value="KADUNA">KADUNA</option>
                                                <option value="KANO">KANO</option>
                                                <option value="KATSINA">KATSINA</option>
                                                <option value="KEBBI">KEBBI</option>
                                                <option value="KOGI">KOGI</option>
                                                <option value="KWARA">KWARA</option>
                                                <option value="LAGOS">LAGOS</option>
                                                <option value="NASSARAWA">NASSARAWA</option>
                                                <option value="NIGER">NIGER</option>
                                                <option value="OGUN">OGUN</option>
                                                <option value="ONDO">ONDO</option>
                                                <option value="OSUN">OSUN</option>
                                                <option value="OYO">OYO</option>
                                                <option value="PLATEAU">PLATEAU</option>
                                                <option value="RIVERS">RIVERS</option>
                                                <option value="SOKOTO">SOKOTO</option>
                                                <option value="TARABA">TARABA</option>
                                                <option value="YOBE">YOBE</option>
                                                <option value="ZAMFARA">ZAMFARA</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Country of Resident <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option>Select country</option>
                                                <option selected value="NG">Nigeria</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AX">Aland Islands</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AQ">Antarctica</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AW">Aruba</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BM">Bermuda</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BV">Bouvet Island</option>
                                                <option value="BR">Brazil</option>
                                                <option value="IO">British Indian Ocean Territory</option>
                                                <option value="BN">Brunei Darussalam</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="KY">Cayman Islands</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CX">Christmas Island</option>
                                                <option value="CC">Cocos (Keeling) Islands</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CD">Congo, Democratic Republic of the Congo</option>
                                                <option value="CK">Cook Islands</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Cote D'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CW">Curacao</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FK">Falkland Islands (Malvinas)</option>
                                                <option value="FO">Faroe Islands</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GF">French Guiana</option>
                                                <option value="PF">French Polynesia</option>
                                                <option value="TF">French Southern Territories</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GI">Gibraltar</option>
                                                <option value="GR">Greece</option>
                                                <option value="GL">Greenland</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GP">Guadeloupe</option>
                                                <option value="GU">Guam</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GG">Guernsey</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HM">Heard Island and Mcdonald Islands</option>
                                                <option value="VA">Holy See (Vatican City State)</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran, Islamic Republic of</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IM">Isle of Man</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JE">Jersey</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea, Democratic People's Republic of</option>
                                                <option value="KR">Korea, Republic of</option>
                                                <option value="XK">Kosovo</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Lao People's Democratic Republic</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libyan Arab Jamahiriya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MO">Macao</option>
                                                <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MQ">Martinique</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="YT">Mayotte</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia, Federated States of</option>
                                                <option value="MD">Moldova, Republic of</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MS">Montserrat</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="AN">Netherlands Antilles</option>
                                                <option value="NC">New Caledonia</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NU">Niue</option>
                                                <option value="NF">Norfolk Island</option>
                                                <option value="MP">Northern Mariana Islands</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PS">Palestinian Territory, Occupied</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PN">Pitcairn</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="PR">Puerto Rico</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RE">Reunion</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russian Federation</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="BL">Saint Barthelemy</option>
                                                <option value="SH">Saint Helena</option>
                                                <option value="KN">Saint Kitts and Nevis</option>
                                                <option value="LC">Saint Lucia</option>
                                                <option value="MF">Saint Martin</option>
                                                <option value="PM">Saint Pierre and Miquelon</option>
                                                <option value="VC">Saint Vincent and the Grenadines</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="ST">Sao Tome and Principe</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="CS">Serbia and Montenegro</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SX">Sint Maarten</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                <option value="SS">South Sudan</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SJ">Svalbard and Jan Mayen</option>
                                                <option value="SZ">Swaziland</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syrian Arab Republic</option>
                                                <option value="TW">Taiwan, Province of China</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania, United Republic of</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TK">Tokelau</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TC">Turks and Caicos Islands</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UM">United States Minor Outlying Islands</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Viet Nam</option>
                                                <option value="VG">Virgin Islands, British</option>
                                                <option value="VI">Virgin Islands, U.s.</option>
                                                <option value="WF">Wallis and Futuna</option>
                                                <option value="EH">Western Sahara</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Bank Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Zenith Bank "></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Account Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="2200776610"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Bank Verification Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="222444563711"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Status  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="Employed">Employed</option>
                                                <option value="Unemployed">Unemployed</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Name <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Rasak Emma"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Raji Street Lagos"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Annual Income <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="5000000"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Job Title  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Supervisor"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Marital Status  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Dependants  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Email"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Number of Children  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-12"><span style={{fontStyle: "italic", fontSize: "12px", marginLeft: "20px"}}>The above in asterisks are mandatory fields to help us provide personalised service to our customers</span></div>
                                        <button type="submit" className={styles.apply}>Save</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;