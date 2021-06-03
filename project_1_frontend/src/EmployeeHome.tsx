import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css';
import {Table, Button, Icon, Grid, Header, Modal, Form, Segment} from 'semantic-ui-react'
import './Login';
import User from './User';
import Reimbursement from './Reimbursement';
import axios, {AxiosResponse} from 'axios';
import Tables from './Tables';

const EmployeeHome = () => {

  const [open, setOpen] = React.useState(false)
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [pending, setPending] = useState(false)

  const history = useHistory();

  if(localStorage.getItem('user') == '') {
    history.push('./Login')
  }
  const [loggedUser, setLoggedUser] = useState<User>(JSON.parse(localStorage.getItem('user')!));
  if(loggedUser.manager) {
    history.push('./ManagerHome');
  }
  const [formData, setFormData] = useState({
    employee: loggedUser._id,
    money: '',
    message: '',
    date: '',
  })
  
  const getReimbursements = (): Promise<AxiosResponse<Reimbursement[]>> => {
    return axios.get("http://localhost:8080/api/reimbursements/" + loggedUser._id, {headers: { 'Content-Type': 'application/json'}});
  }

  const addReimbursement = (): Promise<AxiosResponse<Reimbursement>> => {
    return axios.post("http://localhost:8080/api/reimbursements/add", formData, {headers: {'Content-Type': 'application/json'}})
  }

  //use set contact in the useeffect

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')!));
    (async () => {
      const reimbursementResponse = await getReimbursements();
      setReimbursements(reimbursementResponse.data);
    })()
  }, []);

  const userButton = async (event : any) => {
    setOpen(false);
    event.preventDefault();
    if(formData.money == '' || formData.date == '') {
      return;
    }
    const reimbursementResponse = await addReimbursement();
    console.log(reimbursementResponse.data)
    const array = [...reimbursements, reimbursementResponse.data];
    setReimbursements(array);
  }

  const toggleButton = (event : any) => {
    setPending(!pending);
  }

  const updateFormData = (event: any) => {
    switch(event.target.id) {
      case 'money':
        setFormData({ ...formData, money: event.target.value });
        break;
      case 'message':
        setFormData({ ...formData, message: event.target.value });
        break;
      case 'date':
        setFormData({ ...formData, date: event.target.value });
        break;
      default:
        break;
    }
  };

  const modal = () => {
    return (<Modal
      closeIcon
      open={open}
      trigger={<Button
        icon
        labelPosition='left'
        primary
        >
      <Icon name='edit' />Add Reimbursement</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      >
      <Header icon='edit' position='center' content='Add a new Reimbursement' />
      <Modal.Content>
        <Form size='large'>
          <Segment stacked>
            <Form.Input id='money' fluid icon='dollar sign' iconPosition='left' placeholder="Amount($)" onChange={updateFormData}/>
            <Form.Input id='message' fluid icon='comment' iconPosition='left' placeholder="Reason" onChange={updateFormData}/>
            <Form.Input id='date' fluid icon='calendar outline' iconPosition='left' placeholder="mm/dd/yyyy" onChange={updateFormData}/>
            <Button color='green' type='submit' onClick={userButton} fluid size='large'>
              <Icon name='checkmark' />
              Add Reimbursement
            </Button>
          </Segment>
        </Form>
      </Modal.Content>
    </Modal>)
  }

  return(
    <div>
      <React.Fragment>
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ width: '90%' }}>
          <Header>Welcome {loggedUser.firstName} {loggedUser.lastName}</Header>
          <Segment>
          <Grid>
            <Grid.Column width="9">
              <Button id='pending' toggle active={pending} onClick={toggleButton}>
                Pending
              </Button>
              <Button id='resolved' toggle active={!pending} onClick={toggleButton}>
                Resolved
              </Button>
          </Grid.Column>
          <Grid.Column width="7">
          {modal()}
          </Grid.Column>
          </Grid>
          </Segment>
          { Tables.assembleReimbursementTable(reimbursements, pending)}
          </Grid.Column>
      </Grid>
  </React.Fragment>
  </div>
  );
}

export default EmployeeHome;