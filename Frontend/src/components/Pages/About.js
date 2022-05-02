import React from "react";
import { Navigation } from './Navigation';
import logo from '../Images/Stock.jpg'
import {ButtonBase} from '@mui/material'; 
import { experimentalStyled as styled } from '@mui/material/styles';
import {Row,Container} from "react-bootstrap";
import "../Css/About.css"
const About = () => {
    
   
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width:'900px',
        height:'900px',
      });
  return (
    <main>
        <Navigation/>
        <Container className="upf-main-bg-container upf-main-container" style={{marginTop: '4rem!important'}}> 
            <Row className="p-3">
                <div className="ab-container">
                    <div className="ab-card">
                        <div className="ab-form">
                            <div className="ab-left-side">
                                <ButtonBase sx={{ width: 500, height: 500 }}>
                                    <Img alt="Name" src={logo} />
                                </ButtonBase>
                            </div>

                            <div className="ab-right-side">
                                    
                                <div style={{height: "20%"}}>
                                    <div className="up-hello mb-5">
                                        <h2>Stockverse</h2>
                                    </div>
                                </div>
                                <div style={{height: "80%"}}>
                                    <ul>
                                        <li>Track all your global investments at a single place</li>
                                        <li>Make an informed decision before buying/selling</li>
                                        <li>Supports Crypto investments</li>
                                        <li>Personal Portfolio to give hollisitic view of the profit/ losses</li>
                                        <li>Curated news, blogs and thematic investment suggestions.</li>
                                      </ul>
                                    
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

export default About;
