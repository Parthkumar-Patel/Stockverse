import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Css/Form.css";
import axios from "axios";
import CONSTANTS from '../../utils/constants';
function ForgetPassword() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: '', });
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [warnEmail, setWarnEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    const [warnPass, setWarnPass] = useState(false);



    const [loginRes, setLoginRes] = useState({ message: '', status: true });
    const inputEvent = (e) => {
        setLoginRes({ message: '', status: true });
        if (e.target.name === "email") {
            if (!regexEmail.test(e.target.value) && e.target.value) {
                setWarnEmail(true);
                setMsgEmail("Please Enter Valid Emaild Id!");
            }
            else {
                setWarnEmail(false);
                setFormData({ ...formData, email: e.target.value });
            }
        }
        setFormData((lastValue) => {
            return { ...lastValue, [e.target.name]: e.target.value }
        });
    };
    const submitForm = async (e) => {
        setLoginRes({ message: '', status: true });
        e.preventDefault();
        try {
            setWarnEmail(false);
            setWarnPass(false);
            if (formData.email === "") {
                setWarnEmail(true);
                setMsgEmail("Please enter a Email Id.");
                return;
            }
            const url = `${CONSTANTS.LOCAL_BACKEND_URL}/checkUser`;
            const { data: res } = await axios.post(url, formData);



            if (res.message === "User Found") {

                navigate(`/securityanswer/${res.id}`, { state: { newId: res.id } });

            }
        }
        catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }

    };

    const btnRegister = (e) => {
        navigate(`/register`);
    }
    return (

        <div>
            <div className="f-container">
                <div className="f-card">
                    <div className="f-form">

                        <div className="f-right-side">
                            <div className="f-register">
                                <p>Not a member? <div onClick={btnRegister}><span>Register Now</span></div></p>
                            </div>
                            <br />
                            <div className="f-hello">
                                <h2>Forgot your password?</h2>
                                <h4>Enter your email address here to answer security questions</h4>
                            </div>
                            <br />
                            <br />
                            <form>

                                <div className="f-input_text">
                                    <input type="text" className={` ${warnEmail ? "f-warning" : ""}`} name="email" placeholder="Enter Email Id" value={formData.email} onChange={inputEvent} />
                                    {warnEmail ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgEmail}</p> : null}
                                </div>



                                <div className="f-btn">
                                    <button type="submit" onClick={submitForm}>Verify Email</button>
                                </div>
                                {error && <div className="fa fa-warning">{error}</div>}
                                <br />
                                {(!loginRes.status) ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{loginRes.message}</p> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;