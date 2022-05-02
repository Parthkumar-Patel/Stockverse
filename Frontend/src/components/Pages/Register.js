import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import "../Css/Register.css";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import CONSTANTS from '../../utils/constants';
const Register = () => {
    const [profile, setProfile] = useState([]);
    const api_url = `${CONSTANTS.LOCAL_BACKEND_URL}/getRandomQuestion`;
    useEffect(() => {
        axios.get(api_url).then((res) => {
            setProfile(res.data.questions);
            
        });
    },[]);
    const options =profile.map(item =>{
        return {
            label: item.question,
            value: item.question   
        }
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "", cpassword: "", securityAnswer: "", securityQuestion: "", });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //Name
    const regexName = /^[a-zA-Z]+$/;
    const [warnFN, setWarnFN] = useState(false);
    const [msgFN, setMsgFN] = useState("");
    //Name
    const regexLastName = /^[a-zA-Z]+$/;
    const [warnLN, setWarnLN] = useState(false);
    const [msgLN, setMsgLN] = useState("");
    //email
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [warnEmail, setWarnEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    //Password
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [warnPass, setWarnPass] = useState(false);
    const [msgPass, setMsgPass] = useState("");
    const [warnCPass, setWarnCPass] = useState(false);
    const [msgCPass, setMsgCPass] = useState("");
    //Security Answer
    const regexSecurityAnswer1 = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
    const [warnSA1, setWarnSA1] = useState(false);
    const [msgSA1, setMsgSA1] = useState("");
    const [securityQuestionOption,setSecurityQuestion] = useState("");
    const[value,setValue] = useState("");
    const handleOptions = (selectedOptions) => {
        setSecurityQuestion(selectedOptions);
        setUserData({ ...userData,securityQuestion:selectedOptions.value});
    }
    
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if (name === "firstName") {
            if (!regexName.test(e.target.value) && e.target.value) {
                setWarnFN(true);
                setMsgFN("Invalid Name! Only alphabets allowed!");
            }
            else {
                setWarnFN(false);
                setUserData({ ...userData, firstName: e.target.value });
            }
        }
        else if (name === "lastName") {
            if (!regexLastName.test(e.target.value) && e.target.value) {
                setWarnLN(true);
                setMsgLN("Invalid Name! Only alphabets allowed!");
            }
            else {
                setWarnLN(false);
                setUserData({ ...userData, lastName: e.target.value });
            }
        }
        else if (name === "email") {
            if (!regexEmail.test(e.target.value) && e.target.value) {
                setWarnEmail(true);
                setMsgEmail("Please Enter Valid Emaild Id!");
            }
            else {
                setWarnEmail(false);
                setUserData({ ...userData, email: e.target.value });
            }
        }
        else if (name === "securityAnswer") {
            if (!regexSecurityAnswer1.test(e.target.value) && e.target.value) {
                setWarnSA1(true);
                setMsgSA1("Please enter only alphabets and numeric values");
            }
            else {
                setWarnSA1(false);
                setUserData({ ...userData, securityAnswer1: e.target.value });
            }
        }
        else if (name === "securityQuestion") {
            setUserData({ ...userData,securityQuestion:securityQuestionOption.value});
        }

        else if (name === "password") {
            if (!regexPass.test(e.target.value) && e.target.value) {
                setWarnPass(true);
                setMsgPass("Invalid Password! Alpha-numeric and special characters with minimum limit is 8 characters needed!");
            }
            else {
                setWarnPass(false);
                setUserData({ ...userData, password: e.target.value });
            }
        }
        else if (name === "cpassword") {
            if (e.target.value !== userData.password) {
                setWarnCPass(true);
                setMsgCPass("Password Doesn't match !");
            }
            else {
                setWarnCPass(false);
                setUserData({ ...userData, cpassword: e.target.value });
            }
        }

        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const url = `${CONSTANTS.LOCAL_BACKEND_URL}/register`;
            const { data: res } = await axios.post(url, userData);

            navigate("/login");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };
   
    return (
        <>
            <div className="r-container">
                <div className="r-inner">
                    <div className="r-form">
                        <form onSubmit={handleSubmit}>
                            <h1>Registration Form</h1>

                            <div className="r-input_text">
                                <input type="text" className={` ${warnFN ? "r-warning" : ""}`} name="firstName" placeholder="Enter Name" value={userData.firstName} onChange={handleChange} />
                                {warnFN ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgFN}</p> : null}
                            </div>
                            <div className="r-input_text">
                                <input type="text" className={` ${warnLN ? "r-warning" : ""}`} name="lastName" placeholder="Enter Last Name" value={userData.lastName} onChange={handleChange} />
                                {warnLN ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgLN}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="text" className={` ${warnEmail ? "r-warning" : ""}`} name="email" placeholder="Enter Email Id" value={userData.email} onChange={handleChange} />
                                {warnEmail ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgEmail}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnPass ? "r-warning" : ""}`} name="password" placeholder="Enter Password" value={userData.password} onChange={handleChange} />
                                {warnPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgPass}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnCPass ? "r-warning" : ""}`} name="cpassword" placeholder="Confirm Password" value={userData.cpassword} onChange={handleChange} />
                                {warnCPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgCPass}</p> : null}
                            </div>
                            <div className="r-input_text">
                                <Select options={options} name="securityQuestion" value={securityQuestionOption} onChange={handleOptions} placeholder="Security Question "></Select>
                            </div>
                            <div className="r-input_text">
                                <input type="text" className={` ${warnSA1 ? "r-warning" : ""}`} name="securityAnswer" placeholder="Security Answer " value={userData.securityAnswer} onChange={handleChange} />
                                {warnSA1 ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgSA1}</p> : null}
                            </div>

                            {error && <div className="fa fa-warning">{error}</div>}
                            <div className="r-btn">
                                <button type="submit" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register