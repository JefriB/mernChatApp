import React, {useState} from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import picImg from '../assets/user.png';


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [name, setName] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
    
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'znimil0d');
    try {
      setUploadingImg(true);
      let res =await fetch('https://api.cloudinary.com/v1_1/dqsfzgjee/image/upload', {
        method: "post",
        body: data
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    }catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if(!image) return alert("Please upload your Profile Picture");
    const url = await uploadImage(image);
    console.log(url)

   
    signupUser({name, email, password, picture: url}).then(({data}) => {
      if(data) {
        console.log(data);
        navigate("/chat");
      }

    });
  }


  return (
     <Container>
          <Row>
            <Col md={5} className="d-flex align-items-center justify-content-center flex-direction-column">
                <Form style={{ width: "100%", maxWidth: 500}} onSubmit={handleSignup}>
            
                    <h1 className='text-center'>Create your Account</h1>
                    <div className='signup-profile-pic__container'>
                      <img src={imagePreview || picImg}  className='signup-profile-pic'/>
                      <label htmlFor='image-upload' className='image-upload-label'>
                        <i className='fas fa-plus-circle add-picture-icon'>
                          <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </i>
                      </label>
                      

                    </div>
                    {error && <p className="alert alert-danger">{error.data}</p>}

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Button style={{ width: "100%", maxWidth: 500}} variant="primary" type="submit">
                       {uploadingImg || isLoading ? "Signing you up..." : "Signup"}
                    </Button>
                    <div className='py-4'>
                        <p className="text-center">
                            Already have an Account ? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Form>
            </Col>
            <Col md={7} className="signup__bg"></Col>
     
          </Row>
        </Container>
  );
}

export default Signup;