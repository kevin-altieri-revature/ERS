import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
    const [validLogin, setValidLogin] = useState({
        validLogin: true
    });

    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    });

    const updateFormData = (event: any) => {
        if(event.target.id == 'email') {
            setFormData({ email: event.target.value, password: formData.password});
        } else {
            setFormData({ email:formData.email, password: event.target.value});
        }
      };

    const history = useHistory();

    const submitForm = async (event: any) => {
        event.preventDefault();
        await axios
        .get("http://localhost:8080/api/users/" + formData.email)
        .then((response) => {
            switch(response.status) {
                case 200:
                    if(response.data[0].password == undefined) {
                        setValidLogin({validLogin: false})
                        break;
                    }
                    if(response.data[0].password !== formData.password) {
                        setValidLogin({validLogin: false});
                        break;
                    }
                    setValidLogin({validLogin: true});
                    localStorage.setItem('user', JSON.stringify(response.data[0]));
                    if(response.data[0].manager) {
                        history.push('/ManagerHome'); //change
                        break;
                    }
                    history.push('/EmployeeHome');
                    break;
                case 400:
                    console.log("There was something wrong with the requested format");
                    break;
                case 404:
                    console.log("Not found");
                    break;
                default:
                    console.log("Something else happened");
            }
        });
    }
    let message;
    if(!validLogin.validLogin) {
        message = <Message negative><Message.Header>Invalid Email or Password</Message.Header></Message>;
    } else { message = '';}
    return (
    <React.Fragment>
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
                Log-in to your account
            </Header>
            {message}
            <Form size='large'>
                <Segment stacked>
                <Form.Input id='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={updateFormData}/>
                <Form.Input id='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={updateFormData}/>
                <Button type='submit' onClick={submitForm} color='black' fluid size='large'>
                    Login
                </Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    </React.Fragment>
    );
};

export default LoginForm