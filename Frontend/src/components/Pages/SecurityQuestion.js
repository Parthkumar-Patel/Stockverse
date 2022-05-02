import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Form.css"
import { useParams } from "react-router-dom";
import CONSTANTS from '../../utils/constants';
function SecurityQuestion() {

    const navigate = useNavigate();
    const params = useParams();
    const [question, setQuestion] = useState([]);
    const api_url = `${CONSTANTS.LOCAL_BACKEND_URL}/getQuestion/${params.id}`;
    
            
    
    useEffect(() => {
        axios.get(api_url).then((res) => {
            setQuestion(res.data.question);
            
        });
        
    },[]);
    const [formData, setFormData] = useState({ answer: '' });
    const [warnAnswer, setWarnAnswer] = useState(false);
    const [msgAnswer, setMsgAnswer] = useState("");
    const [securityRes, setSecurityRes] = useState({ message: '', status: true });
    const inputEvent = (e) => {
        setSecurityRes({ message: '', status: true });
        if (e.target.name === "answer") {

            setWarnAnswer(false);
            setFormData({ ...formData, answer: e.target.value });

        }
        setFormData((lastValue) => {
            return { ...lastValue, [e.target.name]: e.target.value }
        });
    };
    const submitForm = async(e) => {
        setSecurityRes({ message: '', status: true });
        e.preventDefault();
        setWarnAnswer(false);
        
        e.preventDefault();
        try {

            const url = `${CONSTANTS.LOCAL_BACKEND_URL}/verifyAnswer`;
            setFormData({ ...formData, id:params.id });
            const { data: res } = await axios.post(url, formData);
            if (!warnAnswer) {
                if (res.message ==='Answer is correct') {
                    navigate(`/changePassword/${params.id}`, { state: { newId: params.id} });
                }
                else {
                    setSecurityRes({ message: 'Please enter a valid answer.', status: false });
                }
            }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
        }
        
        
        
    };

    return (

        <div>
            <div className="f-container">
                <div className="f-card">
                    <div className="f-form">

                        <div className="f-right-side">

                            <br />
                            <div className="f-hello">
                                <h2>Change Password</h2>
                                <h4>Please answer the security question to change your password</h4>
                            </div>
                            <br />
                            <br />
                            <form>
                                <div className="f-input_text">
                                    <input type="text" className="" value={question} placeholder=""></input>
                                </div>
                                <div className="f-input_text">
                                    <input type="text" className={` ${warnAnswer ? "f-warning" : ""}`} name="answer" placeholder="Enter the answer for the question" value={formData.answer} onChange={inputEvent} />
                                    {warnAnswer ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgAnswer}</p> : null}
                                </div>

                                <div className="f-btn">
                                    <button type="submit" onClick={submitForm}>Submit</button>
                                </div>
                                {(!securityRes.status) ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{securityRes.message}</p> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityQuestion;