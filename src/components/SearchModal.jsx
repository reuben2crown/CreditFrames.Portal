import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/NavMenu.module.css";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import { NumericFormat } from "react-number-format";
import { Form} from "react-bootstrap";



const SearchModal = (props) => {

    const { show, handleClose, handleShow, selectedLoanType } = props

    const navigate = useNavigate();

    // console.log(decodeURIComponent(`site.com/post?comments=1%2C2%2C3%2C4`));
    // console.log(encodeURIComponent(`site.com/post?comments=1,2,3,4`));

    const [currency, setCurrency] = useState("NGN");

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
            return navigate(`/./loan-request?loanType=${searchLoan.LoanTypeId === undefined ? selectedLoanType : searchLoan.LoanTypeId}&loanAmount=${searchLoan.LoanAmount}`);
        }
        if (localStorage.getItem("userData") === null) {
            return navigate(`/./login?returnUrl=/loan-request?loanType%3D${searchLoan.LoanTypeId}%26loanAmount%3D${searchLoan.LoanAmount}`);   
        }
        
    };

   
    return (
        <div>
            <Button variant="primary" hidden onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                show={show}
                onHide={handleClose}>
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
                                    <label for="cars">Types of Loan</label>
                                    <Form.Select name="cars" id="cars" required className={styles.select} onChange={(e) => setSearchLoan({ ...searchLoan, LoanTypeId: e.target.value }) }>
                                        <option value="">Select loan type </option>
                                        {loanTypes.map(loans => <option {...(selectedLoanType === loans.id ? { selected: true } : {})} value={loans.id}>{loans.name}</option>)}
                                    </Form.Select>
                                    {/* <label>Types of Loan</label>
                                    <Form.Select className={styles.select} required onChange={(e) => setSearchLoan({ ...searchLoan, LoanTypeId: e.target.value })}>
                                        <option selected disabled>Select Loan Type</option>
                                        {loanTypes.map(loans => <option value={loans.id}>{loans.name}</option>)}
                                    </Form.Select> */}
                                </div>
                                <div className="col-md-10 m-auto pt-4"><button type="submit" className={styles.submit}>{searchLoanApi.loading ? "Searching..." : "Search for loan"}</button></div>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SearchModal;