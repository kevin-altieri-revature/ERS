import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css';
import { Table, Button, Icon, Grid, Header, Modal, Form, Segment} from 'semantic-ui-react'
import './Login';
import User from './User';
import Reimbursement from './Reimbursement';
import axios, {AxiosResponse} from 'axios';

const ManagerHome = () => {

  console.log(localStorage.getItem('user'))

  const [open, setOpen] = React.useState(false)
  const [users, setUser] = useState<User[]>([]);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [active, setActive] = useState({
    employee: true,
    pending: false,
    resolved: false
  })
  const [formBox, setFormBox] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const history = useHistory();
  if(localStorage.getItem('user') == '') {
      history.push('./Login')
  }
  const [loggedUser, setLoggedUser] = useState<User>(JSON.parse(localStorage.getItem('user')!));
  if(!loggedUser.manager) {
    history.push('./EmployeeHome');
  }

  const getUsers = (): Promise<AxiosResponse<User[]>> => { 
    return  axios.get("http://localhost:8080/api/users/", {headers: { 'Content-Type': 'application/json'}});
  }

  const addUser = (): Promise<AxiosResponse<User>> => {
    const form = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      manager: formBox
    }
    return axios.post("http://localhost:8080/api/users/add/", form, {headers: { 'Content-Type': 'application/json'}})
  }
  
  const getReimbursements = (): Promise<AxiosResponse<Reimbursement[]>> => {
    return axios.get("http://localhost:8080/api/reimbursements", {headers: { 'Content-Type': 'application/json'}});
  }

  const updateReimbursement = (reId : string, resolved : boolean): Promise<AxiosResponse<Reimbursement>> => {
    const form = {
      _id: reId,
      approved: resolved,
      manager: ((loggedUser.firstName) + ' ' + (loggedUser.lastName))
    }
    return axios.put("http://localhost:8080/api/reimbursements/update", form, {headers: {'Content-Type': 'application/json'}})
  }

  const userButton = async (event : any) => {
    if(formData.email == '' || formData.password == '' || formData.firstName == '' || formData.lastName == '') {
      return;
    }
    event.preventDefault();
    const userResponse = await addUser();
    setFormBox(false);
    const arrayTemp = [...users, userResponse.data];
    setUser(arrayTemp);
  }

  const viewUser = async (event : any) => {
    event.preventDefault();
    const user = users.find(user => user._id == event.target.value)
    history.push('/employee/' + user?._id + '/' + user?.lastName + '/' + user?.firstName)
  }

  const reimbursementRequest = async (event : any) => {
    event.preventDefault();
    if(event.target.id == 'approve') {
      const updateResponse = await updateReimbursement(event.target.value, true);
      console.log(updateResponse)
      const removeOld = reimbursements.filter((reimbursement) => reimbursement._id != updateResponse.data._id)
      const addBack = [...removeOld, updateResponse.data]
      setReimbursements(addBack)
    } else {
      const updateResponse = await updateReimbursement(event.target.value, false);
      console.log(updateResponse)
      console.log(reimbursements)
      const removeOld = reimbursements.filter((reimbursement) => reimbursement._id != updateResponse.data._id)
      console.log(removeOld)
      const addBack = [...removeOld, updateResponse.data]
      console.log(updateResponse.data)
      console.log(reimbursements)
      setReimbursements(addBack)
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')!));
    (async () => {
      const userResponse = await getUsers();
      const reimbursementResponse = await getReimbursements();
      setUser(userResponse.data);
      setReimbursements(reimbursementResponse.data);
    })()
  }, []);

  const toggleButton = (event : any) => {
    switch(event.target.id) {
      case 'employee':
        setActive({employee: true, pending: false, resolved: false,})
        break;
      case 'pending':
        setActive({employee: false, pending: true, resolved: false,})
        break;
      case 'resolved':
        setActive({employee: false, pending: false, resolved: true,})
        break;
      case 'manager':
        setFormBox(!formBox)
        break;
    }
  }

  const updateFormData = (event: any) => {
    switch(event.target.id) {
      case 'email':
        setFormData({ ...formData, email: event.target.value });
        break;
      case 'password':
        setFormData({ ...formData, password: event.target.value });
        break;
      case 'firstName':
        setFormData({ ...formData, firstName: event.target.value });
        break;
      case 'lastName':
        setFormData({ ...formData, lastName: event.target.value });
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
      <Icon name='user' />Add User</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      >
      <Header icon='address book' position='center' content='Add a new User' />
      <Modal.Content>
        <Form size='large'>
          <Segment stacked>
            <Form.Input id='email' fluid icon='at' iconPosition='left' placeholder="Email address" onChange={updateFormData} required/>
            <Form.Input id='password' fluid icon='lock' iconPosition='left' placeholder="Password" onChange={updateFormData} required/>
            <Form.Input id='firstName' fluid icon='user' iconPosition='left' placeholder="First name" onChange={updateFormData} required/>
            <Form.Input id='lastName' fluid icon='user' iconPosition='left' placeholder="Last name" onChange={updateFormData} required/>
            <Form.Checkbox id='manager' fluid icon='certificate' iconPosition='left'  label="Are they a manager?" onChange={toggleButton}/>
            <Button color='green' type='submit' onClick={userButton} fluid size='large'>
              <Icon name='checkmark' />
              Add User
            </Button>
          </Segment>
        </Form>
      </Modal.Content>
    </Modal>)
  }

  //add a toggle for the three main buttons

  const resolvedTable = () => {
    return reimbursements.filter(reimbursement => reimbursement.pending == false)
    //add user
    .map((reimbursement) => (
      <Table.Row>
        <Table.Cell>{reimbursement._id}</Table.Cell>
        <Table.Cell>
          {users.find(user => user._id == reimbursement.employee)?.firstName} {" "} 
          {users.find(user => user._id == reimbursement.employee)?.lastName}
        </Table.Cell>
        <Table.Cell>${reimbursement.money}</Table.Cell>
        <Table.Cell>{reimbursement.message}</Table.Cell>
        <Table.Cell>{reimbursement.date}</Table.Cell>
        {reimbursement.approved ? <Table.Cell positive><Icon name='checkmark' />Approved</Table.Cell> : 
                                  <Table.Cell negative><Icon name='close' />Denied</Table.Cell>
        }
        <Table.Cell>{reimbursement.manager}</Table.Cell>
      </Table.Row>
    ))
  }

  const pendingTable = () => {
    return reimbursements.filter(reimbursement => reimbursement.pending == true)
    .map((reimbursement) => (
      <Table.Row>
        <Table.Cell>{reimbursement._id}</Table.Cell>
        <Table.Cell>
          {users.find(user => user._id == reimbursement.employee)?.firstName} {" "}
          {users.find(user => user._id == reimbursement.employee)?.lastName}
        </Table.Cell>
        <Table.Cell>${reimbursement.money}</Table.Cell>
        <Table.Cell>{reimbursement.message}</Table.Cell>
        <Table.Cell>{reimbursement.date}</Table.Cell>
        <Button.Group>
          <Button id='deny' value={reimbursement._id} negative type ='submit' onClick={reimbursementRequest}>Deny</Button>
          <Button.Or />
          <Button id='approve' value={reimbursement._id} positive type='submit' onClick={reimbursementRequest}>Approve</Button>
        </Button.Group>
      </Table.Row>
    ))
  }

  const userTable = () => {
    return users.filter(user => !user.manager).map((user) => (
      <Table.Row>
      <Table.Cell>{user._id}</Table.Cell>
      <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell collapsing>
      <Button type='submit' value={user._id} onClick={viewUser} basic color='black'>
          Requests
      </Button>
      </Table.Cell>
    </Table.Row>
      ))
  }

  const assembleReimbursementTable = () => {
    let cells = (
      <Table.HeaderCell>Deny / Approve</Table.HeaderCell>
    )
    let manager;
    if(active.resolved) {
      cells = <Table.HeaderCell>Approved</Table.HeaderCell>
      manager = <Table.HeaderCell>Manager</Table.HeaderCell>
    }
    return (
      <Table striped> 
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Reason</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            {cells}
            {manager}
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {active.pending ? pendingTable() : resolvedTable()}
        </Table.Body>
      </Table>
      )
    }

  const assembleUserTable = () => {
    return (
      <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell width='2'>See Requests</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>

      {userTable()}
      </Table.Body>
    </Table>
    )
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
              <Button id='employee' toggle active={active.employee} onClick={toggleButton}>
                Employees
              </Button>
              <Button id='pending' toggle active={active.pending} onClick={toggleButton}>
                Pending
              </Button>
              <Button id='resolved' toggle active={active.resolved} onClick={toggleButton}>
                Resolved
              </Button>
          </Grid.Column>
          <Grid.Column width="7">
          {modal()}
          </Grid.Column>
          </Grid>
          </Segment>
          {/* {assembleUserTable()} */}
          {active.employee ? assembleUserTable() : assembleReimbursementTable()}
          </Grid.Column>
      </Grid>
  </React.Fragment>
  </div>
  );
}

export default ManagerHome;