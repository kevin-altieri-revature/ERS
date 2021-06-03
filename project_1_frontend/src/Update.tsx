import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import axios from 'axios'
import User from './User'

const UpdateForm = () => {

    const history = useHistory();
    const [validUpdate, setValidUpdate] = useState(false)
    const [invalidUpdate, setInvalidUpdate] = useState(false)
    if(localStorage.getItem('user') == '') {
        history.push('./Login')
    }
    const [currentFields, setFields] = useState<User>(JSON.parse(localStorage.getItem('user')!));

    const updateFormData = (event: any) => {
        switch(event.target.id) {
            case 'email':
                setFields({ ...currentFields, email: event.target.value });
                break;
            case 'password':
                setFields({ ...currentFields, password: event.target.value });
                break;
            case 'firstName':
                setFields({ ...currentFields, firstName: event.target.value });
                break;
            case 'lastName':
                setFields({ ...currentFields, lastName: event.target.value });
                break;
        }
    };

    const submitForm = async (event: any) => {
        event.preventDefault();
        setInvalidUpdate(false);
        setValidUpdate(false);
        if(currentFields.email == '' || currentFields.password == '' || currentFields.firstName == '' || currentFields.lastName == ''){
            setInvalidUpdate(true);
            return;
        }
        await axios
        .put("http://localhost:8080/api/users/update/", currentFields, {
            headers: { 'Content-Type': 'application/json'},
        })
        .then((response) => {
            switch(response.status) {
                case 201:
                    setValidUpdate(true);
                    localStorage.setItem('user', JSON.stringify(currentFields));
                    history.goBack();
                    break;
                case 400:
                    console.log("There was something wrong with the requested format");
                    break;
                case 403:
                    setInvalidUpdate(true);
                    console.log("Not found");
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
    if(invalidUpdate) {
        message = <Message error><Message.Header>Invalid Input</Message.Header></Message>
    }
    if(validUpdate) {
        message = <Message info><Message.Header>Information Updated!</Message.Header></Message>
    }

    return (
        <React.Fragment>
            <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    Update your Information:
                </Header>
                {message}
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input id='email' fluid icon='at' iconPosition='left' defaultValue={currentFields.email} onChange={updateFormData}/>
                    <Form.Input id='password' fluid icon='lock' iconPosition='left' defaultValue={currentFields.password} onChange={updateFormData}/>
                    <Form.Input id='firstName' fluid icon='user' iconPosition='left' defaultValue={currentFields.firstName} onChange={updateFormData}/>
                    <Form.Input id='lastName' fluid icon='user' iconPosition='left' defaultValue={currentFields.lastName} onChange={updateFormData}/>
                    <Button type='submit' onClick={submitForm} color='black' fluid size='large'>
                        Update Info
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    )
}

export default UpdateForm;