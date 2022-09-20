import React, {useContext, useState} from 'react';
import { Container, Col, Form, Row, Button, Spinner } from 'react-bootstrap';
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from "../assets/robot.gif";
import {AppContext} from "../context/appContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);

    function handleLogin (e) {
        e.preventDefault();
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
            
                socket.emit("new-user");
               
                navigate("/chat");
            }
        });
    }

    return (
        <Container>
          <Row>
            <Col md={7} className="login__bg">
                
            </Col>
            <Col md={5} className="d-flex align-items-center justify-content-center flex-direction-column" >
               
                <Form style={{ width: "100%", maxWidth: 500}} onSubmit={handleLogin} >
                    <img src = {logo} style={{width: 200}} className='image-container'/>
                <Form.Group className="mb-3" controlId="formBasicEmail">  
                    {error && <p className="alert alert-danger">{error.data}</p>}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    <Form.Text className="text-muted">
                         We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                </Form.Group>
                <Button  style={{ width: "100%", maxWidth: 500}} variant="primary" type="submit">
                    {isLoading ? <Spinner animation="grow" /> : "Login"}
                </Button>
                <div className='py-4'>
                    <p className="text-center">
                        Don't have an Account yet ? <Link to="/signup">Signup</Link>
                    </p>
                </div>  
                </Form>
            </Col>
          </Row>
        </Container>
    );
  
}



export default Login;