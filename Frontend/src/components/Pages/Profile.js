import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Navigation } from './Navigation';
import logo from '../Images/NoUser.jpg'
import {ButtonBase,TextField} from '@mui/material'; 
import { experimentalStyled as styled } from '@mui/material/styles';
import {Row,Container,FloatingLabel,Form} from "react-bootstrap";
import {isAuthenticated} from "../../utils/apiCalls";
import axios from "axios";
import CONSTANTS from '../../utils/constants';
import "../Css/Profile.css"
const Profile = () => {
    const [profile, setProfile] = useState([]);
   
  const user=isAuthenticated();
   const api_url = `${CONSTANTS.LOCAL_BACKEND_URL}/getDetails/${user.id}`;
    useEffect(() => {
        axios.get(api_url).then((res) => {
            
            setProfile(res.data);
        });
    },[]);
   
   
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '200px',
        height: '200px',
      });
    const navigate =useNavigate();
  return (
    <main>
        <Navigation/>
        <Container className="upf-main-bg-container upf-main-container" style={{marginTop: '4rem!important'}}> 
            <Row className="p-3">
                <div className="upf-container">
                    <div className="upf-card">
                        <div className="upf-form">
                            <div className="upf-left-side">
                                <ButtonBase sx={{ width: 200, height: 200 }}>
                                    <Img alt="Name" src={logo} />
                                </ButtonBase>
                            </div>

                            <div className="upf-right-side">
                                    
                                <div style={{height: "20%"}}>
                                    <div className="up-hello mb-5">
                                        <h2>User Profile</h2>
                                    </div>
                                </div>
                                <div style={{height: "80%"}}>
                                    <form>
                                        <FloatingLabel className={" mb-3"}controlId="floatingName" label="First Name">
                                            <Form.Control
                                            type="text"
                                            name="First Name"
                                            InputProps={{
                                                        readOnly: true,
                                                    }}
                                            value={profile.firstName}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel className={" mb-3"}controlId="floatingName" label="Last Name">
                                            <Form.Control
                                            type="text"
                                            name="Last Name"
                                            InputProps={{
                                                        readOnly: true,
                                                    }}
                                            value={profile.lastName}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel className={" mb-3"}controlId="floatingName" label="Email Id">
                                            <Form.Control
                                            type="text"
                                            name="EmailId"
                                            InputProps={{
                                                        readOnly: true,
                                                    }}
                                            value={profile.email}
                                            />
                                        </FloatingLabel>
                                        
                            </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    </main>
    
  );
};

export default Profile;