import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import Rbtlogo from "../assets/welcome.gif";
import Blklogo from "../assets/blank1.jpg";

function Home() {
  return <Row>
    <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
            <img src = {Rbtlogo} style={{width: 400 , height: 250}} className='imagerbt-container'/>
            <img src = {Blklogo} style={{width: 200 , height: 160}} />
           
            <h1>Share the App with your Friends</h1>
            <p>Chat App Connect you to the Worlds</p>
            <LinkContainer to='/Signup'>
                <Button variant='success'>
                    Get Started <i className="fas fa-comments home-message-icon"></i>
                </Button>
                
            </LinkContainer>
        </div>
    </Col>
    <Col md={6} className="home__bg"></Col>
  </Row>
}

export default Home