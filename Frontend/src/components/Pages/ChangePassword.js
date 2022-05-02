import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import "../Css/Register.css";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useParams } from "react-router-dom";
import CONSTANTS from '../../utils/constants';
const Register = () => {
    
   
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const params = useParams();
    const [userData, setUserData] = useState({  password: "", cpassword: ""});
    
   
    //Password
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [warnPass, setWarnPass] = useState(false);
    const [msgPass, setMsgPass] = useState("");
    const [warnCPass, setWarnCPass] = useState(false);
    const [msgCPass, setMsgCPass] = useState("");
    
    
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
    

        if (name === "password") {
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

            const url = `${CONSTANTS.LOCAL_BACKEND_URL }/updatePassword/${params.id}`;
            
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
                            <h1>Change Password</h1>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnPass ? "r-warning" : ""}`} name="password" placeholder="Enter Password" value={userData.password} onChange={handleChange} />
                                {warnPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgPass}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnCPass ? "r-warning" : ""}`} name="cpassword" placeholder="Confirm Password" value={userData.cpassword} onChange={handleChange} />
                                {warnCPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgCPass}</p> : null}
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